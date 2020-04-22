import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-paymentreportpreview',
  templateUrl: './paymentreportpreview.component.html',
  styleUrls: ['./paymentreportpreview.component.css']
})
export class PaymentreportpreviewComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<PaymentreportpreviewComponent>) { }

  customersPaymentReports: any = [];
  invoiceNumber: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;
  distributorsPaymentReports: any = [];
  isDesc:boolean = false;
  column:any;

  showPreview() {
    if (this.Details.type == 'customersPaymentReports') {
      this.customersPaymentReports = this.Details.data;
      this.generateInvoiceNumber();
      this.getTotalQuantityOfCustomersPayment();
      this.getTotalAmountOfCustomersPayment();
    }
    else if (this.Details.type == 'distributorsPaymentReports') {
      this.distributorsPaymentReports = this.Details.data;
      this.generateInvoiceNumber();
      this.getTotalQuantityOfDistributorsPayment();
    }
   }

   generateInvoiceNumber() {
    this.invoiceNumber = Math.floor(10000 + Math.random() * 90000)
  }

  getTotalQuantityOfCustomersPayment() {
    let quantityCount = [];
    var total = _.each(this.customersPaymentReports, function (i, j) {
      let details: any = i;
      if (details.quantity) {
        quantityCount.push(details.quantity);
      }
    });
    this.totalQuantity = quantityCount.reduce((a, b) => a + b, 0);
  }

  getTotalAmountOfCustomersPayment() {
    let totalAmountsArray = [];
    var total = _.each(this.customersPaymentReports, function (i, j) {
      let details: any = i;
      if (details.bill_amount) {
        totalAmountsArray.push(details.bill_amount);
      }
    });
    this.totalAmount = totalAmountsArray.reduce((a, b) => a + b, 0);
  }

  getTotalQuantityOfDistributorsPayment() {
    let quantityCount = [];
    var total = _.each(this.distributorsPaymentReports, function (i, j) {
      let details: any = i;
      if (details.quantity) {
        quantityCount.push(details.quantity);
      }
      if(details.status == 'not_broadcasted'){
        details.status = 'Assigned';
      }
    });
    this.totalQuantity = quantityCount.reduce((a, b) => a + b, 0);
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }



  ngOnInit() {
    console.log(this.Details)
    this.showPreview();
  }

}
