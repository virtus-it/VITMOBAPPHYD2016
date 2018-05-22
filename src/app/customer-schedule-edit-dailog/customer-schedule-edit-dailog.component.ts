import { Component, OnInit,Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { LoaderService } from '../login/loader.service';
import {DeleteScheduledOrderComponent} from '../delete-scheduled-order/delete-scheduled-order.component';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { CustomerScheduleDaiolgComponent } from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';


@Component({
  selector: 'app-customer-schedule-edit-dailog',
  templateUrl: './customer-schedule-edit-dailog.component.html',
  styleUrls: ['./customer-schedule-edit-dailog.component.css']
})
export class CustomerScheduleEditDailogComponent implements OnInit {

  constructor(public dialog: MdDialog, private authenticationService: AuthenticationService,private customerservice: CustomerService,private loaderService: LoaderService, public thisDialogRef: MdDialogRef<CustomerScheduleEditDailogComponent>,@Inject(MD_DIALOG_DATA) public Detail: any, ) { }
  scheduleOrdersList=[];
  noRecord=false;


  
//View schedule orders

  viewScheduleOrders(){
    let input:any = { "userId":this.Detail.userid,"userType":this.authenticationService.userType(), "appType": this.authenticationService.appType(), "dealerid":this.authenticationService.loggedInUserId() };
    this.loaderService.display(true);
    //console.log(input);

    this.customerservice.viewScheduleOrders(input)
    .subscribe(
    output => this.viewScheduleOrdersResult(output),
    error => {
      //console.log("error in View schedules");
      
    });
  }
  viewScheduleOrdersResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.scheduleOrdersList =result.data;
      this.loaderService.display(false);
      this.noRecord=false;
    }
   else{
     this.scheduleOrdersList =[];
     this.loaderService.display(false);
     this.noRecord = true;
     //console.log("No schedule orders");
   }
  }

  // Edit schedule dialog box
  editSchedule(data) {
    //console.log(data);
    let formatteddata:any = {"type":"update", "data":data, customerId:this.Detail.userid, customerName:this.Detail.firstname }
    let dialogRefSetting = this.dialog.open(CustomerScheduleDaiolgComponent, {
        width: '700px',
        data: formatteddata
    });
    dialogRefSetting.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
        if(result == 'success'){
          this.viewScheduleOrders();
        }
    });
  }

  //Edit and update schedule orders

  updatingScheduleOrder(){
    
    let input: any = {"User":{"userid":this.authenticationService.loggedInUserId(), "apptype":this.authenticationService.appType() }}
    this.loaderService.display(true);
    //console.log(input);
    this.customerservice.updateScheduleOrder(input)
    .subscribe(
      output => this.updateScheduleOrderResult(output),
      error => {
        //console.log("error in updation of suppliers");
      });
    }
    updateScheduleOrderResult(result) {
      //console.log(result);
      if (result.result == 'success') {
        this.loaderService.display(false);
      this.thisDialogRef.close('success');
      }
  
    }

    //Delete scheduled order

    deleteSchedule(data){
      //console.log(data);
      let dialogRefSetting = this.dialog.open(DeleteScheduledOrderComponent, {
        width: '700px',
        data: data
    });
    dialogRefSetting.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
        //this.dialogResult = result;
        if (result == 'success') {
          this.scheduleOrdersList =[];
     //console.log("No schedule orders");
        }
        this.viewScheduleOrders();
        
    });

    }

    

    

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.viewScheduleOrders();
    console.log(this.Detail);

    // this.openDialog();


  }

}
