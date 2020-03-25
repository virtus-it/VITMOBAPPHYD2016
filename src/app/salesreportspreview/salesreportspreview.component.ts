import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-salesreportspreview',
  templateUrl: './salesreportspreview.component.html',
  styleUrls: ['./salesreportspreview.component.css']
})
export class SalesreportspreviewComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<SalesreportspreviewComponent>) { }

  
  invoiceNumber: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0;
  distributorsSalesReports: any = [];
  fromdate:any;
  todate:any;
  totalamount:any;

  showPreview() {
  
    if (this.Details.type == 'distributorSalesReport') {
      this.distributorsSalesReports = this.Details.data;
      this.fromdate = moment(this.Details.Fromdate).format('YYYY-MM-DD');
      this.todate = moment(this.Details.Todate).format('YYYY-MM-DD');
      this.generateInvoiceNumber();
      this.getTotalQuantityOfDistributorsOrders();
    }
    
  }

  generateInvoiceNumber() {
    this.invoiceNumber = Math.floor(10000 + Math.random() * 90000)
  }

  getTotalQuantityOfDistributorsOrders() {
    let quantityCount = [];
    var total = _.each(this.distributorsSalesReports, function (i, j) {
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
