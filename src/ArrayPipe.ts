import { starship } from "./function";



/**
 * Пайп для массива
 * @param source Исходный массив
 */
class ArrayPipeInterface {
  protected _source:  Array<any>;
  protected _filters: Array<Function>;
  protected _sorts:   Array<Function>;

  constructor(source: Array<any> = [])
  {
    this._source  = source;
    this._filters = [];
    this._sorts   = [];
  }



  /**
   * Добавляет новый фильтр в очередь фильтров
   * @param fn Фильтр
   */
  public filter(fn: Function): this 
  {
    this._filters.push(fn);
    return this;
  }

  /**
   * Добавляет те фильтры из массива `mapping`, проверка которых с параметром `target` совпадает
   * @param target Цель для сравнения
   * @param mapping Массив содержащий пары [проверка, фильтр]
   * @param strict Строгая проверка
   */
  filterWhere(target: any, mapping: Array<Array<any|Function>>, strict = true): this 
  {
    for (const [suspect, fn] of mapping) {
      if (strict ? target === suspect : target == suspect) {
        this.filter(fn);
      }
    }
    return this;
  }

  /**
   * Добавляет фильтр `fn` если условие правдиво и `else_fn` в противном случае
   * @param when Условие
   * @param fn Фильтр, который применится при правдивом условии
   * @param else_fn Фильтр, который применится при ложном условии
   */
  filterWhen(when: any, fn: Function, else_fn: Function): this 
  {
    if (when) this.filter(fn);
    else if (!!else_fn) this.filter(else_fn);
    return this;
  }

  /**
   * Фильтр стандартного поиска
   * @param target Строка по которой искать
   * @param fn Функция возвращающая строку в которой нужно произвести поиск
   */
  search(target: String, fn: Function): this 
  {
    const search = target?.toLowerCase() ?? null;
    if (!!search) this.filter((item: any) => fn(item)?.toLowerCase()?.includes(search));
    return this;
  }



  /**
   * Добавляет новую сортировку в очередь сортировок
   * @param fn Сортировка
   */
  sort(fn: Function): this
  {
    this._sorts.push(fn);
    return this;
  }

  /**
   * Сортирует по заданному полю или геттер-функции
   * @param by Наименование поля или геттер-функция значения
   * @param desc Сортировка в обратном порядке
   */
  sortBy(by: String|Function, desc: Boolean = false): this
  {
    if (typeof by === 'string' || typeof by === 'function') this.sort(
      typeof by === 'string'
        ? (a: any, b: any) => starship((desc ? b : a)?.[by], (desc ? a : b)?.[by])
        : (a: any, b: any) => starship(by(desc ? b : a), by(desc ? a : b))
    );
    return this;
  }
  
  /**
   * Сортирует по заданному полю или результату функции в обратном порядке
   * @param by Наименование поля или функция-геттер для значения элемента
   */
  sortByDesc(by: String|Function): this
  {
    return this.sortBy(by, true);
  }

  /**
   * Добавляет те сортировки из массива `mapping`, проверка которых с параметром `target` совпадает
   * @param target Цель для сравнения
   * @param mapping Массив содержащий пары [проверка, сортировка]
   * @param strict Строгая проверка
   */
  sortWhere(target: any, mapping: Array<Array<any|Function>>, strict = true) 
  {
    for (const [suspect, fn] of mapping) {
      if (strict ? target === suspect : target == suspect) {
        this.sort(fn);
      }
    }
    return this;
  }

  /**
   * Добавляет сортировку `fn` если условие правдиво и `else_fn` в противном случае
   * @param when Условие
   * @param fn Сортировка, которая применится при правдивом условии
   * @param else_fn Сортировка, которая применится при ложном условии
   */
  sortWhen(when: any, fn: Function, else_fn: Function): this 
  {
    if (when) this.sort(fn);
    else if (!!else_fn) this.sort(else_fn);
    return this;
  }

  /**
   * Добавляет сортировку `fn` если условие правдиво и `else_fn` в противном случае
   * @param when Условие
   * @param fn Сортировка, которая применится при правдивом условии
   * @param else_fn Сортировка, которая применится при ложном условии
   */
  sortByWhen(when: any, fn: Function, else_fn: Function): this 
  {
    if (when) this.sortBy(fn);
    else if (!!else_fn) this.sortBy(else_fn);
    return this;
  }

  /**
   * Добавляет сортировку `fn` если условие правдиво и `else_fn` в противном случае
   * @param when Условие
   * @param fn Сортировка, которая применится при правдивом условии
   * @param else_fn Сортировка, которая применится при ложном условии
   */
  sortByDescWhen(when: any, fn: Function, else_fn: Function): this 
  {
    if (when) this.sortByDesc(fn);
    else if (!!else_fn) this.sortByDesc(else_fn);
    return this;
  }



  /**
   * Устанавливает новый исходный массив
   * @param source Новый исходный массив
   */
  source(source: Array<any> = []): this
  {
    this._source = source;
    return this;
  }

  /**
   * Применяет фильтры к массиву
   * @param source Массив для модификации (если не указан то используется исходный массив)
   * @returns Модифицированный массив
   */
  protected applyFilters(source: undefined|Array<any> = undefined): Array<any>
  {
    return this._filters.reduce(
      (heap, fn:any) => heap.filter(fn),
      source ?? this._source
    );
  }
  
  /**
   * Применяет сортировки к массиву
   * @param source Массив для модификации (если не указан то используется исходный массив)
   * @returns Модифицированный массив
   */
  protected applySorts(source: undefined|Array<any> = undefined): Array<any>
  {
    return this._sorts.reduce(
      (heap, fn:any) => heap.sort(fn),
      source ?? this._source
    );
  }

  /**
   * Модифицирует исходный массив
   * @returns Модифицированный исходный массив
   */
  public passthrough(): Array<any>
  {
    return this.applySorts(
      this.applyFilters()
    );
  }
}

/**
 * Создает объект ArrayPipeInterface
 * @param source Исходный массив
 * @returns Пайп для массива
 */
const ArrayPipe = (source: Array<any> = []) : ArrayPipeInterface => new ArrayPipeInterface(source);


export {
  ArrayPipe,
};
