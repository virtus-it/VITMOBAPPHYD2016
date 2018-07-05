import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DistributorServiceService } from '../distributor/distributor-service.service';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})



export class ProductUpdateComponent implements OnInit {

productsCtrl: FormControl;
filteredProducts: Observable<any[]>;

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<ProductUpdateComponent>, @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog, private loaderService: LoaderService,  private distributorService: DistributorServiceService ,  private productService: ProductsService) {

    this.productsCtrl = new FormControl();
    this.filteredProducts = this.productsCtrl.valueChanges
      .startWith(null)
      .map(prod => prod ? this.findProducts(prod) : this.productList.slice());

   }
  stockStatusValue = "";
  validationMessage= '';
  distStockStatus = {categoryname:"" ,   brandname:"" ,   productID:"" ,   categoryID: ""  };
  productList = [];
  LastfilterRecords = false;

  updateStatus() {
    let input = { "product": { "category":this.Details.data[0].category, "categoryid": this.Details.data[0].categoryid , "status": this.stockStatusValue, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } }
    if(this.validation()){
    this.productService.setProductStatus(input)
      .subscribe(
      output => this.updateStatusResult(output),
      error => {
        //console.log("error in distrbutors");
      });
    }
  }
  updateStatusResult(result) {
//console.log(result);
if (result.result == 'success') {
  this.thisDialogRef.close('success');
}

  }


  validation(){
    if(!this.stockStatusValue){
      this.validationMessage = 'Select stock status';
      return false;
    }
    else{
      return true;
    }
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
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
    let input = {userId: this.Details.data.userid, appType: this.authenticationService.appType() };
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
        this.distStockStatus.productID = findProducts.productid;
        this.distStockStatus.categoryID = findProducts.categoryid;
        this.distStockStatus.brandname = findProducts.brandname;
        this.distStockStatus.categoryname = findProducts.category;
        // this.getDistributorStockHistory();

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


update(){
  if(this.Details.type == 'distributorstockStatus'){
    this.updateDistributorsStockStatus();
  }
  else{
    this.updateStatus();
  }
}

updateDistributorsStockStatus(){
  let input = { "product": { "category":this.distStockStatus.categoryname , "categoryid":this.distStockStatus.categoryID  , "userid": this.Details.data.userid ,  "status": this.stockStatusValue, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } }
  console.log(input);
  if(this.validation()){
    this.productService.setProductStatus(input)
      .subscribe(
      output => this.updateDistributorsStockStatusResult(output),
      error => {
        //console.log("error in distrbutors");
      });
    }
}
updateDistributorsStockStatusResult(result){
  if(result.result == 'success'){
    this.thisDialogRef.close('success');
  }
}



  ngOnInit() {
    console.log(this.Details);
    if(this.Details.type == 'distributorstockStatus'){
      // this.getProducts();
      this.getDistributorsProducts();
    }
    else{
      this.stockStatusValue = this.Details.stockstatus;
    }
  }

}
