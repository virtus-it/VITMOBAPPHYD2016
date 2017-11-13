import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-add-edit-customer-dailog',
  templateUrl: './add-edit-customer-dailog.component.html',
  styleUrls: ['./add-edit-customer-dailog.component.css']
})
export class AddEditCustomerDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private customerService: CustomerService, public thisDialogRef: MdDialogRef<AddEditCustomerDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetails: any, public dialog: MdDialog) { }
  customerInput: any = { "User": { "advamt": "0", "user_type": "customer", "state": null, "lastname": "", "emailid": null, "aliasname": "", "mobileno": "", "loginid": this.authenticationService.loggedInUserId(), "firstname": "", "city": null, "pincode": "", "address": "", "country": "", "apptype": this.authenticationService.appType() } };
  getCustomerDetails() {
    if (this.orderDetails.order_by) {
      let input = { userid: this.orderDetails.order_by, appType: this.authenticationService.appType() };
      this.customerService.getCustomerById(input)
        .subscribe(
        output => this.getCustomerDetailsResult(output),
        error => {
          console.log("error in distrbutors");
        });
    }

  }
  getCustomerDetailsResult(result) {
    console.log(result);
    if (result.result = 'success') {
      this.customerInput = {
        "User": {
          "advamt": "0"
          , "user_type": "customer", "aliasname": result.data.user.aliasname, "mobileno": result.data.user.mobileno, "state": result.data.user.state, "lastname": result.data.user.lastname, "emailid": result.data.user.emailid, "loginid": this.authenticationService.loggedInUserId(), "firstname": result.data.user.firstname, "city": result.data.user.city, "pincode": result.data.user.pincode, "country": result.data.user.country, "userid": result.data.user.userid, "address": result.data.user.address, "apptype": this.authenticationService.appType()
        }
      };
      if(result.data.user.payment && result.data.user.payment.advance_amount){
        this.customerInput.User.advamt = result.data.user.payment.advance_amount;
      }
     
    }
  }
  createUpdatecustomer() {
    
    if (this.customerInput.User.userid) {
      this.updateCustomer();
    }
    else {
      this.createCustomer();
    }

  }
  createCustomer() {
    let input = this.customerInput;
    this.customerService.createCustomer(input)
      .subscribe(
      output => this.createCustomerResult(output),
      error => {
        console.log("error in distrbutors");
      });
  }
  createCustomerResult(result) {
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }
  updateCustomer() {
    let input = this.customerInput;
    this.customerService.updateCustomer(input)
      .subscribe(
      output => this.updateCustomerResult(output),
      error => {
        console.log("error in distrbutors");
      });
  }
  updateCustomerResult(result) {
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
    // "userid":"1768"
    console.log(this.orderDetails);
    this.getCustomerDetails()
  }

}
