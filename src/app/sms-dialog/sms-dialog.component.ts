import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SmsServiceService } from '../sms/sms-service.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import * as moment from 'moment';
@Component({

  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<SmsDialogComponent>, @Inject(MD_DIALOG_DATA) public smsDetail: any, private smsService: SmsServiceService, private authenticationService: AuthenticationService) { }

  orderinput = { orderType: "", fromDate: null, toDate: null };
  smsInput = { name: "", mobilenumber: [], body: "" };
  mobileDetails = [];
  OrderTypeDetails = [
    { value: 'all', viewValue: 'All Orders' },
    { value: 'ordered', viewValue: 'Unassign Orders' },
    { value: 'delivered', viewValue: 'Delivered Orders' },
    { value: 'assigned', viewValue: 'Pending Orders' }
  ];
  getMobileNumber() {
    let input = {
      User: {
        "user_type": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), type: this.orderinput.orderType,
        "apptype": this.authenticationService.appType(), fromdate: null, todate: null
      }
    };

    input.User.fromdate = moment(this.orderinput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    input.User.todate = moment(this.orderinput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    this.smsService.getMobileNumbers(input)
      .subscribe(
      output => this.getMobileNumberResult(output),
      error => {
        console.log("error in distrbutors");
      });
  }
  getMobileNumberResult(result) {
    console.log(result);
    let mobile = [];
    if (result && result.data && result.data.length) {
      _.each(result.data, function (i, j) {
        let details: any = i;
        let mobiles = { mobileno: details.mobileno, gcm_regid: details.gcm_regid, };
        mobile.push(mobiles);

      });

      this.mobileDetails = mobile;
    }
  }
  onChangeCheck(number: any, isChecked: boolean) {
    

     if (isChecked) {
         this.smsInput.mobilenumber.push(number);
         
     } else {
         this.smsInput.mobilenumber = _.without(this.smsInput.mobilenumber, number);
         
     }
 }
  saveMobileSms() {
    console.log(this.smsInput);
    let createSmsInput = {
      "User": {
        "mobilenumber": this.smsInput.mobilenumber,
        "count": this.smsInput.mobilenumber.length,
        "name": this.smsInput.name,
        "user_type":this.authenticationService.userType(),
        "TransType": "createsms",
        "type": this.orderinput.orderType,
        "loginid": this.authenticationService.loggedInUserId(),
        "apptype": this.authenticationService.appType(),
        "body": this.smsInput.body
      }
    }
    console.log(createSmsInput);
    this.smsService.CreateSms(createSmsInput)
    .subscribe(
    output => this.saveMobileSmsResult(output),
    error => {
      console.log("error in distrbutors");
    });
  }
  saveMobileSmsResult(result){
console.log(result);
this.thisDialogRef.close(result);
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}


  ngOnInit() {
   
  }

}
