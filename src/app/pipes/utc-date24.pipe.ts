import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'utcDate24'
})
export class UtcDate24Pipe implements PipeTransform {

  transform(value: string): any {
    if (!value) {
      return '';
    }
    const localtime = moment.utc(value).toDate();
   let utc = moment(localtime).format("DD-MM-YYYY HH:MM");
    return utc;
  }

}




