import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import * as _ from 'underscore';

@Component({

  templateUrl: './select-products-forassing.component.html',
  styleUrls: ['./select-products-forassing.component.css']
})
export class SelectProductsForassingComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<SelectProductsForassingComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, private loaderService: LoaderService, private orderLandingService: OrderLandingService) { }
  productList = [];
  productID = "";

  // order update input 
  //{"order":{"orderid":"22067","loginid":"289","productid":"1831","product_name":"Kinley","quantity":"1","product_cost":"50","product_type":"dummy product","apptype":"moya"}}
  getProductsList() {
    this.loaderService.display(true);
    let input = { apptype: this.authenticationService.appType(), userid: this.orderDetail.orderDetails.ordersfrom, delearId: this.orderDetail.disributorId }

    this.distributorService.getProductsList(input)
      .subscribe(
      output => this.getProductsListResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  getProductsListResult(result) {
    console.log("distributor products list", result);
    if (result.result == 'success') {
      let productListCopy = [];
      _.each(result.data.products, function (i, j) {
        let details: any = i;
        let customerProduct = _.find(result.data.customerproducts, function (e: any) { return e.productid == details.productid; });
        if (customerProduct) {
          productListCopy.push(customerProduct);

        }
        else {
          productListCopy.push(details);
        }

      });
      this.productList = productListCopy;
      console.log(" this.productList", this.productList);

    }
  }
  setProducts() {
    let productsDetails = _.find(this.productList, function (e: any) { return e.productid == this.productID; });
    let input = { "order": { "orderid": this.orderDetail.orderDetails.order_id, "loginid": this.authenticationService.loggedInUserId(), "productid": productsDetails.productid, "product_name": productsDetails.brandname, "quantity": productsDetails.quantity, "product_cost": productsDetails.pcost, "product_type": productsDetails.ptype, "apptype": this.authenticationService.appType() } };
    this.orderLandingService.updateQuantity(input)
      .subscribe(
      output => this.setProductsResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  setProductsResult(result) {
    console.log(result);
    if (result.result = 'success') {

      this.thisDialogRef.close('success');
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }
  Closedailog() {
    this.thisDialogRef.close('success');
  }
  ngOnInit() {
    console.log(this.orderDetail);
    this.getProductsList();
  }

}
