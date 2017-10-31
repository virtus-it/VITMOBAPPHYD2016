import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'utcDate'
})
export class UtcDatePipe implements PipeTransform {

  transform(value: string): any {
    if (!value) {
      return '';
    }
    const localtime = moment.utc(value).toDate();
   let utc = moment(localtime).format();
    return utc;
  }

}
