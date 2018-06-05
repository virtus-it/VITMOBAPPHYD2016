import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { SupplierService} from '../supplier/supplier.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { OrderLandingService } from '../order-landing/order-landing.service';


@Component({
  selector: 'app-deliverpreorder',
  templateUrl: './deliverpreorder.component.html',
  styleUrls: ['./deliverpreorder.component.css']
})
export class DeliverpreorderComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<DeliverpreorderComponent>,  private loaderService: LoaderService, private supplierservice :SupplierService, private authenticationService: AuthenticationService,  private orderLandingService: OrderLandingService, @Inject(MD_DIALOG_DATA) public Detail: any) { }

  deliverPreOrderInput : any ={"paymentType":"cash", "confirmPayment": false , suppliersid: "" , "pending_amount":this.Detail.pending_amount, "adv_amt":this.Detail.adv_amt};
  
  supplierList = [];
  SupplierListCopy = [];
  paymentCod: boolean= true;
  emptyCanMessage = "";
  emptyCansKeyUp:boolean = false;



  //Get supplier list 
  getSupplierList(){
    let input = {  "userId":this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
    this.supplierservice.supplierList(input)
    .subscribe(
    output => this.getSupplierListResult(output),
    error => {
      //console.log("error in feedbacklist");
      this.loaderService.display(false);
    });
  }
  getSupplierListResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.supplierList =result.data;
      this.SupplierListCopy=result.data;
     
    }
  }

  confirmDeliverOrder(){
    if(this.Detail.order.adv_amt == '' || this.Detail.order.adv_amt === null){
    this.Detail.order.adv_amt = 0;
    }
    else{
      this.deliverPreOrderInput.adv_amt = this.Detail.order.adv_amt;
    }

    this.Detail.order.received_amt = this.Detail.order.total_amt;

    this.Detail.order.paymentmode = this.deliverPreOrderInput.paymentType;
    // if(this.Detail.order.paymentmode == 'credit'){
    // this.Detail.order.paymentstatus = "";
    // }

    if(this.Detail.order.paymentmode == 'credit'){
      this.Detail.order.paymentype = "credit";
    }
    else{
      this.Detail.order.paymentype = 'cash';
    }

    if(this.deliverPreOrderInput.suppliersid === null || this.deliverPreOrderInput.suppliersid ==''){
      this.Detail.order.assignedto = 0 ;
    }
    else{
      this.Detail.order.assignedto = this.deliverPreOrderInput.suppliersid;
    }

 
    if(this.Detail.order.paymentmode == 'cash' && this.deliverPreOrderInput.confirmPayment){
      this.Detail.order.paymentstatus = "confirm";
    }
    else{
      this.Detail.order.paymentstatus = "";
    }
    if(this.Detail.order.paymentmode == 'credit'){
      this.Detail.order.received_amt = 0 ;
    }

    if(this.Detail.order.delivered_qty){
      this.Detail.order.delivered_qty = this.Detail.order.delivered_qty;
    }
  


    let input =[];
    input.push(this.Detail);
    console.log(input);
    this.orderLandingService.createPreOrder(input)
  .subscribe(
    output => this.createPreOrderResult(output),
    error => {
      //console.log("falied");
      this.loaderService.display(false);
    });

  }
  createPreOrderResult(result) {
    console.log(result);
    if(result.result=='success'){
      this.thisDialogRef.close('success');
    }

    }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  amountChange(object){
    this.Detail.order.total_amt =  this.Detail.order.product_cost * object + this.Detail.order.prodServiceCharge  * object  + this.Detail.order.expressdeliverycharges;
    this.Detail.order.amt =  this.Detail.order.product_cost * object + this.Detail.order.prodServiceCharge * object   + this.Detail.order.expressdeliverycharges;

  }

  totalAmount(){
    this.Detail.order.total_amt =  this.Detail.order.product_cost * this.Detail.order.delivered_qty   + this.Detail.order.prodServiceCharge * this.Detail.order.delivered_qty + this.Detail.order.expressdeliverycharges;
    this.Detail.order.amt = this.Detail.order.product_cost  * this.Detail.order.delivered_qty + this.Detail.order.prodServiceCharge * this.Detail.order.delivered_qty  + this.Detail.order.expressdeliverycharges;
  }


  // emptyCansValidation(event){
  //   if(this.Detail.order.return_cans > event){
  //     this.emptyCansMessage = "";
  //   }
  //   else {
  //     this.emptyCansMessage = "Return cans must be less than delivered quantity";
  //   }
  // }



  emptyCansValidation(event){
    let cases: string = "1";
    switch(cases){
      case '1': {
        if(this.Detail.order.delivered_qty >= event){
             this.emptyCanMessage= "";
             this.emptyCansKeyUp = false;
            }
      }
      case '2' : {
        if(this.Detail.order.delivered_qty < event) {
          this.emptyCanMessage= "Empty cans must be less than quantity";
          this.emptyCansKeyUp = true;
        }
      }
      case '3' :{
        if(this.Detail.order.delivered_qty > event){
          this.emptyCanMessage= "";
          this.emptyCansKeyUp = false;
        }
      }
      default : {
        if(this.Detail.order.delivered_qty >= event){
          this.emptyCanMessage= "";
          this.emptyCansKeyUp = false;
         }
    
      }
    }
    }

  ngOnInit() {
    if(this.Detail.order.adv_amt > 0){
      this.Detail.order.adv_amt = 0;
    }

    console.log(this.Detail);
    this.getSupplierList();
    // this.totalAmount();
  }

}
