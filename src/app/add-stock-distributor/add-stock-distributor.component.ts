import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';

@Component({
  selector: 'app-add-stock-distributor',
  templateUrl: './add-stock-distributor.component.html',
  styleUrls: ['./add-stock-distributor.component.css']
})
export class AddStockDistributorComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<AddStockDistributorComponent>, @Inject(MD_DIALOG_DATA) public details: any, public dialog: MdDialog, private orderLandingService: OrderLandingService,private distributorService: DistributorServiceService,private loaderService: LoaderService) { }
  ProductsList=[];
  getProducts() {
    this.loaderService.display(true);
    
    let input = { dealerID: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() ,  "usertype": this.authenticationService.userType() };
    this.orderLandingService.getProductsByDealrID(input)
      .subscribe(
      output => this.getProductsResult(output),
      error => {
        //console.log("error in order details");
        this.loaderService.display(false);
      });
  }
  getProductsResult(result) {
    
    //console.log("result of products",result);
    if (result.data && result.data.length > 0) {
      let orderdata = this.details;
      
      let inputFormat = {"product":{"productid":"","productname":"","producttype":"","product_cost":"","stock":"0","distributerid":this.details.id,"loginid":this.authenticationService.loggedInUserId(),"apptype": this.authenticationService.appType(),"createdthru": "website" } };
      let inputData = [];
      _.each(result.data, function (i, j) {
        let detail: any = i;
        let inputFormatcopy = JSON.parse(JSON.stringify(inputFormat));
        inputFormatcopy.product.productid = detail.productid;
        inputFormatcopy.product.producttype = detail.ptype;
        inputFormatcopy.product.product_cost = detail.pcost;
        inputFormatcopy.product.productname = detail.brandname;
        inputFormatcopy.product.category = detail.category;
        inputData.push(inputFormatcopy);

      });
      this.ProductsList= inputData;
      //console.log(this.ProductsList);

    }
    this.loaderService.display(false);
  }
  setStockForDistributor(){
    let input = [];
    _.each(this.ProductsList, function (i, j) {
      let detail: any = i;
      if(detail.product.stock !== "0"){
        input.push(detail);
      }
    
    });
    //console.log(input);
    this.distributorService.setStockdistributor(input)
    .subscribe(
    output => this.setStockForDistributorResult(output),
    error => {
      //console.log("error in order details");
      this.loaderService.display(false);
    });
  }

  setStockForDistributorResult(result){
    //console.log(result);
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
    
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}
  ngOnInit() {
    this.getProducts();
  }

}
