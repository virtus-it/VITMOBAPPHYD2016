import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';

import { MD_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';
import { letProto } from '../../../node_modules/rxjs/operator/let';

@Component({
  selector: 'app-add-product-dealer',
  templateUrl: './add-product-dealer.component.html',
  styleUrls: ['./add-product-dealer.component.css']
})
export class AddProductDealerComponent implements OnInit {
  constructor(
    public thisDialogRef: MdDialogRef<AddProductDealerComponent>,
    private authenticationService: AuthenticationService,
    private productService: ProductsService,
    @Inject(MD_DIALOG_DATA) public Details: any,
    private loaderService: LoaderService
  ) { }
  productsList = [];
  productsInput: any = [];
  distributorId = '';
  listOfProducts: any = [];

  dealerAddProduct() {
    let input = {
      userId: this.authenticationService.loggedInUserId(),
      appType: this.authenticationService.appType()
    };
    console.log(input);
    this.productService.getProducts(input)
      .subscribe(
        output => this.dealerAddProductResult(output),
        error => {
          //console.log("error in dealer products");
          this.loaderService.display(false);
        }
      );
  }

  //  this.productsList = result.data;
  // let removableProdID = detailData.productid;
  // prodId = details.productid;

  dealerAddProductResult(result) {
    if ((result.result = 'success')) {
      console.log(result.data, 'result.data');
      // let prodId: any = [];
      // let category: any = [];
      // let productType = [];
      // let finalProducts: any = [];
      // let brandName: any = [];
      let distributorProdList = this.Details.distProducts;
      console.log(distributorProdList, 'Details ie dist products');
      let midfiedList = [];
      if(distributorProdList.length > 0){
      for (var j = 0; j < result.data.length; j++) {
        for (var i = 0; i < distributorProdList.length; i++) {
          if (distributorProdList[i].ptype == result.data[j].ptype && distributorProdList[i].brandname == result.data[j].brandname && distributorProdList[i].category == result.data[j].category) {
            break;
          } else if (i == distributorProdList.length - 1) {
            midfiedList.push(result.data[j]);
          }
        }
      }
    }
    else{
      midfiedList = result.data;
    }
      console.log("Product which are not in distributor list", midfiedList);

      // var removeProducts = _.each(result.data, function (i, j) {
      //   let details: any = i;

      //   // prodName = details.pname;
      //   // prodId = details.productid;
      //   brandName = details.brandname;
      //   category = details.category;
      //   productType = details.ptype;
      //   let distProds = _.find(distributorProdList, function (k, l) {
      //     let detailData: any = k;
      //     // if((detailData.brandname == brandName) && (detailData.category == category)){
      //     //   console.log('true');
      //     // }
      //     // else{
      //     //   console.log('false');
      //     // }
      //     // return ((detailData.brandname == brandName) && (detailData.category == category) && (detailData.ptype = productType) );

      //     // if the above 1 doestnot filter use this it only filters cat and ptype
      //     return ((detailData.category == category) && (detailData.brandname == brandName));



      //   });
      //   if (!distProds) {
      //     finalProducts.push(details);
      //   }
      // });

      this.productsList = midfiedList;
    }
  }

  confirmProduct() {
    let products = [];
    let authenticationLogin = this.authenticationService.loggedInUserId();
    let distributorDetails = this.Details.data.userid;
    let authApptype = this.authenticationService.appType();
    _.each(this.productsInput, function (i, j) {
      let input = {
        product: {
          productid: '',
          productname: '',
          producttype: '',
          product_cost: '',
          stock: '0',
          distributerid: distributorDetails,
          loginid: authenticationLogin,
          apptype: authApptype
        }
      };
      let details: any = i;
      input.product.productid = details.productid;
      input.product.productname = details.pname;
      input.product.producttype = details.ptype;
      input.product.product_cost = details.pcost;
      products.push(input);
    });

    //console.log(products);

    this.productService.assignDealerProducts(products).subscribe(
      output => this.confirmProductResult(output),
      error => {
        //console.log("error in dealer products");
        this.loaderService.display(false);
      }
    );
  }
  confirmProductResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  productDetails(product: any, isChecked: boolean) {
    if (isChecked) {
      this.productsInput.push(product);
    } else {
      this.productsInput = this.productsInput.filter(function (e) {
        return e.productid !== product.productid;
      });
      //console.log(this.productsInput);
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.dealerAddProduct();

    console.log(this.Details);
  }
}
