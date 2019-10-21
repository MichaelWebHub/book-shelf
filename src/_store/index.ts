import { IBooksStore } from './reducers/books.reducer';
import { IFilterStore } from './reducers/filters.reducer';

export interface IStore {
  books: IBooksStore;
  filters: IFilterStore;
}

/** Автор */
export interface IAuthor {
  name: string;
  surname: string;
}

/** Книга */
export interface IBook {
  id: string;
  image: string;
  title: string;
  isbn: string;
  authors: IAuthor[];
  published?: number;
  description?: string;
}
