import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
@Component({

  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

    constructor(public dialog: MdDialog) { }
    openSmsDialog() {
        let dialogRef = this.dialog.open(SmsDialogComponent, {
            width: '700px',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            
            
        });
    }
  ngOnInit() {
  }

}
