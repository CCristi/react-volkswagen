import path from 'path';
import inquirer from 'inquirer';

import disallowUndefined from 'lib/proxy/disallowUndefined';
import {PropertyNotDefinedError} from 'lib/exceptions/PropertyNotDefinedError';
import {ObjectExtras} from 'lib/helpers/ObjectExtra';
import {RandTypes} from 'lib/helpers/RandTypes';

export default async function selectorCmd(args, options, logger, generator) {
  const selectorModule = require(path.join(options.root, args.path));
  const generationObject = {
    modulePath: args.path,
    methods: [],
  };

  for (const methodName in selectorModule) {
    if (!selectorModule.hasOwnProperty(methodName)) {
      continue;
    }

    const selectorMethod = selectorModule[methodName];
    const methodData = {
      name: methodName,
    };

    try {
      const mock = resolveSelectorMock(selectorMethod);
      const preResult = selectorMethod(mock);
      const randType = await chooseReturnType(methodName);
      const finalResult = RandTypes[randType];

      ObjectExtras.findAndReplace(mock, preResult, finalResult);
      Object.assign(methodData, {
        mock,
        result: finalResult,
      });
    } catch (e) {
      logger.error(`Could not generate tests for "${methodName}": ${e.toString()}`);
    }

    generationObject.methods.push(methodData);
  }

  generator.generate('selector.unit.spec.js', generationObject);
};

function chooseReturnType(selectorName) {
  return inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: `Choose return type for "${selectorName}" selector`,
    choices: RandTypes.LIST,
  }]).then(response => response.type);
}

function resolveSelectorMock(selectorMethod, _resolvedMock = {}, _nestLevel = 0) {
  const pingPongMock = new Proxy(_resolvedMock, disallowUndefined);

  if (_nestLevel === 5) {
    throw new Error(`Nest level exceeded`);
  }

  try {
    selectorMethod(pingPongMock);

    return _resolvedMock;
  } catch (e) {
    if (e instanceof PropertyNotDefinedError) {
      const property = e.property;
      const target = e.target;

      target[property] = {};

      return resolveSelectorMock(selectorMethod, _resolvedMock, _nestLevel + 1);
    }

    throw e;
  }
}
