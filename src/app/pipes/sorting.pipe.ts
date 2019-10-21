import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../../_store';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(array: IBook[], param: string): IBook[] {
    if (array) {

      return array.sort((a: IBook, b: IBook) => {

        if (param === 'title') {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          } else {
            return 0;
          }
        }

        if (param === 'published') {
          if (a.published && b.published) {
            return a.published - b.published;
          }

          return 1;
        }

      });

    }

    return [];
  }

}
