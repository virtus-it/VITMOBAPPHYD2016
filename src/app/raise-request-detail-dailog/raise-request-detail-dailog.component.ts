import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-raise-request-detail-dailog',
  templateUrl: './raise-request-detail-dailog.component.html',
  styleUrls: ['./raise-request-detail-dailog.component.css']
})
export class RaiseRequestDetailDailogComponent implements OnInit {
  SupplierCtrl: FormControl;
  filteredSupplier: Observable<any[]>;

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<RaiseRequestDetailDailogComponent>, private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, ) {
    this.SupplierCtrl = new FormControl();
    this.filteredSupplier = this.SupplierCtrl.valueChanges
      .startWith(null)
      .map(supplier => supplier ? this.findSupplier(supplier) : this.supplierList.slice());

  }

  allProductsList = [];
  bindableProductsArray = [];
  raiseRequestDetails = { requestdate: '', requestquantity: '' };
  ipSendingArray = [];
  errorMessage = '';
  invoiceDate = null;
  headerValue: string = '';
  modifieddate: string = '';
  secondStepDetails: any = [];
  supplierId: any = '';
  supplierName = '';
  amountPaid: any = 0;
  supplierList: any = [];



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
    if (this.Details.type == 'raiseRequestBySuperDealer') {
      loginid = this.Details.data.userid;
      dealerid = this.authenticationService.superDealerLoginId();
    }
    let apptype = this.authenticationService.appType();
    let requiredProductsArray = [];
    _.each(this.allProductsList, function (i, j) {
      let details: any = i;
      if (details.stock && details.returnemptycans && details.stock > 0 && (details.returnemptycans >= 0)) {
        let requiredProductDetails = { "product": { "pid": '', "productname": "", "pType": "", "stock": "", "returnemptycans": "", "loginid": '', "usertype": '', "invoicedate": '', "itemcost": "", "distributorid": '', "dealerid": '', "categoryid": "", "apptype": '' } };
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


  requestComfirmByDistributor() {
    let input = { "root": { "pid": this.Details.products[0].productid, "pcost": this.Details.products[0].pcost, "stockcost": this.Details.products[0].buycost, "stockid": this.Details.products[0].id, "stock": this.Details.products[0].stock, "returnemptycans": this.Details.products[0].returnemptycans, "paidamt": this.Details.products[0].paidamt, "loginid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "dealerid": this.authenticationService.loggedInUserId(), "distributerid": this.authenticationService.loggedInUserId(), "reqid": this.Details.products[0].reqid, "status": "confirm", "apptype": this.authenticationService.appType() } };
    this.distributorService.confirmRequestByDistributor(input)
      .subscribe(
        output => this.requestComfirmByDistributorResult(output),
        error => {
        });
  }
  requestComfirmByDistributorResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }


  confirmRequestBySuperDealer() {
    let loginid = this.authenticationService.loggedInUserId();
    let usertype = this.authenticationService.userType();
    let dealerid = this.authenticationService.loggedInUserId();
    let apptype = this.authenticationService.appType();
    let amount = this.amountPaid;
    let distId = this.Details.data.distributor.userid;
    let supplierId = this.supplierId;
    let supplierName = this.supplierName;
    let requiredInput = [];
    _.each(this.Details.data.products, function (i, j) {
      let details: any = i;
      if (details.stock && details.returnemptycans && details.stock > 0) {
        let requiredProductDetails = { "product": { "pid": '', "pcost": '', "buycost": '', "stockid": '', "stock": '', "returnemptycans": '', "paidamt": '', "loginid": '', "usertype": '', "distributerid": '', "reqid": '', "status": "reqconfirm", "apptype": '', "dealerid": '', "supplierid": '', "suppliername": '' } };
        requiredProductDetails.product.stockid = details.id;
        requiredProductDetails.product.pid = details.productid;
        requiredProductDetails.product.buycost = details.buycost;
        requiredProductDetails.product.pcost = details.pcost;
        requiredProductDetails.product.stock = details.stock;
        requiredProductDetails.product.returnemptycans = details.returnemptycans;
        requiredProductDetails.product.paidamt = amount;
        requiredProductDetails.product.apptype = apptype;
        requiredProductDetails.product.dealerid = dealerid;
        requiredProductDetails.product.loginid = loginid;
        requiredProductDetails.product.usertype = usertype;
        requiredProductDetails.product.distributerid = distId;
        requiredProductDetails.product.reqid = details.reqid;
        requiredProductDetails.product.supplierid = supplierId;
        requiredProductDetails.product.suppliername = supplierName;
        requiredInput.push(requiredProductDetails);
      }
    });
    let input = requiredInput;
    console.log(input);
    this.distributorService.confirmStockRequestByDealer(input)
      .subscribe(
        output => this.confirmRequestBySuperDealerResult(output),
        error => {
        });
  }
  confirmRequestBySuperDealerResult(result) {
    if (result && result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }


  findSupplier(name: string) {
    //console.log(name);
    let finalsupplier = this.supplierList.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    //console.log(finalsupplier);
    if (finalsupplier && finalsupplier.length > 0) {
      let findSupplier: any = {};

      findSupplier = _.find(finalsupplier, function (k, l) {
        let supplierDetails: any = k;
        return supplierDetails.fullName == name;
      });

      if (findSupplier) {
        this.supplierId = findSupplier.userid;
        this.supplierName = findSupplier.firstname;
      }


    }

    return finalsupplier;
  }

  confirmRequestBySuperDealerOnDistributor() {
    let input = { "root": { "pid": this.Details.data.products[0].productid, "pcost": this.Details.data.products[0].pcost, "stockcost": this.Details.data.products[0].buycost, "stockid": this.Details.data.products[0].id, "stock": this.Details.data.products[0].stock, "returnemptycans": this.Details.data.products[0].returnemptycans, "paidamt": this.Details.data.products[0].paidamt, "loginid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "dealerid": this.authenticationService.loggedInUserId(), "distributerid": this.Details.data.distributor.userid, "reqid": this.Details.data.products[0].reqid, "status": "confirm", "apptype": this.authenticationService.appType() } };

    this.distributorService.confirmRequestByDistributor(input)
      .subscribe(
        output => this.confirmRequestBySuperDealerOnDistributorResult(output),
        error => {
        });
  }
  confirmRequestBySuperDealerOnDistributorResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  numberEvent(e: any) {
    // console.log(e);
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
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
      this.headerValue = 'Raise Request'
    }
    else if (this.Details.type == 'acceptRequestFromDealer') {
      this.headerValue = 'Confirm Request';
      this.getProducts();
      this.modifieddate = this.Details.data.modifieddate;
      let date = this.modifieddate.split(' ');
      this.modifieddate = date[0];
      this.supplierList = this.authenticationService.getSuppliers();
      this.amountPaid = (this.Details.data.products[0].stock * this.Details.data.products[0].pcost)
    }
    else if (this.Details.type == 'raiseRequestBySuperDealer') {
      this.headerValue = 'Raise Request';
      this.getProducts();
    }
    else {
      this.headerValue = 'View Details';
      this.modifieddate = this.Details.modifieddate;
      let date = this.modifieddate.split(' ');
      this.modifieddate = date[0];
      console.log(this.modifieddate);
    }
  }

}















// let requiredProductDetails = {"product":{"pid": this.Details.data.products[0].productid ,"pcost": this.Details.data.products[0].pcost ,"buycost": this.Details.data.products[0].buycost ,"stockid": this.Details.data.products[0].id ,"stock": this.Details.data.products[0].stock ,"returnemptycans": this.Details.data.products[0].returnemptycans ,"paidamt": this.amountPaid ,"loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"distributerid": this.Details.data.distributor.userid ,"reqid": this.Details.data.products[0].reqid ,"status":"reqconfirm","apptype": this.authenticationService.appType() ,"dealerid": this.authenticationService.loggedInUserId() ,"supplierid": this.supplierId,"suppliername": this.supplierName }};