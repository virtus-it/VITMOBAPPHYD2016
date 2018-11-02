import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-setpricecustomer',
  templateUrl: './setpricecustomer.component.html',
  styleUrls: ['./setpricecustomer.component.css']
})
export class SetpricecustomerComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private productService: ProductsService,  private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any,  public thisDialogRef: MdDialogRef<SetpricecustomerComponent>) { }
  productList=[];
  details:any =[];

  getProducts() {
    let userid = 0;
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
        //console.log("error");
        this.loaderService.display(false);
      });
  
  }
  getProductsResult(result) {
    //console.log(result);
    this.productList= [];
    if(result.result == 'success'){

     // let productCopy = [];
      for (let details of result.data) {
        //let details: any = i;
        
        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          return productDetails.brandName == details.brandname;
        });
        if(this.Details.discountproducts && this.Details.discountproducts.length){
          let findCustomerproduct:any = _.find(this.Details.discountproducts, function (k, l) {
            let custProductDetails: any = k;
            return custProductDetails.productid == details.productid;
          });
          if(findCustomerproduct){
            if(findCustomerproduct.product_cost > 0){
            details.pcost = findCustomerproduct.product_cost;
            }
            if(findCustomerproduct.quantity > 0){
            details.minorderqty = findCustomerproduct.quantity;
            }
          }
        }
        if (findproduct) {
         
          findproduct.data.push(details);
        }
        else{
          let value = {brandName:details.brandname,category:details.category,data:[]};
         
          value.data.push(details);
          this.productList.push(value);
        }
       
      }
      //console.log("products list ",this.productList);
    }
  }

    setPrice(){
      var detailsArray =[];
      var distCustomer = this.Details; 
      var authService = this.authenticationService;
      

      //console.log(distCustomer);
      _.each( this.productList, function (i, j) {
      let details: any = i;
      //console.log(details);
      _.each( details.data , function(k , l){
        let DetailData: any = k;
        //console.log(DetailData);
        
      let input=  {"root":{"dealerid":distCustomer.dealers.user_id,"customerid":distCustomer.userid,"productid":DetailData.productid,"producttype":DetailData.ptype,"product_cost":DetailData.pcost,"quantity":DetailData.minorderqty,"discount_amt":DetailData.pcost,"loginid":distCustomer.userid,"apptype":authService.appType()}};
      detailsArray.push(input);
      //console.log(input);
      

    
    });
    });
    //console.log(detailsArray);
    this.productService.setPrice(detailsArray)
    .subscribe(
    output => this.setPriceResult(output),
    error => {
    //console.log("error");
    this.loaderService.display(false);
  });
  }
  setPriceResult(result){
    //console.log(result);
    if(result.result == 'success'){
      this.thisDialogRef.close('success');    
    }
  }
  
  numberEvent(e: any) {
    // console.log(e);
    if (isNaN(e.key) || e.key == '' || e.key == 32) {
      e.preventDefault();
    }
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.getProducts();
    console.log(this.Details);

  }

}
