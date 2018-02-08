import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-setpricecustomer',
  templateUrl: './setpricecustomer.component.html',
  styleUrls: ['./setpricecustomer.component.css']
})
export class SetpricecustomerComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private productService: ProductsService,  private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any) { }
  productList=[];

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

  ngOnInit() {
    this.getProducts();
  }

}
