import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBook, IStore } from '../../_store';
import { GetBooksPending } from '../../_store/actions/books.actions';
import { Select } from 'ngrx-actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.scss']
})
export class BooksShelfComponent implements OnInit, OnDestroy {

  /** Список всех встреч */
  @Select('books.collection')
  books$: Observable<IBook[]>;

  /** Строка фильтрации */
  @Select('filters.searchString')
  str$: Observable<string>;
  str: string;

  /** Параметр для сортировки */
  @Select('filters.sortingParam')
  param$: Observable<string>;

  /** Контроллер подписок */
  public control$$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<IStore>) {
  }

  ngOnInit() {
    /** Получаем список книг */
    this.store.dispatch(new GetBooksPending());

    /** Подписываемся на строку поиска */
    this.str$.pipe(takeUntil(this.control$$)).subscribe(s => this.str = s);
  }

  /** Отписываемся */
  ngOnDestroy(): void {
    this.control$$.next(true);
  }

}
