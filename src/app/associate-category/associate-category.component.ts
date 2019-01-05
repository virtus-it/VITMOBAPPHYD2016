import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-associate-category',
  templateUrl: './associate-category.component.html',
  styleUrls: ['./associate-category.component.css']
})
export class AssociateCategoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private productService: ProductsService, public thisDialogRef: MdDialogRef<AssociateCategoryComponent>, @Inject(MD_DIALOG_DATA) public Details: any, private distributorService: DistributorServiceService, ) { }

  categoryList: any = [];
  associateInput = { categoryId: "" }


  getAllCategories() {
    let input = { "userId": this.authenticationService.loggedInUserId(), "userType": "dealer", "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
    this.productService.getProductsCategory(input)
      .subscribe(
        output => this.getAllCategoriesResult(output),
        error => {
        });
  }
  getAllCategoriesResult(result) {
    if (result.result == "success") {
      this.categoryList = result.data;
    }
    else {
    }
  }

  associateCategory() {
    if (this.Details) {
      let input = this.Details.input;
      input.User.categoryid = this.associateInput.categoryId;
      console.log(input, 'ipipipip');
      this.distributorService.createDistributor(input)
        .subscribe(
          output => this.addManufacturerResult(output),
          error => {
            //console.log("error in distrbutors");
          }
        );
    }
  }
  addManufacturerResult(result) {
    if (result && result.result == 'success') {
      this.thisDialogRef.close('success');
    }

  }



  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
    this.getAllCategories();
    console.log(this.Details);
  }

}
