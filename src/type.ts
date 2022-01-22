const isString = (suspect: any): Boolean => typeof suspect === 'string';

const isNumber = (suspect: any): Boolean => typeof suspect === 'number';

const isArray = (suspect: any): Boolean => Array.isArray(suspect);

const isObject = (suspect: any): Boolean => typeof suspect === 'object';

export {
  isString,
  isNumber,
  isArray,
  isObject,
};