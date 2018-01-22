import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import{PreOrderCartDailogComponent}from '../pre-order-cart-dailog/pre-order-cart-dailog.component';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';


@Component({
 
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService,  private customerService: CustomerService ) { }

  showFilterDailog = false;
  customerList:any =[];


  addPreorder(){
    let dialogRefAddPreOrder = this.dialog.open(PreOrderCartDailogComponent, {
    width: '800px',
    data: ''
    });
     dialogRefAddPreOrder.afterClosed().subscribe(result => {
     console.log(`Dialog closed: ${result}`); 
     });
  }

  getCustomerList() {
    this.loaderService.display(true);
    let input = { userId: this.authenticationService.loggedInUserId(), lastId: 0, userType: this.authenticationService.userType(), appType: this.authenticationService.appType() };
    console.log(input);
    this.customerService.getCustomerList(input)
        .subscribe(
        output => this.getCustomerListResult(output),
        error => {
            console.log("error in customer");
            this.loaderService.display(false);
        });
}
getCustomerListResult(result) {
    console.log(result);
    this.loaderService.display(false);
    this.customerList= result.data;

}

  filterDailogToggle() {
    this.showFilterDailog = !this.showFilterDailog;
}
  ngOnInit() {
    this.getCustomerList();
    
  }


}
