/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeObjectFields<T>(obj: T, ...fields: (keyof T)[]) {
  const newObj = {} as any;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (fields.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
  }

  return newObj as Partial<T>;
}

/**
 * Verify if param is a object
 * @param {object} obj
 * @returns {boolean}
 */
export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Verify if the object has keys
 * @param {object} obj
 * @returns {boolean}
 */
export function hasObjectKeys(obj: any): boolean {
  return !!Object.keys(obj).length;
}

/**
 * Verify if the params is a object and has keys (not object empty)
 * @param {object} obj
 * @returns {boolean}
 */
export function isObjectAndHasKeys(obj: any): boolean {
  return isObject(obj) ? hasObjectKeys(obj) : false;
}

/**
 * Verify if the "key" exists in "obj"
 * @param {object} obj Object to evaluate
 * @param {string} key
 * @returns {boolean}
 */
export function isKeyInObject(obj: any, key: string): boolean {
  return key in obj;
}

export function isSameArray(arr1: any[], arr2: any[]): boolean {
  // Verify if arguments are arrays
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  // Verify if the length of arrays are the same
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Verify if the arrays are the same
  return arr1.every((item, index) => {
    // Child is an array
    if (Array.isArray(item)) {
      return isSameArray(item, arr2[index]);
    }

    // Child is an object
    if (isObject(item)) {
      return isSameObject(item, arr2[index]);
    }

    // Child is a primitive
    return item === arr2[index];
  });
}

export function isSameObject(obj1: any, obj2: any): boolean {
  // Verify if arguments are objects
  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  // Verify if the fields quantity of objects are the same
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // Verify if the objects are the same
  return Object.keys(obj1).every(key => {
    // Field is an array
    if (Array.isArray(obj1[key])) {
      return isSameArray(obj1[key], obj2[key]);
    }

    // Field is an object
    if (isObject(obj1[key])) {
      return isSameObject(obj1[key], obj2[key]);
    }

    // Field is a primitive
    return obj1[key] === obj2[key];
  });
}
