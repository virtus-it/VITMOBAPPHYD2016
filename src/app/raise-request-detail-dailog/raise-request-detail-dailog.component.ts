import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';
import * as moment from 'moment';


@Component({
  selector: 'app-raise-request-detail-dailog',
  templateUrl: './raise-request-detail-dailog.component.html',
  styleUrls: ['./raise-request-detail-dailog.component.css']
})
export class RaiseRequestDetailDailogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<RaiseRequestDetailDailogComponent>, private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, ) { }

  allProductsList = [];
  bindableProductsArray = [];
  raiseRequestDetails = { requestdate: '' , requestquantity: '' };
  ipSendingArray = [];
  errorMessage = '';

  raiseRequestInput = { "product": { "pid": '', "productname": "", "pType": "", "stock": "", "returnemptycans": "", "loginid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "invoicedate": this.raiseRequestDetails.requestdate, "itemcost": "", "distributorid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.superDelearId(), "categoryid": "", "apptype": this.authenticationService.appType() } };



  getProducts() {
    let input = { "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() };
    this.distributorService.getProductsForRaiseRequest(input)
      .subscribe(
        output => this.getProductsResult(output),
        error => {
        });
  }
  getProductsResult(result) {
    if (result.result == 'success') {
      this.allProductsList = result.data;
      _.each(this.allProductsList, function (i, j) {
        let details: any = i;
        details.stock = '';
        details.returnemptycans = '';
      });
    }
  }

  raiseRequestByDistributor() {
    if (this.raiseRequestDetails.requestdate) {
      this.raiseRequestDetails.requestdate = moment(this.raiseRequestDetails.requestdate).format('DD-MM-YYYY');
    }
    let requiredProductDetails = { "product": { "pid": '', "productname": "", "pType": "", "stock": "", "returnemptycans": "", "loginid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "invoicedate": this.raiseRequestDetails.requestdate, "itemcost": "", "distributorid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.superDelearId(), "categoryid": "", "apptype": this.authenticationService.appType() } };
    let requiredProductsArray = [];
    _.each(this.allProductsList, function (i, j) {
      let details: any = i;
      // requiredProductDetails.product.stock = details.stock;
      // requiredProductDetails.product.returnemptycans = details.returnemptycans;
      if (details.stock && details.returnemptycans) {
        requiredProductDetails.product.productname = details.pname;
        requiredProductDetails.product.pid = details.productid;
        requiredProductDetails.product.pType = details.ptype;
        requiredProductDetails.product.itemcost = details.pcost;
        requiredProductDetails.product.stock = details.stock;
        requiredProductDetails.product.returnemptycans = details.returnemptycans;
        requiredProductDetails.product.categoryid = details.categoryid;
      }
      requiredProductsArray.push(requiredProductDetails);
    });
    
    let input = requiredProductsArray;
    console.log(input, 'sdgZDgsfjhgzfj')
    // this.distributorService.raiseReqByDistributor(input)
    // .subscribe(
    //   output => this.raiseRequestByDistributorResult(output),
    //   error => {
    //   });
  }
  raiseRequestByDistributorResult(result) {
    if (result.result == 'success') {

    }
  }

  numberEvent(e: any) {
    if (isNaN(e.key) || e.key == '') {
      e.preventDefault();
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if (this.Details.type == 'newRaiseRequest') {
      this.getProducts();
    }
  }

}



























// stockEventListener = false;
// emptyCansEventListener = false;
// addStock(event , details){
//   console.log(details);
//   if(event > 0){
//     this.stockEventListener = true;
//     this.raiseRequestInput.product.pid = details.categoryid;
//     this.raiseRequestInput.product.productname = details.categoryid;
//     this.raiseRequestInput.product.pType = details.categoryid;
//     this.raiseRequestInput.product.stock = event;
//     this.raiseRequestInput.product.itemcost = details.categoryid;
//     this.raiseRequestInput.product.categoryid = details.categoryid;
//     this.ipSendingArray.push(this.raiseRequestInput);
//   }
//   else{
//     this.stockEventListener = false;
//     this.ipSendingArray.pop()
//   }
// }


// addEmptyCans(event){
//   console.log(event);
//   if(event > 0){
//     this.emptyCansEventListener = true;
//   }
//   else{
//     this.emptyCansEventListener = false;
//   }
// }