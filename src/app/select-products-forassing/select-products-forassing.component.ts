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
  productMessage = false;
  noRecord = false;
  categoryId :any = "";
  assignCategoryId='';
  categoryName:any = "";
  // order update input 
  //{"order":{"orderid":"22067","loginid":"289","productid":"1831","product_name":"Kinley","quantity":"1","product_cost":"50","product_type":"dummy product","apptype":"moya"}}
  getProductsList() {
    this.loaderService.display(true);
    // if(this.orderDetail.orderDetails.type = "customersPage"){
    //   this.orderDetail.orderDetails.order_by = this.orderDetail.orderDetails.data.userid;
    // }
  //   if(this.orderDetail.orderDetails){
  //   if( this.orderDetail.type == "customersPage"){
  //     this.orderDetail.orderDetails.order_by = this.orderDetail.orderDetails.userid;
  //   }
  // }
  //   else if(this.orderDetail.type == 'coveragePage'){
  //     this.orderDetail.data.orders.order_by = this.orderDetail.data.orders.customer.userid
  //   }
  //   else{
  //   this.orderDetail.orderDetails.order_by = this.orderDetail.orderDetails.ordersfrom;
  //   }
  //   let UserId:any = '';
  //   if(this.orderDetail.type='coveragePage'){
  //    UserId = this.orderDetail.data.orders.order_by;
  //   }
  //   else if(this.orderDetail.type == "customersPage"){
  //     UserId = this.orderDetail.orderDetails.order_by;
  //   }
  //   else{
  //     UserId = this.orderDetail.orderDetails.order_by;
  //   }
   


  if(this.orderDetail.orderDetails){
    if(this.orderDetail.type == 'customersPage'){
    this.orderDetail.orderDetails.order_by = this.orderDetail.disributorId;
  }
}
else if(this.orderDetail.type == 'coveragePage'){
      this.orderDetail.data.orders.order_by = this.orderDetail.data.orders.customer.userid
     }
     else{
       this.orderDetail.orderDetails.order_by = this.orderDetail.orderDetails.ordersfrom;
        }

        let UserId:any = '';
    if(this.orderDetail.type =='coveragePage'){
     UserId = this.orderDetail.data.orders.order_by;
    }
    else if(this.orderDetail.type == "customersPage"){
      UserId = this.orderDetail.orderDetails.order_by;
    }
    else{
      UserId = this.orderDetail.orderDetails.order_by;
    }


    let input = { apptype: this.authenticationService.appType(), userid:UserId, delearId: this.orderDetail.disributorId }
 
    console.log(input);

    this.distributorService.getProductsList(input)
      .subscribe(
      output => this.getProductsListResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  getProductsListResult(result) {
    console.log("distributor products list", result);
    if (result.result == 'success') {
      this.noRecord=false;
      let productListCopy = [];
      _.each(result.data.products, function (i, j) {
        let details: any = i;
        let customerProduct = _.find(result.data.customerproducts, function (e: any) { return e.productid == details.productid; });
        if (customerProduct) {
          customerProduct.quantity = "0";
          customerProduct.expressCheck = false;
          
          productListCopy.push(customerProduct);

        }
        else {
          details.quantity = "0";
          details.expressCheck = false;
          productListCopy.push(details);
        }

      });
      if(this.orderDetail.type !== 'coveragePage'){
      var orderDetailCategoryId = this.orderDetail.orderDetails.categoryid;
      var orderDetailBrandName = this.orderDetail.orderDetails.brandName;
      }
      let productid = '';
        _.each(result.data.products , function (i, j) {
          let details: any = i;
          if(details.categoryid == orderDetailCategoryId){
           // category = details.categoryid;
           if(details.brandname == orderDetailBrandName){
            productid = details.productid;
          }

          }
         
        });
       this.productID =productid;
      this.productList = productListCopy;
      if(this.productID){
        if(this.productID  == productid){
          this.productMessage = false;
        }
        else{
               this.productMessage = true;
            }
      }
      else{
        this.productMessage = true;
      }
    }


      // if(this.orderDetail.orderDetails.prod_id){
      //   let id = this.orderDetail.orderDetails.prod_id;
      //   let catId = this.orderDetail.orderDetails.categoryid;
      //   let productsDetails = _.find(this.productList, function (e: any) { return e.productid == id; });
      //   if(productsDetails){
      //   this.productMessage= false;
      //   this.productID = id.toString();
      //   // category = category.toString();
      //   productsDetails.quantity = this.orderDetail.orderDetails.quantity;
      //   }
      //   else{
      //     this.productMessage = true;
      //   }
        
        
      // }
      
      //console.log(" this.productList", this.productList);
      
 
    
    else{
      this.noRecord = true;
    }
    
    
    
  }

  
  setProducts() {
    let id = this.productID;

    let productsDetails = _.find(this.productList, function (e: any) { return e.productid == id; });
let orderId= '';
    if(this.orderDetail.type == "coveragePage"){
      orderId = this.orderDetail.data.orders.order_id;
    }
    else if(this.orderDetail.type == 'customersPage'){
      orderId = this.orderDetail.orderDetails.order_id;
    }
    else{
      orderId = this.orderDetail.orderDetails.order_id;
    }

    
    let input = { "order": { "orderid": orderId, "loginid": this.authenticationService.loggedInUserId(), "productid": productsDetails.productid, "product_name": productsDetails.brandname, "quantity": productsDetails.quantity, "product_cost": productsDetails.pcost, "product_type": productsDetails.ptype, "apptype": this.authenticationService.appType() , "servicecharges": productsDetails.servicecharge , "expressdeliverycharges": 0 } };

    
if(productsDetails.expressCheck == true){
  input.order.expressdeliverycharges = productsDetails.expressdeliverycharges;
}

    console.log(input);

    // this.orderLandingService.updateQuantity(input)
    //   .subscribe(
    //   output => this.setProductsResult(output),
    //   error => {
    //     //console.log("error in distrbutors");
    //     this.loaderService.display(false);
    //   });
  }
  setProductsResult(result) {
    //console.log(result);
    if (result.result = 'success') {

      this.thisDialogRef.close('success');
    }
  }
  changeQuantity(products){
    if(this.orderDetail.type == 'coveragePage'){
    _.each(this.productList, function (i, j) {
      let details: any = i;
      details.quantity = 0;
    });
    products.quantity = this.orderDetail.data.orders.quantity;
  }
  else if (this.orderDetail.type == 'customersPage'){
  _.each(this.productList, function (i, j) {
    let details: any = i;
    details.quantity = 0;
  });
  products.quantity = this.orderDetail.orderDetails.quantity;
}
else{
  _.each(this.productList, function (i, j) {
    let details: any = i;
    details.quantity = 0;
  });
  products.quantity = this.orderDetail.orderDetails.quantity;
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
