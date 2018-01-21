import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';
import { LoaderService } from '../login/loader.service';
@Component({
  selector: 'app-edit-quantity-dailog',
  templateUrl: './edit-quantity-dailog.component.html',
  styleUrls: ['./edit-quantity-dailog.component.css']
})
export class EditQuantityDailogComponent implements OnInit {
  quantity = { value: null };
  constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, private orderLandingService: OrderLandingService, public thisDialogRef: MdDialogRef<EditQuantityDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetails: any, public dialog: MdDialog,private loaderService: LoaderService) { }
  updateQuantity() {
    this.loaderService.display(true);
    let input = { "order": { "excepted_time": this.orderDetails.delivery_exceptedtime, "product_type": this.orderDetails.prod_type, "quantity": this.quantity.value, "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetails.order_id, "product_name": this.orderDetails.brandname, "apptype": this.authenticationService.appType(), "createdthru": "website" } };
    this.orderLandingService.updateQuantity(input)
      .subscribe(
      output => this.updateQuantityResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  updateQuantityResult(result) {
    console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.onCloseModal('success')
      
    }
  }
  onCloseModal(message) {
    this.thisDialogRef.close(message);
  }
  ngOnInit() {

    this.quantity.value = this.orderDetails.quantity;
  }

}
