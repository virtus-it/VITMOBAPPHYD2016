import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-customer-detail-dailog',
  templateUrl: './customer-detail-dailog.component.html',
  styleUrls: ['./customer-detail-dailog.component.css']
})
export class CustomerDetailDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<CustomerDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService) { }
  customerOrderDetails = [];
  noDataError = "";
  getCustomerOrder() {

    let input = { "order": { "userid": this.orderDetail.order_by, "status": this.orderDetail.status, "lastrecordtimestamp": "15", "pagesize": "10", "apptype": this.authenticationService.appType(), "usertype": "customer", "createdthru": "website" } }
    this.orderLandingService.getOrderByPaymentCycle(input)
      .subscribe(
      output => this.getCustomerOrderResult(output),
      error => {
        console.log("error in order details");
      });
  }
  getCustomerOrderResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.customerOrderDetails = result.data;
    }
    else {
      this.noDataError = "No more data";

    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.orderDetail);
    this.getCustomerOrder();
  }

}
