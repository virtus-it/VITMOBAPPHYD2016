import { Component, OnInit  , Inject} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SupplierService } from '../supplier/supplier.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  

  constructor(public thisDialogRef: MdDialogRef<AddEditUserComponent> ,  private authenticationService: AuthenticationService , private customerService: CustomerService, private distributorService: DistributorServiceService, private supplierservice: SupplierService ,  @Inject(MD_DIALOG_DATA) public Details: any) { }

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

customerInput: any = { "User": { "advamt": "0", "registertype":"residential" ,  "mobileno_one":"" , "mobileno_two":"", "paymenttype":"cod", "user_type": "customer", "lastname": "", "emailid": null, "aliasname": "", "mobileno": "", "loginid": this.authenticationService.loggedInUserId(), "firstname": "","address": "",  "apptype": this.authenticationService.appType(),"dealer_mobileno":this.authenticationService.dealerNo() , "locality":"" , "buildingname":"" , "promocode":"" } }

dist = { firstName: "", lastName: "", phone: "", mobile1:"", mobile2:"",  companyname:"",address:"", emailid:"", referCode:"" };

salesInput = { firstName: "", lastName: "", phone: "", mobile1:"", mobile2:"",  companyname:"",address:"", emailid:"", referCode:"" };

manufacturerInput =  { firstName: "", lastName: "", phone: "", mobile1:"", mobile2:"",  companyname:"",address:"", emailid:"", referCode:"" };

areaList = [];
phone = false;
supplierInput = { firstname: "", mobileno: "", altmobileno: "", address: "", emailid:""};

headerValue:any  = "Add User";


//   submitUser(){

    
//    if(this.UserInput.usertype == 'Customer'){
//     this.addCustomer();
//     }
//     else if(this.UserInput.usertype == 'Distributor'){
//       this.addDistributor();
//     }
//     else if(this.UserInput.usertype == 'Supplier'){
//       this.addSupplier();
//     }
//     else if(this.UserInput.usertype == 'Sales'){
//       this.addSalesUser();
//     }
//     else if(this.UserInput.usertype == 'Manufacturer'){
//       this.addManufacturer();
//     }

// }


