import { starship } from "./core";



/**
 * Пайп для массива
 * @param {Array} source Исходный массив
 */
class ArrayPipeInterface {
  _source:  Array<any>;
  _filters: Array<Function>;
  _sorts:   Array<Function>;

  constructor(source: Array<any> = [])
  {
    this._source  = source;
    this._filters = [];
    this._sorts   = [];
  }



  /**
   * Добавляет новый фильтр в очередь фильтров
   * @param {Function} fn Фильтр
   */
  public filter(fn: Function) : this 
  {
    this._filters.push(fn);
    return this;
  }

  /**
   * Добавляет новую сортировку в очередь сортировок
   * @param {Function} fn Сортировка
   */
  public sort(fn: Function) : this
  {
    this._sorts.push(fn);
    return this;
  }



  /**
   * Применяет фильтры к массиву
   * @param {Array} source Массив для модификации (если не указан то используется исходный массив)
   * @returns {Array} Модифицированный массив
   */
  protected applyFilters(source: undefined|Array<any> = undefined) : Array<any>
  {
    return this._filters.reduce(
      (heap, fn:any) => heap.filter(fn),
      source ?? this._source
    );
  }
  
  /**
   * Применяет сортировки к массиву
   * @param {Array} source Массив для модификации (если не указан то используется исходный массив)
   * @returns {Array} Модифицированный массив
   */
  protected applySorts(source: undefined|Array<any> = undefined) : Array<any>
  {
    return this._sorts.reduce(
      (heap, fn:any) => heap.sort(fn),
      source ?? this._source
    );
  }



  /**
   * Модифицирует исходный массив
   * @returns {Array} Модифицированный исходный массив
   */
  public passthrough() : Array<any>
  {
    return this.applySorts(
      this.applyFilters()
    );
  }
}


const ArrayPipe = (source: Array<any> = []) : ArrayPipeInterface => new ArrayPipeInterface(source);


export {
  ArrayPipe,
};
