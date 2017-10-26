import swig from 'swig';

import {EngineInterface} from 'lib/template-engine/EngineInterface';
import {js_beautify as jsBeautify} from 'js-beautify';
import jsonRaw from 'lib/template-engine/filters/jsonRaw';
import rmExt from 'lib/template-engine/filters/rmExt';

export class SwigEngine extends EngineInterface {
  constructor() {
    super();

    this._extendFilters();
  }

  _extendFilters() {
    swig.setFilter('rmExt', rmExt);
    swig.setFilter('jsonRaw', jsonRaw);
  }

  extension() {
    return 'swig';
  }

  compile(rawTemplate, params) {
    return jsBeautify(swig.render(rawTemplate, {locals: params}), {
      indent_size: 2,
    });
  }
}
