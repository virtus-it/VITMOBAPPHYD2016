import { Pipe, PipeTransform } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {


  

  transform(value: any , args?: any): any {
    // return null;
    return value.sort(function(a,b){
      if(a[args.property] < b[args.property]){
        return -1 * args.direction;
      }
      else if(a[args.property] > b[args.property]){
        return 1 *args.direction;
      }
      else{
        return 0;
      }
    })
  }


  // transform(customerList: any[], firstname: string): any[] {
  //   customerList.sort((a: any, b: any) => {
  //     if (a[firstname] < b[firstname]) {
  //       return -1;
  //     } else if (a[firstname] > b[firstname]) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return customerList;
  // }

  // transform(customersSort : firstname[], path: string[], order: number): Cutomers[] {

  //   // Check if is not null
  //   if (!customersSort || !path || !order) return customersSort;

  //   return customersSort.sort((a: Cutomers, b: Cutomers) => {
  //     // We go for each property followed by path
  //     path.forEach(property => {
  //       a = a[property];
  //       b = b[property];
  //     })

  //     // Order * (-1): We change our order
  //     return a > b ? order : order * (- 1);
  //   })
  // }

}
