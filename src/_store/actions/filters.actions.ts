/** ******************************************************************************************************** */

export class SetSearchFilter {
  public readonly type = `[Set] Поиск по названию`;

  public constructor(public str: string) {
  }
}

/** ******************************************************************************************************** */

export class SetSortingParam {
  public readonly type = `[Set] Устанавливаем параметр сортировки`;

  public constructor(public str: string) {
  }
}
