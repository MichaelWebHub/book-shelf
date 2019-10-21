import { IBook } from '../index';
import { of } from 'rxjs';

/** Получение книг */
export const getBooks = () => {
  const db: IBook[] = JSON.parse(localStorage.getItem('db'));
  return of(db);
};

/** Получение книги по id */
export const getBookById = (id: string) => {
  const db: IBook[] = JSON.parse(localStorage.getItem('db'));
  const book = db.find(b => b.id === id);
  return of(book);
};

/** Добавление книги */
export const addBook = (book: IBook) => {
  const db: IBook[] = JSON.parse(localStorage.getItem('db'));

  const indexes = db.map(b => b.id);
  const id = indexes.length > 0 ? `${+indexes[indexes.length - 1] + 1}` : '1';
  const index = indexes.indexOf(book.id || id);

  if (index >= 0) {
    db[index] = book;
  } else {
    db.push({ ...book, id: book.id || id });
  }

  localStorage.setItem('db', JSON.stringify(db));
  return of({ ...book, id: book.id || id });
};

/** Удаление книги */
export const removeBook = (id: string) => {
  const db: IBook[] = JSON.parse(localStorage.getItem('db'));
  const index = db.findIndex(b => b.id === id);

  if (index >= 0) {
    db.splice(index, 1);
  }

  localStorage.setItem('db', JSON.stringify(db));

  return of(db);
};
