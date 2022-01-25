import { isString } from './check';



/**
 * Округление числа до определенной точности
 * @param num число
 * @param precision точность
 */
const roundNumberToPrecision = (num: number, precision: number): number => {
  return +(Math.round(+(num + "e+" + precision)) + "e-" + precision);
};

/**
* Сравнение двух чисел с округлением до определенного кол-ва знаков
* @param a первое число
* @param b второе число
* @param precision точность
*/
const isNumbersEqualsWithPrecision = (a: number, b: number, precision: number = 2): Boolean => {
  return roundNumberToPrecision(a, precision) === roundNumberToPrecision(b, precision);
};

/**
 * Проверяет является ли `suspect` целым числом
 * @param suspect значение
 */
const isInteger = (suspect: any): Boolean => Number.isInteger(suspect);

/**
 * Проверяет является ли `suspect` целым числом
 * @param suspect значение
 */
const isPositive = (suspect: any): Boolean => suspect > 0;

/**
 * Проверяет является ли `suspect` целым и положительным числом
 * @param suspect значение
 */
const isPositiveInteger = (suspect: any): Boolean => isInteger(suspect) && isPositive(suspect);

/**
 * Проверяет является ли `suspect` строкой с целым и положительным числом
 * @param suspect значение
 */
const isPositiveIntegerString = (suspect: any): Boolean => isString(suspect) && /^[1-9]\d*$/.test(suspect);

/**
 * Проверяет является ли `suspect` строкой с целым и положительным числом или целым и положительным числом
 * @param suspect значение
 */
const isLikePositiveInteger = (suspect: number): Boolean => isPositiveInteger(suspect) || isPositiveIntegerString(suspect);



export {
  roundNumberToPrecision,
  isNumbersEqualsWithPrecision,

  isPositiveInteger,
  isPositiveIntegerString,
  isLikePositiveInteger,
};