export class PropertyNotDefinedError extends Error {
  constructor(property) {
    super(`Property "${property}" is not defined`);

    this._property = property;
  }

  get property() {
    return this._property;
  }
}
