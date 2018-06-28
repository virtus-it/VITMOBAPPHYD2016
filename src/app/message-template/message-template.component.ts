import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FollowUpService } from '../follow-up/follow-up.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css']
})
export class MessageTemplateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<MessageTemplateComponent> ,  @Inject(MD_DIALOG_DATA) public Details: any , private followupService : FollowUpService , private loaderService: LoaderService,  private authenticationService: AuthenticationService) { }

  dynamicMessages:any = [];
  customerMessages1 = [];
  distributorMessages1 = [];
  message:any = [];
  DetailData:any = [];
  type = 'customer';
  // divText:any = "";
//  messageDetails= [{ message : "Order Received: Thank you for placing an order with Moya-The Waterman App. We will process your request shortly."},

//  {message  : "Order Confirmed: " + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty)  with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is CONFIRMED by the Supplier. Please call our customer care center at mobile: 9863636314/15 for any queries."},
 
//  {message : "Order In-process: Your order is still in process. We are yet to receive a confirmation from the Supplier near your delivery location. You might receive a call from our customer care center from mobile: 9863636314/15 ."} , 
 
//  {message : "Out for Delivery: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, will be delivered soon by the Supplier. To save your time, please keep the empty bottle/s ready for return." },

//  {message: "Delivered: "  + this.Details.brandname  + " "+ this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is DELIVERED. Please allow us to serve you better, rate us on Playstore:  https://play.google.com/store/apps/details?id=com.moya"},

//  {message: "Door Lock: "  + this.Details.brandname + " " + this.Details.prod_type +  " water cans ("+this.Details.quantity + " qty) with Order ID: "+ this.Details.order_id + " from Moya-The Waterman App, is still in process. Supplier found the door is locked. Please call our customer care center at mobile: 9863636314/15 for any queries."},

//  {message : "Rejected: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans ("+this.Details.quantity + " qty) with Order ID: " + this.Details.order_id + " from Moya-The Waterman App, is not delivered as you have REJECTED the order. You might receive a call from our customer care center from mobile : 9863636314/15 very soon."},

//  {message: "Not Reachable: "  + this.Details.brandname + " " + this.Details.prod_type + " water cans (" + this.Details.quantity + " qty) with Order ID: "+ this.Details.order_id + " from Moya-The Waterman App, is still in process. Supplier tried to reach you on your mobile: " + this.Details.customer.mobileno + ", but there was no response. Please call our customer care center at mobile: 9863636314/15 for any queries."}, 
//  {message: "Cant Deliver:  "  + this.Details.brandname + " " + this.Details.prod_type + " water cans (" + this.Details.quantity  + " qty) with Order ID: "  + this.Details.order_id + "from Moya-The Waterman App, is still in process. Assigned supplier could not deliver your order. We will process your request and assign it to other supplier. Please call our customer care center at mobile: 9863636314/15",
//  }]
  



selectTemplate(details){
console.log(details);

if(details === null || details == ''){
  details = "no reason error";
  this.closeDialog(details);
}
else{
  this.closeDialog(details);
}

}

getMessageTemplatesDynamically(){
  let input = {"User":{"apptype":this.authenticationService.appType() , "loginid":this.authenticationService.loggedInUserId(), "transtype":"getordertemplates" } };
  console.log('input' , input)
  this.followupService.followUpTemplate(input)
        .subscribe(
        output => this.getDynamicMessagesResult(output),
        error => {
          this.loaderService.display(false);
        });

}
getDynamicMessagesResult(result){
  
  if(result.result == 'success'){
    this.dynamicMessages = result.data;
    let replace = this.Details;
    let customerMessages = [];
     let distributorMessages = [];
    let temp_desc = _.each(this.dynamicMessages , function(i, j){
      let details:any = i;
      if(details.type == 'Customer'){
     details.template_desc = details.template_desc.replace("<<CUSTOMER_NAME>>" , replace.orderby_firstname);
     details.template_desc = details.template_desc.replace("<<ORDER_ID>>" , replace.order_id);
     details.template_desc = details.template_desc.replace("<<ORDER_QUANTITY>>" , replace.quantity);
     details.template_desc = details.template_desc.replace("<<PRODUCT_NAME>>" , replace.brandname);
     details.template_desc = details.template_desc.replace("<<PRODUCT_TYPE>>" , replace.prod_type);
     details.template_desc = details.template_desc.replace("<<CUSTOMER_PHNO>>" , replace.orderby_mobileno);
     customerMessages.push(details);
      }
      else if(details.type == 'Distributor'){
        details.template_desc = details.template_desc.replace("<<CUSTOMER_NAME>>" , replace.orderby_firstname);
        details.template_desc = details.template_desc.replace("<<ORDER_ID>>" , replace.order_id);
        details.template_desc = details.template_desc.replace("<<ORDER_QUANTITY>>" , replace.quantity);
        details.template_desc = details.template_desc.replace("<<PRODUCT_NAME>>" , replace.brandname);
        details.template_desc = details.template_desc.replace("<<PRODUCT_TYPE>>" , replace.prod_type);
        details.template_desc = details.template_desc.replace("<<CUSTOMER_PHNO>>" , replace.orderby_mobileno);
        distributorMessages.push(details);
      }
     

    });

    console.log(result);
    this.customerMessages1 = customerMessages;
    this.distributorMessages1 = distributorMessages;
    // if(this.type == 'customer'){
    //   this.dynamicMessages =  customerMessages;
    // }
    // else{
    //   this.dynamicMessages =  distributorMessages;
    // }


  }
}

changeType(e){
  if(e == 'distributor'){
    this.dynamicMessages =  this.distributorMessages1;
  }
  else{
    this.dynamicMessages =  this.customerMessages1;
    
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
    this.DetailData = this.Details;
    this.getMessageTemplatesDynamically();

  }

}




// copyDiv(event){
// console.log(event.target.innerText);
// // this.divText = JSON.stringify(event.target.innerText);
// this.closeDialog();
//   }
