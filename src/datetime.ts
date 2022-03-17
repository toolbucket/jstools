import { replaceMany } from './string';

/**
 * Конвертирует дату в соответствии с форматом
 * @param value Дата для форматирования. Если передан не объект `Date` то будет выполнена попытка преобразовать значение
 * @param format Строка содержащая токены: `D M Y d m y H I S h i s`
 * @example 
 * simpleDateTimeFormat(new Date, 'D.M.Y') 
 * simpleDateTimeFormat(new Date, 'на D день')
 */
const simpleDateTimeFormat = (format: string, value?: string|number|Date ): string => {
  const date = value instanceof Date ? value : (value ? new Date(value) : new Date);

  const d = date.getDate();
  const m = date.getMonth() + 1;
  const Y = date.getFullYear();

  const D = d.toString().padStart(2, '0');
  const M = m.toString().padStart(2, '0');
  const y = Y.toString().substring(2);

  const h = date.getHours();
  const i = date.getMinutes();
  const s = date.getSeconds();

  const H = h.toString().padStart(2, '0');
  const I = i.toString().padStart(2, '0');
  const S = s.toString().padStart(2, '0');

  return replaceMany(format, { D, d, M, m, Y, y, H, h, I, i, S, s });
};


export {
  simpleDateTimeFormat,
};
