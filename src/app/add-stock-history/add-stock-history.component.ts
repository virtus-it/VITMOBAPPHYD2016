import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import { DistributorServiceService } from '../distributor/distributor-service.service';




@Component({
  selector: 'app-add-stock-history',
  templateUrl: './add-stock-history.component.html',
  styleUrls: ['./add-stock-history.component.css']
})
export class AddStockHistoryComponent implements OnInit {

  productsCtrl: FormControl;
  filteredProducts: Observable<any[]>;


  constructor(private authenticationService: AuthenticationService, private distributorService: DistributorServiceService ,  private productService: ProductsService, public thisDialogRef: MdDialogRef<AddStockHistoryComponent>,@Inject(MD_DIALOG_DATA) public Detail: any) {
    this.productsCtrl = new FormControl();
    this.filteredProducts = this.productsCtrl.valueChanges
      .startWith(null)
      .map(prod => prod ? this.findProducts(prod) : this.productList.slice());

   }

StockList=[];
productList = [];
LastfilterRecords = false;
sum = 0;
noRecord=false;
distributorStockHistoryInput = {productID:"" , categoryID:"" , brandname:"" , categoryname:"" }


  getStockHistroy() {
    let input = {};
    if(this.Detail.type == 'distributorspage'){
      input = {
        "root": {
          "userid": this.Detail.distributorId, "usertype": this.authenticationService.userType(), "category":this.Detail.data.category, "categoryid": this.Detail.data.data[0].categoryid  , "pid": this.Detail.data.data[0].productid ,   "areaid": "", "last_historyid": 100000, "pagesize": "1000",
          "fromdate": null, "todate": null, "apptype": this.authenticationService.appType() , "loginid": this.authenticationService.loggedInUserId()
        }
      };
    }
    else{
    input = {
      "root": {
        "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(),"category":this.Detail.data[0].category, "categoryid": this.Detail.data[0].categoryid  , "pid": this.Detail.data[0].productid , "areaid": "", "last_historyid": 100000, "pagesize": "1000",
        "fromdate": null, "todate": null, "apptype": this.authenticationService.appType() , "loginid": this.authenticationService.loggedInUserId()
      }
    };
  }
    console.log(input);
    this.productService.getStockHistroy(input)
      .subscribe(
      output => this.getStockHistroyResult(output),
      error => {
        //console.log("error in stock histroy");

      });
  }
  getStockHistroyResult(result) {
    //console.log(result);
    if(result.result == 'success'){
      this.noRecord=false;
      this.StockList = result.data;
      let stockCount = [];
      _.each(this.StockList , function(i , j){
        let details:any = i;
        stockCount.push(details.stock);         
      });
      console.log(stockCount);
      this.sum = stockCount.reduce((a, b) => a + b, 0);
    }
    else{
      this.StockList=[];
      this.noRecord=true;
    }
  }

  // getProducts(){
  //   let input = {"product":{ userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"getallproducts" ,loginid:this.authenticationService.loggedInUserId() , usertype: this.authenticationService.userType() }};
  //   this.productService.createProduct(input)
  //     .subscribe(
  //     output => this.getProductsResult(output),
  //     error => {
  //     });
  
  // }
  // getProductsResult(result) {
  //   console.log(result);
  //   let fullName = "";
  //   if (result.result == 'success') {
  //     _.each(result.data , function(i,j){
  //       let details:any = i;
  //       fullName = details.brandname + ' ' + details.category;
  //       details.fullname = fullName;
  //     });
  //     this.productList = result.data;
  //   }
  // }


  getDistributorsProducts(){
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
        this.distributorStockHistoryInput.productID = findProducts.productid;
        this.distributorStockHistoryInput.categoryID = findProducts.categoryid;
        this.distributorStockHistoryInput.brandname = findProducts.brandname;
        this.distributorStockHistoryInput.categoryname = findProducts.category;
        this.getDistributorStockHistory();

      }
    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        // this.getProducts();
        this.getDistributorsProducts();
      }
    }
    return finalProducts;
}



  getDistributorStockHistory(){
    let input = {"root": {"userid": this.Detail.data.userid , "usertype": this.authenticationService.userType(),"category": this.distributorStockHistoryInput.categoryname , "categoryid": this.distributorStockHistoryInput.categoryID  , "areaid": "", "last_historyid": 100000, "pagesize": "1000", "fromdate": null, "todate": null, "apptype": this.authenticationService.appType() , "transtype":"distributorstockhistory"}};

    console.log(input);
    this.productService.getStockHistroy(input)
      .subscribe(
      output => this.getDistributorStockHistoryResult(output),
      error => {
        //console.log("error in stock histroy");
      });
  }
  getDistributorStockHistoryResult(result){
    if(result.result == 'success'){
      this.StockList = result.data;
    }
  }





  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
   console.log(this.Detail);
   if(this.Detail.type == 'distributorsStockHistory'){
    //  this.getProducts();
    this.getDistributorsProducts();
     
   }
   else{
    this.getStockHistroy();
   }
  }

}
