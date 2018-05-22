import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  

  constructor(public thisDialogRef: MdDialogRef<AddEditUserComponent> ,  private authenticationService: AuthenticationService , private customerService: CustomerService, private distributorService: DistributorServiceService, private supplierservice: SupplierService ) { }

emailFormControl = new FormControl('', [
    Validators.required]);
mobileFormControl = new FormControl('', [
    Validators.required]);
firstFormControl = new FormControl('', [
    Validators.required]);
lastFormControl = new FormControl('', [
    Validators.required]);
addressFormControl = new FormControl('', [
    Validators.required]);
dup:any = false;
messageError:any = "";
phoneFormControl = new FormControl('', [
    Validators.required]);
paymentDate: any ="";
paymentdueDate:any = "";
UserInput = {"usertype":"Customer"};
customerInput: any = { "User": { "advamt": "0", "registertype":"residential" ,  "mobileno_one":"" , "mobileno_two":"", "paymenttype":"cod", "user_type": "customer", "lastname": "", "emailid": null, "aliasname": "", "mobileno": "", "loginid": this.authenticationService.loggedInUserId(), "firstname": "","address": "",  "apptype": this.authenticationService.appType(),"dealer_mobileno":this.authenticationService.dealerNo() , "locality":"" , "buildingname":"" , "promocode":"" , "orderaddress":"" , "orderid":"" } }

dist = { firstName: "", lastName: "", phone: "", mobile1:"", mobile2:"",  companyname:"",address:"", emailid:"", referCode:"", selectedItems:[]};
areaList = [];
phone = false;
supplierInput = { firstname: "", mobileno: "", altmobileno: "", address: "", emailid:""};


  submitUser(){
   if(this.UserInput.usertype == 'Customer'){
    this.addCustomer();
    }
    else if(this.UserInput.usertype == 'Distributor'){
      this.addDistributor();
    }
    else if(this.UserInput.usertype == 'Supplier'){
      this.addSupplier();
    }
    else if(this.UserInput.usertype == 'Sales'){
      this.addSales();
    }
    else if(this.UserInput.usertype == 'Manufacturer'){
      this.addManufacturer();
    }

}



  addCustomer() {
    if(this.validation1() && this.validation2() && this.validation3()){
    let input = this.customerInput;
    input.User.pwd =  this.customerInput.User.mobileno;
    input.User.TransType = "create";
    input.User.paymentday= this.paymentDate;
    input.User.billpaymentdueday= this.paymentdueDate;
    //console.log(input);
    this.dup = true;
    if(this.dup == true){
    this.customerService.createCustomer(input)
      .subscribe(
      output => this.createCustomerResult(output),
      error => {
      });
  }
}
}
  createCustomerResult(result) {
    //console.log(result);
    if(result.result == 'success'){

      this.thisDialogRef.close('success');
      this.dup = false;
    }
  }



  validation1(){
    if(this.customerInput.User.firstname.length > 0){
      this.messageError = '';
      return true;
    }
    else{
      this.messageError="Please enter customers first name";
    }
  }

  validation2(){
    if(this.customerInput.User.mobileno.length > 0 && this.customerInput.User.mobileno.length == 10){
      this.messageError = '';
      return true;
    }
    else{
      this.messageError="Please enter customers phone number";
    }
  }


  validation3(){
    if(this.customerInput.User.address.length > 0){
      this.messageError = "";
      return true;
    }
    else{
      this.messageError = "Please enter address of customer";
      
    }
  }



  addDistributor() {
    var input:any = {"User": {
           "pwd":this.dist.phone,"user_type": "dealer", "TransType": "create","referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "mobileno_one":this.dist.mobile1, "mobileno_two":this.dist.mobile2,  "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()
        }
    }
  this.distributorService.createDistributor(input)
            .subscribe(
            output => this.onSubmitResult(output),
            error => {
                //console.log("error in distrbutors");

            });
    
}
onSubmitResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
   
      
       
    }
}



  addSupplier() {

    let input: any = { "User": { "user_type": "supplier", "TransType": "create", "firstname": this.supplierInput.firstname, "gender": "Male", "pwd": this.supplierInput.mobileno, "address":this.supplierInput.address,  "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.supplierInput.mobileno,  "emailid":this.supplierInput.emailid, "altmobileno": this.supplierInput.altmobileno, "issuppersupplier": false, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() } };
    //console.log(input);
    this.supplierservice.createSupplier(input)
      .subscribe(
      output => this.submitSupplierResult(output),
      error => {
        //console.log("error in supplier");
      });
  }
  submitSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {

      this.thisDialogRef.close('success');
    }

  }

  addSales(){

  }

  addManufacturer(){
    
  }






  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
  }

}
