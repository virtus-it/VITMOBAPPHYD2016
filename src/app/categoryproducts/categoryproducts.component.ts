import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { AddstockProductComponent } from '../addstock-product/addstock-product.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';

@Component({
  selector: 'app-categoryproducts',
  templateUrl: './categoryproducts.component.html',
  styleUrls: ['./categoryproducts.component.css']
})
export class CategoryproductsComponent implements OnInit {

  constructor(public dialog: MdDialog,private authenticationService: AuthenticationService,public thisDialogRef: MdDialogRef<CategoryproductsComponent>, @Inject(MD_DIALOG_DATA) public details: any, private productService: ProductsService) { }

  productCategoryInput = { category:"",categoryid:"" };
  productCategory = [];

  getCategoryProducts(){
    let input={"root":{"userid":this.authenticationService.loggedInUserId(),"usertype":"dealer","category":this.details.category,"categoryid":this.details.categoryid,"apptype":this.authenticationService.appType()}};
    //console.log(input);
    this.productService.getProductsByCategory(input)
    .subscribe(
    output => this.getProductsByCategoryResult(output),
    error => {
        //console.log("error in distrbutors");
    }); 
  }

  getProductsByCategoryResult(result){
    //console.log(result);
    if (result.result == "success") {
      this.productCategory = result.data;
    }

  }
  addStock(data){
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

      width: '700px',
      data: data
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getCategoryProducts();
      }

    });

  }

  changeStatus(data){
    let formattedData = {type : 'changeStatusFromCategory' , data : data}
    let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

      width: '700px',
      data: formattedData
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getCategoryProducts();

      }

    });

  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }



  ngOnInit() {
    //console.log(this.details);
    this.getCategoryProducts();
  }

}
