import { IBook } from '../index';

/** ******************************************************************************************************** */

export class GetBooksPending {
  public readonly type = `[Pending] Получение книг`;
}

export class GetBooksSuccess {
  public readonly type = `[Success] Получение книг`;

  public constructor(public books: IBook[]) {
  }
}

/** ******************************************************************************************************** */

export class GetBookByIdPending {
  public readonly type = `[Pending] Получение книги по id`;

  constructor(public id: string) {
  }
}

export class GetBookByIdSuccess {
  public readonly type = `[Success] Получение книги по id`;

  public constructor(public book: IBook) {
  }
}

/** ******************************************************************************************************** */

export class AddBookPending {
  public readonly type = `[Pending] Добавление книги`;

  public constructor(public book: IBook) {
  }
}

export class AddBookSuccess {
  public readonly type = `[Success] Добавление книги`;

  public constructor(public book: IBook) {
  }
}

/** ******************************************************************************************************** */

export class RemoveBookPending {
  public readonly type = `[Pending] Удаление книги`;

  public constructor(public bookId: string) {
  }
}

export class RemoveBookSuccess {
  public readonly type = `[Success] Удаление книги`;

  public constructor(public bookId: string) {
  }
}

/** ******************************************************************************************************** */

export class SetCurrentBook {
  public readonly type = `[Set] Устанавливаем текущую книги`;

  public constructor(public bookId: string) {
  }
}
