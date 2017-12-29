import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierOrderListComponent } from '../supplier-order-list/supplier-order-list.component';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { SupplierService } from '../supplier/supplier.service';
@Component({
  selector: 'app-add-supplier-dailog',
  templateUrl: './add-supplier-dailog.component.html',
  styleUrls: ['./add-supplier-dailog.component.css']
})
export class AddSupplierDailogComponent implements OnInit {

  constructor(private supplierservice: SupplierService, public thisDialogRef: MdDialogRef<AddSupplierDailogComponent>, @Inject(MD_DIALOG_DATA) public supplierDetails: any, private authenticationService: AuthenticationService, private loaderService: LoaderService) { }

  supplierInput = { firstname: "", mobileno: "", altmobileno: "" };
  submitSupplier() {
    this.loaderService.display(false);
    let input: any = { "User": { "user_type": "supplier", "TransType": "create", "firstname": this.supplierInput.firstname, "gender": "Male", "pwd": this.supplierInput.mobileno, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.supplierInput.mobileno, "altmobileno": this.supplierInput.altmobileno, "issuppersupplier": false, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() } };
    console.log(input);
    this.supplierservice.createSupplier(input)
      .subscribe(
      output => this.submitSupplierResult(output),
      error => {
        console.log("error in supplier");
        this.loaderService.display(false);
      });
  }
  submitSupplierResult(result) {
    console.log(result);
    if (result.result == 'success') {

      this.thisDialogRef.close('success');
    }

  }
  ///TODO : ADD update supplier funtion as same as sumbit suppiler function




  getDetails(details) {
    if (this.supplierDetails) {
      this.supplierInput.firstname = this.supplierDetails.firstname;
      this.supplierInput.mobileno = this.supplierDetails.mobileno;
      this.supplierInput.altmobileno = this.supplierDetails.altmobileno;
    }
  };


  ///create and update suplier function



  openDailog() {
    if (this.supplierDetails) {
      console.log(this.supplierDetails);
      this.supplierInput.firstname = this.supplierDetails.firstname;
      this.supplierInput.mobileno = this.supplierDetails.mobileno;
      this.supplierInput.altmobileno = "";

    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.openDailog();
  }
}
