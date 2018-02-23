import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { Input } from '@angular/core/src/metadata/directives';
@Component({
  selector: 'app-add-edit-customer-dailog',
  templateUrl: './add-edit-customer-dailog.component.html',
  styleUrls: ['./add-edit-customer-dailog.component.css']
})
export class AddEditCustomerDailogComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private customerService: CustomerService, public thisDialogRef: MdDialogRef<AddEditCustomerDailogComponent>, @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog,private loaderService: LoaderService) { 
    
  }

  emailFormControl = new FormControl('', [
    Validators.required]);
   

  customerInput: any = { "User": { "advamt": "0", "registertype":"residential" ,  "mobileno_one":"" , "mobileno_two":"", "paymenttype":"cod", "user_type": "customer", "lastname": "", "emailid": null, "aliasname": "", "mobileno": "", "loginid": this.authenticationService.loggedInUserId(), "firstname": "","address": "",  "apptype": this.authenticationService.appType(),"dealer_mobileno":this.authenticationService.dealerNo() } };

  paymentDate: any ="";
  paymentdueDate:any = "";
  headerValue="Add Customer";
  message:any ="";


  getCustomerDetails() {
  console.log(this.Details);
  this.loaderService.display(true);

    if(this.Details){
      // this.customerInput.User.mobileno_one= this.Details.mobileno_one;
      // this.customerInput.User.mobileno_two= this.Details.mobileno_two;
      this.headerValue ="Edit Customer";
    let input = { userid: 0, appType: this.authenticationService.appType() };
    if (this.Details.order_by) {
      input = { userid: this.Details.order_by, appType: this.authenticationService.appType() };
    }
    else if(this.Details.userid){
      input = { userid: this.Details.userid, appType: this.authenticationService.appType() };

    }
      this.customerService.getCustomerById(input)
        .subscribe(
        output => this.getCustomerDetailsResult(output),
        error => {
          console.log("error in distrbutors");
          this.loaderService.display(false);
        });
    
      }
  }
  getCustomerDetailsResult(result) {
    console.log(result);
    this.loaderService.display(false);
    if (result.result = 'success') {
      this.customerInput = {
        "User": {
          "advamt": "0"
          , "user_type": "customer", "aliasname": result.data.user.aliasname, "mobileno": result.data.user.mobileno,  "state": result.data.user.state, "lastname": result.data.user.lastname,  "mobileno_one":  result.data.user.mobileno_one , "mobileno_two": result.data.user.mobileno_two, "emailid": result.data.user.emailid, "loginid": this.authenticationService.loggedInUserId(), "firstname": result.data.user.firstname, "userid": result.data.user.userid, "address": result.data.user.address,  "paymenttype": result.data.user.paymenttype, "registertype":result.data.user.registertype, "apptype": this.authenticationService.appType()
        }
      };
      if(result.data.user.payment && result.data.user.payment.days){
        this.paymentDate = result.data.user.payment.days;
        this.paymentdueDate = result.data.user.payment.billpaymentdueday;
      } 
      if(result.data.user.payment && result.data.user.payment.advance_amount){
        this.customerInput.User.advamt = result.data.user.payment.advance_amount;
      }
      if(result.data.user.payment && result.data.user.payment.paymenttype){
        this.customerInput.User.paymenttype = result.data.user.payment.paymenttype;
      }

     
    } 
  }
  createUpdatecustomer() {
    if(this.valid()){
    if (this.customerInput.User.userid) {
      this.updateCustomer();
    }
    else {
      this.createCustomer();
    }
    
  }




  }
  createCustomer() {

    let input = this.customerInput;
    this.loaderService.display(true);
    input.User.pwd =  this.customerInput.User.mobileno;
    input.User.TransType = "create";
    input.User.paymentday= this.paymentDate;
    input.User.billpaymentdueday= this.paymentdueDate;
    console.log(input);
    this.customerService.createCustomer(input)
      .subscribe(
      output => this.createCustomerResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  createCustomerResult(result) {
    console.log(result);
    this.loaderService.display(false);
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }
  updateCustomer() {
    this.loaderService.display(true);
    let input = this.customerInput;
    input.User.paymentday= this.paymentDate;
    input.User.billpaymentdueday= this.paymentdueDate;
    console.log(input);
    this.customerService.updateCustomer(input)
      .subscribe(
      output => this.updateCustomerResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  updateCustomerResult(result) {
    console.log(result);
    this.loaderService.display(false);
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
    // "userid":"1768"
    console.log(this.Details);
    this.getCustomerDetails();
  }

  // validation(){
  //   if(this.customerInput.User.paymenttype=='credit' && !this.paymentDate && !this.paymentdueDate){
  //     this.message="Please set date and due date fields";
  //     return false;
  // }
  // else{
  //   this.message="";
  //   return true;
  // }
   
  // }

  valid(){
    if(this.customerInput.User.paymenttype=='credit'){
      if(!this.paymentDate){
        this.message="please set date field";
        return false;
      }
      else if(!this.paymentdueDate){
        this.message="please set due date field";
        return false;
      }
      else{
        this.message="";
        return true;

      }
        
      }
      else{
        this.message="";
        return true;
      }
    }
  }
  // ngAfterViewInit() {
  //   this.cdr.detectChanges();
  // }






// working old 1 
// createUpdatecustomer() {
//   if(this.validation()){
//   if (this.customerInput.User.userid) {
//     this.updateCustomer();
//   }
//   else {
//     this.createCustomer();
//   }
// }
// else{
//   this.message="Please set date and due date fields";
// }

// }