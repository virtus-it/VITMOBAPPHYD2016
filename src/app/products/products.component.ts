import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddEditProductDailogComponent } from '../add-edit-product-dailog/add-edit-product-dailog.component';
import { AddInvoiceDailogComponent } from '../add-invoice-dailog/add-invoice-dailog.component';
import { AddStockHistoryComponent } from '../add-stock-history/add-stock-history.component';
import { ProductHistoryDailogComponent } from '../product-history-dailog/product-history-dailog.component';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
@Component({

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService, private productService: ProductsService) { }

  showFilterDialog = false;

  filterViewToggle() {
    this.showFilterDialog = !this.showFilterDialog;
  }

  addEditProduct() {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '600px',
      data: ''
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  addInvoice() {
    let dialogRefAddInvoice = this.dialog.open(AddInvoiceDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);


    });

  }
  stockHistory() {
    let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

      width: '80%',
      data: ''
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

  }
 
  ngOnInit() {
    this.getProducts();
   // this.getCustomer();
  }

}
