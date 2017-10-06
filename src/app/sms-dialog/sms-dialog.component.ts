import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';
@Component({

  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent implements OnInit {

    constructor(public thisDialogRef: MdDialogRef<SmsDialogComponent>, @Inject(MD_DIALOG_DATA) public smsDetail: any ) { }
    
    orderinput = { orderType: "", fromDate: null , toDate: null };
    OrderTypeDetails = [
        { value: 'all', viewValue: 'All Orders' },
        { value: 'ordered', viewValue: 'Unassign Orders' },
        { value: 'delivered', viewValue: 'Delivered Orders' },
        { value: 'assigned', viewValue: 'Pending Orders' }
    ];
    getMobileNumber(){
     
      let input =  { type: this.orderinput.orderType, fromdate: null , todate: null };
    input.fromdate = moment(this.orderinput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    input.todate = moment(this.orderinput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
      console.log(this.orderinput);
    };

  ngOnInit() {
  }

}
