import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public thisDialogRef: MdDialogRef<InvoicedetailsComponent>, @Inject(MD_DIALOG_DATA) public Detail: any, private authenticationService: AuthenticationService, private reportservice: ReportsService) { }

  messageSent = false;
  getErrorMessage() {
    return this.email.hasError('required') ? 'Enter EmailId' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  sendInvoice() {
    let input = this.Detail;
    this.reportservice.raiseInvoice(input)
      .subscribe(
      output => this.sendInvoiceResult(output),
      error => {
        console.log("error");

      });

  }
  sendInvoiceResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.messageSent = true;
    }
  }
  ngOnInit() {
    console.log(this.Detail);
}

}
