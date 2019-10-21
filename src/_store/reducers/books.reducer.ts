import { Action, Store } from 'ngrx-actions';
import { IBook } from '../index';
import { AddBookSuccess, GetBookByIdSuccess, GetBooksSuccess, RemoveBookSuccess, SetCurrentBook } from '../actions/books.actions';

export interface IBooksStore {
  collection: IBook[];
  selection: IBook | undefined;
}

@Store({
  collection: [],
  selection: undefined,
})
export class BooksReducer {
  @Action(GetBooksSuccess)
  getBooks(state: IBooksStore, action: GetBooksSuccess) {
    state.collection = action.books;
  }

  @Action(GetBookByIdSuccess)
  getBookById(state: IBooksStore, action: GetBookByIdSuccess) {
    state.selection = action.book;
  }

  @Action(AddBookSuccess)
  addBook(state: IBooksStore, action: AddBookSuccess) {
    const index = state.collection.findIndex(b => b.id === action.book.id);

    if (index >= 0) {
      state.collection[index] = action.book;
    } else {
      state.collection.push(action.book);
    }
  }

  @Action(RemoveBookSuccess)
  removeBook(state: IBooksStore, action: RemoveBookSuccess) {
    const collection = [...state.collection];
    const index = collection.map(b => b.id).findIndex(i => i === action.bookId);

    if (index >= 0) {
      collection.splice(index, 1);
    }

    return {
      ...state,
      collection
    };
  }

  @Action(SetCurrentBook)
  setCurrentBook(state: IBooksStore, action: SetCurrentBook) {
    if (!action.bookId) {
      state.selection = undefined;
    }
  }
}
