import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../_store';
import { RemoveBookPending } from '../../../../_store/actions/books.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {

  @Input() id: string;

  constructor(private store: Store<IStore>,
              private router: Router) {
  }

  ngOnInit() {
  }

  /** Удаляем книгу */
  public removeBook(): void {
    this.store.dispatch(new RemoveBookPending(this.id));
  }

  /** Редактировать книгу */
  public editBook(): void {
    this.router.navigate(['books', this.id]);
  }

}
