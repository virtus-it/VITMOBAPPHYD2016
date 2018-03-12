import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import{PreOrderCartDailogComponent}from '../pre-order-cart-dailog/pre-order-cart-dailog.component';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import * as _ from 'underscore';
import * as moment from 'moment';


@Component({
 
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService,  private customerService: CustomerService ) { }

  showFilterDailog = false;
  customerList : any=[];
  customerClickMore = true;
  preOrderClickMore = true;
  customerListCopy: any =[];
  followUpdate = null;
  filterRecords = false;
  searchPreOrderTerm:any ="";
  preOrderInput : any =  { userId: this.authenticationService.loggedInUserId(), lastId: 0 , userType: this.authenticationService.userType(), appType: this.authenticationService.appType(),  };

  filterInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtype": "", "searchtext": "", "lastcustomerid": "0", "pagesize": "50", "apptype": this.authenticationService.appType() } };
  FilterTypeDetails = [
      { value: 'alias', viewValue: 'Alias' },
      { value: 'name', viewValue: 'Name' },
      { value: 'mobile', viewValue: 'Mobile' },
      { value: 'address' , viewValue: 'Address'},
      { value:'paymenttype', viewValue:'Payment Mode'},
      {value: 'customertype' , viewValue:'Customer Type'},
      { value: 'followupdate', viewValue: 'Followup Date' }
  ];


  addPreorder(data){
    let dialogRefAddPreOrder = this.dialog.open(PreOrderCartDailogComponent, {
    width: '80%',
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

// searchPreOrder(){
//     let term = this.searchPreOrderTerm;
//     if (term) {
//       this.customerList = this.customerListCopy.filter(function (e) {
//         if(e.firstname){
//           return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
//         }
       
//       });
//     }
//     else {
//       this.customerList = this.customerListCopy;
//     }
//   }

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

onChangeType() {
  this.filterInput.root.searchtext = "";
}
getCustomerByFilter(firstcall) {
       
        
        
  if (this.filterInput.root.searchtype == 'followupdate') {
      this.filterInput.root.searchtext = moment(this.followUpdate).format('YYYY-MM-DD HH:MM:SS');

  }

  let input = this.filterInput;
  if (this.customerList && this.customerList.length && !firstcall) {
      let lastCustomer: any = _.last(this.customerList);
      if (lastCustomer) {
          input.root.lastcustomerid = lastCustomer.userid;
      }

  }
  else {
      this.customerList = [];
      input.root.lastcustomerid = "0";
  }
  this.customerService.searchCustomer(input)
      .subscribe(
      output => this.getCustomerByFilterResult(output),
      error => {
          console.log("error in customer");
          this.loaderService.display(false);
      });
}
getCustomerByFilterResult(result) {
  console.log(result);
  if (result.result == 'success') {
      this.filterRecords = true;
      this.customerList = _.union(this.customerList, result.data);
  }
  else {
    this.preOrderClickMore = false;
  }

}
getcustomerByPaging() {
  if (this.filterRecords) {
      this.getCustomerByFilter(false);
  }
  else {
      this.getCustomerList(false);
  }

}

clearFilter() {
    this.showFilterDailog =false;
    this.filterRecords = false;
    this.followUpdate = null;
    this.filterInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtype": "", "searchtext": "", "lastcustomerid": "0", "pagesize": "50", "apptype": this.authenticationService.appType() } };
    this.getCustomerList(true);
  
  }

  ngOnInit() {
    this.getcustomerByPaging();
    

  }


}
