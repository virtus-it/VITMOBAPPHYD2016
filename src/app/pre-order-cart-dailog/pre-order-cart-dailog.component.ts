import { Component, OnInit,Inject} from '@angular/core';
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
import { stringify } from 'querystring';


@Component({
  selector: 'app-pre-order-cart-dailog',
  templateUrl: './pre-order-cart-dailog.component.html',
  styleUrls: ['./pre-order-cart-dailog.component.css']
})
export class PreOrderCartDailogComponent implements OnInit {
  stateCtrl: FormControl;
  filteredDistributor: Observable<any[]>;
  constructor(public dialog: MdDialog, public thisDialogRef: MdDialogRef<PreOrderCartDailogComponent>,   private authenticationService: AuthenticationService, private distributorService: DistributorServiceService,   private orderLandingService: OrderLandingService, private loaderService: LoaderService, private productService: ProductsService, @Inject(MD_DIALOG_DATA) public Details: any) {
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
   hours:any="";
   day:any="";
   nextDay:any="";
   nextDayValue:any ="";
   //input
   createPreOrderInput: any = {"timeslot":"" , date:null ,productDetails:{}, }
    minDate = new Date() ;
    maxDate = new Date(2020, 0, 1);
    message:any="";
    todaysDate:any = "";
    message1:any="";

  idValue= '';
  value = '';
  nextIdValue = '';



    
    
    
    //FilterInputs
  filter: any = { "distributorid": "" };
 


  //input  for deliver preorder


  deliverPreOrder() {
   if(this.validate() && this.validate1()){
    let data ={"order":{"orderstatus":"delivered","assignedto":"",
    "paymentstatus":"",
    "return_cans": this.createPreOrderInput.productDetails.quantity ,"paymentmode":"cash",
    "received_amt":"","quantity":this.createPreOrderInput.productDetails.quantity,"total_items":this.createPreOrderInput.productDetails.quantity,"ispreorder":true, "adv_amt":this.Details.payments.advance_amount, "pending_amount":this.Details.payments.amount_pending,
    "orderto":this.Details.dealers.user_id , "orderfrom":this.Details.userid,"productid":this.createPreOrderInput.productDetails.productid,"product_quantity":this.createPreOrderInput.productDetails.ptype, "categoryId":this.createPreOrderInput.productDetails.categoryid,
    "product_type":this.createPreOrderInput.productDetails.ptype, "brandName":this.createPreOrderInput.productDetails.brandname, "product_cost":this.createPreOrderInput.productDetails.pcost,"amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost) + parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.servicecharge) + parseInt(this.createPreOrderInput.productDetails.expressdeliverycharges) ,"total_amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost) + parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.servicecharge) + parseInt(this.createPreOrderInput.productDetails.expressdeliverycharges),"cart_style":"new",
    "delivery_address":this.Details.address, "excepted_time":"" ,"ispreorderby":"dealer","expressdeliverycharges":0, "servicecharge":this.createPreOrderInput.productDetails.servicecharge,"loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}
    }
   
    if(this.createPreOrderInput.productDetails.expressdelivery == true){
      data.order.expressdeliverycharges = this.createPreOrderInput.productDetails.expressdeliverycharges;
      }
    //console.log(data);
    let dialogRefEditCustomer = this.dialog.open(DeliverpreorderComponent, {

        width: '600px',
        data: data
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
        if(result == "success"){
          this.thisDialogRef.close('success');
        }

    });
   

}
// else{
//   this.message="please set quantity";
// }


  }

//getting distributors


getDistributors() {
  let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
  //console.log(input);
  this.distributorService.getAllDistributors(input)
    .subscribe(
    output => this.getDistributorsResult(output),
    error => {
      //console.log("error in distrbutors");
    });
}
getDistributorsResult(data) {
  //console.log(data);
  if (data.result == 'success') {
    let distributorCopy = [];

    if (data.data && data.data.length) {
      _.each(data.data, function (i, j) {
        let details: any = i;
        if(details.firstname){
        details.fullName = details.firstname + " " + details.lastname
        distributorCopy.push(details);
        }
      });
      this.distributors = distributorCopy;
    }
  }
}

//filtered distributors

filterDistributors(name: string) {
  //console.log(name);
  let finalDistributors = this.distributors.filter(dist =>
    dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  //console.log(finalDistributors);
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

// getProducts() {
//   let userid = 0
//   if(this.Details.dealers && this.Details.dealers.user_id){ 
//     userid = this.Details.dealers.user_id;
//   }
//   else{
//     userid= this.authenticationService.loggedInUserId();
//   }
//   let input = { userId: userid, appType: this.authenticationService.appType() };
//   this.productService.getProducts(input)
//     .subscribe(
//     output => this.getProductsResult(output),
//     error => {
//       //console.log("error");
//       this.loaderService.display(false);
//     });

// }
// getProductsResult(result) {
//   //console.log(result);
//   this.productList= [];
//   if(result.result == 'success'){
//    // let productCopy = [];
//     for (let details of result.data) {
//       //let details: any = i;
//       //console.log(result.data);
      
//       let findproduct = _.find(this.productList, function (k, l) {
//         let productDetails: any = k;
//         return productDetails.brandName == details.brandname;
//       });

//       if (findproduct) {
//         details.quantity = "";
//         findproduct.data.push(details);
//       }
//       else{
//         let value = {brandName:details.brandname,category:details.category,data:[]};
//         details.quantity = "";
//         value.data.push(details);
//         this.productList.push(value);
//       }
     
//     }
//     //console.log("products list ",this.productList)

//   }
// }

getProductsList() {
  this.loaderService.display(true);
  let input = { apptype: this.authenticationService.appType(), userid: this.Details.userid, delearId:0};
  //console.log(input);
  if(this.Details.dealers){
    input.delearId= this.Details.dealers.user_id;
  }
 else{
   input.delearId = this.authenticationService.loggedInUserId();
 }
  this.distributorService.getProductsList(input)
    .subscribe(
    output => this.getProductsListResult(output),
    error => {
      //console.log("error in distrbutors");
      this.loaderService.display(false);
    });

}
getProductsListResult(result) {
  //console.log("distributor products list", result);
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
    for (let details of productListCopy) {
           
            //console.log(result.data);
            
            let findproduct = _.find(this.productList, function (k, l) {
              let productDetails: any = k;
              return productDetails.brandName == details.brandname;
            });
      
            if (findproduct) {
              details.quantity = "";
              details.expressdelivery=false;
              findproduct.data.push(details);
            }
            else{
              let value = {brandName:details.brandname,category:details.category,data:[]};
              details.quantity = "";
              details.expressdelivery=false;
              value.data.push(details);
              this.productList.push(value);
            }
           
          }
   // this.productList = productListCopy;
    //console.log(this.productList);
}

}


ViewDistributors(data) {
  let dialogRefDist = this.dialog.open(DistributorListDialogComponent, {
      width: '70%',
      data: data
  });
  dialogRefDist.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result =='success'){
        this.thisDialogRef.close('success');
        

      }
  });
}




