import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';
@Component({
  templateUrl: './add-edit-product-dailog.component.html',
  styleUrls: ['./add-edit-product-dailog.component.css']
})
export class AddEditProductDailogComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    public thisDialogRef: MdDialogRef<AddEditProductDailogComponent>,
    @Inject(MD_DIALOG_DATA) public Details: any,
    public dialog: MdDialog,
    private loaderService: LoaderService,
    private productService: ProductsService
  ) {}

  // productPriorityFormControl = new FormControl ('' , [Validators.required]);
  // productNameFormControl = new FormControl('',[Validators.required]);
  // productTypeFormControl = new FormControl('',[Validators.required]);
  // productCostFormControl = new FormControl('',[Validators.required]);
  // productQtyFormControl = new FormControl('',[Validators.required]);
  // serviceChargeFormControl = new FormControl('',[Validators.required]);
  // expressDeliveryFormControl = new FormControl('',[Validators.required]);

  p1FC = new FormControl('', [Validators.required]);
  p2FC = new FormControl('', [Validators.required]);
  p3FC = new FormControl('', [Validators.required]);
  p4FC = new FormControl('', [Validators.required]);
  p5FC = new FormControl('', [Validators.required]);
  p6FC = new FormControl('', [Validators.required]);
  p7FC = new FormControl('', [Validators.required]);
  superDealer = true;
  customerCare = true;
  salesteam = true;

  productCategoryList = [];
  productTypeList = [];
  headerValue = 'Add Products';
  message: any = '';

  productDetails: any = {
    categoryDetails: '',
    productName: '',
    productType: '',
    currency: '',
    cost: '',
    iscanRetrunable: true,
    minQty: '',
    Priority: '',
    IsAuthorized: '',
    servicecharge: '',
    expressdeliverycharges: '',
    brandname: '',
    hsncode:''
  };
  getProductCategory() {
    let input = {
      userId: this.authenticationService.loggedInUserId(),
      appType: this.authenticationService.appType(),
      userType: this.authenticationService.userType()
    };
    this.productService.getProductsCategory(input).subscribe(
      output => this.getProductCategoryResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      }
    );
  }
  getProductCategoryResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.productCategoryList = result.data;
      if (this.Details) {
        this.getProductDetails();
      }
    }
  }
  getProductsByCategory() {
    if (this.Details) {
      let input = {
        root: {
          userid: this.authenticationService.loggedInUserId(),
          usertype: this.authenticationService.userType(),
          category: this.Details.category,
          categoryid: this.Details.categoryid,
          apptype: this.authenticationService.appType()
        }
      };
      this.productService.getProductsByCategory(input)
      .subscribe(
        output => this.getProductsByCategoryResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        }
      );
    }
  }
  getProductsByCategoryResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.productTypeList = result.data;
    }
  }
  createProduct() {
    if (this.validate()) {
      let input = {product: {category: this.productDetails.categoryDetails.category,servicecharge: this.productDetails.servicecharge,expressdeliverycharges: this.productDetails.expressdeliverycharges,categoryid: this.productDetails.categoryDetails.categoryid,currency: this.productDetails.currency, brandname: this.productDetails.brandname, pname: this.productDetails.productName, ptype: this.productDetails.productType,pcost: this.productDetails.cost,areaid: '0',minorderqty: this.productDetails.minQty,priority: this.productDetails.Priority,iscanreturnable: this.productDetails.iscanRetrunable,isauthorized: this.productDetails.IsAuthorized,hsncode: this.productDetails.hsncode,loginid: this.authenticationService.loggedInUserId(),apptype: this.authenticationService.appType()}};
      this.productService.createProduct(input).subscribe(
        output => this.createProductResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        }
      );
    }
  }
  createProductResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }
  updateProduct() {
    if (this.validate()) {
      
      let input = {product: {pid: this.Details.productid,category: this.productDetails.categoryDetails.category, categoryid: this.productDetails.categoryDetails.categoryid, currency: 'INR', brandname: this.productDetails.brandname , servicecharge: this.productDetails.servicecharge , expressdeliverycharges: this.productDetails.expressdeliverycharges , pname: this.productDetails.productName, ptype: this.productDetails.productType,pcost: this.productDetails.cost,areaid: '0',minorderqty: this.productDetails.minQty,priority: this.productDetails.Priority,iscanreturnable: this.productDetails.iscanRetrunable,isauthorized: this.productDetails.IsAuthorized,hsncode: this.productDetails.hsncode,loginid: this.authenticationService.loggedInUserId(), userid : this.authenticationService.loggedInUserId() , apptype: this.authenticationService.appType()}};
      console.log(input);
      this.productService.updateProduct(input).subscribe(
        output => this.updateProductResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        }

      );
    }
  }
  updateProductResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }
  getProductDetails() {
    if (!this.Details.userid) {
      this.headerValue = 'Edit Products';
      let productDetails = this.Details;
      let category = _.find(this.productCategoryList, function(k, l) {
        let Details: any = k;
        return Details.categoryid == productDetails.categoryid;
      });
      if (category) {
        this.productDetails.categoryDetails = category;
      }
      this.productDetails.productName = this.Details.pname;
      this.productDetails.productType = this.Details.ptype;
      this.productDetails.cost = this.Details.pcost;
      this.productDetails.iscanRetrunable = this.Details.iscanreturnable;
      this.productDetails.minQty = this.Details.minorderqty;
      this.productDetails.Priority = this.Details.priority;
      if(this.Details.isauthorized == 'true'){
        this.productDetails.IsAuthorized = true;
      }
      else{
        this.productDetails.IsAuthorized = false;
      }
      //  = JSON.parse(this.Details.isauthorized);
      this.productDetails.expressdeliverycharges = this.Details.expressdeliverycharges;
      this.productDetails.servicecharge = this.Details.servicecharge;
      this.productDetails.brandname = this.Details.brandname;
      this.productDetails.hsncode = this.Details.hsncode;
    }
  }

  createDistributorProduct() {
    if (this.validate()) {
      let input = {product: {category: this.productDetails.categoryDetails.category, servicecharge: this.productDetails.servicecharge,expressdeliverycharges: this.productDetails.expressdeliverycharges, categoryid: this.productDetails.categoryDetails.categoryid, currency: this.productDetails.currency,brandname: this.productDetails.productName,pname: this.productDetails.productName,ptype:  this.productDetails.productType,pcost: this.productDetails.cost,areaid: '0',minorderqty: this.productDetails.minQty,priority: this.productDetails.Priority,iscanreturnable: this.productDetails.iscanRetrunable,isauthorized: this.productDetails.IsAuthorized,hsncode: this.productDetails.hsncode,loginid: this.Details.userid,apptype: this.authenticationService.appType()}};
      this.productService.createProduct(input)
      .subscribe(
        output => this.createProductResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        }
      );
    }
  }

  createDistributorProductResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  onSubimtProducts() {
    if (this.Details && this.Details.productid) {
      this.updateProduct();
    } else if (this.Details && this.Details.userid) {
      this.createDistributorProduct();
    } else {
      this.createProduct();
    }
  }

  validate() {
    if (this.productDetails.categoryDetails &&this.productDetails.categoryDetails.category) {
      this.message = '';
      return true;
    }
     else {
      this.message = 'Please select category';
      return false;
    }
  }
  numberEvent(e:any){
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }

  }
  changeProdName(e){
    console.log(e);
    this.productDetails.brandname = e;
  }
  ngOnInit() {
    console.log(this.Details);
    this.getProductCategory();
    this.superDealer = this.authenticationService.getSupperDelear();
    this.customerCare = this.authenticationService.customerCareLoginFunction();
    this.salesteam = this.authenticationService.salesTeamLoginFunction();
  }
}
