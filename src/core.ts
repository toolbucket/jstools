/**
 * Эквивалент оператора <=> (starship) в PHP
 * @param a первое значение для сравнения
 * @param b второе значение для сравнения
 */
const starship = (a: any, b: any) => (a > b ? 1 : (a < b ? -1 : 0));

/**
 * Возвращает starship для двух объектов по ключу `key`
 * @param key Ключ по которому будет взято значение для сравнения
 */
const starship_key = (key: any) => (a: any, b:any) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
 

/**
 * Стандартная функция инверсии
 * @param value значение, которое будет инвертировано, если это возможно 
 */
const default_invertor = (value: any) => {
  if (typeof value === 'number') return -value;
  if (typeof value === 'boolean') return !value;
  return value;
};
 
/**
 * Инвертирует возвращаемое значение функции
 * @param fn функция, результат которой необходимо инвертировать
 * @param invertor необязательный параметр, позволяет определить собственную функцию инверсии значений
 */
const invert = (fn: Function, invertor: Function = default_invertor) => (...params: any) => invertor(fn(...params));

/**
 * Получение значения между указанными границами
 * @param val значение
 * @param min минимальная граница
 * @param max максимальная граница
 */
const between = (val: any, min: any, max: any): any => {
  if (val < min) return min;
  else if (val > max) return max;
  else return val;
}

/**
 * Округление числа до определенной точности
 * @param num число
 * @param precision точность
 */
const roundNumberToPrecision = (num: Number, precision: Number): Number => {
  return +(Math.round(+(num + "e+" + precision)) + "e-" + precision);
};

/**
* Сравнение двух чисел с округлением до определенного кол-ва знаков
* @param a первое число
* @param b второе число
* @param precision точность
*/
const isNumbersEqualsWithPrecision = (a: Number, b: Number, precision: Number = 2): Boolean => {
  return roundNumberToPrecision(a, precision) === roundNumberToPrecision(b, precision);
};

/**
 * Проверяет является ли `suspect` целым и положительным числом
 * @param suspect значение
 */
const isPositiveInteger = (suspect: any): Boolean => Number.isInteger(suspect) && suspect > 0;

/**
 * Проверяет является ли `suspect` строкой с целым и положительным числом
 * @param suspect значение
 */
const isPositiveIntegerString = (suspect: any): Boolean => typeof suspect === 'string' && /^[1-9]\d*$/.test(suspect);

/**
 * Проверяет является ли `suspect` строкой с целым и положительным числом или целым и положительным числом
 * @param suspect значение
 */
const isLikePositiveInteger = (suspect: Number): Boolean => isPositiveInteger(suspect) || isPositiveIntegerString(suspect);

/**
 * Получить уникальные значения массива
 * @param array массив
 */
const getUniqueArray = (array: Array<any>): Array<any> => [...new Set(array)];

/**
 * Рекурсивно выставляет все значения ключей объекта в пустой эквивалент
 * @param array объект
 */
const resetObject = (obj: any): any => {
  for (const key in obj) {
    if (Array.isArray(obj[key])) obj[key] = [];
    else if (typeof obj[key] === 'object' && obj[key] !== null) resetObject(obj[key])
    else obj[key] = null;
  }
  return obj;
};



export {
  starship,
  starship_key,

  invert,
  default_invertor,

  between,

  roundNumberToPrecision,
  isNumbersEqualsWithPrecision,
  
  isPositiveInteger,
  isPositiveIntegerString,
  isLikePositiveInteger,

  getUniqueArray,

  resetObject,
};