onCloseCancel(){
  this.thisDialogRef.close('Cancel');
}

createPreOrder(){
  if(this.validate() && this.validate1()){
  //console.log(this.createPreOrderInput);
  
  let input =[{"order":
  {"paymentmode":"cash","orderstatus":"ordered","quantity":this.createPreOrderInput.productDetails.quantity,"total_items":this.createPreOrderInput.productDetails.quantity,
  "ispreorder":true,"orderto":this.Details.dealers.user_id,
  "orderfrom":this.Details.userid,"productid":this.createPreOrderInput.productDetails.productid, "categoryId":this.createPreOrderInput.productDetails.categoryid, 
  "product_quantity":this.createPreOrderInput.productDetails.ptype,
  "product_type":this.createPreOrderInput.productDetails.ptype,  "brandName":this.createPreOrderInput.productDetails.brandname,  "product_cost":this.createPreOrderInput.productDetails.pcost,"amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost) + parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.servicecharge) + parseInt(this.createPreOrderInput.productDetails.expressdeliverycharges) ,
  "total_amt":parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.pcost) + parseInt(this.createPreOrderInput.productDetails.quantity)*parseInt(this.createPreOrderInput.productDetails.servicecharge) + parseInt(this.createPreOrderInput.productDetails.expressdeliverycharges) ,
  "cart_style":"new",
  "delivery_address":this.Details.address, "delivery_locality":this.Details.locality, "delivery_buildingname":this.Details.buildingname,  "expressdeliverycharges":0, "servicecharge":this.createPreOrderInput.productDetails.servicecharge,
  "excepted_time":"","ispreorderby":"distributor","loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}}]

  if(this.createPreOrderInput.productDetails.expressdelivery == true){
  input[0].order.expressdeliverycharges = this.createPreOrderInput.productDetails.expressdeliverycharges;
  }
  console.log(input);


  let formattedDate =  moment(this.createPreOrderInput.date).format('DD-MM-YYYY');
  input[0].order.excepted_time = formattedDate + " " + this.createPreOrderInput.timeslot;
  
  console.log(input);
  this.orderLandingService.createPreOrder(input)
  .subscribe(
    output => this.createPreOrderResult(output,input),
    error => {
      //console.log("falied");
      this.loaderService.display(false);
    });

}
// else{
//   this.message="please set quantity";
// }
}
createPreOrderResult(result,input) {
  //console.log(result);
  if(result.result=='success'){
    let productid= "";
    let productName= "";
    let categoryId = "";
    if(input[0].order.productid){
      productid = input[0].order.productid
    }
    if(input[0].order.categoryId){
      categoryId = input[0].order.categoryId;
    }
    let data ={prod_id:productid, ordersfrom:input[0].order.orderfrom, order_id:result.data.orderid, brandName:input[0].order.brandName , quantity:input[0].order.quantity , categoryid: categoryId ,supplierdetails:{userid:"", supplierID:"", supplierMno:"", supplierName:""}};
    if(this.Details.supplier){
      data.supplierdetails.userid =this.Details.supplier.supplierid;
      data.supplierdetails.supplierID = this.Details.supplier.supplierid;
      data.supplierdetails.supplierMno = this.Details.supplier.mobileno;
      data.supplierdetails.supplierName = this.Details.supplier.suppliername; 
    }
    this.ViewDistributors(data);

  }
  }

  //TimeSlot changes

//   autoTimeSlot(){

//     let hours = moment().format("HH");
//     if(parseInt(hours) <= 8){
// this.createPreOrderInput.timeslot = "9AM-1PM";
// this.createPreOrderInput.date= new Date();
// this.disableSlot = false;


//     }
//     else if(parseInt(hours) <= 15){
    
//       this.createPreOrderInput.date= new Date();
//       this.createPreOrderInput.timeslot = "4PM-7PM";
//       this.disableSlot = true;
      

//     }
//     else {
//       this.createPreOrderInput.timeslot = "9AM-1PM";
//       var date = new Date();
//       this.createPreOrderInput.date = new Date(date.setDate(date.getDate() + 1));
//       this.disableSlot = false;
//     }

//   }

//new changes here 


autoTimeSlotforHour(){
  this.hours = moment().format("HH");
  this.createPreOrderInput.date= new Date();
}

dateChanges(event){
  let eventChanges = moment(event).format('DD-MM-YYYY');

this.todaysDate= moment().format('DD-MM-YYYY');
if(eventChanges != this.todaysDate){
  this.hours = "6";
}
else{
  this.hours = moment().format("HH");
  this.createPreOrderInput.date= new Date();
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



  minOrderChanged( event){
  //console.log(event);
  _.each(this.productList, function(i,j){
    let details:any =i;
    _.each(i.data, function(k,l){
      let detailData:any=k;
      detailData.quantity="";
    })
  }
)
    this.createPreOrderInput.productDetails.quantity = this.createPreOrderInput.productDetails.default_qty;
    
  }

  validate(){
   if(this.createPreOrderInput.productDetails && this.createPreOrderInput.productDetails.quantity ){
     this.message="";
     return true;
   }
   else{
    this.message="please set quantity";
    return false;
  }
  

  }
  
  validate1(){
    if( this.createPreOrderInput.timeslot){
      this.message="";
      this.message1="";
      return true;
   }
   else{
     this.message= "";
     this.message1="please select timeSlot";
     return false;
   }

  }


  availableTimeSlot(){
    if(this.hours <= 6){
      this.createPreOrderInput.timeslot = '7AM-8AM'
    }
    else if(this.hours <= 7){
      this.createPreOrderInput.timeslot = "8AM-9AM"; 
    }
    else if(this.hours <= 8){
      this.createPreOrderInput.timeslot = "9AM-10AM";
    } 
    else if(this.hours <= 9){
      this.createPreOrderInput.timeslot = "10AM-11AM";
    }
    else if(this.hours <= 10){
      this.createPreOrderInput.timeslot = "11AM-12PM";
    }
    else if(this.hours <= 11){
      this.createPreOrderInput.timeslot = "12PM-1PM";
    }
    else if(this.hours <= 12){
      this.createPreOrderInput.timeslot = "1PM-2PM";
    }
    else if(this.hours <= 13){
      this.createPreOrderInput.timeslot = "2PM-3PM";
    }
    else if(this.hours <= 14){
      this.createPreOrderInput.timeslot = "3PM-4PM";
    }
    else if(this.hours <= 15){
      this.createPreOrderInput.timeslot = "4PM-5PM";
    }
    else if(this.hours <= 16){
      this.createPreOrderInput.timeslot = "5PM-6PM";
    }
    else if(this.hours <= 17){
      this.createPreOrderInput.timeslot = "6PM-7PM";
    }
    else if(this.hours <= 18){
      this.createPreOrderInput.timeslot = "7PM-8PM";
    }
    else if(this.hours <= 19){
      this.createPreOrderInput.timeslot = "8PM-9PM";
    }

  }
   


  //   _.each(this.productList, function(i,j){
  //   let details:any =i;
  //   _.each(i.data, function(k,l){
  //     let detailData:any=k;
  //   if(detailData.quantity){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // })
  // });
  
  


  ngOnInit() {
    
    this.getDistributors();
    // this.getProducts();
    
    this.autoTimeSlotforHour();
    this.getProductsList();
    console.log(this.Details);
    this.availableTimeSlot();
  }

}
