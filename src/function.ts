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
 * Объединяет объекты `source` и `target`
 * @param source массив содержащий объекты, для которых будет искаться пара в массиве `target`
 * @param target массив содержащий объекты, в котором будет происходить поиск пары для массива `source`
 * @param by     функция матчинга или строка содержащая наименование ключа по которому будет происходить матчинг объектов
 */
const join = (source: Array<Object>, target: Array<Object>, by: string|Function) => {
  const result: Array<Object> = [];

  const escape: Array<number> = [];

  const check = by instanceof Function ? by : (a:any, b:any) => a[by] === b[by];

  for (const item of source) {
    for (let i = 0; i < target.length; i++) {
      if (escape.includes(i)) continue;
      if (check(item, target[i])) {
        result.push(Object.assign({}, target[i], item));
        escape.push(i);
      }
    }
  }

  return result;
};

export {
  starship,
  starship_key,

  invert,
  default_invertor,

  join,
};