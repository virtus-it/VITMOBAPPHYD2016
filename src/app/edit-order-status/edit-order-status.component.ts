import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { LoaderService } from '../login/loader.service';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit { adv_amt

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<EditOrderStatusComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService,private loaderService: LoaderService) { }
  editStatusInput:any = { "order": { "delivered_qty": this.orderDetail.delivered_quantity, "received_amt": (this.orderDetail.delivered_quantity * this.orderDetail.prod_cost)  + (this.orderDetail.delivered_quantity * this.orderDetail.servicecharges) + (this.orderDetail.expressdeliverycharges) , "orderstatus": "delivered", 
  "reason":"",  "product_type": "cans", "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetail.order_id, "usertype": this.authenticationService.userType(), "apptype": this.authenticationService.appType(), "return_cans": this.orderDetail.return_cans, "paymentype": this.orderDetail.paymenttype , "adv_amt":this.orderDetail.customerpaymentdts.advance_amount } };
isConfirmed = true;



  updateOrderStatus() {
    this.loaderService.display(true);
    if (!this.editStatusInput.order.received_amt) {
      this.editStatusInput.order.received_amt = 0;
    }

    if (this.editStatusInput.order.orderstatus !== "delivered") {
      this.editStatusInput.order.received_amt = 0;
      this.editStatusInput.order.delivered_qty = 0;
    }
if(this.editStatusInput.order.orderstatus == "delivered"){

  this.editStatusInput.order.reason ="Delivered: "+ this.orderDetail.brandname +" "+ this.orderDetail.prod_type + "  water cans("+this.orderDetail.quantity+" qty) with order id: "+this.orderDetail.order_id+" from Moya-The Waterman App, is delivered. Please allow us to serve you better, rate us on playstore: https://play.google.com/store/apps/details?id=com.moya"
}

if(this.editStatusInput.order.orderstatus == "rejected"){

  this.editStatusInput.order.reason ="Rejected: "+ this.orderDetail.brandname +" "+ this.orderDetail.prod_type + "  water cans("+this.orderDetail.quantity+" qty) with order id: "+this.orderDetail.order_id+" from Moya-The Waterman App, is not delivered as you have rejected the order . You might receive a call from our customer care centre from mobile: 9863636314/15 very soon."
}

if(this.editStatusInput.order.orderstatus == "doorlock"){

  this.editStatusInput.order.reason ="Door Locked: "+ this.orderDetail.brandname +" "+ this.orderDetail.prod_type + "  water cans("+this.orderDetail.quantity+" qty) with order id: "+this.orderDetail.order_id+" from Moya-The Waterman App, is still in process. Supplier found the door is locked.Please call our customer care centre at mobile: 9863636314/15 for any queries."
}

if(this.editStatusInput.order.orderstatus == "not_reachable"){

  this.editStatusInput.order.reason ="Not reachable: "+ this.orderDetail.brandname +" "+ this.orderDetail.prod_type + "  water cans("+this.orderDetail.quantity+" qty) with order id: "+this.orderDetail.order_id+" from Moya-The Waterman App, is still in process. Supplier tried to reach you on your mobile:"+ this.orderDetail.orderby_mobileno+ ", but there was no response. Please call our customer care centre at mobile: 9863636314/15 for any queries."
}


    if (this.editStatusInput.order.paymentype == "credit") {
      this.editStatusInput.order.received_amt = 0;
    }
    if (this.isConfirmed) {
      this.editStatusInput.order.paymentstatus = 'confirm';
    }
    let input = this.editStatusInput;
    //console.log(input);
    this.orderLandingService.editOrderStatus(input)
      .subscribe(
      output => this.updateOrderStatusResult(output),
      error => {
        //console.log("error in order details");
        this.loaderService.display(false);
      });
  }
  updateOrderStatusResult(result){
    this.loaderService.display(false);
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
    //console.log(this.editStatusInput);
    console.log(this.orderDetail);
  }

}