createOrUpdateUser(){
  if(this.Details){
  
    if(this.UserInput.usertype == 'Customer'){
      this.UpdateCustomer();
      }
      else if(this.UserInput.usertype == 'Distributor'){
        this.UpdateDistributor();
      }
      else if(this.UserInput.usertype == 'Supplier'){
        this.UpdateSupplier();
      }
      else if(this.UserInput.usertype == 'Sales'){
        this.UpdateSalesUser();
      }
      else if(this.UserInput.usertype == 'Manufacturer'){
        this.UpdateManufacturer();
      }
  }
  else{
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
        this.addSalesUser();
      }
      else if(this.UserInput.usertype == 'Manufacturer'){
        this.addManufacturer();
      }
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
    if( this.customerInput.User.firstname && this.customerInput.User.firstname.length > 0){
      this.messageError = '';
      return true;
    }
    else{
      this.messageError="Please enter customers first name";
    }
  }

  validation2(){
    if( this.customerInput.User.mobileno && this.customerInput.User.mobileno.length > 0 && this.customerInput.User.mobileno.length == 10){
      this.messageError = '';
      return true;
    }
    else{
      this.messageError="Please enter customers phone number";
    }
  }


  validation3(){
    if(this.customerInput.User.address && this.customerInput.User.address.length > 0){
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

    let input: any = { "User": { "user_type": "supplier", "TransType": "create", "firstname": this.supplierInput.firstname, "gender": "Male", "pwd": this.supplierInput.mobileno, "address":this.supplierInput.address,  "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.supplierInput.mobileno,  "emailid":this.supplierInput.emailid, "mobileno_one": this.supplierInput.altmobileno, "issuppersupplier": false, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() } };
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

    addSalesUser(){
    let input = {"User": {
      "pwd":this.salesInput.phone,"user_type": "sales", "TransType": "create","referCode": this.salesInput.referCode ,"firstname": this.salesInput.firstName,  "lastname": this.salesInput.lastName, "companyname":this.salesInput.companyname,"address":this.salesInput.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.salesInput.phone, "mobileno_one":this.salesInput.mobile1, "mobileno_two":this.salesInput.mobile2,  "emailid": this.salesInput.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()
   }
};
    this.distributorService.createDistributor(input)
            .subscribe(
            output => this.addSalesUserResult(output),
            error => {
                //console.log("error in distrbutors");
            });

  }
  addSalesUserResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');

    }

  }


  addManufacturer(){
    let input = {"User": {
      "pwd":this.manufacturerInput.phone,"user_type": "manufacturer", "TransType": "create","referCode": this.manufacturerInput.referCode ,"firstname": this.manufacturerInput.firstName,  "lastname": this.manufacturerInput.lastName, "companyname":this.manufacturerInput.companyname,"address":this.manufacturerInput.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.manufacturerInput.phone, "mobileno_one":this.manufacturerInput.mobile1, "mobileno_two":this.manufacturerInput.mobile2,  "emailid": this.manufacturerInput.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()
   }
};
    this.distributorService.createDistributor(input)
            .subscribe(
            output => this.addManufacturerResult(output),
            error => {
                //console.log("error in distrbutors");
            });
  }
  addManufacturerResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');

    }
  }




  getUserDetails(){
    if(this.Details.usertype == 'customer'){
      this.customerInput.User.registertype = this.Details.registertype;
      this.customerInput.User.user_type = 'customer';      
      this.customerInput.User.mobileno_one = this.Details.mobileno_one;
      this.customerInput.User.mobileno_two = this.Details.mobileno_two;
      this.customerInput.User.paymenttype = this.Details.paymenttype;
      this.customerInput.User.lastname = this.Details.lastname;
      this.customerInput.User.emailid = this.Details.emailid;
      this.customerInput.User.aliasname = this.Details.aliasname;
      this.customerInput.User.mobileno = this.Details.mobileno;
      this.customerInput.User.firstname = this.Details.firstname;
      this.customerInput.User.address = this.Details.address;
      this.customerInput.User.locality = this.Details.locality;
      this.customerInput.User.buildingname = this.Details.buildingname;
      this.customerInput.User.promocode = this.Details.promocode;
    }
    else if(this.Details.usertype == 'dealer'){
      this.phone = true;
      this.dist.firstName = this.Details.firstname;
      this.dist.lastName = this.Details.lastname;
      this.dist.phone = this.Details.mobileno;
      this.dist.mobile1 = this.Details.mobileno_one;
      this.dist.mobile2 = this.Details.mobileno_two;
      this.dist.companyname = this.Details.companyname;
      this.dist.address = this.Details.address;
      this.dist.emailid = this.Details.emailid;
      this.dist.referCode = this.Details.reference_code;
    }

    else if(this.Details.usertype == 'supplier'){
      this.supplierInput.firstname = this.Details.firstname;
      this.supplierInput.mobileno = this.Details.mobileno;
      this.supplierInput.address = this.Details.address;
      this.supplierInput.altmobileno = this.Details.mobileno_one;
      this.supplierInput.emailid = this.Details.emailid;

      
      
    }
    else if(this.Details.usertype == 'sales'){

      this.salesInput.firstName = this.Details.firstname;
      this.salesInput.lastName = this.Details.lastname;
      this.salesInput.phone = this.Details.mobileno;
      this.salesInput.mobile1 = this.Details.mobileno_one;
      this.salesInput.mobile2 = this.Details.mobileno_two;
      this.salesInput.companyname = this.Details.companyname;
      this.salesInput.address = this.Details.address;
      this.salesInput.emailid = this.Details.emailid;
      this.salesInput.referCode = this.Details.reference_code;


      
    }
    else if(this.Details.usertype == 'manufacturer'){
      this.manufacturerInput.firstName = this.Details.firstname;
      this.manufacturerInput.lastName = this.Details.lastname;
      this.manufacturerInput.phone = this.Details.mobileno;
      this.manufacturerInput.mobile1 = this.Details.mobileno_one;
      this.manufacturerInput.mobile2 = this.Details.mobileno_two;
      this.manufacturerInput.companyname = this.Details.companyname;
      this.manufacturerInput.address = this.Details.address;
      this.manufacturerInput.emailid = this.Details.emailid;
      this.manufacturerInput.referCode = this.Details.reference_code;
    }

  }   




  UpdateCustomer() {
    if(this.validation1() && this.validation2() && this.validation3()){
    let input = this.customerInput;
    input.User.paymentday= this.paymentDate;
    input.User.billpaymentdueday= this.paymentdueDate;
    input.User.userid = this.Details.userid;
    console.log(input);
    this.customerService.updateCustomer(input)
      .subscribe(
      output => this.updateCustomerResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }
}
  updateCustomerResult(result) {
    //console.log(result);
if(result.result == 'success'){
  console.log('customer updated successfully');
  this.thisDialogRef.close('success');
  this.getUserDetails();
}
  }
      

  UpdateDistributor(){

    let input:any = {"User": {"pwd":this.dist.phone,"user_type": "dealer" ,"referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "mobileno_one":this.dist.mobile1, "mobileno_two":this.dist.mobile2,  "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()}};
      input.User.userid = this.Details.userid;
      this.distributorService.updateDistributor(input)
      .subscribe(
      output => this.updateDistributorResult(output),
      error => {
          //console.log("error in distrbutors");
      });
  }
  updateDistributorResult(result){
    if(result.result == 'success'){
      console.log('dist updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();

    }

  }



  UpdateSalesUser(){

    let input:any = {"User": {"pwd":this.dist.phone,"user_type": "sales","referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "mobileno_one":this.dist.mobile1, "mobileno_two":this.dist.mobile2,  "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()}};
      input.User.userid = this.Details.userid;
      this.distributorService.updateDistributor(input)
      .subscribe(
      output => this.UpdateSalesUserResult(output),
      error => {
          //console.log("error in distrbutors");
      });
  }
  UpdateSalesUserResult(result){
    if(result.result == 'success'){
      console.log('salesuser updated successfully');
      this.thisDialogRef.close('success');

      this.getUserDetails();

    }

  }


  UpdateManufacturer(){

    let input:any = {"User": {"pwd":this.dist.phone,"user_type": "manufacturer", "TransType": "create","referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "mobileno_one":this.dist.mobile1, "mobileno_two":this.dist.mobile2,  "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()}};
      input.User.userid = this.Details.userid;
      this.distributorService.updateDistributor(input)
      .subscribe(
      output => this.UpdateManufacturerResult(output),
      error => {
          //console.log("error in distrbutors");
      });
  }
  UpdateManufacturerResult(result){
    if(result.result == 'success'){
      console.log('manufacturer updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();

    }

  }





    UpdateSupplier(){
      let input: any = {"User":{"userid":this.Details.userid,"firstname":this.supplierInput.firstname,"mobileno":this.supplierInput.mobileno , "address":this.supplierInput.address, "emailid":this.supplierInput.emailid, "loginid":"289","user_type":"supplier","issuppersupplier":false,"apptype":this.authenticationService.appType() , "mobileno_one":this.supplierInput.altmobileno }};
      //console.log(input);
      this.supplierservice.updateSupplier(input)
      .subscribe(
        output => this.updateSupplierResult(output),
        error => {
          //console.log("error in updation of suppliers");
        });
      }
      updateSupplierResult(result) {
        //console.log(result);
        if (result.result == 'success') {
    console.log('supplier updated successfully');
          this.thisDialogRef.close('success');
          this.getUserDetails();

        }
    
      }


  

    






  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if(this.Details){
      if(this.Details.usertype == 'customer'){
        this.UserInput.usertype = 'Customer';
      }
      else if(this.Details.usertype == 'dealer'){
        this.UserInput.usertype = 'Distributor';
      }
      else if(this.Details.usertype == 'supplier'){
        this.UserInput.usertype = 'Supplier';
      }
      else if(this.Details.usertype == 'sales'){
        this.UserInput.usertype = 'Sales';
      }
      else if(this.Details.usertype == 'manufacturer'){
        this.UserInput.usertype = 'Manufacturer';
      }

     
      this.headerValue = 'Update User';
      this.getUserDetails();


    }
  }

}
