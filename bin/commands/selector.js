import disallowUndefined from 'lib/proxy/disallowUndefined';
import {PropertyNotDefinedError} from 'lib/exceptions/PropertyNotDefinedError';

export default function selectorCmd(args, options, logger, generator) {
  const selectorModule = require(args.path);
  const generationObject = {
    modulePath: args.path,
    methods: [],
  };

  for (const methodName in selectorModule) {
    if (!selectorModule.hasOwnProperty(methodName)) {
      continue;
    }

    const methodData = {
      name: methodName,
    };

    try {
      Object.assign(methodData, {
        mock: resolveSelectorMock(selectorModule[methodName]),
        result: {},
      });
    } catch (e) {
      logger.error(`Could not generate tests for "${methodName}": ${e.toString()}`);
    }

    generationObject.methods.push(methodData);
  }

  generator.generate('selector.unit.spec.js', generationObject);
};

function resolveSelectorMock(selectorMethod, _resolvedMock = {}, _childRef = _resolvedMock, _nestLevel = 0) {
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

      _childRef[property] = {};

      return resolveSelectorMock(selectorMethod, _resolvedMock, _childRef[property], _nestLevel + 1);
    }

    throw e;
  }
}
