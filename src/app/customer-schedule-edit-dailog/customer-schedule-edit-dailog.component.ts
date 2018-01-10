import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-schedule-edit-dailog',
  templateUrl: './customer-schedule-edit-dailog.component.html',
  styleUrls: ['./customer-schedule-edit-dailog.component.css']
})
export class CustomerScheduleEditDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private customerservice: CustomerService,private loaderService: LoaderService, public thisDialogRef: MdDialogRef<CustomerScheduleEditDailogComponent> ) { }
  scheduleOrdersList=[];

  
//View schedule orders

  viewScheduleOrders(){
    let input:any = { "userId":this.authenticationService.loggedInUserId(),"usertype":this.authenticationService.userType(), "appType": this.authenticationService.appType(), "dealerid":this.authenticationService.loggedInUserId() };
    console.log(input);

    this.customerservice.viewScheduleOrders(input)
    .subscribe(
    output => this.viewScheduleOrdersResult(output),
    error => {
      console.log("error in View schedules");
      this.loaderService.display(false);
    });
  }
  viewScheduleOrdersResult(result) {
    console.log(result);
    if (result.result == "success") {
      this.scheduleOrdersList =result.data;
    }
  }

  //Edit and update schedule orders

  updatingScheduleOrder(){
    this.loaderService.display(false);
    let input: any = {"User":{"userid":this.authenticationService.loggedInUserId(), "apptype":this.authenticationService.appType() }}
    console.log(input);
    this.customerservice.updateScheduleOrder(input)
    .subscribe(
      output => this.updateScheduleOrderResult(output),
      error => {
        console.log("error in updation of suppliers");
        this.loaderService.display(false);
      });
    }
    updateScheduleOrderResult(result) {
      console.log(result);
      if (result.result == 'success') {
      this.thisDialogRef.close('success');
      }
  
    }

    //Delete scheduled order

    

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.viewScheduleOrders();
  }

}
