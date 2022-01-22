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



export {
  starship,
  starship_key,

  invert,
  default_invertor,
};