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

  supplierInput = { firstname: "", mobileno: "", altmobileno: "", address: "", emailid:""};
  submitSupplier() {
    this.loaderService.display(false);
    let input: any = { "User": { "user_type": "supplier", "TransType": "create", "firstname": this.supplierInput.firstname, "gender": "Male", "pwd": this.supplierInput.mobileno, "address":this.supplierInput.address,  "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.supplierInput.mobileno,  "emailid":this.supplierInput.emailid, "altmobileno": this.supplierInput.altmobileno, "issuppersupplier": false, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() } };
    //console.log(input);
    this.supplierservice.createSupplier(input)
      .subscribe(
      output => this.submitSupplierResult(output),
      error => {
        //console.log("error in supplier");
        this.loaderService.display(false);
      });
  }
  submitSupplierResult(result) {
    //console.log(result);
    if (result.result == 'success') {

      this.thisDialogRef.close('success');
    }

  }
  /// : ADD update supplier funtion as same as sumbit suppiler function
 updatingSupplier(){
  this.loaderService.display(false);
  let input: any = {"User":{"userid":this.supplierDetails.userid,"firstname":this.supplierInput.firstname,"mobileno":this.supplierInput.mobileno , "address":this.supplierInput.address, "emailid":this.supplierInput.emailid, "loginid":"289","user_type":"supplier","issuppersupplier":false,"apptype":this.authenticationService.appType() }}
  //console.log(input);
  this.supplierservice.updateSupplier(input)
  .subscribe(
    output => this.updateSupplierResult(output),
    error => {
      //console.log("error in updation of suppliers");
      this.loaderService.display(false);
    });
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

    }
  }

   ///create and update suplier function

   createAndUpdateSupplier(){
     if (this.supplierDetails){
       this.updatingSupplier()

     }
     else{
       this.submitSupplier()

     }
   }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.openDailog();
  }
}
