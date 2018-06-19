import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { CreateupdatecategoryComponent } from '../createupdatecategory/createupdatecategory.component';
import {CategoryproductsComponent} from '../categoryproducts/categoryproducts.component';
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public dialog: MdDialog,private authenticationService: AuthenticationService,  private productService: ProductsService) { }

  categoryList :any =[];




  getProductByCategory(){
    let input= {"userId":this.authenticationService.loggedInUserId(),"userType":"dealer","loginid":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    //console.log(input);

    this.productService.getProductsCategory(input)
    .subscribe(
    output => this.getProductsCategoryResult(output),
    error => {
      //console.log("error in products category list");
    });
  }
  getProductsCategoryResult(result){
    //console.log(result);
    if (result.result == "success") {
      this.categoryList = result.data;
    }
  }

  createCategory(){
    let dialogRefSetting = this.dialog.open(CreateupdatecategoryComponent, {
      width: '500px',
      data: ''
  });
  dialogRefSetting.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
      if(result == 'success'){
        this.getProductByCategory();

      }
  });
  }

  updateCategory(data){
    let dialogRefSetting = this.dialog.open(CreateupdatecategoryComponent, {
      width: '500px',
      data: data
  });
  dialogRefSetting.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
      if(result == 'success'){
        this.getProductByCategory();
      }
  });

  }

  getProducts(data){
    let dialogRefSetting = this.dialog.open(CategoryproductsComponent, {
      width: '800px',
      data: data
  });
  dialogRefSetting.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
   
   
  });

  }



  ngOnInit() {
    this.getProductByCategory();
  }

}
