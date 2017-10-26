
export class RandTypes {
  static get int() {
    return Math.floor(Math.random() * 100 + 1);
  }

  static get object() {
    return {
      id: RandTypes.int,
    };
  }

  static get string() {
    return 'fakeString';
  }

  static get array() {
    return [RandTypes.int, RandTypes.int, RandTypes.int];
  }

  static get bool() {
    return Math.random() < 0.5;
  }

  static get LIST() {
    return ['int', 'object', 'string', 'array', 'bool'];
  }
}
