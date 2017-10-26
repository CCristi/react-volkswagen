import {PropertyNotDefinedError} from 'lib/exceptions/PropertyNotDefinedError';

const handler = {
  get(target, property) {
    if (target[property] !== undefined) {
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler)
      } else {
        return target[property];
      }
    }

    throw new PropertyNotDefinedError(target, property);
  }
};

export default handler;
