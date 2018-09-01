import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
@Component({
  selector: 'app-empty-can-dailog',
  templateUrl: './empty-can-dailog.component.html',
  styleUrls: ['./empty-can-dailog.component.css']
})
export class EmptyCanDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<EmptyCanDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService,private loaderService: LoaderService) { }
  ProductsCans = [];

  getProducts() {
    this.loaderService.display(true);
    
    let input = { dealerID: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() , usertype: this.authenticationService.userType() };
    this.orderLandingService.getProductsByDealrID(input)
      .subscribe(
      output => this.getProductsResult(output),
      error => {
        //console.log("error in order details");
        this.loaderService.display(false);
      });
  }
  getProductsResult(result) {
    
    //console.log(result);
    if (result.data && result.data.length > 0) {
      let orderdata = this.orderDetail;
      let canFormat = { "root": { "brandname":"","brandType":"","avaliablecans": "", "loginid": this.authenticationService.loggedInUserId(), "customerid": this.orderDetail.order_by, "dealerid": this.authenticationService.loggedInUserId(), "productid": "", "apptype": this.authenticationService.appType(), "createdthru": "website" } };
      let cansData = [];
      _.each(result.data, function (i, j) {
        let details: any = i;
        let canFormatcopy = JSON.parse(JSON.stringify(canFormat));
        canFormatcopy.root.brandname = details.brandname;
        canFormatcopy.root.brandType = details.ptype;
        let OrderListCan = _.find(orderdata,function(e:any){
          return e.productid  == details.productid;
        });
        if(OrderListCan){
          canFormatcopy.root.avaliablecans = OrderListCan.avaliablecans;
          canFormatcopy.root.productid = details.productid;
          cansData.push(canFormatcopy);
        }
        // else{
        // canFormatcopy.root.avaliablecans = details.avaliable_emptycans;
        // }
        // canFormatcopy.root.productid = details.productid;
        

      });
      this.ProductsCans = cansData;

    }
    this.loaderService.display(false);
  }
  updateCanQuantity(){
    this.loaderService.display(true);
    let input = this.ProductsCans;
    this.orderLandingService.UpdateProductsQuantity(input)
    .subscribe(
    output => this.updateCanQuantityResult(output),
    error => {
      //console.log("error in order details");
      this.loaderService.display(false);
    });
  }
  updateCanQuantityResult(result){
    this.loaderService.display(false);
    //console.log(result);
    if(result.result = 'success'){
      this.thisDialogRef.close('success');
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {

    this.getProducts();
    console.log(this.orderDetail);
  }

}
