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
  productsDetails:any = [];
  productID = "";
  productMessage = false;
  noRecord = false;
  categoryId :any = "";
  assignCategoryId='';
  amount:any = 0;
  categoryName:any = "";
  emptyCanMessage = "";
  emptyCans = 0;
  totalcost = 0;
  serviceCharges = 0;
  expressDeliveryCharges = 0;
  productCost = 0;
  quantity = 0;
  productQuantity = 0;
  emptyCansKeyUp:boolean = false;
  expressDeliveryCheck:boolean = false;
  emptyCanAmount1 = 0;
  // emptycans:any = 0;
  // order update input 
  //{"order":{"orderid":"22067","loginid":"289","productid":"1831","product_name":"Kinley","quantity":"1","product_cost":"50","product_type":"dummy product","apptype":"moya"}}
  getProductsList() {
    this.loaderService.display(true);
  if(this.orderDetail.orderDetails){
    if(this.orderDetail.type == 'customersPage'){
    this.orderDetail.orderDetails.order_by = this.orderDetail.disributorId;
  }
}
else if(this.orderDetail.type == 'coveragePage'){
      this.orderDetail.data.orders.order_by = this.orderDetail.data.orders.customer.userid
     }
     else if(this.orderDetail.type == 'assignfromOrderDetails'){
    this.orderDetail.orderDetails.order_by = this.orderDetail.disributorId;
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
    else if(this.orderDetail.type == 'assignfromOrderDetails'){
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
          this.productList[0].quantity = this.orderDetail.orderDetails.quantity;
          this.productList[0].emptycans = this.orderDetail.orderDetails.enteredEmptyCans;
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
    

    this.productsDetails = _.find(this.productList, function (e: any) { return e.productid == id; });
    let orderId= '';
    if(this.orderDetail.type == "coveragePage"){
      orderId = this.orderDetail.data.orders.order_id;
    }
    else if(this.orderDetail.type == 'customersPage'){
      orderId = this.orderDetail.orderDetails.order_id;
    }
    else if(this.orderDetail.type == 'assignfromOrderDetails'){
      orderId = this.orderDetail.orderDetails.order_id;
    }
    else{
      orderId = this.orderDetail.orderDetails.order_id;
    }

    if(this.orderDetail.orderDetails && this.orderDetail.orderDetails.empty_cans){
    this.productsDetails.emptycans = this.orderDetail.orderDetails.empty_cans;
    }
    else{
      this.productsDetails.emptycans = 0;
    }
    if(this.emptyCans){
      this.productsDetails.emptycans = this.emptyCans;
    }


    let input = { "order": { "orderid": orderId, "loginid": this.authenticationService.loggedInUserId(), "productid": this.productsDetails.productid, "product_name": this.productsDetails.brandname, "quantity": this.productsDetails.quantity, "product_cost": this.productsDetails.pcost, "product_type": this.productsDetails.ptype, "apptype": this.authenticationService.appType() , "expressdeliverycharges": 0,"servicecharges": (this.productsDetails.servicecharge)*(this.productsDetails.quantity) , "emptycans":(this.emptyCans) , "advance_amt": 150 * this.emptyCans }};


if(this.productsDetails.expressCheck == true){
  input.order.expressdeliverycharges = this.productsDetails.expressdeliverycharges;
}


    console.log(input);

    this.orderLandingService.updateQuantity(input)
      .subscribe(
      output => this.setProductsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  setProductsResult(result) {
    //console.log(result);
    if (result.result = 'success') {

      this.thisDialogRef.close('success');
    }
  }

  expressDeliveryCharge(product,  isChecked: boolean){
 
    if(isChecked == true){
      if(product.productid){
      this.amount = product.expressdeliverycharges;
    }
  }
    else{
      this.amount = 0;
    }

    this.totalcost = (this.quantity * this.productCost) + (this.amount) + (this.serviceCharges * this.quantity) + ((this.emptyCans) * 150)

  
  }


 


  changeQuantity(products , data){
    console.log(data , products);
    
    if(this.orderDetail.type == 'coveragePage'){
    _.each(this.productList, function (i, j) {
      let details: any = i;
      details.quantity = 0;
    });
    products.quantity = this.orderDetail.data.orders.quantity;
    products.emptycans = 0;
  }
  else if (this.orderDetail.type == 'customersPage'){
  _.each(this.productList, function (i, j) {
    let details: any = i;
    details.quantity = 0;
  });
  products.quantity = this.orderDetail.orderDetails.quantity;
  products.emptycans = this.emptyCans;
}
else if (this.orderDetail.type == 'assignfromOrderDetails'){
  _.each(this.productList, function (i, j) {
    let details: any = i;
    details.quantity = 0;
  });
  products.quantity = this.orderDetail.orderDetails.quantity;
  products.emptycans = this.emptyCans;
}
else{
  _.each(this.productList, function (i, j) {
    let details: any = i;
    details.quantity = 0;
  });
  products.quantity = this.orderDetail.orderDetails.quantity;
  products.emptycans = 0;
}

    this.productCost = products.pcost;
    this.serviceCharges = products.servicecharge;
    this.quantity = products.quantity;
    // if(this.expressDeliveryCheck == true){
    //   this.expressDeliveryCharges = this.productsDetails.expressdeliverycharges;
    // }
    // else{
    //   this.expressDeliveryCharges = 0;
    // }
    this.totalcost = (this.quantity * this.productCost) + (this.amount) + (this.serviceCharges * this.quantity) + ((this.emptyCans) * 150)


}



changeOfQuantity(data){
  if(data){
  this.quantity = data;
  // if(this.expressDeliveryCheck == true){
  //   this.expressDeliveryCharges = this.productsDetails.expressdeliverycharges;
  // }
  // else{
  //   this.expressDeliveryCharges = 0;
  // }
  this.totalcost = (this.quantity * this.productCost) + (this.amount) + (this.serviceCharges * this.quantity) + (( this.emptyCans) * 150)
}
// else{
//   this.quantity = this.productQuantity;
// }
}

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }
  Closedailog() {
    this.thisDialogRef.close('success');
  }




  emptyCansChange(data){
    console.log(data);
    this.emptyCans = data;
    this.totalcost = (this.quantity * this.productCost) + (this.amount) + (this.serviceCharges * this.quantity) + ((this.emptyCans) * 150)
    let cases: string = "1";
    switch(cases){
      case '1': {
        if(this.quantity >= data){
             this.emptyCanMessage= "";
             this.emptyCansKeyUp = false;
            }
      }
      case '2' : {
        if(this.quantity < data) {
          this.emptyCanMessage= "Empty cans must be less than quantity";
          this.emptyCansKeyUp = true;
        }
      }
      case '3' :{
        if(this.quantity > data){
          this.emptyCanMessage= "";
          this.emptyCansKeyUp = false;
        }
      }
      default : {
        if(this.quantity >= data){
          this.emptyCanMessage= "";
          this.emptyCansKeyUp = false;
         }
    
      }
    }
  }

  ngOnInit() {
   
    console.log(this.orderDetail);

    if(this.orderDetail.type == 'customersPage' && ( this.orderDetail.orderDetails.enteredEmptyCans || this.orderDetail.orderDetails.enteredEmptyCans == 0 )){
       this.emptyCans = this.orderDetail.orderDetails.enteredEmptyCans ;
    }
    else if (this.orderDetail.type == 'customersPage'){
      this.emptyCans = (this.orderDetail.orderDetails.empty_cans)
    }
    else if (this.orderDetail.type == 'coveragePage') {
    this.emptyCans = (this.orderDetail.data.orders.empty_cans);
    }
    else if (this.orderDetail.type == 'assignfromOrderDetails'){
      this.emptyCans =(this.orderDetail.orderDetails.empty_cans);
    }
    // else if (this.orderDetail.type == 'customersPage'){
    //   this.emptyCans =(this.orderDetail.orderDetails.enteredEmptyCans);
    // }
    else{
      this.emptyCans = 0;
    }
    
    this.emptyCanAmount1  = ((this.quantity - this.emptyCans)  * 150);
    this.getProductsList();

  }

}
