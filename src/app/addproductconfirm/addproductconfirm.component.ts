import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import { AuthenticationService } from '../login/authentication.service';
import { AddProductDealerComponent } from '../add-product-dealer/add-product-dealer.component';
import { MdDialog } from '@angular/material';
import { AddEditProductDailogComponent } from'../add-edit-product-dailog/add-edit-product-dailog.component';



@Component({
  selector: 'app-addproductconfirm',
  templateUrl: './addproductconfirm.component.html',
  styleUrls: ['./addproductconfirm.component.css']
})
export class AddproductconfirmComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddproductconfirmComponent>, private authenticationService: AuthenticationService, private productService: ProductsService, private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog) { }



  // dealerAddProduct(){
  //   let input={"userId":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
  //   console.log(input);
  //   this.productService.getProducts(input)
  //     .subscribe(
  //     output => this.dealerAddProductResult(output),
  //     error => {
  //       console.log("error in dealer products");
  //       this.loaderService.display(false);
  //     });
  // }
  // dealerAddProductResult(result){
  //   console.log(result);
  //   if (result.result = 'success') {


  // }
  // }


  dealerAddProductDialog() {
    let dialogRefSupplierOrderList = this.dialog.open(AddProductDealerComponent, {
        width: '700px',
        data: ''
    });
    dialogRefSupplierOrderList.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);

    });
}




  // DistributorAddProduct(){
  //   let input={"userId":this.Details.userid,"userType":"dealer","loginid":this.Details.userid,"appType":this.authenticationService.appType()};
  //   console.log(input);
  //   this.productService.getProductsCategory(input)
  //     .subscribe(
  //     output => this.DistributorAddProductResult(output),
  //     error => {
  //       console.log("error in category products");
  //       this.loaderService.display(false);
  //     });
  // }
  // DistributorAddProductResult(result){
  //   console.log(result);
  //   if (result.result = 'success') {


  // }

  // }

  DistributorAddProductDialog(){
    let dialogRefSupplierOrderList = this.dialog.open(AddEditProductDailogComponent, {
      width: '700px',
      data: ''
  });
  dialogRefSupplierOrderList.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);

  });

  }




  onCloseCancel(){
    this.thisDialogRef.close('Cancel');

  }

  ngOnInit() {
    console.log(this.Details);
  }

}
