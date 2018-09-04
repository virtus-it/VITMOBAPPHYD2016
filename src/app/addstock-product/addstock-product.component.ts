import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ProductsService } from '../products/products.service';
import { Observable } from 'rxjs/Observable';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-addstock-product',
  templateUrl: './addstock-product.component.html',
  styleUrls: ['./addstock-product.component.css']
})
export class AddstockProductComponent implements OnInit {

  productsCtrl: FormControl;
  filteredProducts: Observable<any[]>;

  constructor(public thisDialogRef: MdDialogRef<AddstockProductComponent>, @Inject(MD_DIALOG_DATA) public Detail: any,  private authenticationService: AuthenticationService,private productsService:ProductsService , private distributorService: DistributorServiceService) { 

    this.productsCtrl = new FormControl();
    this.filteredProducts = this.productsCtrl.valueChanges
      .startWith(null)
      .map(prod => prod ? this.findProducts(prod) : this.productList.slice());

  }

StockInput = { invoiceDate:new Date(), stock:"", itemCost:this.Detail.pcost, returnemptycans:"0" , distributorpaidamount: ''};
validateMessage = '';
productList = [];
distributorStockInput = {"productID":"" , "categoryID":"" , "categoryname":"", "brandname":"", "producttype":""};
LastfilterRecords = false;

onCloseCancel() {
  this.thisDialogRef.close('Cancel');
}


addStockDetails(){
  let input = [{"product":{"category":this.Detail.data[0].category, "categoryid": this.Detail.data[0].categoryid , "brandname": this.Detail.data[0].brandname , "producttype": this.Detail.data[0].ptype ,   
  "stock":this.StockInput.stock, "returnemptycans":this.StockInput.returnemptycans,"invoicedate":"", "userid": this.authenticationService.loggedInUserId() ,  "paidamt":this.StockInput.distributorpaidamount , 
  "loginid": this.authenticationService.loggedInUserId() ,"invoicenumber":Math.floor(1000 + Math.random() * 9000).toString(),"itemcost":this.StockInput.itemCost,"apptype":this.authenticationService.appType() ,  }}];
  if (this.StockInput.invoiceDate) {
    var date = moment(this.StockInput.invoiceDate).format('YYYY-MM-DD');
    var time = moment(new Date()).format('hh:mm:ss');
    var dateTime = date + ' ' + time;
    console.log(dateTime  , 'date time');
    input[0].product.invoicedate = dateTime;
    // input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD 00:00:00');
  } 
  console.log(input);
  if(this.addstockValidation()){
  this.productsService.addStockDetails(input)
  .subscribe(
  output => this.addStockDetailsResult(output),
  error => {
    //console.log("error in distrbutors");
  });
}
}
addStockDetailsResult(result){

//console.log(result);
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
}

addDistributorsStock(){
  let input = [{"product":{"category":this.distributorStockInput.categoryname , "categoryid": this.distributorStockInput.categoryID  , "brandname": this.distributorStockInput.brandname , "producttype": this.distributorStockInput.producttype ,   "userid":this.Detail.data.userid, "invoicedate":"" ,  "paidamt":this.StockInput.distributorpaidamount , 
  "stock":this.StockInput.stock, "returnemptycans":this.StockInput.returnemptycans,
  "loginid": this.authenticationService.loggedInUserId()  ,"invoicenumber":Math.floor(1000 + Math.random() * 9000).toString(),"itemcost":this.StockInput.itemCost,"apptype":this.authenticationService.appType() , }}];
  // if (this.StockInput.invoiceDate) {
  //   input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD 00:00:00');
  // } 

  if (this.StockInput.invoiceDate) {
    var date = moment(this.StockInput.invoiceDate).format('YYYY-MM-DD');
    var time = moment(new Date()).format('hh:mm:ss');
    var dateTime = date + ' ' + time;
    console.log(dateTime  , 'date time');
    input[0].product.invoicedate = dateTime;
    // input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD 00:00:00');
  } 


  console.log(input);
  if(this.addstockValidation()){
  this.productsService.addStockDetails(input)
  .subscribe(
  output => this.addDistributorsStockResult(output),
  error => {
    //console.log("error in distrbutors");
  });
}
}
addDistributorsStockResult(result){
  if(result.result == 'success'){
    this.thisDialogRef.close('success');
  }
}

addstockFromDistProducts(){
  let input = [{"product":{"category":this.Detail.data.data[0].category, "categoryid": this.Detail.data.data[0].categoryid , "brandname": this.Detail.data.data[0].brandname , "producttype": this.Detail.data.data[0].ptype ,   "paidamt":this.StockInput.distributorpaidamount ,  
  "stock":this.StockInput.stock, "returnemptycans":this.StockInput.returnemptycans, "invoicedate":"" , 
  "loginid": this.authenticationService.loggedInUserId(), "userid": this.Detail.distributorId , "invoicenumber":Math.floor(1000 + Math.random() * 9000).toString(),"itemcost":this.StockInput.itemCost,"apptype":this.authenticationService.appType() ,  }}];
  // if (this.StockInput.invoiceDate) {
  //   input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD 00:00:00');
  // }

  if (this.StockInput.invoiceDate) {
    var date = moment(this.StockInput.invoiceDate).format('YYYY-MM-DD');
    var time = moment(new Date()).format('hh:mm:ss');
    var dateTime = date + ' ' + time;
    console.log(dateTime  , 'date time');
    input[0].product.invoicedate = dateTime;
    // input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD 00:00:00');
  }


  console.log(input);
  if(this.addstockValidation()){
  this.productsService.addStockDetails(input)
  .subscribe(
  output => this.addstockFromDistProductsResult(output),
  error => {
    //console.log("error in distrbutors");
  });
}
}
addstockFromDistProductsResult(result){
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}

}


