import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css']
})
export class MessageTemplateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<MessageTemplateComponent> ,  @Inject(MD_DIALOG_DATA) public Details: any) { }

  // divText:any = "";
 messageDetails= [{ message : "Order Received: Thank you for placing an order with Moya-The Waterman App. We will process your request shortly."},

 {message  : "Order Confirmed: " + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty)  with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is CONFIRMED by the Supplier. Please call our customer care center at mobile: 9863636314/15 for any queries."},
 
 {message : "Order In-process: Your order is still in process. We are yet to receive a confirmation from the Supplier near your delivery location. You might receive a call from our customer care center from mobile: 9863636314/15 ."} , 
 
 {message : "Out for Delivery: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, will be delivered soon by the Supplier. To save your time, please keep the empty bottle/s ready for return." },

 {message: "Delivered: "  + this.Details.brandname  + " "+ this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is DELIVERED. Please allow us to serve you better, rate us on Playstore:  https://play.google.com/store/apps/details?id=com.moya"},

 {message: "Door Lock: "  + this.Details.brandname + " " + this.Details.prod_type +  " water cans ("+this.Details.quantity + " qty) with Order ID: "+ this.Details.order_id + " from Moya-The Waterman App, is still in process. Supplier found the door is locked. Please call our customer care center at mobile: 9863636314/15 for any queries."},

 {message : "Rejected: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is not delivered as you have REJECTED the order. You might receive a call from our customer care center from mobile : 9863636314/15 very soon."},

 {message: "Not Reachable: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans (" + this.Details.quantity + " qty) with Order ID: "+ this.Details.order_id + " from Moya-The Waterman App, is still in process. Supplier tried to reach you on your mobile: " + this.Details.customer.mobileno + ", but there was no response. Please call our customer care center at mobile: 9863636314/15 for any queries."}, 
 {message: "Cant Deliver:  "  + this.Details.brandname + " " + this.Details.prod_type + " water cans (" + this.Details.quantity  + " qty) with Order ID: "  + this.Details.order_id + "from Moya-The Waterman App, is still in process. Assigned supplier could not deliver your order. We will process your request and assign it to other supplier. Please call our customer care center at mobile: 9863636314/15",
 }]
  
// copyDiv(event){
// console.log(event.target.innerText);
// // this.divText = JSON.stringify(event.target.innerText);
// this.closeDialog();
//   }


getMessage(details){
console.log(details);

if(details === null || details == ''){
  details = "no reason error";
  this.closeDialog(details);
}
else{
  this.closeDialog(details);
}

}

  onCloseModal(){
    this.thisDialogRef.close('');
  }

closeDialog(details){
  this.thisDialogRef.close(details);
}
  ngOnInit() {
    console.log(this.Details);
  }

}
