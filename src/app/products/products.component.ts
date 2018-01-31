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
import * as _ from 'underscore';
@Component({

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService, private productService: ProductsService) { }
  superDealer = true;
  showFilterDialog = false;
  productList = [];
  filterViewToggle() {
    this.showFilterDialog = !this.showFilterDialog;
  }

  addEditProduct() {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
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
      console.log(`Dialog closed: ${result}`);
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
      console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });

  }
  addStock(data) {
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

      width: '700px',
      data: data
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts();
      }

    });
  }
  stockHistory(data) {
    let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

      width: '60%',
      data: data
    });
    dialogRefStrockHitory.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  productStockHistory() {
    let dialogRefProductStrockHitory = this.dialog.open(ProductHistoryDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefProductStrockHitory.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  getProducts() {
    let input = { userId: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() };
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
    this.productList = [];
    if (result.result == 'success') {
      // let productCopy = [];
      for (let details of result.data) {
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
      console.log("products list ", this.productList)

    }
  }

  ngOnInit() {
    this.getProducts();
    this.superDealer = this.authenticationService.getSupperDelear();
  }

}
