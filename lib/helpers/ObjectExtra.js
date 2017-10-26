
export class ObjectExtras {
  static findAndReplace(obj, refToFind, replaceWith) {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      if (obj[key] === refToFind) {
        obj[key] = replaceWith;
        continue;
      }

      if (typeof obj[key] === 'object') {
        ObjectExtras.findAndReplace(obj[key], refToFind, replaceWith)
      }
    }
  }
}
