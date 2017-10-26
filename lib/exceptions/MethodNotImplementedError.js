export class MethodNotImplementedError extends Error {
  constructor(methodName) {
    super(`Method not implemented "${methodName}"`);
  }
}