addStock(){
  if(this.Detail.type == 'distributorsStock'){
    this.addDistributorsStock();
  }
  else if(this.Detail.type == 'distproductsaddstock'){
    this.addstockFromDistProducts();
  }
  else{
    this.addStockDetails();
  }
}



findProducts(name: string){
      //console.log(name);
      let finalProducts = this.productList.filter(prod =>
        prod.fullname.toLowerCase().indexOf(name.toLowerCase()) === 0);
      //console.log(finalDistributors);
      if (finalProducts && finalProducts.length > 0) {
        let findProducts: any = {};
  
        findProducts = _.find(finalProducts, function (k, l) {
          let prodDetails: any = k;
          return prodDetails.fullname == name;
        });
  
        if (findProducts) {
          this.distributorStockInput.productID = findProducts.productid;
          this.distributorStockInput.categoryID = findProducts.categoryid;
          this.distributorStockInput.brandname = findProducts.brandname;
          this.distributorStockInput.categoryname = findProducts.category;
          this.distributorStockInput.producttype = findProducts.ptype;

        }
  
  
      }
      else {
        if (name.length >= 3 && !this.LastfilterRecords) {
          this.getDistributorProducts();
        }
  
  
      }
      return finalProducts;
}



// to only get distributors products
getDistributorProducts(){
  let input = {userId: this.Detail.data.userid, appType: this.authenticationService.appType() };
  console.log(input);
  this.distributorService.getDistbutorsProducts(input)
  .subscribe(
  output => this.getDistributorProductsResult(output),
  error => {
      //console.log("Logged in falied");
  });
}
getDistributorProductsResult(result){
  if(result.result == 'success'){
    let fullName = "";
    _.each(result.data , function(i,j){
      let details:any = i;
      fullName = details.brandname + ' ' + details.category;
      details.fullname = fullName;
    });
    this.productList = result.data;
  }
}



addstockValidation(){

  var validate : string = '1';
  switch(validate){
      case "1" : {
        if(!this.StockInput.stock){
          this.validateMessage = 'Enter stock';
        }
  }
      case '2' : {
        if(!this.StockInput.itemCost){
          this.validateMessage = 'Enter item cost';
        }   
  }
    case '3' : {
      if(this.StockInput.stock && this.StockInput.itemCost ){
        this.validateMessage = '';
        return true;
      }
    }
}




}
  ngOnInit() {
    console.log(this.Detail);
    if(this.Detail.type == 'distributorsStock'){
      // this.getProducts();
      this.getDistributorProducts();
    }
  }


}
