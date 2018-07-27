import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {MdDialogRef} from '@angular/material';
import {AuthenticationService} from '../login/authentication.service';
import {OrderLandingService} from '../order-landing/order-landing.service';
import {LoaderService} from '../login/loader.service';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<EditOrderStatusComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService, private loaderService: LoaderService) {

  }

  emptyCans = 0;
  advanceAmount = 0;
  emptyCansError = false;
  emptyCansValidate = false;
  quantityError = false;


  editStatusInput: any = {
    "order": {
      "delivered_qty": this.orderDetail.delivered_quantity,
      "received_amt": (this.orderDetail.delivered_quantity * this.orderDetail.prod_cost) + (this.orderDetail.delivered_quantity * this.orderDetail.servicecharges) + (this.orderDetail.expressdeliverycharges),
      "orderstatus": "delivered",
      "reason": "",
      "product_type": "cans",
      "loginid": this.authenticationService.loggedInUserId(),
      "orderid": this.orderDetail.order_id,
      "usertype": this.authenticationService.userType(),
      "apptype": this.authenticationService.appType(),
      "return_cans": this.orderDetail.return_cans,
      "adv_amt": 0,
      "servicecharges" : this.orderDetail.servicecharges

    }
  };
  isConfirmed = true;


  message = "";


  updateOrderStatus() {
    this.loaderService.display(true);
    if (!this.editStatusInput.order.received_amt) {
      this.editStatusInput.order.received_amt = 0;
    }
    if (this.editStatusInput.order.return_cans === null || this.editStatusInput.order.return_cans == '') {
      this.editStatusInput.order.return_cans = 0;
    }


    if (this.editStatusInput.order.orderstatus !== "delivered") {
      this.editStatusInput.order.received_amt = 0;
      this.editStatusInput.order.delivered_qty = 0;
    }
    if (this.editStatusInput.order.orderstatus == "delivered") {
      // this.editStatusInput.order.action = "delivered";
      this.editStatusInput.order.reason = "Delivered: " + this.orderDetail.brandname + " " + this.orderDetail.prod_type + "  water cans(" + this.orderDetail.quantity + " qty) with order id: " + this.orderDetail.order_id + " from Moya-The Waterman App, is delivered. Please allow us to serve you better, rate us on playstore: https://play.google.com/store/apps/details?id=com.moya"
    }

    if (this.editStatusInput.order.orderstatus == "rejected") {
      // this.editStatusInput.order.action = "rejected";

      this.editStatusInput.order.reason = "Rejected: " + this.orderDetail.brandname + " " + this.orderDetail.prod_type + "  water cans(" + this.orderDetail.quantity + " qty) with order id: " + this.orderDetail.order_id + " from Moya-The Waterman App, is not delivered as you have rejected the order . You might receive a call from our customer care centre from mobile: 9863636314/15 very soon."
    }

    if (this.editStatusInput.order.orderstatus == "doorlock") {
      // this.editStatusInput.order.action = "doorlock";
      this.editStatusInput.order.reason = "Door Locked: " + this.orderDetail.brandname + " " + this.orderDetail.prod_type + "  water cans(" + this.orderDetail.quantity + " qty) with order id: " + this.orderDetail.order_id + " from Moya-The Waterman App, is still in process. Supplier found the door is locked.Please call our customer care centre at mobile: 9863636314/15 for any queries."
    }

    if (this.editStatusInput.order.orderstatus == "not_reachable") {
      // this.editStatusInput.order.action = "not_reachable";
      this.editStatusInput.order.reason = "Not reachable: " + this.orderDetail.brandname + " " + this.orderDetail.prod_type + "  water cans(" + this.orderDetail.quantity + " qty) with order id: " + this.orderDetail.order_id + " from Moya-The Waterman App, is still in process. Supplier tried to reach you on your mobile:" + this.orderDetail.orderby_mobileno + ", but there was no response. Please call our customer care centre at mobile: 9863636314/15 for any queries."
    }

    // if (this.editStatusInput.order.orderstatus == "cannot_deliver") {
    //   // this.editStatusInput.order.action = "cannot_deliver";
      
    // }



    if (this.editStatusInput.order.bill_amount) {
      this.editStatusInput.order.received_amt = parseInt(this.editStatusInput.order.bill_amount);

    }

    // if(this.emptyCans){
    //   this.editStatusInput.order.return_cans = this.orderDetail.emptyCans;
    // }
    // else{
    //   this.editStatusInput.order.return_cans = this.orderDetail.return_cans;
    // }


    if (this.editStatusInput.order.orderstatus == "delivered") {
      this.editStatusInput.order.paymentype = this.orderDetail.paymenttype


      if (this.editStatusInput.order.paymentype == "credit") {
        this.editStatusInput.order.received_amt = 0;
      }
      if (this.isConfirmed) {
        this.editStatusInput.order.paymentstatus = 'confirm';
      }
    }


    let input = this.editStatusInput;
    console.log(input);
    this.orderLandingService.editOrderStatus(input)
      .subscribe(
        output => this.updateOrderStatusResult(output),
        error => {
          //console.log("error in order details");
          this.loaderService.display(false);
        });
  }

  updateOrderStatusResult(result) {
    this.loaderService.display(false);
    if (result.result == 'success') {

      this.message = "success";
      // this.thisDialogRef.close(this.message);
      this.onCloseModel(this.message)
    }
  }


  // onInit(){
  //   this.editStatusInput.order.return_cans = this.editStatusInput.order.delivered_qty;
  // }
  changeAmount(data) {


    this.orderDetail.delivered_quantity = data;
    this.advanceAmount = ((this.orderDetail.delivered_quantity - this.editStatusInput.order.return_cans) * 150 );
    this.editStatusInput.order.adv_amt = this.advanceAmount;

    // this.advanceAmount = ((this.orderDetail.delivered_quantity - this.emptyCans) * 150 );
    this.editStatusInput.order.adv_amt = this.advanceAmount;

    this.editStatusInput.order.bill_amount = (this.editStatusInput.order.delivered_qty * this.orderDetail.prod_cost) + (this.orderDetail.servicecharges) + this.orderDetail.expressdeliverycharges + (this.advanceAmount);
    if(this.orderDetail.delivered_quantity < this.editStatusInput.order.return_cans){
      this.quantityError = true;
      this.emptyCansError = false;
      // this.emptyCansValidate = false;
    }
    else{
      this.quantityError = false;
    }

  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  onCloseModel(message) {
    this.thisDialogRef.close(this.message)
  }



  // this.editStatusInput.order.delivered_qty * Removed this in below calculation bcz we are getting net serv charges in srvchgs

  amountCalculate(){
    this.editStatusInput.order.bill_amount = (this.editStatusInput.order.delivered_qty * this.orderDetail.prod_cost) + (this.orderDetail.servicecharges) + this.orderDetail.expressdeliverycharges + (((this.orderDetail.delivered_quantity - this.editStatusInput.order.return_cans) * 150 ));
    // this.emptyCans = this.orderDetail.return_cans;
    this.advanceAmount = ((this.orderDetail.delivered_quantity - this.editStatusInput.order.return_cans) * 150 );
    this.editStatusInput.order.adv_amt = this.advanceAmount;


  }

  emptyCansChanged(data){
    this.emptyCans = data;
    this.advanceAmount = ((this.orderDetail.delivered_quantity - this.emptyCans) * 150 );
    this.editStatusInput.order.adv_amt = this.advanceAmount;

    this.editStatusInput.order.bill_amount = (this.editStatusInput.order.delivered_qty * this.orderDetail.prod_cost) + (this.orderDetail.servicecharges) + this.orderDetail.expressdeliverycharges + (this.advanceAmount);
    if(this.emptyCans > this.editStatusInput.order.delivered_qty){
      this.emptyCansError = true;
      this.emptyCansValidate = true;
      this.quantityError = false;

    }
    else{
      this.emptyCansError = false;
      this.emptyCansValidate = false;
      
      
    }


  }

  ngOnInit() {
    //console.log(this.editStatusInput);
    this.editStatusInput.order.paymentype = 'cash';
    if(this.orderDetail.empty_cans === null || this.orderDetail.empty_cans == ''){
      this.orderDetail.empty_cans = 0;
    }
    this.editStatusInput.order.return_cans = this.orderDetail.quantity - this.orderDetail.empty_cans;
    this.amountCalculate();
    // this.editStatusInput.order.bill_amount = this.orderDetail.bill_amount;

    console.log(this.orderDetail);
  }

}
