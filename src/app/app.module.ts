import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgrxActionsModule } from 'ngrx-actions/dist';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BooksShelfComponent } from './books-shelf/books-shelf.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './books-shelf/book/book.component';
import { CommentsEffect } from '../_store/effects/books.effects';
import { BooksReducer } from '../_store/reducers/books.reducer';
import { BookMenuComponent } from './books-shelf/book/book-menu/book-menu.component';
import { SearchPipe } from './pipes/search.pipe';
import { FilterReducer } from '../_store/reducers/filters.reducer';
import { SortingPipe } from './pipes/sorting.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooksShelfComponent,
    BooksDetailsComponent,
    HeaderComponent,
    BookComponent,
    BookMenuComponent,
    SearchPipe,
    SortingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    NgrxActionsModule.forRoot({
      books: BooksReducer,
      filters: FilterReducer
    }),
    EffectsModule.forRoot([
      CommentsEffect
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
