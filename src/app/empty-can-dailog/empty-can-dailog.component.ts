import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-empty-can-dailog',
  templateUrl: './empty-can-dailog.component.html',
  styleUrls: ['./empty-can-dailog.component.css']
})
export class EmptyCanDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<EmptyCanDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService) { }
  ProductsCans = [];
  getProducts() {
    let input = { dealerID: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() };
    this.orderLandingService.getProductsByDealrID(input)
      .subscribe(
      output => this.getProductsResult(output),
      error => {
        console.log("error in order details");
      });
  }
  getProductsResult(result) {
    console.log(result);
    if (result.data && result.data.length > 0) {
      let orderdata = this.orderDetail;
      let canFormat = { "root": { "brandname":"","brandType":"","avaliablecans": "", "loginid": this.authenticationService.loggedInUserId(), "customerid": this.orderDetail.order_by, "dealerid": "289", "productid": "", "apptype": this.authenticationService.appType(), "createdthru": "website" } };
      let cansData = [];
      _.each(result.data, function (i, j) {
        let details: any = i;
        let canFormatcopy = JSON.parse(JSON.stringify(canFormat));
        canFormatcopy.root.brandname = details.brandname;
        canFormatcopy.root.brandType = details.ptype;
        
        canFormatcopy.root.avaliablecans = details.avaliable_emptycans;
        canFormatcopy.root.productid = details.productid;
        cansData.push(canFormatcopy);

      });
      this.ProductsCans = cansData;

    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {

    this.getProducts();
  }

}
