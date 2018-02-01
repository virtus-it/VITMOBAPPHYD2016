import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<ProductUpdateComponent>, @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog, private loaderService: LoaderService, private productService: ProductsService) { }
  updateStatus() {
    let input = { "product": { "pid": this.Details.productid, "status": this.Details.stockstatus, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } }
    this.productService.setProductStatus(input)
      .subscribe(
      output => this.updateStatusResult(output),
      error => {
        console.log("error in distrbutors");
      });

  }
  updateStatusResult(result) {
console.log(result);
if (result.result == 'success') {
  this.thisDialogRef.close('success');
}

  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
    console.log(this.Details);
  }

}
