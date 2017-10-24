import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from './order-landing.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { EditQuantityDailogComponent } from '../edit-quantity-dailog/edit-quantity-dailog.component';
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
  showOrderDetails() {
    let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {

      width: '90%',
      data: ''
    });
    dialogRefShowOrder.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  editQuanity() {
    let dialogRefEditQun = this.dialog.open(EditQuantityDailogComponent, {

      width: '500px',
      data: ''
    });
    dialogRefEditQun.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  getForwardOrderDetails() {
    this.orderListInput.order.status = 'forwardedorders';
    if (this.forwardOrders && this.forwardOrders.length) {
      let lastForwardOrder: any = _.last(this.forwardOrders);
      if (lastForwardOrder) {
        this.orderListInput.order.last_orderid = lastForwardOrder.orderId;
      }

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
    this.forwardOrders = result.data;
  }
  getAllOrderDetails() {
    this.orderListInput.order.status = 'all';
    if (this.allOrders && this.allOrders.length) {
      let lastAllOrder: any = _.last(this.allOrders);
      if (lastAllOrder) {
        this.orderListInput.order.last_orderid = lastAllOrder.orderId;
      }

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
    this.allOrders = result.data;
  }
  ngOnInit() {
    this.getForwardOrderDetails();
    this.getAllOrderDetails();
  }

}
