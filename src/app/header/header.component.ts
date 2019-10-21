import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStore } from '../../_store';
import { Store } from '@ngrx/store';
import { SetSearchFilter, SetSortingParam } from '../../_store/actions/filters.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** Поле ввода */
  @ViewChild('input') input: ElementRef;

  /** Кнопки */
  public buttons = [
    {
      id: 'title',
      label: 'Sort by name'
    },
    {
      id: 'published',
      label: 'Sort by year'
    }
  ];

  /** Активная кнопка */
  activeButton: string;


  constructor(private store: Store<IStore>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    /** Устанавливаем активную кнопку */
    if (this.route.snapshot.queryParams.p) {
      this.activeButton = this.route.snapshot.queryParams.p;
    } else {
      this.activeButton = this.buttons[0].id;
      this.navigate(this.activeButton);
    }

    localStorage.setItem('p', this.activeButton);
  }

  /** Фильтруем список книг */
  public onChange(input: HTMLInputElement): void {
    this.store.dispatch(new SetSearchFilter(input.value));
  }

  /** Сортировка */
  public sort(id: string) {
    this.activeButton = id;
    this.navigate(id);
    this.store.dispatch(new SetSortingParam(id));
  }

  /** Переход на роут с параметром */
  private navigate = (id: string) => {
    localStorage.setItem('p', id);

    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: {
          p: id
        }
      });
  };

}
