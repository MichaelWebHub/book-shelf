import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthor, IBook, IStore } from '../../_store';
import { Store } from '@ngrx/store';
import { AddBookPending, GetBookByIdPending, SetCurrentBook } from '../../_store/actions/books.actions';
import { Select } from 'ngrx-actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit, OnDestroy {

  /** Ссылка на обертку формы */
  @ViewChild('wrapper') wrapper: ElementRef;

  /** Массив авторов */
  authors: IAuthor[] = [{
    name: '',
    surname: ''
  }];

  /** Обложка книги */
  @ViewChild('file') file: ElementRef;

  /** Текущая книга */
  @Select('books.selection')
  book$: Observable<IBook>;

  /** Текщая обложка */
  cover: string;

  /** Данные загружены */
  dataLoaded = false;

  /** Контроллер подписок */
  public control$$: Subject<boolean> = new Subject<boolean>();

  /** Форма */
  public bookForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<IStore>,
              private fb: FormBuilder) {
  }

  ngOnInit() {


    /** Получаем книгу по id */
    if (this.route.snapshot.params.bookId) {
      this.store.dispatch(new GetBookByIdPending(this.route.snapshot.params.bookId));
    }

    this.book$.pipe(takeUntil(this.control$$)).subscribe(
      (book: IBook) => {
        this.dataLoaded = true;
        const authors = book && book.authors ? book.authors : this.authors;
        this.cover = (book && book.image) || '';

        this.bookForm = this.fb.group({
          id: [(book && book.id) || ''],
          image: [(book && book.image) || ''],
          title: [(book && book.title) || ''],
          isbn: [(book && book.isbn) || ''],
          published: [(book && book.published) || ''],
          authors: this.fb.array(authors.map(a => [
            this.fb.group({
              name: [a.name || ''],
              surname: [a.surname || ''],
            })
          ]))
        });

      }
    );

  }

  /** Вовращаемся на главную с анимацией */
  public goBack(): void {
    this.wrapper.nativeElement.classList.add('leave');
    setTimeout(() => {
      this.wrapper.nativeElement.classList.remove('leave');
      this.router.navigate(['../'], {
        relativeTo: this.route,
        queryParams: {
          p: localStorage.getItem('p') || 'title'
        }
      });

      /** Сбрасываем активную книгу */
      this.store.dispatch(new SetCurrentBook(''));
    }, 400);
  }

  /** Добавить автора */
  public addAuthor(): void {
    (this.bookForm.get('authors') as FormArray).controls.push(
      this.fb.control(this.fb.group({
        name: [''],
        surname: ['']
      }))
    );
  }

  /** Обработка картинки */
  private getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /** Сабмит формы */
  public onSubmit(): void {

    const authors: IAuthor[] = (this.bookForm.get('authors') as FormArray).controls.map(a => a.value.value);

    if (this.file.nativeElement.files[0]) {
      this.getBase64(this.file.nativeElement.files[0])
        .then(image => {
          this.updateBook(authors, image);
        })
        .catch(e => console.log(e));
    } else {
      this.updateBook(authors, this.cover);
    }


    this.goBack();
  }

  /** Диспатч */
  private updateBook = (authors: IAuthor[], image: string) => {
    this.store.dispatch(new AddBookPending({
      ...this.bookForm.value,
      authors,
      image,
    }));
  }

  ngOnDestroy(): void {
    this.control$$.next(true);
  }

}
