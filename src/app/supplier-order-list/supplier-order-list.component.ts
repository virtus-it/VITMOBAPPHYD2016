import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-supplier-order-list',
  templateUrl: './supplier-order-list.component.html',
  styleUrls: ['./supplier-order-list.component.css']
})
export class SupplierOrderListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<SupplierOrderListComponent>, @Inject(MD_DIALOG_DATA) public Detail: any, private supplierservice: SupplierService, private loaderService: LoaderService) { }
  SupplierOrderList = [];
  noRecords= false;
  ordersClickMore = true;
  isDesc:boolean = false;
  column:any;


  supplierOrderList(firstcall) {

    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": "supplier", "status": "all", "lastrecordtimestamp": "15", "pagesize": "50", "supplierid": this.Detail.data.userid, "customerid": 0, "apptype": this.authenticationService.appType() } }
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

    if (result.result == "success") {

      this.SupplierOrderList = result.data;
      this.ordersClickMore = true;
    }
    else{
      this.ordersClickMore = false;
    }
  }
  

  // Getting distributors orders
  getDistributorsOrders() {
    this.loaderService.display(true);
    let input = { "order": { "userid": this.Detail.data.userid, "priority": "5", "usertype": "dealer", "status": "all", "lastrecordtimestamp": "15", "pagesize": "10", "supplierid": 0, "customerid": 0, "apptype": this.authenticationService.appType() } };
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

  getOrdersByPaging(){
    this.supplierOrderList(false);
  }

  sortTable(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.SupplierOrderList.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('SupplierOrder List');
      console.log(this.SupplierOrderList);
    } else {
      this.isDesc = true;
      this.SupplierOrderList.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }

  ngOnInit() {
    // this.supplierOrderList();
    this.onInitCheck();
    console.log(this.Detail);


  }

}