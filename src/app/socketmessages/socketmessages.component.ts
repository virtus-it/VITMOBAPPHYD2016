import { Component, OnInit,Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialog } from '@angular/material';
@Component({
  selector: 'app-socketmessages',
  templateUrl: './socketmessages.component.html',
  styleUrls: ['./socketmessages.component.css']
})
export class SocketmessagesComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<SocketmessagesComponent>, @Inject(MD_DIALOG_DATA) public details: any, public dialog: MdDialog) { }
  MessageInfo:any="";
  getMessageDetails(){
console.log(this.details);
if(this.details && this.details.data.orderid){

this.MessageInfo = "Order Created Order ID :" + this.details.data.orderid;
}
else if(this.details && this.details.data.order){
  this.MessageInfo = "Received Message from Order ID :" + this.details.data.order.orderid +" Message : "+this.details.data.order.reason;

}
else if(this.details && this.details.data.orderdetails){
  this.MessageInfo = "Received Feedback From Customer :" + this.details.data.userdetails.firstname + "("+this.details.data.userdetails.mobileno+") Message :" +this.details.data.orderdetails.root.subject;

}

  }
  onCloseModal(message) {
    this.thisDialogRef.close(message);
  }
  ngOnInit() {
    this.getMessageDetails();
  }

}
