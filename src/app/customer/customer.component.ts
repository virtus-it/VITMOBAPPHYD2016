import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {CustomerOrderListComponent} from '../customer-order-list/customer-order-list.component';
import {CustomerPlaceorderDailogComponent} from '../customer-placeorder-dailog/customer-placeorder-dailog.component';
import {CustomerResendInvitationComponent} from '../customer-resend-invitation/customer-resend-invitation.component';
import {CustomerMakeInactiveComponent} from '../customer-make-inactive/customer-make-inactive.component';
import {CustomerSettingDailogComponent} from '../customer-setting-dailog/customer-setting-dailog.component';
import {CustomerSetPaymentCycleComponent} from '../customer-set-payment-cycle/customer-set-payment-cycle.component';
import {CustomerScheduleDaiolgComponent} from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
@Component({
  
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
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
showEditCustomer(){
  let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {
    
                    width: '700px',
                    data: ''
                });
                dialogRefEditCustomer.afterClosed().subscribe(result => {
                    console.log(`Dialog closed: ${result}`);
    
    
                });

}
showAddCustomer(){
  let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {
    
                    width: '700px',
                    data: ''
                });
                dialogRefEditCustomer.afterClosed().subscribe(result => {
                    console.log(`Dialog closed: ${result}`);
    
    
                });

}
  ngOnInit() {
  }

}
