import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-supplier-order-list',
  templateUrl: './supplier-order-list.component.html',
  styleUrls: ['./supplier-order-list.component.css']
})
export class SupplierOrderListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<SupplierOrderListComponent>, @Inject(MD_DIALOG_DATA) public Detail: any, private supplierservice: SupplierService, private loaderService: LoaderService) { }
  SupplierOrderList = [];
  noRecords= false;



  supplierOrderList() {

    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": "supplier", "status": "all", "lastrecordtimestamp": "15", "pagesize": "10", "supplierid": this.Detail.data.userid, "customerid": 0, "apptype": this.authenticationService.appType() } }
    this.supplierservice.supplierOrder(input)
      .subscribe(
      output => this.supplierOrderresult(output),
      error => {
        console.log("error in supplier order list");
        this.loaderService.display(false);
      });
  }
  supplierOrderresult(result) {
    console.log(result);
    if (result.result == "success") {
      this.SupplierOrderList = result.data;
    }
  }

  // Getting distributors orders
  getDistributorsOrders() {
    this.loaderService.display(true);
    let input = { "order": { "userid": this.Detail.data.userid, "priority": "5", "usertype": "dealer", "status": "all", "lastrecordtimestamp": "15", "pagesize": "10", "supplierid": 0, "customerid": 0, "apptype": this.authenticationService.appType() } };
    console.log(input);
    this.supplierservice.supplierOrder(input)
      .subscribe(
      output => this.distributorOrderresult(output),
      error => {
        console.log("error in customer");
        this.loaderService.display(false);
      });
  }
  distributorOrderresult(result) {
    console.log(result);
    if(result.result == "success"){
      this.SupplierOrderList = result.data;
    this.loaderService.display(false);
    }
    else{
      this.noRecords= true;
    }

  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  onInitCheck() {
    if (this.Detail.type == 'supplierOrder') {
      this.supplierOrderList();
    }
    else {
      this.getDistributorsOrders();
    }


  }

  ngOnInit() {
    // this.supplierOrderList();
    this.onInitCheck();
    console.log(this.Detail);


  }

}