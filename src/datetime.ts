import { replaceMany } from './string';

/**
 * Конвертирует дату в соответствии с форматом
 * @param value Дата для форматирования. Если передан не объект `Date` то будет выполнена попытка преобразовать значение
 * @param format Строка содержащая токены: `D M Y d m y`
 * @example 
 * simpleDateTimeFormat(new Date, 'D.M.Y') 
 * simpleDateTimeFormat(new Date, 'на D день')
 */
const simpleDateTimeFormat = (value: string|number|Date, format: string): string => {
  const date = value instanceof Date ? value : new Date(value);

  const d = date.getDate();
  const m = date.getMonth() + 1;
  const Y = date.getFullYear();

  const D = d.toString().padStart(2, '0');
  const M = m.toString().padStart(2, '0');
  const y = Y.toString().substring(2);

  return replaceMany(format, { D, d, M, m, Y, y });
};


export {
  simpleDateTimeFormat,
};
