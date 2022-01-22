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

/**
 * Возвращает наименование правильного склонения к числительному
 * 1 услуга
 * 2 услуги
 * 100 услуг
 * @example n = 12, titles = ['услуга', 'услуги', 'услуг'], return 'услуг'
 * @param n числительное
 * @param titles наименования соответствующие числительному
 */
 const pluralForm = (n: number, titles: Array<String>) => {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}



export {
  between,
  getUniqueArray,
  resetObject,
  pluralForm,
};