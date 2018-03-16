import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';


@Component({
  selector: 'app-add-product-dealer',
  templateUrl: './add-product-dealer.component.html',
  styleUrls: ['./add-product-dealer.component.css']
})
export class AddProductDealerComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddProductDealerComponent>,private authenticationService: AuthenticationService,private productService: ProductsService,@Inject(MD_DIALOG_DATA) public Details: any, private loaderService: LoaderService, ) { }
  productsList=[];
  productsInput:any =[];

  dealerAddProduct(){
    let input={"userId":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    //console.log(input);
    this.productService.getProducts(input)
      .subscribe(
      output => this.dealerAddProductResult(output),
      error => {
        //console.log("error in dealer products");
        this.loaderService.display(false);
      });
  }
  dealerAddProductResult(result){
    //console.log(result);
    if (result.result = 'success') {
      this.productsList = result.data;
  }
  }

  confirmProduct(){
    let products=[];
    let authenticationLogin = this.authenticationService.loggedInUserId();
    let distributorDetails = this.Details.userid;
    let authApptype = this.authenticationService.appType();
    _.each(this.productsInput, function(i,j){
      let input={"product":{"productid":"","productname":"","producttype":"","product_cost":"","stock":"0","distributerid":distributorDetails,"loginid":authenticationLogin,"apptype":authApptype}};
      let details:any = i;
      input.product.productid =details.productid;
      input.product.productname= details.pname;
      input.product.producttype =details.ptype;
      input.product.product_cost =details.pcost;
      products.push(input);
    });

    //console.log(products);

    this.productService.assignDealerProducts(products)
      .subscribe(
      output => this.confirmProductResult(output),
      error => {
        //console.log("error in dealer products");
        this.loaderService.display(false);
      });
  }
  confirmProductResult(result){
    //console.log(result);
    if(result.result == "success"){
      this.thisDialogRef.close("success");
    }
  }

  productDetails(product:any, isChecked:boolean){
    if(isChecked){
this.productsInput.push(product);
    }
    else{
      this.productsInput= this.productsInput.filter(function(e) {
        return e.productid !== product.productid;

    });
    //console.log(this.productsInput);



    }

  }


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');

  }


  ngOnInit() {
    this.dealerAddProduct();
    //console.log(this.Details);

  }

}
