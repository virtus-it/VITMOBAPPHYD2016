import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'localtimezone'
})
export class LocaltimezonePipe implements PipeTransform {

  transform(value: string): any {
    if (!value) {
      return '';
    }
    // const localtime = moment.utc(value).toDate();
    let localtime = moment(value).format("DD-MM-YYYY hh:mm A");
    return localtime;
  }

}
