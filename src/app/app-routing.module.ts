import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksShelfComponent } from './books-shelf/books-shelf.component';
import { BooksDetailsComponent } from './books-details/books-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BooksShelfComponent,
    children: [
      {
        path: 'add',
        component: BooksDetailsComponent
      },
      {
        path: ':bookId',
        component: BooksDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
