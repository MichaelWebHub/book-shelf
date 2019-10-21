import { Action, Store } from 'ngrx-actions';
import { SetSearchFilter, SetSortingParam } from '../actions/filters.actions';

export interface IFilterStore {
  searchString: string;
  sortingParam: string;
}

@Store({
  searchString: '',
  sortingParam: 'title'
})
export class FilterReducer {
  @Action(SetSearchFilter)
  setFilter(state: IFilterStore, action: SetSearchFilter) {
    state.searchString = action.str;
  }

  @Action(SetSortingParam)
  setSortingParam(state: IFilterStore, action: SetSortingParam) {
    state.sortingParam = action.str;
  }
}
