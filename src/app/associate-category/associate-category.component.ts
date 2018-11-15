import { Component, OnInit , Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-associate-category',
  templateUrl: './associate-category.component.html',
  styleUrls: ['./associate-category.component.css']
})
export class AssociateCategoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,  private productService: ProductsService ,  public thisDialogRef: MdDialogRef<AssociateCategoryComponent>,@Inject(MD_DIALOG_DATA) public Details: any,) { }

  categoryList:any = [];
  associateInput = {categoryId: "" }


  getAllCategories(){
    let input= {"userId":this.authenticationService.loggedInUserId(),"userType":"dealer","loginid":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    this.productService.getProductsCategory(input)
    .subscribe(
    output => this.getAllCategoriesResult(output),
    error => {
    });
  }
  getAllCategoriesResult(result){
    if (result.result == "success") {
      this.categoryList = result.data;
    }
    else{
    }
  }

  associateCategory(){
    let input = {catid: this.associateInput.categoryId , userid :  this.Details.userid }; 
    console.log(input , 'ipipipip'); 

  }

  onCloseCancel(){
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
    this.getAllCategories();
    console.log(this.Details);
  }

}
