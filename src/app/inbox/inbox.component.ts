import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private orderLandingService: OrderLandingService, public thisDialogRef: MdDialogRef<InboxComponent>,public dialog: MdDialog, private followupService: FollowUpService, private loaderService: LoaderService,private authenticationService: AuthenticationService) { }

  AllMessages:any = [];
  dailogOrderDetails: any = {};
  filteredData:any = [];

  filterInput ={"fromDate":null , "toDate":null};
  noMessages = false;
  





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
    }
    else{
      this.noMessages = true;
    }
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
    }
    else{
      this.AllMessages = [];
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

  clearFilter(){
    this.getAllMessages();
    this.filterInput ={"fromDate":null , "toDate":null};
  }



  onCloseCancel(){
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
    this.getAllMessages();
    // this.orderDetail.order_id = 
  }

}
