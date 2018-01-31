import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';
@Component({

  templateUrl: './add-edit-product-dailog.component.html',
  styleUrls: ['./add-edit-product-dailog.component.css']
})
export class AddEditProductDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<AddEditProductDailogComponent>, @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog, private loaderService: LoaderService, private productService: ProductsService) { }
  productCategoryList = [];
  productTypeList = [];
  productDetails:any = {categoryDetails:"",productName:"",productType:"",currency:"",cost:"",iscanRetrunable:"",minQty:"",Priority:"",IsAuthorized:""};
  getProductCategory() {
    let input = { userId: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType(), userType: this.authenticationService.userType() };
    this.productService.getProductsCategory(input)
      .subscribe(
      output => this.getProductCategoryResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });
  }
  getProductCategoryResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.productCategoryList = result.data;
    }

  }
  getProductsByCategory() {
    if (this.productDetails.categoryDetails) {
      let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "category": this.productDetails.categoryDetails.category, "categoryid": this.productDetails.categoryDetails.categoryid, "apptype": "moya" } };
      this.productService.getProductsByCategory(input)
        .subscribe(
        output => this.getProductsByCategoryResult(output),
        error => {
          console.log("error");
          this.loaderService.display(false);
        });

    }
  }
  getProductsByCategoryResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.productTypeList = result.data;
    }
  }
  createProduct(){
  
    let input = {"product":{"category":this.productDetails.categoryDetails.category,"categoryid":this.productDetails.categoryDetails.categoryid,"currency":this.productDetails.currency,"brandname":this.productDetails.productName,"pname":this.productDetails.productName,"ptype":this.productDetails.productType,"pcost":this.productDetails.cost,"areaid":"0","minorderqty":this.productDetails.minQty,"priority":this.productDetails.Priority,"iscanreturnable":this.productDetails.iscanRetrunable,"isauthorized":this.productDetails.IsAuthorized,"loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}};
    console.log(input);
    this.productService.createProduct(input)
    .subscribe(
    output => this.createProductResult(output),
    error => {
      console.log("error");
      this.loaderService.display(false);
    });
  }
  createProductResult(result){
console.log(result);
if (result.result == 'success') {
  this.thisDialogRef.close('success');
}
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
     console.log(this.Details);
    this.getProductCategory();

  }

}
