import { Pipe, PipeTransform } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';
import * as _ from 'underscore';


@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

    transform(array: Array<string>, args: string): Array<string> {
      array.sort((a: any, b: any) => {
        if (a.createddate < b.createddate) {
          return -1;
        } else if (a.createddate > b.createddate) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }




// return value.sort(function(a,b){
//   if(a[args.property] < b[args.property]){
//     return -1 * args.direction;
//   }
//   else if(a[args.property] > b[args.property]){
//     return 1 *args.direction;
//   }
//   else{
//     return 0;
//   }
// })