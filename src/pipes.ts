import { starship } from "./core";

/**
 * Пайп для массива
 * @param {Array} source Исходный массив
 */
const ArrayPipe = (source: Array<any> = []) : ArrayPipeObject => ({
  _source:  source,
  _filters: [],
  _sorts:   [],



  /**
   * Добавляет новый фильтр в очередь фильтров
   * @param {Function} fn Фильтр
   */
  filter(fn: Function) {
    this._filters.push(fn);
    return this;
  },

  /**
   * Применяет фильтры к массиву
   * @param {Array} source Массив для модификации (если не указан то используется исходный массив)
   * @returns {Array} Модифицированный массив
   */
  applyFilters(source = null) {
    return this._filters.reduce(
      (heap, fn:any) => heap.filter(fn),
      source ?? this._source
    );
  },
  
  /**
   * Применяет сортировки к массиву
   * @param {Array} source Массив для модификации (если не указан то используется исходный массив)
   * @returns {Array} Модифицированный массив
   */
  applySorts(source = null) {
    return this._sorts.reduce(
      (heap, fn:any) => heap.sort(fn),
      source ?? this._source
    );
  },



  /**
   * Модифицирует исходный массив
   * @returns {Array} Модифицированный исходный массив
   */
  passthrough() {
    return (() =>
      this.applySorts(
        this.applyFilters()
      )
    )();
  },
});



export {
  ArrayPipe,
};
