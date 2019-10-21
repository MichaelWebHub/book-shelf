import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../../_store';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  /** Книга */
  @Input() book: IBook;

  constructor() {
  }

  ngOnInit() {
  }

}
