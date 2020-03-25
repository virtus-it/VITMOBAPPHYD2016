import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { CreateupdatecategoryComponent } from '../createupdatecategory/createupdatecategory.component';
import {CategoryproductsComponent} from '../categoryproducts/categoryproducts.component';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public dialog: MdDialog,private authenticationService: AuthenticationService,  private productService: ProductsService , private loaderService: LoaderService) { }

  categoryList :any =[];
  isDesc:boolean = false;
  column:any;



  getProductByCategory(){
    let input= {"userId":this.authenticationService.loggedInUserId(),"userType":"dealer","loginid":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    //console.log(input);
this.loaderService.display(true);
    this.productService.getProductsCategory(input)
    .subscribe(
    output => this.getProductsCategoryResult(output),
    error => {
      this.loaderService.display(false);
      //console.log("error in products category list");
    });
  }
  getProductsCategoryResult(result){
    //console.log(result);
    if (result.result == "success") {
      this.categoryList = result.data;
      this.loaderService.display(false);
    }
    else{
      this.loaderService.display(false);
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

  deleteCategory(data){
    let input = {"product":{"transtype":"delete","categoryid": data.categoryid}};
    this.productService.createCategory(input)
    .subscribe(
      output => this.deleteCategoryResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }
  deleteCategoryResult(result){
    if(result && result.data){
      console.log('deleted');
      this.getProductByCategory();
    }
  }

  sortTable(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.categoryList.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('category List');
      console.log(this.categoryList);
    } else {
      this.isDesc = true;
      this.categoryList.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }


  ngOnInit() {
    this.getProductByCategory();
  }

}
