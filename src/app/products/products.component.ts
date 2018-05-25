import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddEditProductDailogComponent } from '../add-edit-product-dailog/add-edit-product-dailog.component';
import { AddInvoiceDailogComponent } from '../add-invoice-dailog/add-invoice-dailog.component';
import { AddStockHistoryComponent } from '../add-stock-history/add-stock-history.component';
import { ProductHistoryDailogComponent } from '../product-history-dailog/product-history-dailog.component';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import { AddstockProductComponent } from '../addstock-product/addstock-product.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';


import { DeleteTemplateComponent } from '../delete-template/delete-template.component';
import { ProductServiceAreaComponent } from '../product-service-area/product-service-area.component';


import * as _ from 'underscore';
@Component({

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService,  private productService: ProductsService) { }
  superDealer = true;
  showFilterDialog = false;
  productList = [];
  selectedFile = null;
  base64textString:any = "";
  filterViewToggle() {
    this.showFilterDialog = !this.showFilterDialog;
  }

  addEditProduct() {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });

  }
  editProduct(data) {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '700px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });

  }
  UpdateStatus(data) {
    let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

      width: '400px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });

  }
  addInvoice() {
    let dialogRefAddInvoice = this.dialog.open(AddInvoiceDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });

  }
  addStock(data) {
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

      width: '600px',
      data: data
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });
  }
  stockHistory(data) {
    let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

      width: '40%',
      data: data
    });
    dialogRefStrockHitory.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);


    });

  }
  productStockHistory() {
    let dialogRefProductStrockHitory = this.dialog.open(ProductHistoryDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefProductStrockHitory.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);


    });

  }
  getProducts() {
    let input = {"product":{ userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"getallproducts" ,loginid:this.authenticationService.loggedInUserId() , usertype: this.authenticationService.userType() }};
    this.productService.createProduct(input)
      .subscribe(
      output => this.getProductsResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });

  }
  getProductsResult(result) {
    console.log(result);
    this.productList = [];
    if (result.result == 'success') {


      // let productCopy = [];
      for (let details of result.data) {
        if(details.stockstatus == 'Soldout'){
          details.stockColor = 'warn';
          }

        //let details: any = i;

        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          return productDetails.brandName == details.brandname;
          
        });

        if (findproduct) {
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] };
          value.data.push(details);
          this.productList.push(value);
        }

      }
      //console.log("products list ", this.productList)

    }
  }

  productArea(data){

    let dialogRef = this.dialog.open(ProductServiceAreaComponent, {
      width: '75%', 
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
    }

  });


  }


  activateProduct(data){
  let input = {"product":{"transtype":"delete","pid": data.productid ,  userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "isactive": 1 }};
    console.log(input);
    this.productService.createProduct(input)
    .subscribe(
    output => this.activateProductResult(output),
    error => {
      //console.log("error in distrbutors");
    });
  }
  activateProductResult(result){
if(result.result == 'success'){
  console.log('product activated');
  this.getProducts();

}
  }







  deleteProduct(data){
    let dialogRef = this.dialog.open(DeleteTemplateComponent, {
      width: '50%', 
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getProducts();

    }

  });



  }

  onFileSelected(event){

      var files = event.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    
  }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(btoa(binaryString));
   }

  // //  /uploadimg   data.productid pname



   uploadImage(data){
     let input = {"image":{"base64string": this.base64textString , "filename": 'product_'+data.productid }};
     this.productService.uploadImage(input)
    .subscribe(
    output => this.uploadImageResult(output),
    error => {
      //console.log("error in distrbutors");
    });
   }
   uploadImageResult(result){
     if(result.result == 'success'){
      this.getProducts();

     }
   }







  



  ngOnInit() {
    this.getProducts();
    this.superDealer = this.authenticationService.getSupperDelear();
  }

}
