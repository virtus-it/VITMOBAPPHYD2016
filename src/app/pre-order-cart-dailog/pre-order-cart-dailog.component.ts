import { Component, OnInit,Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import {DeliverpreorderComponent} from '../deliverpreorder/deliverpreorder.component';
import { FormControl, Validators } from '@angular/forms';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { Observable } from 'rxjs/Observable';

import { OrderLandingComponent} from '../order-landing/order-landing.component';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';


@Component({
  selector: 'app-pre-order-cart-dailog',
  templateUrl: './pre-order-cart-dailog.component.html',
  styleUrls: ['./pre-order-cart-dailog.component.css']
})
export class PreOrderCartDailogComponent implements OnInit {
  stateCtrl: FormControl;
  filteredDistributor: Observable<any[]>;
  constructor(public dialog: MdDialog,public thisDialogRef: MdDialogRef<PreOrderCartDailogComponent>,   private authenticationService: AuthenticationService, private distributorService: DistributorServiceService,   private orderLandingService: OrderLandingService, private loaderService: LoaderService, private productService: ProductsService, @Inject(MD_DIALOG_DATA) public Details: any) {
    this.stateCtrl = new FormControl();
    this.filteredDistributor = this.stateCtrl.valueChanges

    

    .startWith(null)
      .map(dist => dist ? this.filterDistributors(dist) : this.distributors.slice());
   }
   FormControl = new FormControl('', [
    Validators.required]);

   distributors: any = [];
   productList = [];
   disableSlot = false;
   //input
   createPreOrderInput: any = {"timeslot":"" , date:null ,productDetails:{}}
    minDate = new Date() ;
    maxDate = new Date(2020, 0, 1);



    
    
    
    //FilterInputs
  filter: any = { "distributorid": "" };
 


  //input  for deliver preorder


  deliverPreOrder() {
    let data ={"order":{"orderstatus":"delivered","assignedto":"2140",
    "paymentstatus":true,
    "return_cans": this.createPreOrderInput.productDetails.quantity ,"paymentmode":"cash",
    "received_amt":"","quantity":this.createPreOrderInput.productDetails.quantity,"total_items":this.createPreOrderInput.productDetails.quantity,"ispreorder":true,
    "orderto":this.Details.dealers.user_id , "orderfrom":this.Details.userid,"productid":this.createPreOrderInput.productDetails.productid,"product_quantity":this.createPreOrderInput.productDetails.ptype,
    "product_type":this.createPreOrderInput.productDetails.ptype,"product_cost":this.createPreOrderInput.productDetails.pcost,"amt":this.createPreOrderInput.productDetails.pcost ,"total_amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost),"cart_style":"new",
    "delivery_address":this.Details.address, "excepted_time":"" , "ispreorderby":"dealer","loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}
    
    }
    console.log(data);
    let dialogRefEditCustomer = this.dialog.open(DeliverpreorderComponent, {

        width: '600px',
        data: data
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if(result == "success"){
          this.thisDialogRef.close('success');
        }

    });

}

//getting distributors


getDistributors() {
  let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
  console.log(input);
  this.distributorService.getAllDistributors(input)
    .subscribe(
    output => this.getDistributorsResult(output),
    error => {
      console.log("error in distrbutors");
    });
}
getDistributorsResult(data) {
  console.log(data);
  if (data.result == 'success') {
    let distributorCopy = [];

    if (data.data && data.data.length) {
      _.each(data.data, function (i, j) {
        let details: any = i;
        details.fullName = details.firstname + " " + details.lastname
        distributorCopy.push(details);

      });
      this.distributors = distributorCopy;
    }
  }
}

//filtered distributors

filterDistributors(name: string) {
  console.log(name);
  let finalDistributors = this.distributors.filter(dist =>
    dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  console.log(finalDistributors);
  if (finalDistributors && finalDistributors.length > 0) {
    let findDistributor: any = {};

    findDistributor = _.find(finalDistributors, function (k, l) {
      let distDetails: any = k;
      return distDetails.fullName == name;
    });

    if (findDistributor) {
      this.filter.distributorid = findDistributor.userid;
    }

  }
  return finalDistributors;
}

//Getting products

getProducts() {
  let userid = 0
  if(this.Details.dealers && this.Details.dealers.user_id){ 
    userid = this.Details.dealers.user_id;
  }
  else{
    userid= this.authenticationService.loggedInUserId();
  }
  let input = { userId: userid, appType: this.authenticationService.appType() };
  this.productService.getProducts(input)
    .subscribe(
    output => this.getProductsResult(output),
    error => {
      console.log("error");
      this.loaderService.display(false);
    });

}
getProductsResult(result) {
  console.log(result);
  this.productList= [];
  if(result.result == 'success'){
   // let productCopy = [];
    for (let details of result.data) {
      //let details: any = i;
      
      let findproduct = _.find(this.productList, function (k, l) {
        let productDetails: any = k;
        return productDetails.brandName == details.brandname;
      });

      if (findproduct) {
        details.quantity = "";
        findproduct.data.push(details);
      }
      else{
        let value = {brandName:details.brandname,category:details.category,data:[]};
        details.quantity = "";
        value.data.push(details);
        this.productList.push(value);
      }
     
    }
    console.log("products list ",this.productList)

  }
}
ViewDistributors(data) {
  let dialogRefDist = this.dialog.open(DistributorListDialogComponent, {
      width: '70%',
      data: data
  });
  dialogRefDist.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result =='success'){
        this.thisDialogRef.close('success');
        

      }
  });
}




onCloseCancel(){
  this.thisDialogRef.close('Cancel');
}

createPreOrder(){
  console.log(this.createPreOrderInput);
  let input =[{"order":
  {"paymentmode":"cash","orderstatus":"ordered","quantity":this.createPreOrderInput.productDetails.quantity,"total_items":this.createPreOrderInput.productDetails.quantity,
  "ispreorder":true,"orderto":this.Details.dealers.user_id,
  "orderfrom":this.Details.userid,"productid":this.createPreOrderInput.productDetails.productid,
  "product_quantity":this.createPreOrderInput.productDetails.ptype,
  "product_type":this.createPreOrderInput.productDetails.ptype, "product_cost":this.createPreOrderInput.productDetails.pcost,"amt":this.createPreOrderInput.productDetails.pcost,
  "total_amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost),
  "cart_style":"new",
  "delivery_address":this.Details.address,
  "excepted_time":"","ispreorderby":"distributor","loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}}]


  let formattedDate =  moment(this.createPreOrderInput.date).format('DD-MM-YYYY');
  input[0].order.excepted_time = formattedDate + " " + this.createPreOrderInput.timeslot;
  
  console.log(input);
  this.orderLandingService.createPreOrder(input)
  .subscribe(
    output => this.createPreOrderResult(output,input),
    error => {
      console.log("falied");
      this.loaderService.display(false);
    });
}

createPreOrderResult(result,input) {
  console.log(result);
  if(result.result=='success'){
    let productid= "";
    if(input[0].order.productid){
      productid = input[0].order.productid
    }
    let data ={prod_id:productid,ordersfrom:input[0].order.orderfrom,order_id:result.data.orderid,quantity:input[0].order.quantity,supplierdetails:{userid:""}};
    if(this.Details.supplier){
      data.supplierdetails.userid =this.Details.supplier.supplierid;
    }
    this.ViewDistributors(data);

  }
  }

  //TimeSlot changes

  autoTimeSlot(){

    let hours = moment().format("HH");
    if(parseInt(hours) <= 8){
this.createPreOrderInput.timeslot = "9AM-1PM";
this.createPreOrderInput.date= new Date();
this.disableSlot = false;


    }
    else if(parseInt(hours) <= 15){
    
      this.createPreOrderInput.date= new Date();
      this.createPreOrderInput.timeslot = "4PM-7PM";
      this.disableSlot = true;
      

    }
    else {
      this.createPreOrderInput.timeslot = "9AM-1PM";
      var date = new Date();
      this.createPreOrderInput.date = new Date(date.setDate(date.getDate() + 1));
      this.disableSlot = false;
    }

  }

  onChangeQuantity(details,event){


    this.createPreOrderInput.productDetails = details;
    // _.each even or for loop  ngModelQuantity 0 for others 
   // let selectedid= details.productid;

      // _.each(data, function (i, j) {
      //   let details: any = i;
      //  if(selectedid != details.productid){
      //   details.quantity = "0";
      //  }
      //  if(selectedid == details.productid){
      //   details.quantity = event;
      //  }

      // });
    

  }


  ngOnInit() {
    this.getDistributors();
    this.getProducts();
    this.autoTimeSlot();
    console.log(this.Details);
  }

}
