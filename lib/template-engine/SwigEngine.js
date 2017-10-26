import {EngineInterface} from 'lib/template-engine/EngineInterface';
import swig from 'swig';
import path from 'path';
import process from 'process';

export class SwigEngine extends EngineInterface {
  constructor() {
    super();

    // todo: add prog --root option to set this path
    this._basePath = '/Users/ccovali/ellation/cx-web/app';
    this._extendFilters();
  }

  setBasePath(basePath) {
    this._basePath = path.normalize(basePath).replace('~', process.env.HOME);
  }

  _extendFilters() {
    swig.setFilter('importEscape', rawImport => {
      const replaceRegExp = new RegExp(`${this._regExpEscape(this._basePath)}\\/?|\.[^\.]+$`, 'ig');

      return rawImport.replace(replaceRegExp, '');
    });
  }

  // todo: move into helper/regExp
  _regExpEscape(rawString) {
    return rawString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  setImportBasePath(basePath) {
    this._basePath = basePath;

    return this;
  }

  extension() {
    return 'swig';
  }

  compile(rawTemplate, params) {
    return swig.render(rawTemplate, {locals: params});
  }
}
