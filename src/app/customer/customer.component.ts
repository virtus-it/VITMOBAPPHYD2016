import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CustomerOrderListComponent } from '../customer-order-list/customer-order-list.component';
import { CustomerPlaceorderDailogComponent } from '../customer-placeorder-dailog/customer-placeorder-dailog.component';
import { CustomerResendInvitationComponent } from '../customer-resend-invitation/customer-resend-invitation.component';
import { CustomerMakeInactiveComponent } from '../customer-make-inactive/customer-make-inactive.component';
import { CustomerSettingDailogComponent } from '../customer-setting-dailog/customer-setting-dailog.component';
import { CustomerSetPaymentCycleComponent } from '../customer-set-payment-cycle/customer-set-payment-cycle.component';
import { CustomerScheduleDaiolgComponent } from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
@Component({

    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    constructor(public dialog: MdDialog, private authenticationService: AuthenticationService, private customerService: CustomerService,private loaderService: LoaderService ) { }
    customerClickMore = true;
    customerList: any = [];
    showOrderList() {
        let dialogRefOrderList = this.dialog.open(CustomerOrderListComponent, {
            width: '90%',
            data: ''
        });
        dialogRefOrderList.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showPlaceOrder() {
        let dialogRefPlaceorder = this.dialog.open(CustomerPlaceorderDailogComponent, {
            width: '700px',
            data: ''
        });
        dialogRefPlaceorder.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showResendInvitation() {
        let dialogRefResend = this.dialog.open(CustomerResendInvitationComponent, {
            width: '600px',
            data: ''
        });
        dialogRefResend.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showInactive() {
        let dialogRefInactive = this.dialog.open(CustomerMakeInactiveComponent, {
            width: '600px',
            data: ''
        });
        dialogRefInactive.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSetting() {
        let dialogRefSetting = this.dialog.open(CustomerSettingDailogComponent, {
            width: '810px',
            data: ''
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSetPayment() {
        let dialogRefSetting = this.dialog.open(CustomerSetPaymentCycleComponent, {
            width: '700px',
            data: ''
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSchedule() {
        let dialogRefSetting = this.dialog.open(CustomerScheduleDaiolgComponent, {
            width: '700px',
            data: ''
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showEditCustomer(customerDetails) {
        let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

            width: '700px',
            data: customerDetails
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    showAddCustomer() {
        let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

            width: '700px',
            data: ''
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    showFollowUp(details) {
        console.log(details);
        let data = {id:details.userid,firstname :details.firstname,lastName :details.lastname,type:"customer","mobileno":details.mobileno};
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {
    
          width: '80%',
          data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
    
    
        });
    
      }
      showFollowUpDetails(details) {
        let data = {id:details.userid,firstname :details.firstname,lastName :details.lastname,type:"customer","mobileno":details.mobileno};
        let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {
    
          width: '80%',
          data: data
        });
        dialogRefFollowDetails.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
    
    
        });
    
      }
    getCustomerList(firstcall) {
        this.loaderService.display(true);
        let input = { userId: this.authenticationService.loggedInUserId(), lastId: 0, userType: this.authenticationService.userType(), appType: this.authenticationService.appType() };
        if (this.customerList && this.customerList.length && !firstcall) {
            let lastCustomer: any = _.last(this.customerList);
            if (lastCustomer) {
                input.lastId = lastCustomer.userid;
            }

        }
        else {
            this.customerList = [];
            input.lastId = 0;
        }
        console.log(input);
        this.customerService.getCustomerList(input)
        .subscribe(
        output => this.getCustomerListResult(output),
        error => {
          console.log("error in customer");
          this.loaderService.display(false);
        });
    }
    getCustomerListResult(result) {
      
        this.loaderService.display(false);
        if(result.result== 'success'){
           this.customerList = _.union(this.customerList, result.data);
        }
        else{
            this.customerClickMore = false;
        }
       
    }
    ngOnInit() {
        this.getCustomerList(true);
    }

}
