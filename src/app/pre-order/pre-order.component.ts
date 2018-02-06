import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import{PreOrderCartDailogComponent}from '../pre-order-cart-dailog/pre-order-cart-dailog.component';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import * as _ from 'underscore';


@Component({
 
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService,  private customerService: CustomerService ) { }

  showFilterDailog = false;
  customerList : any=[];
  preOrderClickMore = true;
  customerListCopy: any =[];
  searchPreOrderTerm:any ="";
  preOrderInput : any =  { userId: this.authenticationService.loggedInUserId(), lastId: 0 , userType: this.authenticationService.userType(), appType: this.authenticationService.appType(),  };


  addPreorder(data){
    let dialogRefAddPreOrder = this.dialog.open(PreOrderCartDailogComponent, {
    width: '800px',
    data: data
    });
     dialogRefAddPreOrder.afterClosed().subscribe(result => {
     console.log(`Dialog closed: ${result}`); 
     if(result == 'success'){
       this.getCustomerList(true);

     }
     });
  }

  getCustomerList(firstCall) {
    this.loaderService.display(true);
    if (this.customerList && this.customerList.length && !firstCall) {
      let lastPreOrder: any = _.last(this.customerList);
      if (lastPreOrder) {
          this.preOrderInput.lastId = lastPreOrder.userid;
      }

  }
  else {
      this.customerList = [];
      this.preOrderInput.lastId = 0;
  }
    let input = this.preOrderInput;
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
    if (result.result == 'success') {

      this.preOrderClickMore = true;
      let finalpreOrder = _.union(this.customerList, result.data);
      this.customerList = finalpreOrder;
      this.customerListCopy = finalpreOrder;

  }
  else {
      this.preOrderClickMore = false;

  }
}

searchPreOrder(){
    let term = this.searchPreOrderTerm;
    if (term) {
      this.customerList = this.customerListCopy.filter(function (e) {
        if(e.firstname){
          return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
        }
       
      });
    }
    else {
      this.customerList = this.customerListCopy;
    }
  }

  showEditCustomer(data) {
    let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

        width: '700px',
        data: data
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if(result == "success"){
            this.getCustomerList(true);
        
        }

    });

}

  filterDailogToggle() {
    this.showFilterDailog = !this.showFilterDailog;
}
  ngOnInit() {
    this.getCustomerList(true);

  }


}
