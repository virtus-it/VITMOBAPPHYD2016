import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-distributor-order-list',
  templateUrl: './distributor-order-list.component.html',
  styleUrls: ['./distributor-order-list.component.css']
})
export class DistributorOrderListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private supplierservice: SupplierService, private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Detail: any,  public thisDialogRef: MdDialogRef<DistributorOrderListComponent>) { }

  SupplierOrderList:any = [];
  ordersClickMore = true;
  



  supplierOrderList(firstcall) {
    this.loaderService.display(true);
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": "supplier", "status": "all", "lastrecordtimestamp": "15", "pagesize": "50", "supplierid": this.Detail.data[0].userid, "customerid": 0, "apptype": this.authenticationService.appType() } }
    if (this.SupplierOrderList && this.SupplierOrderList.length && !firstcall) {
      let lastOrder:any = _.last(this.SupplierOrderList);
      if (lastOrder) {
          input.order.customerid = lastOrder.order_id;
      }

  }
  else {
      this.SupplierOrderList = [];
      input.order.customerid = 0;
  }
    this.supplierservice.supplierOrder(input)
      .subscribe(
      output => this.supplierOrderresult(output),
      error => {
        //console.log("error in supplier order list");
        this.loaderService.display(false);
      });
  }
  supplierOrderresult(result) {
    //console.log(result);
    this.loaderService.display(false);
    if (result.result == "success") {

      this.SupplierOrderList = result.data;
      this.ordersClickMore = false;
    }
    else{
      this.ordersClickMore = false;
    }
  }

    // Getting distributors orders
    getDistributorsOrders() {
      this.loaderService.display(true);
      let input = { "order": { "userid": this.Detail.distributorId , "priority": "5",   "usertype": "dealer", "status": "all", "lastrecordtimestamp": "15", "pagesize": "1", "supplierid": 0, "customerid": 0, "apptype": this.authenticationService.appType() } };
      //console.log(input);
      this.supplierservice.supplierOrder(input)
        .subscribe(
        output => this.distributorOrderresult(output),
        error => {
          //console.log("error in customer");
          this.loaderService.display(false);
        });
    }
    distributorOrderresult(result) {
      //console.log(result);
      if(result.result == "success"){
        this.SupplierOrderList = result.data;
      this.loaderService.display(false);
      }
      else{
        this.ordersClickMore= false;;
      }
  
    }
    onCloseCancel() {
      this.thisDialogRef.close('Cancel');
    }
  
    onInitCheck() {
      if (this.Detail.type == 'supplierOrder') {
        this.supplierOrderList(true);
      }
      else {
        this.getDistributorsOrders();
      }
  
  
    }

  ngOnInit() {
    this.onInitCheck();
  console.log(this.Detail);
  }

}
