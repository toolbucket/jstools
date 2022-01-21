const starship = (a, b) => (a > b ? 1 : (a < b ? -1 : 0));

/**
 * Пайп для массива
 * @param {Array} source Исходный массив
 */
const ArrayPipe = (source = []) => ({
  _source:  source,
  _filters: [],
  _sorts:   [],



  /**
   * Добавляет новый фильтр в очередь фильтров
   * @param {Function} fn Фильтр
   */
  filter(fn) {
    this._filters.push(fn);
    return this;
  },

  /**
   * Добавляет те фильтры из массива `mapping`, проверка которых с параметром `target` совпадает
   * @param {any} target Цель для сравнения
   * @param {Array<Array<any, Function>>} mapping Массив содержащий пары [проверка, фильтр]
   * @param {Boolean} strict Строгая проверка
   */
  filterWhere(target, mapping, strict = true) {
    for (const [suspect, fn] of mapping) {
      if (strict ? target === suspect : target == suspect) {
        this.filter(fn);
      }
    }
    return this;
  },

  /**
   * Добавляет фильтр `fn` если условие правдиво и `else_fn` в противном случае
   * @param {any} when Условие
   * @param {Function} fn Фильтр, который применится при правдивом условии
   * @param {Function} else_fn Фильтр, который применится при ложном условии
   */
  filterWhen(when, fn, else_fn) {
    if (when) this.filter(fn);
    else if (!!else_fn) this.filter(else_fn);
    return this;
  },

  /**
   * Фильтр стандартного поиска
   * @param {String} target Строка по которой искать
   * @param {Function} fn Функция возвращающая строку в которой нужно произвести поиск
   */
  search(target, fn) {
    const search = target?.toLowerCase() ?? null;
    if (!!search) this.filter(item => fn(item)?.toLowerCase()?.includes(search));
    return this;
  },


  /**
   * Добавляет новую сортировку в очередь сортировок
   * @param {Function} fn Сортировка
   */
  sort(fn) {
    this._sorts.push(fn);
    return this;
  },

  /**
   * Сортирует по заданному полю или геттер-функции
   * @param {String|Function} by Наименование поля или геттер-функция значения
   * @param {Boolean} desc Сортировка в обратном порядке
   */
  sortBy(by, desc = false) {
    if (['string', 'function'].includes(typeof by)) this.sort(
      typeof by === 'string'
        ? (a, b) => starship((desc ? b : a)?.[by], (desc ? a : b)?.[by])
        : (a, b) => starship(by(desc ? b : a), by(desc ? a : b))
    );
    return this;
  },

  /**
   * Сортирует по заданному полю или результату функции в обратном порядке
   * @param {String|Function} by Наименование поля или функция-геттер для значения элемента
   */
  sortByDesc(by) {
    return this.sortBy(by, true);
  },



  /**
   * Устанавливает новый исходный массив
   * @param {Array} source Массив
   */
  source(source = []) {
    this._source = source;
    return this;
  },

  /**
   * Применяет фильтры к массиву
   * @param {Array} source Массив для модификации (если не указан то используется исходный массив)
   * @returns {Array} Модифицированный массив
   */
  applyFilters(source = null) {
    return this._filters.reduce(
      (heap, fn) => heap.filter(fn),
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
      (heap, fn) => heap.sort(fn),
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
