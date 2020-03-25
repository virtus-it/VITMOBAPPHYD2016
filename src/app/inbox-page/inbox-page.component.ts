import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'underscore';



@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css']
})
export class InboxPageComponent implements OnInit {

  constructor( private followupService: FollowUpService, public dialog: MdDialog,private authenticationService: AuthenticationService, private loaderService: LoaderService) { }
  AllMessages:any = [];
  noMessages = false;
  filterInput ={"fromDate":null , "toDate":null};
  viewType: any = 'customer';
  customerMessages:any =[];
  isDesc:boolean = false;
  column:any;




  getAllMessages(){
    let input = {"root":{"loginid":this.authenticationService.loggedInUserId(),"fromdate":null,"todate": null,"transtype":"getallmessages" , "apptype" :this.authenticationService.appType()}};
    this.followupService.getAllMessages(input)
      .subscribe(
      output => this.getAllMessagesResult(output),
      error => {
        this.loaderService.display(false);
        //console.log("error in distrbutors");
      });
  }
  getAllMessagesResult(result){
    if(result.result == 'success'){
      this.AllMessages= result.data;
      console.log(this.AllMessages , 'result');
      let messages = [];
      _.each(this.AllMessages , function (i , j){
        let details:any = i;
        if(details.userdetails.user_type == 'customer'){
          messages.push(details); 
        }
      });
      this.customerMessages = messages;
    }
    else{
      this.noMessages = true;
    }
  }
  showOrderDetails(data) {
    let formattedData = {order_id: data.orderid , order_by:data.userid}
    let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {

      width: '95%',
      data: formattedData
    });
    dialogRefShowOrder.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result == 'success'){
      }
    });
  }

  filterMessages(){
    let fromDate = null;
    let toDate = null; 
    if(this.filterInput.fromDate){
    fromDate = moment(this.filterInput.fromDate).format('YYYY-MM-DD 00:00:00');
    }
    else{
      fromDate = null;
    }
    if(this.filterInput.toDate){
      toDate = moment(this.filterInput.toDate).format('YYYY-MM-DD 00:00:00');
    }
    else{
      toDate = null;
    }
    let input = {"root":{"loginid":this.authenticationService.loggedInUserId(),"fromdate":fromDate,"todate": toDate, "apptype" :this.authenticationService.appType()}};
    this.followupService.getAllMessages(input)
      .subscribe(
      output => this.getFilteredMessages(output),
      error => {
        this.loaderService.display(false);
        //console.log("error in distrbutors");
      });
  }
  getFilteredMessages(result){
    if(result.result == 'success'){
      this.AllMessages= result.data;
      this.noMessages = false;
    }
    else{
      this.AllMessages = [];
      this.noMessages = true;
    }
  }
  
  clearFilter(){
    this.AllMessages = [];
    this.getAllMessages();
    this.filterInput ={"fromDate":null , "toDate":null};
  }

  messages(data){
    if(data == 'all'){
      this.viewType = 'all';    
    }
    else{
      this.viewType = 'customer';
    }

  }

  sortTable(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.AllMessages.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('All Messages List');
      console.log(this.AllMessages);
    } else {
      this.isDesc = true;
      this.AllMessages.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }

  ngOnInit() {
    this.getAllMessages();
  }

}
