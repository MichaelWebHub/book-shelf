import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../../_store';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: IBook[], search: string): IBook[] {
    if (array) {

      if (!search) {
        return array;
      }

      return array.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    }

    return [];
  }

}
