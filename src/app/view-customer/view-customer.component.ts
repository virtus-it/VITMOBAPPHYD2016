import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { CustomerService } from '../customer/customer.service';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialog } from '@angular/material';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { CustomerScheduleDaiolgComponent } from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import {CustomerScheduleEditDailogComponent} from '../customer-schedule-edit-dailog/customer-schedule-edit-dailog.component';



@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor(public dialog: MdDialog,public thisDialogRef: MdDialogRef<ViewCustomerComponent>, private authenticationService: AuthenticationService,  @Inject(MD_DIALOG_DATA) public Detail: any, private loaderService: LoaderService, private customerService: CustomerService,) { }


  customersList:any =[];
  noRecords= false;


  getCustomerList() {
    this.loaderService.display(true);
    let input= {"userId":this.Detail.userid,"lastId":0,"userType":"dealer","appType":this.authenticationService.appType()}
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
    console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.customersList = result.data;
    }
    else{
      this.noRecords = true;
    }
  }

  showEditCustomer(data) {
    console.log(data);
    let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

        width: '700px',
        data: data
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if (result == 'success'){
          this.getCustomerList();
        }

    });

}

showSchedule(data){
  let formatteddata:any = {"type":"create", "data":data, customerId:data.userid, customerName:data.firstname }
  let dialogRefSetting = this.dialog.open(CustomerScheduleDaiolgComponent, {
      width: '700px',
      data: formatteddata
  });
  dialogRefSetting.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
  });

}

viewScheduledOrders(data){
  let dialogRefSetting = this.dialog.open(CustomerScheduleEditDailogComponent , {
    width: "60%",
    data: data
});
dialogRefSetting.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);

});
}


showFollowUp(details) {
  console.log(details);
  let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "customer", "mobileno": details.mobileno };
  let dialogRefFollow = this.dialog.open(FollowUpComponent, {

      width: '80%',
      data: data
  });
  dialogRefFollow.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


  });

}
  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
    this.getCustomerList();

  }

}
