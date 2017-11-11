import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';


@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<EditOrderStatusComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService) { }
  editStatusInput:any = { "order": { "delivered_qty": this.orderDetail.delivered_quantity, "received_amt": this.orderDetail.delivered_quantity * this.orderDetail.prod_cost, "orderstatus": "delivered", "product_type": "cans", "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetail.order_id, "usertype": this.authenticationService.userType(), "apptype": this.authenticationService.appType(), "return_cans": this.orderDetail.return_cans, "paymentype": this.orderDetail.paymenttype } };
isConfirmed = true;
  updateOrderStatus() {

    if (!this.editStatusInput.order.received_amt) {
      this.editStatusInput.order.received_amt = 0;
    }

    if (this.editStatusInput.order.orderstatus !== "delivered") {
      this.editStatusInput.order.received_amt = 0;
      this.editStatusInput.order.delivered_qty = 0;
    }


    if (this.editStatusInput.order.paymentype == "credit") {
      this.editStatusInput.order.received_amt = 0;
    }
    if (this.isConfirmed) {
      this.editStatusInput.order.paymentstatus = 'confirm';
    }
    let input = this.editStatusInput;
    console.log(input);
    this.orderLandingService.editOrderStatus(input)
      .subscribe(
      output => this.updateOrderStatusResult(output),
      error => {
        console.log("error in order details");
      });
  }
  updateOrderStatusResult(result){

if(result.result = '"success"'){
  this.thisDialogRef.close('success');
}
  }
  changeAmount() {
    this.editStatusInput.order.received_amt = this.editStatusInput.order.delivered_qty * this.orderDetail.prod_cost
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.editStatusInput);
  }

}
