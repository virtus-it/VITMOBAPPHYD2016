import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierOrderListComponent } from '../supplier-order-list/supplier-order-list.component';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'app-add-supplier-dailog',
  templateUrl: './add-supplier-dailog.component.html',
  styleUrls: ['./add-supplier-dailog.component.css']
})
export class AddSupplierDailogComponent implements OnInit {
  dialog: any;

  constructor(private supplierservice: SupplierService, public thisDialogRef: MdDialogRef<AddSupplierDailogComponent>, @Inject(MD_DIALOG_DATA) public supplierDetails: any, private authenticationService: AuthenticationService, private loaderService: LoaderService) { }
  emailFormControl = new FormControl('', [
    Validators.required]);
  validateMessage: string = '';

  supplierInput = { firstname: "", mobileno: "", altmobileno: "", address: "", emailid: "", lastname: "" };
  submitSupplier() {
    this.loaderService.display(false);
    let input: any = { "User": { "user_type": "supplier", "TransType": "create", "firstname": this.supplierInput.firstname, "gender": "Male", "pwd": this.supplierInput.mobileno, "address": this.supplierInput.address, "lastname": this.supplierInput.lastname, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.supplierInput.mobileno, "emailid": this.supplierInput.emailid, "altmobileno": this.supplierInput.altmobileno, "issuppersupplier": false, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() } };
    //console.log(input);
    if (this.validateSupplier()) {
      this.supplierservice.createSupplier(input)
        .subscribe(
          output => this.submitSupplierResult(output),
          error => {
            //console.log("error in supplier");
            this.loaderService.display(false);
          });
    }
  }
  submitSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {

      this.thisDialogRef.close('success');
    }

  }
  /// : ADD update supplier funtion as same as sumbit suppiler function
  updatingSupplier() {
    this.loaderService.display(false);
    let input: any = { "User": { "userid": this.supplierDetails.userid, "firstname": this.supplierInput.firstname, "mobileno": this.supplierInput.mobileno, "lastname": this.supplierInput.lastname, "address": this.supplierInput.address, "emailid": this.supplierInput.emailid, "loginid": "289", "user_type": "supplier", "issuppersupplier": false, "apptype": this.authenticationService.appType() } }
    //console.log(input);
    if (this.validateSupplier()) {
      this.supplierservice.updateSupplier(input)
        .subscribe(
          output => this.updateSupplierResult(output),
          error => {
            //console.log("error in updation of suppliers");
            this.loaderService.display(false);
          });
    }
  }
  updateSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {

      this.thisDialogRef.close('success');
    }

  }



  openDailog() {
    if (this.supplierDetails) {
      //console.log(this.supplierDetails);
      this.supplierInput.firstname = this.supplierDetails.firstname;
      this.supplierInput.mobileno = this.supplierDetails.mobileno;
      this.supplierInput.altmobileno = "";
      this.supplierInput.address = this.supplierDetails.address;
      this.supplierInput.emailid = this.supplierDetails.emailid;
      this.supplierInput.lastname = this.supplierDetails.lastname;

    }
  }

  ///create and update suplier function

  createAndUpdateSupplier() {
    if (this.supplierDetails) {
      this.updatingSupplier()

    }
    else {
      this.submitSupplier()

    }
  }


  validateSupplier() {
    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (this.supplierInput.address == '') {
          this.validateMessage = 'Enter Address';
        }
      }
      case '2': {
        if (this.supplierInput.mobileno == '') {
          this.validateMessage = 'Enter Mobile number';
        }
      }
      case '3': {
        if (this.supplierInput.lastname == '') {
          this.validateMessage = "Enter Last name";
        }
      }
      case '4': {
        if (this.supplierInput.firstname == '') {
          this.validateMessage = "Enter First name";
        }
      }

      case '7': {
        if (this.supplierInput.firstname && this.supplierInput.lastname && this.supplierInput.mobileno && this.supplierInput.address) {
          this.validateMessage = '';
          return true;
        }
      }
    }
  }

   numberEvent(e:any){
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }
   }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.openDailog();
  }
}
