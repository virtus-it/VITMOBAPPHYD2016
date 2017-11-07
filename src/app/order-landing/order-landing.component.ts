import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from './order-landing.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { EditQuantityDailogComponent } from '../edit-quantity-dailog/edit-quantity-dailog.component';
import { OrderCoverageDetailDailogComponent } from '../order-coverage-detail-dailog/order-coverage-detail-dailog.component';
import * as _ from 'underscore';
@Component({

  templateUrl: './order-landing.component.html',
  styleUrls: ['./order-landing.component.css']
})
export class OrderLandingComponent implements OnInit {

  constructor(public dialog: MdDialog, private authenticationService: AuthenticationService, private orderLandingService: OrderLandingService) { }
  orderListInput = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "", "pagesize": 10, "last_orderid": null, "apptype": this.authenticationService.appType(), "createdthru": "website" } };
  tabPanelView: string = "forward";
  forwardOrders: any = [];
  allOrders: any = [];
  forwardClickMore = true;
  orderClickMore = false;
  showTabPanel(panelName) {
    this.tabPanelView = panelName;

  }
  showEditCustomer() {
    let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  showCoverageDetails(orderDetails) {
    let dialogRefCoverageDailog = this.dialog.open(OrderCoverageDetailDailogComponent, {
      width: '95%',
      data: orderDetails
    });
    dialogRefCoverageDailog.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.getForwardOrderDetails(true);
      this.getAllOrderDetails(true);

    });

  }
  showOrderDetails() {
    let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {

      width: '90%',
      data: ''
    });
    dialogRefShowOrder.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  editQuanity(orderDetails) {
    let dialogRefEditQun = this.dialog.open(EditQuantityDailogComponent, {

      width: '500px',
      data: orderDetails
    });
    dialogRefEditQun.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result == 'success'){
        this.getForwardOrderDetails(true);
        this.getAllOrderDetails(true);
      
      }

    });

  }
  getForwardOrderDetails(firstcall) {
    this.orderListInput.order.status = 'forwardedorders';
    if (this.forwardOrders && this.forwardOrders.length && !firstcall) {
      let lastForwardOrder: any = _.last(this.forwardOrders);
      if (lastForwardOrder) {
        this.orderListInput.order.last_orderid = lastForwardOrder.order_id;
      }

    }
    else{
      this.forwardOrders = [];
      this.orderListInput.order.last_orderid = null;
    }
    let forwardInput = this.orderListInput
    this.orderLandingService.getOrderList(forwardInput)
      .subscribe(
      output => this.getForwardOrderDetailsResult(output),
      error => {
        console.log("error in distrbutors");
      });
  }
  getForwardOrderDetailsResult(result) {
   // this.forwardOrders = result.data;
    console.log(this.forwardOrders);
    if(result.data && result.data.length > 0){
      this.forwardClickMore = true;
      this.forwardOrders = _.union(this.forwardOrders,result.data);
      }
      else{
        this.forwardClickMore = false;
      }
  }
  getAllOrderDetails(firstcall) {
    this.orderListInput.order.status = 'all';
    if (this.allOrders && this.allOrders.length && !firstcall) {
      let lastAllOrder: any = _.last(this.allOrders);
      if (lastAllOrder) {
        this.orderListInput.order.last_orderid = lastAllOrder.order_id;
      }
      

    }
    else{
      this.allOrders = [];
      this.orderListInput.order.last_orderid = null;
    }
    let orderInput = this.orderListInput;
    this.orderLandingService.getOrderList(orderInput)
      .subscribe(
      output => this.getAllOrderDetailsResult(output),
      error => {
        console.log("error in distrbutors");
      });
  }
  getAllOrderDetailsResult(result) {
  //  this.allOrders = result.data;
    console.log(this.allOrders);
    if(result.data && result.data.length > 0){
      this.orderClickMore = true;
    this.allOrders = _.union(this.allOrders,result.data);
    }
    else{
      this.orderClickMore = false;
    }
  }
  ngOnInit() {
    this.getForwardOrderDetails(true);
    this.getAllOrderDetails(true);
  }

}
