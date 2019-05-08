import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-unknown-orders',
  templateUrl: './unknown-orders.component.html',
  styleUrls: ['./unknown-orders.component.css']
})
export class UnknownOrdersComponent implements OnInit {
  completeOrders: any;
  globalFilterInput = { "order": { "pagesize": "30", "searchtype": "orderid", "status": "all", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0", "loginid": this.authenticationService.loggedInUserId(),transtype: 'getorderssearch' } };

  constructor(private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, private orderLandingService: OrderLandingService, private supplierservice: SupplierService, private loaderService: LoaderService, private router: Router, private productService: ProductsService, public thisDialogRef: MdDialogRef<UnknownOrdersComponent>,
    public dialog: MdDialog) { }

  search() {
    if (!this.globalFilterInput.order.searchtext) {
      return false;
    }
    console.log(this.globalFilterInput);
    this.orderLandingService.getOrdersByfilter(this.globalFilterInput).subscribe(output => {
      if (output && output.data) {
        this.completeOrders = output.data;
        console.log(this.completeOrders);
      }
    },
      error => {
        console.log(error)
      }
    );
  }

  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  showLog(order) {
    console.log(order);
  }
  ngOnInit() {
    console.log("CALL API");
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: 289, pagesize: 30, last_orderid: null, apptype: this.authenticationService.appType(), createdthru: 'website', transtype: 'getorders' } };
    this.orderLandingService.getOrderList(input).subscribe(output => {
      if (output && output.data) {
        this.completeOrders = output.data;
        console.log(this.completeOrders);
      }
    },
      error => {
        console.log(error)
      }
    );
  }

}
