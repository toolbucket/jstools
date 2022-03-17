/**
 * Заменяет все вхождения в строке в соответствии с объектом `map`
 * @param str Исходная строка
 * @param map Объект в котором ключ - искомая подстрока, а значение - строка для замены
 */
const replaceMany = (str: string, map: any): string => str.replace(
  new RegExp(Object.keys(map).join('|'), 'g'), 
  match => map[match]
);


export {
  replaceMany,
};
