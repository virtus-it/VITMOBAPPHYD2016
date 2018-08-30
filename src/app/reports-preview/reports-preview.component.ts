import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as _ from 'underscore';



@Component({
  selector: 'app-reports-preview',
  templateUrl: './reports-preview.component.html',
  styleUrls: ['./reports-preview.component.css']
})
export class ReportsPreviewComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<ReportsPreviewComponent>) { }

  customersOrdersReports: any = [];
  invoiceNumber: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;
  distributorsOrdersReports: any = [];
  distributorsStockReports: any = [];
  categoryStockReports :any = [];
  distributorsCategoryStockReports :any = [];


  showPreview() {
    if (this.Details.type == 'customerOrderReports') {
      this.customersOrdersReports = this.Details.data;
      this.generateInvoiceNumber();
      this.getTotalQuantityOfCustomersOrders();
      this.getTotalAmountOfCustomersOrders();
    }
    else if (this.Details.type == 'distributorOrderReports') {
      this.distributorsOrdersReports = this.Details.data;
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
    });
    this.totalQuantity = quantityCount.reduce((a, b) => a + b, 0);
  }



  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    this.showPreview();
  }

}
