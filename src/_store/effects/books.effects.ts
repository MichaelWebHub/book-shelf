import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofAction } from 'ngrx-actions/dist';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  AddBookPending,
  AddBookSuccess, GetBookByIdPending, GetBookByIdSuccess,
  GetBooksPending,
  GetBooksSuccess,
  RemoveBookPending,
  RemoveBookSuccess
} from '../actions/books.actions';
import { addBook, getBookById, getBooks, removeBook } from '../services/books.services';
import { IBook } from '../index';

@Injectable({
  providedIn: 'root',
})


export class CommentsEffect {
  /** Эффект для получения книг */
  @Effect()
  getBooks$ = this.actions$
    .pipe(
      ofAction(GetBooksPending),
      switchMap(() => getBooks()
        .pipe(
          map((books: IBook[]) => new GetBooksSuccess(books)),
          catchError((e: Error) => of(e))
        )
      ));

  /** Эффект для получения книги по id */
  @Effect()
  getBookById$ = this.actions$
    .pipe(
      ofAction(GetBookByIdPending),
      switchMap((action: GetBookByIdPending) => getBookById(action.id)
        .pipe(
          map((book: IBook) => new GetBookByIdSuccess(book)),
          catchError((e: Error) => of(e))
        )
      ));

  /** Эффект для добавления книги */
  @Effect()
  addBook$ = this.actions$
    .pipe(
      ofAction(AddBookPending),
      switchMap((data: AddBookPending) => addBook(data.book)
        .pipe(
          map((book: IBook) => new AddBookSuccess(book)),
          catchError((e: Error) => of(e))
        )
      ));

  /** Эффект удаления книги */
  @Effect()
  removeBook$ = this.actions$
    .pipe(
      ofAction(RemoveBookPending),
      switchMap((data: RemoveBookPending) => removeBook(data.bookId)
        .pipe(
          map(() => new RemoveBookSuccess(data.bookId)),
          catchError((e: Error) => of(e))
        )
      ));

  // ----------------------------------------------------------------------------------------------------------------
  constructor(
    private actions$: Actions
  ) {
  }

}
