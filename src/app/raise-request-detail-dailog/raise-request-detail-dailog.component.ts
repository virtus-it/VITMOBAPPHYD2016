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
  raiseRequestDetails = { requestdate: '', requestquantity: '' };
  ipSendingArray = [];
  errorMessage = '';
  invoiceDate = null;
  headerValue:string = '';
  modifieddate:string = '';
  secondStepDetails:any = [];


  // raiseRequestInput = { "product": { "pid": '', "productname": "", "pType": "", "stock": "", "returnemptycans": "", "loginid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "invoicedate": this.raiseRequestDetails.requestdate, "itemcost": "", "distributorid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.superDelearId(), "categoryid": "", "apptype": this.authenticationService.appType() } };



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
    let loginid = this.authenticationService.loggedInUserId();
    let usertype = this.authenticationService.userType();
    let invoiceDate = null;
    invoiceDate = moment(this.invoiceDate).format('DD-MM-YYYY');
    // console.log(invoiceDate , 'invoiceDateinvoiceDateinvoiceDateinvoiceDateinvoiceDate');
    let dealerid = this.authenticationService.superDelearId();
    let apptype = this.authenticationService.appType();
    let requiredProductsArray = [];
    _.each(this.allProductsList, function (i, j) {
      let details: any = i;
      if (details.stock && details.returnemptycans && details.stock > 0 && (details.returnemptycans >= 0)) {
        let requiredProductDetails = { "product": { "pid": '', "productname": "", "pType": "", "stock": "", "returnemptycans": "", "loginid": '', "usertype": '', "invoicedate": '' , "itemcost": "", "distributorid": '', "dealerid": '', "categoryid": "", "apptype": '' } };
        requiredProductDetails.product.productname = details.pname;
        requiredProductDetails.product.pid = details.productid;
        requiredProductDetails.product.pType = details.ptype;
        requiredProductDetails.product.itemcost = details.pcost;
        requiredProductDetails.product.stock = details.stock;
        requiredProductDetails.product.returnemptycans = details.returnemptycans;
        requiredProductDetails.product.categoryid = details.categoryid;
        requiredProductDetails.product.apptype = apptype;
        requiredProductDetails.product.dealerid = dealerid;
        requiredProductDetails.product.loginid = loginid;
        requiredProductDetails.product.usertype = usertype;
        requiredProductDetails.product.invoicedate = invoiceDate;
        requiredProductDetails.product.distributorid = loginid;
        requiredProductsArray.push(requiredProductDetails);
      }
    });

    let input = requiredProductsArray;
    console.log(input, 'sdgZDgsfjhgzfj');
    this.distributorService.raiseReqByDistributor(input)
    .subscribe(
      output => this.raiseRequestByDistributorResult(output),
      error => {
      });
  }
  raiseRequestByDistributorResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  numberEvent(e: any) {
    if (isNaN(e.key) || e.key == '') {
      e.preventDefault();
    }
  }

  // {"root":{"pid":"10","pcost":"50","stockcost":"50","stockid":"85","stock":"1","returnemptycans":"11","paidamt":"500","loginid":"289","usertype":"dealer","dealerid":"289","distributerid":"16","reqid":"85","status":"confirm","apptype":"moya"}


// "{"root":{"pid":10,"pcost":50,"stockcost":50,"stockid":85,"stock":1,"returnemptycans":11,"paidamt":"500","loginid":16,"usertype":"dealer","dealerid":289,"distributerid":16,"reqid":85,"status":"confirm","apptype":"moya"}}"


// {"root":{"pid":10,"pcost":50,"stockcost":50,"stockid":87,"stock":9,"returnemptycans":9,"paidamt":"980","loginid":289,"usertype":"dealer","dealerid":289,"distributerid":16,"reqid":87,"status":"confirm","apptype":"moya"}}


// {"root":{"pid":"11","pcost":"50","stockcost":"50","stockid":"65","stock":"7","returnemptycans":"7","paidamt":"350","loginid":"289","usertype":"dealer","dealerid":"289","distributerid":"48","reqid":"65","status":"confirm","apptype":"moya"}}

// {"root":{"pid":"10","pcost":"50","stockcost":"50","stockid":"88","stock":"1","returnemptycans":"1","paidamt":"5066","loginid":"16","userid":"16","usertype":"dealer","dealerid":"289","distributerid":"16","reqid":"88","status":"confirm","apptype":"moya"}


  requestComfirmByDistributor(){
    let input = {"root":{"pid": this.Details.products[0].productid ,"pcost": this.Details.products[0].pcost ,"stockcost": this.Details.products[0].buycost,"stockid": this.Details.products[0].id ,"stock": this.Details.products[0].stock,"returnemptycans": this.Details.products[0].returnemptycans ,"paidamt": this.Details.products[0].paidamt ,"loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.superDelearId() ,"distributerid": this.authenticationService.loggedInUserId() ,"reqid": this.Details.products[0].reqid ,"status":"confirm","apptype": this.authenticationService.appType() }};
    this.distributorService.confirmRequestByDistributor(input)
    .subscribe(
      output => this.requestComfirmByDistributorResult(output),
      error => {
      });
  }
  requestComfirmByDistributorResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if (this.Details.type == 'newRaiseRequest') {
      this.getProducts();
      this.headerValue = 'Raise Request'
    }
    else{
      this.headerValue = 'View Details';
      this.modifieddate = this.Details.modifieddate;
      let date = this.modifieddate.split(' ');
      this.modifieddate = date[0];
      console.log(this.modifieddate);
    }
  }

}
