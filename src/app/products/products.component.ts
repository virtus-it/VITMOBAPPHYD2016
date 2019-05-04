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
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { DeleteTemplateComponent } from '../delete-template/delete-template.component';
import { ProductServiceAreaComponent } from '../product-service-area/product-service-area.component';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DistributorServiceService } from '../distributor/distributor-service.service';



import * as _ from 'underscore';
@Component({

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  DistributorCtrl: FormControl;
  filteredDistributors: Observable<any[]>;
  

  constructor(public dialog: MdDialog, private loaderService: LoaderService, private authenticationService: AuthenticationService,  private productService: ProductsService ,  private distributorService: DistributorServiceService ) {
    this.DistributorCtrl = new FormControl();
    this.filteredDistributors = this.DistributorCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.distributors.slice());
   }
  superDealer = true;
  showFilterDialog = false;
  productList = [];
  selectedFile = null;
  customerCare = true;
  distributors: any = [];
  base64textString:any = "";
  distributorView:boolean = false;
  LastfilterRecords = false;
  distributorId:any = 0;
  listOfProducts = [];
  noProductsError = false;
  salesTeamLogin :boolean = true;
  selectedIndex = 1;
  

  filterViewToggle() {
    this.showFilterDialog = !this.showFilterDialog;
  }

  addEditProduct() {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts(1);
      }

    });

  }
  editProduct(data) {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {

      width: '700px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts(1);
      }

    });

  }
  UpdateStatus(data) {
    let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

      width: '45%',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts(1);
      }

    });

  }
  addInvoice() {
    let dialogRefAddInvoice = this.dialog.open(AddInvoiceDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts(1);
      }

    });

  }
  addStock(data) {
    let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {
      width: '600px',
      data: data
    });
    dialogRefAddInvoice.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

        this.getProducts(1);
      }

    });
  }
  stockHistory(data) {
    let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

      width: '75%',
      data: data
    });
    dialogRefStrockHitory.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);


    });

  }
  productStockHistory() {
    let dialogRefProductStrockHitory = this.dialog.open(ProductHistoryDailogComponent, {

      width: '700px',
      data: ''
    });
    dialogRefProductStrockHitory.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);


    });

  }
  
  getProducts(selectedtab:number) {
    this.selectedIndex = selectedtab;

    let input = {"product":{ userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"getallproducts" ,loginid:this.authenticationService.loggedInUserId() , usertype: this.authenticationService.userType() }};
    this.loaderService.display(true);
    this.productService.createProduct(input)
      .subscribe(
      output => this.getProductsResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });

  }
  getProductsResult(result) {
    console.log(result);
    this.productList = [];
    if (result.result == 'success') {
    this.loaderService.display(false);
      // let productCopy = [];
      for (let details of result.data) {
        if(details.stockstatus == 'Soldout'){
          details.stockColor = 'danger';
          }
          if(details.stockstatus == 'Lowstock'){
            details.stockColor = 'warning';
            }
  

        //let details: any = i;

        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          // return ((productDetails.brandName == details.brandname) && (productDetails.category == details.category)); removed this as we were getting products under a category
          return ((productDetails.category == details.category));
          
        });

        if (findproduct) {
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] , categoryid: details.categoryid };
          value.data.push(details);
          this.productList.push(value);
        }

      }
      //console.log("products list ", this.productList)

    }
    else{
      this.loaderService.display(false);
    }
  }

  productArea(data){

    let dialogRef = this.dialog.open(ProductServiceAreaComponent, {
      width: '95%', 
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
    }

  });


  }


  activateProduct(data){
  let input = {"product":{"transtype":"delete","pid": data.productid ,  userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "isactive": 1 }};
    console.log(input);
    this.productService.createProduct(input)
    .subscribe(
    output => this.activateProductResult(output),
    error => {
      //console.log("error in distrbutors");
    });
  }
  activateProductResult(result){
if(result.result == 'success'){
  console.log('product activated');
  this.getProducts(1);

}
  }







  deleteProduct(data){
    let dialogRef = this.dialog.open(DeleteTemplateComponent, {
      width: '50%', 
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getProducts(1);

    }

  });



  }

  onFileSelected(event){

      var files = event.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    
  }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(btoa(binaryString));
   }

  // //  /uploadimg   data.productid pname



   uploadImage(data){
     let input = {"image":{"base64string": this.base64textString , "filename": 'product_'+data.productid }};
     this.productService.uploadImage(input)
    .subscribe(
    output => this.uploadImageResult(output),
    error => {
      //console.log("error in distrbutors");
    });
   }
   uploadImageResult(result){
     if(result.result == 'success'){
      this.getProducts(1);

     }
   }


   distributorProductsView(){
    this.distributorView = true;
    this.productList = [];
    this.getDistributors();
   }

   reset(){
    this.distributorView = false;
    this.getProducts(1);
    
   }


   getDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 200 } }
    if (this.distributors && this.distributors.length) {
      let lastDistributor: any = _.last(this.distributors);
      if (lastDistributor) {
        input.root.lastuserid = lastDistributor.userid;
      }


    }
    else {
      this.distributors = [];
      input.root.lastuserid = null;
    }

    //console.log(input);
    this.loaderService.display(true);
    this.distributorService.getAllDistributors(input)
      .subscribe(
      output => this.getDistributorsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getDistributorsResult(data) {
    //console.log(data);
    this.loaderService.display(false);
    if (data.result == 'success') {
      let distributorCopy = [];

      if (data.data && data.data.length) {
        _.each(data.data, function (i, j) {
          let details: any = i;
          details.fullName = details.firstname + " " + details.lastname
          distributorCopy.push(details);

        });

        this.distributors = _.union(this.distributors, distributorCopy);
        //  this.distributors = distributorCopy;
      }
    }
    else {
      this.LastfilterRecords = true;
    }
  }
  findDistributors(name: string) {
    //console.log(name);
    let finalDistributors = this.distributors.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    //console.log(finalDistributors);
    if (finalDistributors && finalDistributors.length > 0) {
      let findDistributor: any = {};

      findDistributor = _.find(finalDistributors, function (k, l) {
        let distDetails: any = k;
        return distDetails.fullName == name;
      });

      if (findDistributor) {
        this.distributorId = findDistributor.userid;
      }
      if(this.distributorId){
        this.getProductsByDistributor();
      }


    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        this.getDistributors();
      }


    }
    return finalDistributors;
  }



  getProductsByDistributor(){
    this.loaderService.display(true);
  let input = {userId: this.distributorId, appType: this.authenticationService.appType() };
    console.log(input);
    this.distributorService.getDistbutorsProducts(input)
    .subscribe(
    output => this.getProductsByDistributorResult(output),
    error => {
        //console.log("Logged in falied");
        this.loaderService.display(false);
    });
  
  }
  
  getProductsByDistributorResult(output) {
    this.loaderService.display(false);
    this.listOfProducts = [];
    if(output.result == 'success'){
  
      this.noProductsError = false;
      
          // this.listOfProducts = output.data;
          
    
      for (let details of output.data) {
        let findproduct = _.find(this.listOfProducts, function (k, l) {
          let productDetails: any = k;
          return ((productDetails.brandName == details.brandname) && (productDetails.data[0].categoryid == details.categoryid));
          
        });
  
        if (findproduct) {
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] };
          value.data.push(details);
          this.listOfProducts.push(value);
          this.productList = this.listOfProducts;
          
        }
  
       
  
      }
  
      console.log(this.listOfProducts , 'list');
      
      
    }
    else{
      this.noProductsError = true;
    }
  
  }

  showActiveProducts(selectedtab:number) {
      this.selectedIndex = selectedtab;
    let input = {"product":{ userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"activeproducts" ,loginid:this.authenticationService.loggedInUserId() , usertype: this.authenticationService.userType() }};
    this.loaderService.display(true);
    this.productService.createProduct(input)
      .subscribe(
      output => this.showActiveProductsResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });
  }
  showActiveProductsResult(result){
    this.productList = [];
    if (result.result == 'success') {
    this.loaderService.display(false);
      // let productCopy = [];
      for (let details of result.data) {
        if(details.stockstatus == 'Soldout'){
          details.stockColor = 'danger';
          }
          if(details.stockstatus == 'Lowstock'){
            details.stockColor = 'warning';
            }

        //let details: any = i;

        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          return ((productDetails.brandName == details.brandname) && (productDetails.category == details.category));
          
        });

        if (findproduct) {
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] , categoryid: details.categoryid };
          value.data.push(details);
          this.productList.push(value);
        }

      }
      //console.log("products list ", this.productList)

    }
    else{
      this.loaderService.display(false);
    }
  }



  showInactiveProducts(selectedtab:number) {
    this.selectedIndex = selectedtab;
    let input = {"product":{ userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"inactiveproducts" ,loginid:this.authenticationService.loggedInUserId() , usertype: this.authenticationService.userType() }};
    this.loaderService.display(true);
    this.productService.createProduct(input)
      .subscribe(
      output => this.showInactiveProductsResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });
  }
  showInactiveProductsResult(result){
    this.productList = [];
    if (result.result == 'success') {
    this.loaderService.display(false);
      // let productCopy = [];
      for (let details of result.data) {
        if(details.stockstatus == 'Soldout'){
          details.stockColor = 'danger';
          }
          if(details.stockstatus == 'Lowstock'){
            details.stockColor = 'warning';
            }
        //let details: any = i;

        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          return ((productDetails.brandName == details.brandname) && (productDetails.category == details.category));
          
        });

        if (findproduct) {
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] , categoryid: details.categoryid };
          value.data.push(details);
          this.productList.push(value);
        }

      }
      //console.log("products list ", this.productList)

    }
    else{
      this.loaderService.display(false);
    }
  }

  ngOnInit() {
    this.getProducts(1);
    this.superDealer = this.authenticationService.getSupperDelear();
    this.customerCare = this.authenticationService.customerCareLoginFunction();
    this.salesTeamLogin = this.authenticationService.salesTeamLoginFunction();
  }

}
