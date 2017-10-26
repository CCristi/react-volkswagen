import {EngineInterface} from 'lib/template-engine/EngineInterface';
import swig from 'swig';
import path from 'path';
import process from 'process';

export class SwigEngine extends EngineInterface {
  constructor() {
    super();

    this._basePath = '';
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

  extension() {
    return 'swig';
  }

  compile(rawTemplate, params) {
    return swig.render(rawTemplate, {locals: params});
  }
}
