import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { AddEditProductDailogComponent } from '../add-edit-product-dailog/add-edit-product-dailog.component';
import { LoaderService } from '../login/loader.service';
import { AddstockProductComponent } from '../addstock-product/addstock-product.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { AddStockHistoryComponent } from '../add-stock-history/add-stock-history.component';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-product-list-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.css']
})
export class ProductListDialogComponent implements OnInit {
  listOfProducts:any[];
  distributorId:any = "";
  isSuperDealer = false;
  noProductsError = false;

  constructor(public thisDialogRef: MdDialogRef<ProductListDialogComponent>, public dialog: MdDialog, @Inject(MD_DIALOG_DATA) public distributorDetails: any,private distributorService: DistributorServiceService, private productService: ProductsService,  private authenticationService: AuthenticationService,private loaderService: LoaderService) { }

//   getProducts(distributorDetails){
//   this.loaderService.display(true);
//   let distributorId = '';
//   let appType = "";
//   if(distributorDetails.user_id){
//    distributorId = distributorDetails.user_id;
//    appType = this.authenticationService.appType();
//   }
//   else if(distributorDetails.userid){
//   distributorId = distributorDetails.userid;
//   appType = this.authenticationService.appType();
//   }
//   this.distributorService.getDistbutorsProducts(distributorId, appType)
//   .subscribe(
//   output => this.getProductsResult(output),
//   error => {
//       //console.log("Logged in falied");
//       this.loaderService.display(false);
//   });

// }

getProducts(distributorDetails){
  this.loaderService.display(true);
  if(distributorDetails.user_id){
    this.distributorId = distributorDetails.user_id;
   }
   else if(distributorDetails.userid){
   this.distributorId = distributorDetails.userid;
   }
let input = {userId: this.distributorId, appType: this.authenticationService.appType() };
  console.log(input);
  this.distributorService.getDistbutorsProducts(input)
  .subscribe(
  output => this.getProductsResult(output),
  error => {
      //console.log("Logged in falied");
      this.loaderService.display(false);
  });

}

getProductsResult(output) {
  this.loaderService.display(false);
  this.listOfProducts = [];
  if(output.result == 'success'){


    
        // this.listOfProducts = output.data;
        
  
    for (let details of output.data) {
      let findproduct = _.find(this.listOfProducts, function (k, l) {
        let productDetails: any = k;
        return ((productDetails.brandName == details.brandname) && (productDetails.data[0].categoryid == details.categoryid));
        
      });

      if (findproduct) {
        findproduct.data.push(details);
      }
      else {
        let value = { brandName: details.brandname, category: details.category, data: [] };
        value.data.push(details);
        this.listOfProducts.push(value);
        
      }

     

    }

    console.log(this.listOfProducts , 'list');
    
    
  }
  else{
    this.noProductsError = true;
  }

}

  editProduct(data) {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {
  
      width: '700px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getProducts(this.distributorDetails);
        
      }
  
    });
  
  }

  stockHistory(data , distributorDetails) {
    let formattedData = {"type":"distributorspage", data:data , distributorId: distributorDetails.userid}
    let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

      width: '40%',
      data: formattedData
    });
    dialogRefStrockHitory.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result == 'success'){
        this.getProducts(this.distributorDetails);
      }
      


    });

  }



  addStock(data , distributorDetails){
    let formattedInput = { data:data , distributorId: distributorDetails.userid , type: "distproductsaddstock"}
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

      width: '600px',
      data: formattedInput
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getProducts(this.distributorDetails);
      }

    });

  }


  deleteDistributorProduct(data){
    let input = {"product": {"transtype":"delete","pid": data.productid ,  userid: this.distributorDetails.userid , apptype: this.authenticationService.appType() , "isactive": 0 } };
    console.log(input);
    this.productService.createProduct(input)
    .subscribe(
    output => this.deleteProductResult(output),
    error => {
      //console.log("error in distrbutors");
    });
  }
  deleteProductResult(result){
if(result.result == 'success'){
  this.getProducts(this.distributorDetails);
}
  }

  getSuperDealer(){
    if(this.authenticationService.isSuperDelear){
      this.isSuperDealer = true;
    }
    else{
      this.isSuperDealer = false;
    }
  }


  changeStockStatus(data){
    let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

      width: '400px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getProducts(this.distributorDetails);
      }

    });

  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}
  ngOnInit() {
    this.getProducts(this.distributorDetails);
    this.getSuperDealer();
    console.log(this.distributorDetails);
  }

}
