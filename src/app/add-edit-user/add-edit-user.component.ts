import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SupplierService } from '../supplier/supplier.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { AssociateCategoryComponent } from '../associate-category/associate-category.component';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  constructor(
    public thisDialogRef: MdDialogRef<AddEditUserComponent>,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private distributorService: DistributorServiceService,
    private supplierservice: SupplierService,
    @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog
  ) { }

  emailFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required]);
  firstFormControl = new FormControl('', [Validators.required]);
  lastFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  dup: any = false;
  messageError: any = '';
  phoneFormControl = new FormControl('', [Validators.required]);
  paymentDate: any = '';
  paymentdueDate: any = '';
  UserInput = { usertype: 'Customer' };
  UserType = '';
  validateMessage: string = '';

  customerInput: any = {
    User: {
      advamt: '',
      registertype: 'residential',
      mobileno_one: '',
      mobileno_two: '',
      paymenttype: 'cod',
      user_type: 'customer',
      lastname: '',
      emailid: null,
      aliasname: '',
      mobileno: '',
      loginid: this.authenticationService.loggedInUserId(),
      firstname: '',
      address: '',
      apptype: this.authenticationService.appType(),
      dealer_mobileno: this.authenticationService.dealerNo(),
      locality: '',
      buildingname: '',
      promocode: '',
      referencecode: ''
    }
  };

  dist = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    companyname: '',
    address: '',
    emailid: '',
    referCode: '',
    phonetype: ""
  };

  salesInput = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    companyname: '',
    address: '',
    emailid: '',
    referCode: ''
  };

  manufacturerInput = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    companyname: '',
    address: '',
    emailid: '',
    referCode: ''
  };

  marketingInput = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    companyname: '',
    address: '',
    emailid: '',
    referCode: ''
  };

  customerCareInput = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    address: '',
    emailid: '',
  };

  salesteamInput = {
    firstName: '',
    lastName: '',
    phone: '',
    mobile1: '',
    mobile2: '',
    address: '',
    emailid: '',
  };


  areaList = [];
  phone = false;

  supplierInput = {
    firstname: '',
    mobileno: '',
    altmobileno: '',
    address: '',
    emailid: '',
    lastname: ''
  };


  superSupplierInput = {
    firstname: '',
    mobileno: '',
    altmobileno: '',
    address: '',
    emailid: '',
    lastname: ''
  };




  headerValue: any = 'Add User';
  manufacturerId:any = '';

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

  createOrUpdateUser() {
    if (this.Details) {
      if (this.UserInput.usertype == 'Customer') {
        this.UpdateCustomer();
      } else if (this.UserInput.usertype == 'Distributor') {
        this.UpdateDistributor();
      } else if (this.UserInput.usertype == 'Supplier') {
        this.UpdateSupplier();
      } else if (this.UserInput.usertype == 'Sales') {
        this.UpdateSalesUser();
      } else if (this.UserInput.usertype == 'Manufacturer') {
        this.UpdateManufacturer();
      } else if (this.UserInput.usertype == 'Marketing') {
        this.UpdateMarketingUser();
      }
      else if (this.UserInput.usertype == 'Supersupplier') {
        this.UpdateSuperSupplier();
      }
      else if (this.UserInput.usertype == 'Customercare') {
        this.UpdateCustomerCare();
      }
      else if (this.UserInput.usertype == 'salesteam') {
        this.updateSalesTeam();
      }
    }
    else {
      if (this.UserInput.usertype == 'Customer') {
        this.addCustomer();
      } else if (this.UserInput.usertype == 'Distributor') {
        this.addDistributor();
      } else if (this.UserInput.usertype == 'Supplier') {
        this.addSupplier();
      } else if (this.UserInput.usertype == 'Sales') {
        this.addSalesUser();
      } else if (this.UserInput.usertype == 'Manufacturer') {
        this.addManufacturer();
      }
      else if (this.UserInput.usertype == 'Marketing') {
        this.addMarketingUser();
      }
      else if (this.UserInput.usertype == 'Customercare') {
        this.addCustomerCare();
      }
      else if (this.UserInput.usertype == 'Supersupplier') {
        this.addSuperSupplier();
      }
      else if (this.UserInput.usertype == 'salesteam') {
        this.addSalesteam();
      }
    }
  }


  addCustomerCare() {
    let input = {
      User: {
        pwd: this.customerCareInput.phone,
        user_type: 'customercare',
        TransType: 'create',
        firstname: this.customerCareInput.firstName,
        lastname: this.customerCareInput.lastName,
        address: this.customerCareInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.customerCareInput.phone,
        mobileno_one: this.customerCareInput.mobile1,
        mobileno_two: this.customerCareInput.mobile2,
        emailid: this.customerCareInput.emailid,
        apptype: this.authenticationService.appType()
      }
    };
    if (this.customerCareValidation()) {
      this.distributorService.createDistributor(input)
        .subscribe(
          output => this.addCustomerCareResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  addCustomerCareResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  addSalesteam() {
    let input = {
      User: {
        pwd: this.salesteamInput.phone,
        user_type: 'salesteam',
        TransType: 'create',
        firstname: this.salesteamInput.firstName,
        lastname: this.salesteamInput.lastName,
        address: this.salesteamInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.salesteamInput.phone,
        mobileno_one: this.salesteamInput.mobile1,
        mobileno_two: this.salesteamInput.mobile2,
        emailid: this.salesteamInput.emailid,
        apptype: this.authenticationService.appType()
      }
    };
    if (this.salesTeamValidation()) {
      this.distributorService.createDistributor(input)
        .subscribe(
          output => this.addSalesteamResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  addSalesteamResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }


  addSuperSupplier() {
    let input: any = {
      User: { user_type: 'supersupplier', TransType: 'create', firstname: this.superSupplierInput.firstname, gender: 'Male', pwd: this.superSupplierInput.mobileno, address: this.superSupplierInput.address, loginid: this.authenticationService.loggedInUserId(), mobileno: this.superSupplierInput.mobileno, emailid: this.superSupplierInput.emailid, lastname: this.superSupplierInput.lastname, mobileno_one: this.superSupplierInput.altmobileno, issuppersupplier: true, dealer_mobileno: this.authenticationService.dealerNo(), apptype: this.authenticationService.appType() }
    };
    if (this.supersupplierValidation()) {
      this.supplierservice.createSupplier(input)
        .subscribe(
          output => this.addSuperSupplierResult(output),
          error => {
            //console.log("error in supplier");
          });
    }
  }
  addSuperSupplierResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }





  addMarketingUser() {
    let input = {
      User: {
        pwd: this.marketingInput.phone,
        user_type: 'marketing',
        TransType: 'create',
        referCode: this.marketingInput.referCode,
        firstname: this.marketingInput.firstName,
        lastname: this.marketingInput.lastName,
        companyname: this.marketingInput.companyname,
        address: this.marketingInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.marketingInput.phone,
        mobileno_one: this.marketingInput.mobile1,
        mobileno_two: this.marketingInput.mobile2,
        emailid: this.marketingInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    this.distributorService.createDistributor(input).subscribe(
      output => this.addMarketingUserResult(output),
      error => {
        //console.log("error in distrbutors");
      }
    );
  }
  addMarketingUserResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  UpdateMarketingUser() {
    let input: any = {
      User: {
        pwd: this.marketingInput.phone,
        user_type: 'marketing',
        TransType: 'create',
        referCode: this.marketingInput.referCode,
        firstname: this.marketingInput.firstName,
        lastname: this.marketingInput.lastName,
        companyname: this.marketingInput.companyname,
        address: this.marketingInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.marketingInput.phone,
        mobileno_one: this.marketingInput.mobile1,
        mobileno_two: this.marketingInput.mobile2,
        emailid: this.marketingInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    input.User.userid = this.Details.userid;
    this.distributorService.updateDistributor(input).subscribe(
      output => this.UpdateMarketingUserResult(output),
      error => {
        //console.log("error in distrbutors");
      }
    );
  }
  UpdateMarketingUserResult(result) {
    if (result.result == 'success') {
      console.log('marketing user updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }

  addCustomer() {
    if (this.validation1() && this.validation2() && this.validation3()) {
      let input = this.customerInput;
      input.User.pwd = this.customerInput.User.mobileno;
      input.User.TransType = 'create';
      input.User.paymentday = this.paymentDate;
      input.User.billpaymentdueday = this.paymentdueDate;
      input.User.advamt = 0;
      //console.log(input);
      this.dup = true;
      if (this.dup == true) {
        this.customerService
          .createCustomer(input)
          .subscribe(output => this.createCustomerResult(output), error => { });
      }
    }
  }
  createCustomerResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
      this.dup = false;
    }
  }

  validation1() {
    if (
      this.customerInput.User.firstname &&
      this.customerInput.User.firstname.length > 0
    ) {
      this.messageError = '';
      return true;
    } else {
      this.messageError = 'Please enter customers first name';
    }
  }

  validation2() {
    if (
      this.customerInput.User.mobileno &&
      this.customerInput.User.mobileno.length > 0 &&
      this.customerInput.User.mobileno.length == 10
    ) {
      this.messageError = '';
      return true;
    } else {
      this.messageError = 'Please enter customers phone number';
    }
  }

  validation3() {
    if (
      this.customerInput.User.address &&
      this.customerInput.User.address.length > 0
    ) {
      this.messageError = '';
      return true;
    } else {
      this.messageError = 'Please enter address of customer';
    }
  }

  addDistributor() {
    var input: any = {
      User: {
        pwd: this.dist.phone, user_type: 'dealer', TransType: 'create', phonetype: this.dist.phonetype, referCode: this.dist.referCode, firstname: this.dist.firstName, lastname: this.dist.lastName, companyname: this.dist.companyname, address: this.dist.address, loginid: this.authenticationService.loggedInUserId(), mobileno: this.dist.phone, mobileno_one: this.dist.mobile1, mobileno_two: this.dist.mobile2, emailid: this.dist.emailid, dealer_mobileno: this.authenticationService.dealerNo(), apptype: this.authenticationService.appType()
      }
    };
    if (this.distributorValidation()) {
      this.distributorService.createDistributor(input)
        .subscribe(
          output => this.onSubmitResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  onSubmitResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  addSupplier() {
    let input: any = {
      User: {
        user_type: 'supplier',
        TransType: 'create',
        firstname: this.supplierInput.firstname,
        gender: 'Male',
        pwd: this.supplierInput.mobileno,
        address: this.supplierInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.supplierInput.mobileno,
        emailid: this.supplierInput.emailid,
        mobileno_one: this.supplierInput.altmobileno,
        issuppersupplier: false,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    if (this.supplierValidation()) {
      this.supplierservice.createSupplier(input)
        .subscribe(
          output => this.submitSupplierResult(output),
          error => {
            //console.log("error in supplier");
          }
        );
    }
  }
  submitSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  addSalesUser() {
    let input = {
      User: {
        pwd: this.salesInput.phone,
        user_type: 'sales',
        TransType: 'create',
        referCode: this.salesInput.referCode,
        firstname: this.salesInput.firstName,
        lastname: this.salesInput.lastName,
        companyname: this.salesInput.companyname,
        address: this.salesInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.salesInput.phone,
        mobileno_one: this.salesInput.mobile1,
        mobileno_two: this.salesInput.mobile2,
        emailid: this.salesInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    if (this.salesValidation()) {
      this.distributorService.createDistributor(input)
        .subscribe(
          output => this.addSalesUserResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  addSalesUserResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  addManufacturer() {
    let input = {
      User: {
        pwd: this.manufacturerInput.phone,
        user_type: 'manufacturer',
        TransType: 'create',
        referCode: this.manufacturerInput.referCode,
        firstname: this.manufacturerInput.firstName,
        lastname: this.manufacturerInput.lastName,
        companyname: this.manufacturerInput.companyname,
        address: this.manufacturerInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.manufacturerInput.phone,
        mobileno_one: this.manufacturerInput.mobile1,
        mobileno_two: this.manufacturerInput.mobile2,
        emailid: this.manufacturerInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType(),
        categoryid : ''
      }
    };
        if (this.manufacturerValidation()) {
        this.addCategoryOfManufacturer(input);
        }
  }
  // addManufacturerResult(result) {
  //   if (result.result == 'success') {
  //     this.manufacturerId  = result.data.user_id;
  //     // this.thisDialogRef.close('success');
  //   }
  // }


  addCategoryOfManufacturer(input) {
    let formattedData = { input : input }
    let dialogRefEditCustomer = this.dialog.open(AssociateCategoryComponent, {
      width: '80%',
      data: formattedData
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.thisDialogRef.close('success');
       
      }
    });

  }

  getUserDetails() {
    if (this.Details.usertype == 'customer') {
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
      this.customerInput.User.referencecode = this.Details.reference_code;
      // this.customerInput.User.advamt = this.Details.reference_code;
    }
    else if (this.Details.usertype == 'dealer') {
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
      this.dist.phonetype = this.Details.phonetype;
    } else if (this.Details.usertype == 'supplier') {
      this.supplierInput.firstname = this.Details.firstname;
      this.supplierInput.mobileno = this.Details.mobileno;
      this.supplierInput.address = this.Details.address;
      this.supplierInput.altmobileno = this.Details.mobileno_one;
      this.supplierInput.emailid = this.Details.emailid;
    } else if (this.Details.usertype == 'sales') {
      this.salesInput.firstName = this.Details.firstname;
      this.salesInput.lastName = this.Details.lastname;
      this.salesInput.phone = this.Details.mobileno;
      this.salesInput.mobile1 = this.Details.mobileno_one;
      this.salesInput.mobile2 = this.Details.mobileno_two;
      this.salesInput.companyname = this.Details.companyname;
      this.salesInput.address = this.Details.address;
      this.salesInput.emailid = this.Details.emailid;
      this.salesInput.referCode = this.Details.reference_code;
    } else if (this.Details.usertype == 'manufacturer') {
      this.manufacturerInput.firstName = this.Details.firstname;
      this.manufacturerInput.lastName = this.Details.lastname;
      this.manufacturerInput.phone = this.Details.mobileno;
      this.manufacturerInput.mobile1 = this.Details.mobileno_one;
      this.manufacturerInput.mobile2 = this.Details.mobileno_two;
      this.manufacturerInput.companyname = this.Details.companyname;
      this.manufacturerInput.address = this.Details.address;
      this.manufacturerInput.emailid = this.Details.emailid;
      this.manufacturerInput.referCode = this.Details.reference_code;
    } else if (this.Details.usertype == 'marketing') {
      this.marketingInput.firstName = this.Details.firstname;
      this.marketingInput.lastName = this.Details.lastname;
      this.marketingInput.phone = this.Details.mobileno;
      this.marketingInput.mobile1 = this.Details.mobileno_one;
      this.marketingInput.mobile2 = this.Details.mobileno_two;
      this.marketingInput.companyname = this.Details.companyname;
      this.marketingInput.address = this.Details.address;
      this.marketingInput.emailid = this.Details.emailid;
      this.marketingInput.referCode = this.Details.reference_code;
    }
    else if (this.Details.usertype == 'customercare') {
      this.customerCareInput.firstName = this.Details.firstname;
      this.customerCareInput.lastName = this.Details.lastname;
      this.customerCareInput.phone = this.Details.mobileno;
      this.customerCareInput.mobile1 = this.Details.mobileno_one;
      this.customerCareInput.mobile2 = this.Details.mobileno_two;
      this.customerCareInput.address = this.Details.address;
      this.customerCareInput.emailid = this.Details.emailid;
    }
    else if (this.Details.usertype == 'supersupplier') {
      this.superSupplierInput.firstname = this.Details.firstname;
      this.superSupplierInput.mobileno = this.Details.mobileno;
      this.superSupplierInput.altmobileno = this.Details.mobileno_one;
      this.superSupplierInput.address = this.Details.address;
      this.superSupplierInput.emailid = this.Details.emailid;
      this.superSupplierInput.lastname = this.Details.lastname;
    }
    else if (this.Details.usertype == 'salesteam') {
      this.salesteamInput.firstName = this.Details.firstname;
      this.salesteamInput.lastName = this.Details.lastname;
      this.salesteamInput.phone = this.Details.mobileno;
      this.salesteamInput.mobile1 = this.Details.mobileno_one;
      this.salesteamInput.mobile2 = this.Details.mobileno_two;
      this.salesteamInput.address = this.Details.address;
      this.salesteamInput.emailid = this.Details.emailid;
    }
  }


  //   let input ={};
  //   if(this.customerInput.advamt){
  //  input["advamt"] = this.customerInput.advamt; 
  //  };


  UpdateCustomer() {
    if (this.validation1() && this.validation2() && this.validation3()) {

      let input = this.customerInput;
      if (input.User.advamt === null || input.User.advamt == '') {
        delete input.User.advamt;
      }
      input.User.paymentday = this.paymentDate;
      input.User.billpaymentdueday = this.paymentdueDate;
      input.User.userid = this.Details.userid;

      console.log(input);
      this.customerService.updateCustomer(input)
        .subscribe(
          output => this.updateCustomerResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  updateCustomerResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      console.log('customer updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }

  UpdateDistributor() {
    let input: any = {
      User: {
        pwd: this.dist.phone, user_type: 'dealer', referCode: this.dist.referCode, firstname: this.dist.firstName,
        lastname: this.dist.lastName, phonetype: this.dist.phonetype,
        companyname: this.dist.companyname,
        address: this.dist.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.dist.phone,
        mobileno_one: this.dist.mobile1,
        mobileno_two: this.dist.mobile2,
        emailid: this.dist.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    input.User.userid = this.Details.userid;
    if (this.distributorValidation()) {
      this.distributorService.updateDistributor(input)
        .subscribe(
          output => this.updateDistributorResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  updateDistributorResult(result) {
    if (result.result == 'success') {
      console.log('dist updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }


  UpdateSalesUser() {
    let input: any = {
      User: {
        pwd: this.dist.phone,
        user_type: 'sales',
        referCode: this.salesInput.referCode,
        firstname: this.salesInput.firstName,
        lastname: this.salesInput.lastName,
        companyname: this.salesInput.companyname,
        address: this.salesInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.salesInput.phone,
        mobileno_one: this.salesInput.mobile1,
        mobileno_two: this.salesInput.mobile2,
        emailid: this.salesInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType()
      }
    };
    input.User.userid = this.Details.userid;
    if (this.salesValidation()) {
      this.distributorService.updateDistributor(input)
        .subscribe(
          output => this.UpdateSalesUserResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  UpdateSalesUserResult(result) {
    if (result.result == 'success') {
      console.log('salesuser updated successfully');
      this.thisDialogRef.close('success');

      this.getUserDetails();
    }
  }


  UpdateManufacturer() {
    let input: any = {
      User: {
        pwd: this.manufacturerInput.phone,
        user_type: 'manufacturer',
        TransType: 'update',
        referCode: this.manufacturerInput.referCode,
        firstname: this.manufacturerInput.firstName,
        lastname: this.manufacturerInput.lastName,
        companyname: this.manufacturerInput.companyname,
        address: this.manufacturerInput.address,
        loginid: this.authenticationService.loggedInUserId(),
        mobileno: this.manufacturerInput.phone,
        mobileno_one: this.manufacturerInput.mobile1,
        mobileno_two: this.manufacturerInput.mobile2,
        emailid: this.manufacturerInput.emailid,
        dealer_mobileno: this.authenticationService.dealerNo(),
        apptype: this.authenticationService.appType(),
        categoryid : ''
      }
    };
    input.User.userid = this.Details.userid;
    if (this.manufacturerValidation()) {
      this.addCategoryOfManufacturerOnUpdate(input);
      // this.distributorService.updateDistributor(input)
      //   .subscribe(
      //     output => this.UpdateManufacturerResult(output),
      //     error => {
      //       //console.log("error in distrbutors");
      //     }
      //   );
    }
  }
  // UpdateManufacturerResult(result) {
  //   if (result.result == 'success') {
  //     console.log('manufacturer updated successfully');
  //     // this.thisDialogRef.close('success');
      
  //     this.getUserDetails();
  //   }
  // }

  addCategoryOfManufacturerOnUpdate(data) {
    let formattedData = {input : data }
    let dialogRefEditCustomer = this.dialog.open(AssociateCategoryComponent, {
      width: '80%',
      data: formattedData
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.thisDialogRef.close('success');
      }
    });

  }


  updateSalesTeam() {

    let input: any = {
      User: { userid: this.Details.userid, firstname: this.salesteamInput.firstName, lastname: this.salesteamInput.lastName, mobileno: this.salesteamInput.phone, address: this.salesteamInput.address, emailid: this.salesteamInput.emailid, loginid: this.authenticationService.loggedInUserId(), user_type: 'customercare', issuppersupplier: false, apptype: this.authenticationService.appType(), mobileno_one: this.salesteamInput.mobile1, mobileno_two: this.salesteamInput.mobile2 }
    };
    console.log(input);
    if (this.salesTeamValidation()) {
      this.distributorService.updateDistributor(input)
        .subscribe(
          output => this.updateSalesTeamResult(output),
          error => {
            //console.log("error in distrbutors");
          });
    }
  }
  updateSalesTeamResult(result) {
    if (result.result == 'success') {
      console.log('salesteam updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }


  UpdateCustomerCare() {

    let input: any = {
      User: { userid: this.Details.userid, firstname: this.customerCareInput.firstName, lastname: this.customerCareInput.lastName, mobileno: this.customerCareInput.phone, address: this.customerCareInput.address, emailid: this.customerCareInput.emailid, loginid: this.authenticationService.loggedInUserId(), user_type: 'customercare', issuppersupplier: false, apptype: this.authenticationService.appType(), mobileno_one: this.customerCareInput.mobile1, mobileno_two: this.customerCareInput.mobile2 }
    };
    console.log(input);
    if (this.customerCareValidation()) {
      this.distributorService.updateDistributor(input)
        .subscribe(
          output => this.UpdateCustomerCareResult(output),
          error => {
            //console.log("error in distrbutors");
          });
    }
  }
  UpdateCustomerCareResult(result) {
    if (result.result == 'success') {
      console.log('customer care updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }






  UpdateSupplier() {
    let input: any = {
      User: {
        userid: this.Details.userid,
        firstname: this.supplierInput.firstname,
        mobileno: this.supplierInput.mobileno,
        address: this.supplierInput.address,
        emailid: this.supplierInput.emailid,
        loginid: '289',
        user_type: 'supplier',
        issuppersupplier: false,
        apptype: this.authenticationService.appType(),
        mobileno_one: this.supplierInput.altmobileno
      }
    };
    //console.log(input);
    if (this.supplierValidation()) {
      this.supplierservice.updateSupplier(input)
        .subscribe(
          output => this.updateSupplierResult(output),
          error => {
            //console.log("error in updation of suppliers");
          }
        );
    }
  }
  updateSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      console.log('supplier updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }

  UpdateSuperSupplier() {

    let input: any = { User: { userid: this.Details.userid, firstname: this.superSupplierInput.firstname, mobileno: this.superSupplierInput.mobileno, address: this.superSupplierInput.address, emailid: this.superSupplierInput.emailid, loginid: this.authenticationService.loggedInUserId(), user_type: 'supersupplier', issuppersupplier: true, apptype: this.authenticationService.appType(), mobileno_one: this.superSupplierInput.altmobileno, lastname: this.superSupplierInput.lastname } };
    if (this.supersupplierValidation()) {
      this.supplierservice.updateSupplier(input)
        .subscribe(
          output => this.UpdateSuperSupplierResult(output),
          error => {
            //console.log("error in updation of suppliers");
          }
        );
    }
  }
  UpdateSuperSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      console.log('super supplier updated successfully');
      this.thisDialogRef.close('success');
      this.getUserDetails();
    }
  }



  supplierValidation() {
    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.supplierInput.address) {
          this.validateMessage = 'Enter Address';
        }
      }
      case '2': {
        if (!this.supplierInput.mobileno) {
          this.validateMessage = 'Enter Mobile number';
        }
      }
      case '3': {
        if (this.supplierInput.lastname == '') {
          this.validateMessage = "Enter lastname";
        }
      }
      case '4': {
        if (!this.supplierInput.firstname) {
          this.validateMessage = "Enter first name";
        }
      }

      case '5': {
        if (this.supplierInput.firstname && this.supplierInput.lastname && this.supplierInput.mobileno && this.supplierInput.address) {
          this.validateMessage = '';
          return true;
        }
      }
    }
  }


  distributorValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.dist.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.dist.phone) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.dist.lastName) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.dist.firstName) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.dist.firstName && this.dist.lastName && this.dist.phone && this.dist.address) {
          this.validateMessage = '';
          this.messageError = '';
          return true;
        }
      }
    }

  }



  salesValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.salesInput.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.salesInput.phone) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.salesInput.lastName) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.salesInput.firstName) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.salesInput.firstName && this.salesInput.lastName && this.salesInput.phone && this.salesInput.address) {
          this.validateMessage = '';
          this.messageError = '';
          return true;
        }
      }
    }

  }



  manufacturerValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.manufacturerInput.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.manufacturerInput.phone) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.manufacturerInput.lastName) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.manufacturerInput.firstName) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.manufacturerInput.firstName && this.manufacturerInput.lastName && this.manufacturerInput.phone && this.manufacturerInput.address) {
          this.validateMessage = '';
          this.messageError = '';
          return true;
        }
      }
    }

  }



  customerCareValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.customerCareInput.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.customerCareInput.phone) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.customerCareInput.lastName) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.customerCareInput.firstName) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.customerCareInput.firstName && this.customerCareInput.lastName && this.customerCareInput.phone && this.customerCareInput.address) {
          this.validateMessage = '';
          return true;
        }
      }
    }

  }



  salesTeamValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.salesteamInput.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.salesteamInput.phone) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.salesteamInput.lastName) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.salesteamInput.firstName) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.salesteamInput.firstName && this.salesteamInput.lastName && this.salesteamInput.phone && this.salesteamInput.address) {
          this.validateMessage = '';
          return true;
        }
      }
    }

  }





  supersupplierValidation() {

    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.superSupplierInput.address) {
          this.validateMessage = 'Enter Address';
          this.messageError = '';
        }
      }
      case '2': {
        if (!this.superSupplierInput.mobileno) {
          this.validateMessage = 'Enter Mobile number';
          this.messageError = '';
        }
      }
      case '3': {
        if (!this.superSupplierInput.lastname) {
          this.validateMessage = "Enter lastname";
          this.messageError = '';
        }
      }
      case '4': {
        if (!this.superSupplierInput.firstname) {
          this.validateMessage = "Enter first name";
          this.messageError = '';
        }
      }

      case '5': {
        if (this.superSupplierInput.firstname && this.superSupplierInput.lastname && this.superSupplierInput.mobileno && this.superSupplierInput.address) {
          this.validateMessage = '';
          this.messageError = '';
          return true;
        }
      }
    }


  }

  numberEvent(e: any) {
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }

  }

  emailEvent(e: any) {
    if (e.keyCode == 32) {
      e.preventDefault();
    }

  }







  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if (this.Details) {
      if (this.Details.usertype == 'customer') {
        this.UserInput.usertype = 'Customer';
      } else if (this.Details.usertype == 'dealer') {
        this.UserInput.usertype = 'Distributor';
      } else if (this.Details.usertype == 'supplier') {
        this.UserInput.usertype = 'Supplier';
      } else if (this.Details.usertype == 'sales') {
        this.UserInput.usertype = 'Sales';
      } else if (this.Details.usertype == 'manufacturer') {
        this.UserInput.usertype = 'Manufacturer';
      } else if (this.Details.usertype == 'marketing') {
        this.UserInput.usertype = 'Marketing';
      }
      else if (this.Details.usertype == 'customercare') {
        this.UserInput.usertype = 'Customercare';
      }
      else if (this.Details.usertype == 'supersupplier') {
        this.UserInput.usertype = 'Supersupplier';
      }
      else if (this.Details.usertype == 'salesteam') {
        this.UserInput.usertype = 'salesteam';
      }



      this.headerValue = 'Update User';
      this.getUserDetails();
    }


    this.UserType = this.authenticationService.userType();
    console.log(this.UserType);
  }
}
