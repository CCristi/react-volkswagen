export class PropertyNotDefinedError extends Error {
  constructor(target, property) {
    super(`Property "${property}" is not defined`);

    this._target = target;
    this._property = property;
  }

  get target() {
    return this._target;
  }

  get property() {
    return this._property;
  }
}
