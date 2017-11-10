import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';

@Component({
  selector: 'app-on-hold-order-status',
  templateUrl: './on-hold-order-status.component.html',
  styleUrls: ['./on-hold-order-status.component.css']
})
export class OnHoldOrderStatusComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OnHoldOrderStatusComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService) { }
  reasonOnHold: "";
  updateOrderOnhold() {
    let input = { "order": { "orderstatus": "onhold", "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetail.order_id, "apptype": this.authenticationService.appType(), "customerid": this.orderDetail.order_by, "reason": this.reasonOnHold, "from": "website" } }
    console.log(input);
    this.orderLandingService.updateOnHold(input)
      .subscribe(
      output => this.updateOrderOnholdResult(output),
      error => {
        console.log("error in order details");
      });

  }
  updateOrderOnholdResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }

  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.orderDetail);

  }

}
