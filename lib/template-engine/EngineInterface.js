import {MethodNotImplementedError} from 'lib/exceptions/MethodNotImplementedError';

export class EngineInterface {
  extension() {
    throw new MethodNotImplementedError("extension");
  }

  compile() {
    throw new MethodNotImplementedError("render");
  }
}
