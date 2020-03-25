import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-raisereportspreview',
  templateUrl: './raisereportspreview.component.html',
  styleUrls: ['./raisereportspreview.component.css']
})
export class RaisereportspreviewComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<RaisereportspreviewComponent>) { }

  customersOrdersReports: any = [];
  invoiceNumber: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;
  distributorsOrdersReports: any = [];
  distributorsStockReports: any = [];
  categoryStockReports :any = [];
  distributorsCategoryStockReports :any = [];
  fromdate:any;
  todate:any;
  totalamount:any;

  showPreview() {
    if (this.Details.type == 'customerOrderReports') {
      this.customersOrdersReports = this.Details.data;
      this.generateInvoiceNumber();
      this.getTotalQuantityOfCustomersOrders();
      this.getTotalAmountOfCustomersOrders();
    }
    else if (this.Details.type == 'distributorOrderReports') {
      this.distributorsOrdersReports = this.Details.data;
      this.fromdate = moment(this.Details.Fromdate).format('YYYY-MM-DD');
      this.todate = moment(this.Details.Todate).format('YYYY-MM-DD');
      this.generateInvoiceNumber();
      this.getTotalQuantityOfDistributorsOrders();
    }
    else if (this.Details.type == 'distributorStockReport') {
      this.distributorsStockReports = this.Details.data;
    }
    else if(this.Details.type == 'categoryStockReport'){
      this.categoryStockReports = this.Details.data;
    }
    else if(this.Details.type == 'distributorCategoryStockReport'){
      this.distributorsCategoryStockReports = this.Details.data;
    }
    else if(this.Details.type == 'salesTeamProductsReport'){

    }
  }

  calculateTotalBillAmt(){
    let billAmt =0;
    for(let i =0 ; i < this.Details.data.length; i++){
      billAmt = billAmt + this.Details.data[i].bill_amount;
    }
    return billAmt; 
  }

  calculateTotalRecivedAmt(){
    let revicedAmt = 0;
      for(let i =0 ; i < this.Details.data.length; i++){
        revicedAmt = revicedAmt + this.Details.data[i].receivedamount;
      }
      return revicedAmt;
   }

  generateInvoiceNumber() {
    this.invoiceNumber = Math.floor(10000 + Math.random() * 90000)
  }

  getTotalQuantityOfCustomersOrders() {
    let quantityCount = [];
    var total = _.each(this.customersOrdersReports, function (i, j) {
      let details: any = i;
      if (details.quantity) {
        quantityCount.push(details.quantity);
      }
    });
    this.totalQuantity = quantityCount.reduce((a, b) => a + b, 0);
  }

  getTotalAmountOfCustomersOrders() {
    let totalAmountsArray = [];
    var total = _.each(this.customersOrdersReports, function (i, j) {
      let details: any = i;
      if (details.bill_amount) {
        totalAmountsArray.push(details.bill_amount);
      }
    });
    this.totalAmount = totalAmountsArray.reduce((a, b) => a + b, 0);
  }

  getTotalQuantityOfDistributorsOrders() {
    let quantityCount = [];
    var total = _.each(this.distributorsOrdersReports, function (i, j) {
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
    this.showPreview();
  }

}
