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
@Component({
  selector: 'app-product-list-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.css']
})
export class ProductListDialogComponent implements OnInit {
  listOfProducts:any[];
  distributorId:any = "";

  constructor(public thisDialogRef: MdDialogRef<ProductListDialogComponent>, public dialog: MdDialog, @Inject(MD_DIALOG_DATA) public distributorDetails: any,private distributorService: DistributorServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService) { }

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
  if(output.result == 'success'){

    this.listOfProducts = output.data;
    
    
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


    });

  }



  addStock(data){
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

      width: '600px',
      data: data
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      if (result == 'success') {
      }

    });

  }


  changeStockStatus(data){
    let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

      width: '400px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      if (result == 'success') {
      }

    });

  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}
  ngOnInit() {
    this.getProducts(this.distributorDetails);
    console.log(this.distributorDetails);
  }

}
