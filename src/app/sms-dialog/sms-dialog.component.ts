import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
@Component({

  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent implements OnInit {

    constructor(public thisDialogRef: MdDialogRef<SmsDialogComponent>, @Inject(MD_DIALOG_DATA) public smsDetail: any ) { }
    
    orderinput = { orderType: "", fromDate: new Date(), toDate: new Date()};
    OrderTypeDetails = [
        { value: 'all', viewValue: 'All Orders' },
        { value: 'ordered', viewValue: 'Unassign Orders' },
        { value: 'delivered', viewValue: 'Delivered Orders' },
        { value: 'assigned', viewValue: 'Pending Orders' }
    ];
  ngOnInit() {
  }

}
