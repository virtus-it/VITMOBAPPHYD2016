import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from './order-landing.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { EditQuantityDailogComponent } from '../edit-quantity-dailog/edit-quantity-dailog.component';
import { OrderCoverageDetailDailogComponent } from '../order-coverage-detail-dailog/order-coverage-detail-dailog.component';
import * as _ from 'underscore';
@Component({

  templateUrl: './order-landing.component.html',
  styleUrls: ['./order-landing.component.css']
})
export class OrderLandingComponent implements OnInit {

  constructor(public dialog: MdDialog, private authenticationService: AuthenticationService,private distributorService: DistributorServiceService, private orderLandingService: OrderLandingService) { }
  orderListInput = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "", "pagesize": 10, "last_orderid": null, "apptype": this.authenticationService.appType(), "createdthru": "website" } };
  tabPanelView: string = "forward";
  forwardOrders: any = [];
  allOrders: any = [];
  forwardClickMore = true;
  orderClickMore = true;
  polygonArray = [];
  showTabPanel(panelName) {
    this.tabPanelView = panelName;

  }
  showEditCustomer(orderDetails) {
    let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

      width: '700px',
      data: orderDetails
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  showCoverageDetails(orderDetails) {
    let modelData = {orders:orderDetails,polygons:this.polygonArray}
    let dialogRefCoverageDailog = this.dialog.open(OrderCoverageDetailDailogComponent, {
      width: '95%',
      data: modelData
    });
    dialogRefCoverageDailog.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result == 'success'){
      this.getForwardOrderDetails(true);
      this.getAllOrderDetails(true);
      }

    });

  }
  showOrderDetails(orderData) {
    let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {

      width: '90%',
      data: orderData
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
      if (result == 'success') {
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
    else {
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
    if (result.data && result.data.length > 0) {
      _.each(result.data, function (i, j) {
        let details: any = i;
        if (details.status == "onhold") {
          details.OrderModifiedStatus = "On Hold";
          details.StatusColor = "warning";
        }
        else if (details.status.toLowerCase() == "cancelled") {
          details.OrderModifiedStatus = "Cancelled";
          details.StatusColor = "danger";
        }
        else if (details.status.toLowerCase() == "rejected") {
          details.OrderModifiedStatus = "Rejected";
          details.StatusColor = "danger";
        }
        else if (details.status == "assigned") {
          details.OrderModifiedStatus = "Re-Assign";
          details.StatusColor = "primary";
        }
        else if (details.status.toLowerCase() == "delivered") {
          details.OrderModifiedStatus = "Delivered";
          details.StatusColor = "success";
        }
        else if (details.status == "doorlock" || details.status == "Door Locked") {
          details.OrderModifiedStatus = "Door Locked";
          details.StatusColor = "warning";
        }
        else if (details.status == "cannot_deliver" || details.status == "Cant Deliver") {
          details.OrderModifiedStatus = "Cant Deliver";
          details.StatusColor = "warning";
        }
        else if (details.status == "Not Reachable" || details.status == "not_reachable") {
          details.OrderModifiedStatus = "Not Reachable";
          details.StatusColor = "warning";
        }
        else if (details.status == "pending" ) {
          details.OrderModifiedStatus = "Pending";
          details.StatusColor = "primary";
        }
        else if (details.status == "ordered" || details.status == "backtodealer" ) {
          details.OrderModifiedStatus = "Assign";
          details.StatusColor = "primary";
        }
        

      });
      this.forwardClickMore = true;
      this.forwardOrders = _.union(this.forwardOrders, result.data);
    }
    else {
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
    else {
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
    if (result.data && result.data.length > 0) {
      _.each(result.data, function (i, j) {
        let details: any = i;
        if (details.status == "onhold") {
          details.OrderModifiedStatus = "On Hold";
          details.StatusColor = "warning";
        }
        else if (details.status.toLowerCase() == "cancelled") {
          details.OrderModifiedStatus = "Cancelled";
          details.StatusColor = "danger";
        }
        else if (details.status.toLowerCase() == "rejected") {
          details.OrderModifiedStatus = "Rejected";
          details.StatusColor = "danger";
        }
        else if (details.status == "assigned") {
          details.OrderModifiedStatus = "Re-Assign";
          details.StatusColor = "primary";
        }
        else if (details.status.toLowerCase() == "delivered") {
          details.OrderModifiedStatus = "Delivered";
          details.StatusColor = "success";
        }
        else if (details.status == "doorlock" || details.status == "Door Locked") {
          details.OrderModifiedStatus = "Door Locked";
          details.StatusColor = "warning";
        }
        else if (details.status == "cannot_deliver" || details.status == "Cant Deliver") {
          details.OrderModifiedStatus = "Cant Deliver";
          details.StatusColor = "warning";
        }
        else if (details.status == "Not Reachable" || details.status == "not_reachable") {
          details.OrderModifiedStatus = "Not Reachable";
          details.StatusColor = "warning";
        }
        else if (details.status == "pending" ) {
          details.OrderModifiedStatus = "Pending";
          details.StatusColor = "primary";
        }
        else if (details.status == "ordered" || details.status == "backtodealer" ) {
          details.OrderModifiedStatus = "Assign";
          details.StatusColor = "primary";
        }
        

      });
      this.orderClickMore = true;
      this.allOrders = _.union(this.allOrders, result.data);
    }
    else {
      this.orderClickMore = false;
    }
  }
  getPolygonDistributors() {
    
            var input = { area: { user_type: "dealer", user_id: "0", "apptype": this.authenticationService.appType() } };
            this.distributorService.getpolygonByDistributor(input)
                .subscribe(
                output => this.getPolygonDataResult(output),
                error => {
                    console.log("falied");
                });
        }
        getPolygonDataResult(output) {
            
            if (output.data && output.data.length > 0) {
                for (let data of output.data) {
    
                    if (data.polygonvalue && data.polygonvalue.length > 0) {
                        for (let polygon of data.polygonvalue) {
                            polygon.color = '';
                            polygon.user_id = data.user_id;
                            polygon.distributorName = data.username;
                            polygon.supplier = data.suppliers;
                            polygon.mobileno = data.mobileno;
                            this.polygonArray.push(polygon);
                            
                        }
                    }
    
                }
            }
        }
  refreshOrders(){
    this.getForwardOrderDetails(true);
    this.getAllOrderDetails(true);
    this.getPolygonDistributors();
  }
  ngOnInit() {
    this.getPolygonDistributors();
    this.getForwardOrderDetails(true);
    this.getAllOrderDetails(true);
  }

}
