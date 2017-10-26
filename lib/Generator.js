import path from 'path';
import {SwigEngine} from 'lib/template-engine/SwigEngine';
import fs from 'fs';


export class Generator {
  constructor(
    engine = Generator.DEFAULT_ENGINE,
    templatePaths = Generator.DEFAULT_PATH,
    output = Generator.DEFAULT_OUTPUT // todo: write fs output
  ) {
    this._engine = engine;
    this._output = output;
    this._path = templatePaths;
  }

  templatePath(templateName) {
    return `${path.join(this._path, templateName)}.${this._engine.extension()}`;
  }

  generate(templateName, params) {
    const template = fs.readFileSync(this.templatePath(templateName)).toString();
    const codeStr = this._engine.compile(template, params);

    this._output.write(codeStr);
  }

  static get DEFAULT_OUTPUT() {
    return {
      write(generateResult) {
        console.log(generateResult);
      }
    }
  }

  static get DEFAULT_PATH() {
    return path.join(__dirname, '../templates');
  }

  static get DEFAULT_ENGINE() {
    return new SwigEngine();
  }
}
