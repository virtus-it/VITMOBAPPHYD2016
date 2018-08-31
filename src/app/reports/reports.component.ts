import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from './reports.service';
import { MdDialog } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { CustomerService } from '../customer/customer.service';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';
import { InvoicedetailsComponent } from '../invoicedetails/invoicedetails.component';
import { SupplierService } from '../supplier/supplier.service';
import { InvoiceHistoryComponent } from '../invoice-history/invoice-history.component';
import { ProductsService } from '../products/products.service';
import { QuickNotificationComponent } from '../quick-notification/quick-notification.component';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { ReportsPreviewComponent } from '../reports-preview/reports-preview.component';
@Component({

  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  customerCtrl: FormControl;
  filteredcustomer: Observable<any[]>;
  DistributorCtrl: FormControl;
  filteredDistributors: Observable<any[]>;
  SupplierCtrl: FormControl;
  filteredSupplier: Observable<any[]>;
  CategoryCtrl: FormControl;
  filteredcategories: Observable<any[]>;


  constructor(private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, public dialog: MdDialog, private reportservice: ReportsService, private loaderService: LoaderService, private productService: ProductsService, private supplierservice: SupplierService, private customerService: CustomerService) {
    this.DistributorCtrl = new FormControl();
    this.filteredDistributors = this.DistributorCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.distributors.slice());
    this.customerCtrl = new FormControl();
    this.filteredcustomer = this.customerCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findCustomers(dist) : this.customerList.slice());
    this.SupplierCtrl = new FormControl();
    this.filteredSupplier = this.SupplierCtrl.valueChanges
      .startWith(null)
      .map(supplier => supplier ? this.findSupplier(supplier) : this.supplierList.slice());
    this.CategoryCtrl = new FormControl();
    this.filteredcategories = this.CategoryCtrl.valueChanges
      .startWith(null)
      .map(cat => cat ? this.findCategories(cat) : this.categoryList.slice());



  }
  reportDetails = {
    reportType: "", days: null, lastId: "0", pagesize: 100, appType: this.authenticationService.appType
      ()
  };
  distOrders = { getDate: null };
  downloadInput = { fromDate: null, toDate: null, filterBy: "", filterId: "0", customerId: "", distributorId: "", distributorEmail: "", customerEmail: "", supplierId: "", supplierEmail: '' };

  stockreportsInput = { filterBy: 'distributor', fromDate: null, toDate: null, distributorId: '', filterId: "0", distributorEmail: "" };

  reportsClickMore: boolean = false;
  reportsInput: any = {};
  reportsData = [];
  customerList = [];
  supplierList = [];
  distributors: any = [];
  categoryList: any = [];
  categoryid: any = '';
  tabPanelView = 'newlydownloaded';
  superDealer = true;
  customerCare = true;
  salesTeamLogin: boolean = true;
  LastfilterRecords = false;
  distributorsorderData = [];
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloaded Customers', issuperDelear: this.superDealer },
    { value: 'lastdays', viewValue: 'Customers not Ordered in Last 10 Days', issuperDelear: this.superDealer },
    { value: 'pendingorders', viewValue: 'Pending Orders', issuperDelear: this.superDealer },
    { value: 'rejectedorders', viewValue: 'Rejected Orders', issuperDelear: this.superDealer },
    { value: 'notregistered', viewValue: 'Customers not Registered', issuperDelear: this.superDealer },
    { value: 'orderdownload', viewValue: 'Order Downloads', issuperDelear: true },
    { value: "distributorsorders", viewValue: "Distributors Orders", issuperDelear: this.superDealer }
  ];
  noData: boolean = false;
  viewStockReportsData: any = [];
  viewOrdersReportsData: any = [];
  customerOrderReports: boolean = false;
  distributorOrderReports: boolean = false;
  distributorCategoryStockReport: boolean = false;
  distributorStockReport: boolean = false;
  categoryStockReport: boolean = false;
  typeOfReport: string = '';



  searchReports(firstCall, Rtype) {
    this.loaderService.display(true);
    this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));

    this.tabPanelView = Rtype;

    let input = { "root": { "days": null, "last_id": this.reportsInput.lastId, "pagesize": this.reportsInput.pagesize, "transtype": Rtype, "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
    if (Rtype == 'lastdays') {
      input.root.days = 10;
    }
    if (this.reportsData && this.reportsData.length && !firstCall) {
      let lastRecord: any = _.last(this.reportsData);
      if (lastRecord) {
        if (input.root.transtype == 'pendingorders') {
          input.root.last_id = lastRecord.orderid;
        }
        else if (input.root.transtype == 'rejectedorders') {
          input.root.last_id = lastRecord.orderid;
        }
        else {
          input.root.last_id = lastRecord.user_id;
        }
      }


    }
    else {
      this.reportsData = [];
      input.root.last_id = null;
    }
    this.reportservice.searchReports(input)
      .subscribe(
        output => this.searchReportsResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        });
  }
  searchReportsResult(result) {
    this.loaderService.display(false);
    if (result.data && result.data.output && result.data.output.length > 0) {
      this.reportsClickMore = true;
      this.reportsData = _.union(this.reportsData, result.data.output);
    }
    else {
      this.reportsClickMore = false;
    }


  }

  findSupplier(name: string) {
    //console.log(name);
    let finalsupplier = this.supplierList.filter(supp =>
      supp.firstname.toLowerCase().indexOf(name.toLowerCase()) === 0);
    //console.log(finalsupplier);
    if (finalsupplier && finalsupplier.length > 0) {
      let findSupplier: any = {};

      findSupplier = _.find(finalsupplier, function (k, l) {
        let supplierDetails: any = k;
        return supplierDetails.firstname == name;
      });

      if (findSupplier) {
        this.downloadInput.supplierId = findSupplier.userid;
        this.downloadInput.supplierEmail = findSupplier.emailid;
      }


    }

    return finalsupplier;
  }

  getSupplierList() {
    let input = { "userId": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType(), "usertype": this.authenticationService.userType() };
    this.supplierservice.supplierList(input)
      .subscribe(
        output => this.getSupplierListResult(output),
        error => {
          this.loaderService.display(false);
        });
  }
  getSupplierListResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.supplierList = result.data;

    }
  }



  searchDistributorsOrders() {
    this.tabPanelView = 'distributorsorders';
    let input = {
      root: { "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "transtype": 'distributorsdetails' }
    };
    console.log(input);
    this.reportservice.searchReports(input)
      .subscribe(
        output => this.searchDistributorOrdersResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        });
  }
  searchDistributorOrdersResult(result) {
    if (result.result == 'success') {
      this.distributorsorderData = result.data;
    }


  }

  filterReports() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "date": this.distOrders.getDate, "apptype": this.authenticationService.appType(), "transtype": "distributorsdetails", "devicetype": "", "moyaversioncode": "" } };
    console.log(input);
    this.loaderService.display(true);
    input.root.date = moment(this.distOrders.getDate).format('YYYY-MM-DD 00:00:00');
    this.reportservice.searchReports(input)
      .subscribe(
        output => this.filterReportsResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        });
  }
  filterReportsResult(result) {
    if (result.result == 'success') {
      this.loaderService.display(false);
      this.distributorsorderData = result.data;
    }
    else {
      this.distributorsorderData = [];
      this.loaderService.display(false);
    }

  }

  downloadOrders() {

    let input = {
      order: {
        userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all',
        lastrecordtimestamp: "15", pagesize: "10", fromdate: this.downloadInput.fromDate, todate: this.downloadInput.toDate, supplierid: 0,
        customerid: 0, filterid: this.downloadInput.filterId, filtertype: this.downloadInput.filterBy
      }
    };
    if (this.downloadInput.fromDate) {
      input.order.fromdate = moment(this.downloadInput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.downloadInput.toDate) {
      input.order.todate = moment(this.downloadInput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.downloadInput.filterBy == 'customer') {
      input.order.filterid = this.downloadInput.customerId;
    }
    if (this.downloadInput.filterBy == 'distributor') {
      input.order.filterid = this.downloadInput.distributorId;
    }
    if (this.downloadInput.filterBy == 'supplier') {
      input.order.filterid = this.downloadInput.supplierId;
    }
    //console.log(input);
    this.loaderService.display(true);

    this.reportservice.downloadReports(input)
      .subscribe(
        output => this.downloadOrdersResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        });

  }
  downloadOrdersResult(result) {
    //console.log("downloaded result", result);
    if (result.result == 'success') {
      this.loaderService.display(false);
      let path = result.data.filename;
      this.customerService.getFile(path)
        .subscribe(
          output => this.getFileResult(output),
          error => {
            //console.log("error in customer");
            this.loaderService.display(false);
          });

    }

  }
  getFileResult(result) {
    FileSaver.saveAs(result, "orders" + moment().format() + ".xlsx");
    this.loaderService.display(false);

  }



  downloadStockReports() {
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all', lastrecordtimestamp: "15", pagesize: "10", fromdate: this.stockreportsInput.fromDate, todate: this.stockreportsInput.toDate, supplierid: 0, customerid: 0, filterid: this.stockreportsInput.filterId, filtertype: this.stockreportsInput.filterBy, "transtype": "stockreports", "categoryid": "", "distributorid": "" } };

    if (this.stockreportsInput.fromDate) {
      input.order.fromdate = moment(this.stockreportsInput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.stockreportsInput.toDate) {
      input.order.todate = moment(this.stockreportsInput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.stockreportsInput.filterBy == 'distributor') {
      input.order.filterid = this.stockreportsInput.distributorId;
    }
    if (this.stockreportsInput.filterBy == 'category') {
      input.order.filterid = this.categoryid;
    }

    if (this.stockreportsInput.filterBy == 'distributorcategory') {
      input.order.categoryid = this.categoryid;
      input.order.distributorid = this.stockreportsInput.distributorId;
    }
    if (this.stockreportsInput.fromDate && this.stockreportsInput.toDate && (this.stockreportsInput.filterBy == 'distributorcategory' || this.stockreportsInput.filterBy == 'distributor' || this.stockreportsInput.filterBy == 'category')) {
      console.log(input, 'download input');
      this.reportservice.downloadReports(input)
        .subscribe(
          output => this.downloadStockReportsResult(output),
          error => {
            //console.log("error");
            this.loaderService.display(false);
          });
    }
  }
  downloadStockReportsResult(result) {
    //console.log("downloaded result", result);
    if (result.result == 'success') {
      let path = result.data.filename;
      this.customerService.getFile(path)
        .subscribe(
          output => this.getstockReportFileResult(output),
          error => {
            //console.log("error in customer");
            this.loaderService.display(false);
          });

    }

  }
  getstockReportFileResult(result) {
    FileSaver.saveAs(result, "orders" + moment().format() + ".xlsx");
  }



  printStockReports() {
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all', lastrecordtimestamp: "15", pagesize: "10", fromdate: this.stockreportsInput.fromDate, todate: this.stockreportsInput.toDate, supplierid: 0, customerid: 0, filterid: this.stockreportsInput.filterId, filtertype: this.stockreportsInput.filterBy, "transtype": "stockreports", emailid: "", "categoryid": "", "distributorid": "" } };
    if (this.stockreportsInput.fromDate) {
      input.order.fromdate = moment(this.stockreportsInput.fromDate).format('YYYY-MM-DD 00:00:00');
    }
    if (this.stockreportsInput.toDate) {
      input.order.todate = moment(this.stockreportsInput.toDate).format('YYYY-MM-DD 23:59:59');
    }
    if (this.stockreportsInput.filterBy == 'distributor') {
      input.order.filterid = this.stockreportsInput.distributorId;
      input.order.emailid = this.stockreportsInput.distributorEmail;
      delete input.order.categoryid;
      delete input.order.distributorid;
    }
    else if (this.stockreportsInput.filterBy == 'category') {
      input.order.filterid = this.categoryid;
      delete input.order.categoryid;
      delete input.order.distributorid;
    }
    else if (this.stockreportsInput.filterBy == 'distributorcategory') {
      input.order.categoryid = this.categoryid;
      input.order.distributorid = this.stockreportsInput.distributorId;
    }
    if (this.stockreportsInput.fromDate && this.stockreportsInput.toDate && (this.stockreportsInput.filterBy == 'distributorcategory' || this.stockreportsInput.filterBy == 'distributor' || this.stockreportsInput.filterBy == 'category')) {
      this.loaderService.display(true);
      console.log(input, 'print input');
      this.reportservice.printInvoice(input)
        .subscribe(
          output => this.printStockReportsResult(output),
          error => {
            this.loaderService.display(false);
          });
    }
  }


  printStockReportsResult(result) {

    if (result.result == 'success') {
      let path = result.data.filename;
      this.noData = false;
      this.loaderService.display(false);
      this.customerService.getPrintFile(path)
        .subscribe(
          output => this.printStockReportsResultResult(output),
          error => {
            //console.log("error in customer");
            this.loaderService.display(false);
          });
    }
    else{
      this.loaderService.display(false);
      this.noData = true;
    }
  }
  printStockReportsResultResult(result) {
    //console.log(result);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = URL.createObjectURL(result);
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
    this.loaderService.display(false);

  }
  getCustomer() {
    let input = { root: { "apptype": this.authenticationService.appType(), userid: this.authenticationService.loggedInUserId(), usertype: this.authenticationService.userType(), loginid: this.authenticationService.loggedInUserId(), transtype: "getcustomer" } };
    this.reportservice.getCustomer(input)
      .subscribe(
        output => this.getCusotmerResult(output),
        error => {
          //console.log("error");
          this.loaderService.display(false);
        });

  }
  getCusotmerResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      let cusotmerCopy = [];
      _.each(result.data, function (i, j) {
        let details: any = i;
        if (details.firstname) {
          details.fullName = details.firstname;
          cusotmerCopy.push(details);
        }

      });
      this.customerList = cusotmerCopy;

    }

  }
  findCustomers(name: string) {
    // //console.log(name);
    let finalcustomer = this.customerList.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);

    // //console.log(finalcustomer);
    if (finalcustomer && finalcustomer.length > 0) {
      let findcustomer: any = {};

      findcustomer = _.find(finalcustomer, function (k, l) {
        let distDetails: any = k;
        return distDetails.fullName == name;
      });

      if (findcustomer) {
        this.downloadInput.customerId = findcustomer.userid;
        this.downloadInput.customerEmail = "";// findcustomer.emailid;
      }


    }

    return finalcustomer;
  }

  //InVoice Dialog box

  showInvoice(data) {

    let dialogRefdeleteSupplier = this.dialog.open(InvoicedetailsComponent, {
      width: '700px',
      data: data

    });
    dialogRefdeleteSupplier.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

      }
    });
  }

  invoiceHistory() {
    let details = this.downloadInput;
    let dialogRefdeleteSupplier = this.dialog.open(InvoiceHistoryComponent, {
      width: '700px',
      data: details

    });
    dialogRefdeleteSupplier.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {

      }
    });
  }
  raiseInvoiceOfOrder() {
    let input = {
      order: {
        userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all',
        lastrecordtimestamp: "15", pagesize: "10", fromdate: this.downloadInput.fromDate, todate: this.downloadInput.toDate, supplierid: 0,
        customerid: 0, filterid: this.downloadInput.filterId, filtertype: this.downloadInput.filterBy, emailid: ""
      }
    };
    if (this.downloadInput.fromDate) {
      input.order.fromdate = moment(this.downloadInput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.downloadInput.toDate) {
      input.order.todate = moment(this.downloadInput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.downloadInput.filterBy == 'customer') {
      input.order.filterid = this.downloadInput.customerId;
      input.order.emailid = this.downloadInput.customerEmail;
    }
    if (this.downloadInput.filterBy == 'distributor') {
      input.order.filterid = this.downloadInput.distributorId;
      input.order.emailid = this.downloadInput.distributorEmail;
    }
    if (this.downloadInput.filterBy == 'supplier') {
      input.order.filterid = this.downloadInput.supplierId;
      input.order.emailid = this.downloadInput.supplierEmail;
    }
    //console.log(input);
    this.showInvoice(input);
    // this.reportservice.raiseInvoice(input)
    //   .subscribe(
    //   output => this.raiseInvoiceOfOrderResult(output),
    //   error => {
    //     //console.log("error");
    //     this.loaderService.display(false);
    //   });

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
        this.downloadInput.distributorId = findDistributor.userid;
        this.downloadInput.distributorEmail = findDistributor.emailid;
        this.stockreportsInput.distributorId = findDistributor.userid;
        this.stockreportsInput.distributorEmail = findDistributor.emailid;
      }


    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        this.getDistributors();
      }


    }
    return finalDistributors;
  }
  printFile() {
    let input = {
      order: {
        userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all',
        lastrecordtimestamp: "15", pagesize: "10", fromdate: this.downloadInput.fromDate, todate: this.downloadInput.toDate, supplierid: 0,
        customerid: 0, filterid: this.downloadInput.filterId, filtertype: this.downloadInput.filterBy, emailid: ""
      }
    };
    if (this.downloadInput.fromDate) {
      input.order.fromdate = moment(this.downloadInput.fromDate).format('YYYY-MM-DD 00:00:00');
    }
    if (this.downloadInput.toDate) {
      input.order.todate = moment(this.downloadInput.toDate).format('YYYY-MM-DD 23:59:59');
    }
    if (this.downloadInput.filterBy == 'customer') {
      input.order.filterid = this.downloadInput.customerId;
      input.order.emailid = this.downloadInput.customerEmail;
    }
    if (this.downloadInput.filterBy == 'distributor') {
      input.order.filterid = this.downloadInput.distributorId;
      input.order.emailid = this.downloadInput.distributorEmail;
    }
    if (this.downloadInput.filterBy == 'supplier') {
      input.order.filterid = this.downloadInput.supplierId;
      input.order.emailid = this.downloadInput.supplierEmail;
    }
    if (this.downloadInput.fromDate && this.downloadInput.toDate || (this.downloadInput.filterBy == 'customer' || this.downloadInput.filterBy == 'distributor' || this.downloadInput.filterBy == 'supplier')) {
      this.loaderService.display(true);
      this.reportservice.printInvoice(input)
        .subscribe(
          output => this.printFileResult(output),
          error => {
            this.loaderService.display(false);
          });

    }
  }
  printFileResult(result) {

    if (result.result == 'success') {
      this.noData = false;
      let path = result.data.filename;
      this.loaderService.display(false);
      this.customerService.getPrintFile(path)
        .subscribe(
          output => this.printgetFileResult(output),
          error => {
            //console.log("error in customer");
            this.loaderService.display(false);
          });
    }
    else {
      this.loaderService.display(false);
      this.noData = true;
    }
  }
  printgetFileResult(result) {
    //console.log(result);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = URL.createObjectURL(result);

    document.body.appendChild(iframe);
    iframe.contentWindow.print();
    this.loaderService.display(false);

  }

  sendNotification(data) {
    let formattedInput = { "type": "notificationfromReports", data: data };
    let dialogRefeditStatus = this.dialog.open(QuickNotificationComponent, {
      width: '60%',
      data: formattedInput
    });
    dialogRefeditStatus.afterClosed().subscribe(result => {
      ////console.log(`Dialog closed: ${result}`);
      if (result) {
        // this.notificationDetails.templatename = result.User.tempname;
      }

    });
  }

  findCategories(name: string) {
    let finalCategories: any = [];
    finalCategories = this.categoryList.filter(cat =>
      cat.category.toLowerCase().indexOf(name.toLowerCase()) === 0);

    if (finalCategories && finalCategories.length > 0) {
      let findCategory: any = {};

      findCategory = _.find(finalCategories, function (k, l) {
        let catDetails: any = k;
        return catDetails.category == name;
      });

      if (findCategory) {
        this.categoryid = findCategory.categoryid;
        //  this.filterTypeModel.categoryname = findCategory.category;
      }
    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        this.getProductByCategory();
      }
    }
    return finalCategories;
  }

  getProductByCategory() {
    let input = { "userId": this.authenticationService.loggedInUserId(), "userType": "dealer", "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
    this.productService.getProductsCategory(input)
      .subscribe(
        output => this.getProductsCategoryResult(output),
        error => {
          //console.log("error in products category list");
        });
  }
  getProductsCategoryResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.categoryList = result.data;
    }
    else {
      this.LastfilterRecords = true;
    }
  }


  viewStockReports() {
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all', lastrecordtimestamp: "15", pagesize: "10", fromdate: this.stockreportsInput.fromDate, todate: this.stockreportsInput.toDate, supplierid: 0, customerid: 0, filterid: this.stockreportsInput.filterId, filtertype: this.stockreportsInput.filterBy, "transtype": "stockreports", emailid: "", "categoryid": "", "distributorid": "", type: "viewstockreports" } };
    if (this.stockreportsInput.fromDate) {
      input.order.fromdate = moment(this.stockreportsInput.fromDate).format('YYYY-MM-DD 00:00:00');
    }
    if (this.stockreportsInput.toDate) {
      input.order.todate = moment(this.stockreportsInput.toDate).format('YYYY-MM-DD 23:59:59');
    }
    if (this.stockreportsInput.filterBy == 'distributor') {
      input.order.filterid = this.stockreportsInput.distributorId;
      input.order.emailid = this.stockreportsInput.distributorEmail;
      delete input.order.categoryid;
      delete input.order.distributorid;
    }
    if (this.stockreportsInput.filterBy == 'category') {
      input.order.filterid = this.categoryid;
      delete input.order.categoryid;
      delete input.order.distributorid;
    }
    if (this.stockreportsInput.filterBy == 'distributorcategory') {
      input.order.categoryid = this.categoryid;
      input.order.distributorid = this.stockreportsInput.distributorId;
    }
    if (input.order.filtertype == 'distributor') {
      this.distributorStockReport = true;

    }
    else if (input.order.filtertype == 'category') {
      this.categoryStockReport = true;

    }
    else if (input.order.filtertype == 'distributorcategory') {
      this.distributorCategoryStockReport = true;
    }
    if (this.stockreportsInput.fromDate && this.stockreportsInput.toDate && (this.stockreportsInput.filterBy == 'distributorcategory' || this.stockreportsInput.filterBy == 'distributor' || this.stockreportsInput.filterBy == 'category')) {
      this.loaderService.display(true);
      console.log(input, 'print input');
      this.reportservice.printInvoice(input)
        .subscribe(
          output => this.viewStockReportsResult(output),
          error => {
            //console.log("error");
            this.loaderService.display(false);
          });
    }
  }
  viewStockReportsResult(result) {
    if (result.result == 'success') {
      this.loaderService.display(false);
      this.viewStockReportsData = result.data;
      this.noData = false;
      if(this.distributorCategoryStockReport == true){
        this.typeOfReport = 'distributorCategoryStockReport';
      }
      else if(this.distributorStockReport == true){
        this.typeOfReport = 'distributorStockReport';
      }
      else if(this.categoryStockReport == true){
        this.typeOfReport = 'categoryStockReport';
      }
        this.reportsPreview(this.viewStockReportsData);
    }
    else {
      this.viewStockReportsData = [];
      this.loaderService.display(false);
      this.noData = true;

    }
  }

  viewOrdersReports() {
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all', lastrecordtimestamp: "15", pagesize: "10", fromdate: this.downloadInput.fromDate, todate: this.downloadInput.toDate, supplierid: 0, customerid: 0, filterid: this.downloadInput.filterId, filtertype: this.downloadInput.filterBy, emailid: "", type: 'viewordersreports' } };
    if (this.downloadInput.fromDate) {
      input.order.fromdate = moment(this.downloadInput.fromDate).format('YYYY-MM-DD 00:00:00');
    }
    if (this.downloadInput.toDate) {
      input.order.todate = moment(this.downloadInput.toDate).format('YYYY-MM-DD 23:59:59');
    }
    if (this.downloadInput.filterBy == 'customer') {
      input.order.filterid = this.downloadInput.customerId;
      input.order.emailid = this.downloadInput.customerEmail;
    }
    if (this.downloadInput.filterBy == 'distributor') {
      input.order.filterid = this.downloadInput.distributorId;
      input.order.emailid = this.downloadInput.distributorEmail;
    }
    if (this.downloadInput.filterBy == 'supplier') {
      input.order.filterid = this.downloadInput.supplierId;
      input.order.emailid = this.downloadInput.supplierEmail;
    }
    if (this.downloadInput.fromDate && this.downloadInput.toDate || (this.downloadInput.filterBy == 'customer' || this.downloadInput.filterBy == 'distributor' || this.downloadInput.filterBy == 'supplier')) {
      this.loaderService.display(true);
      if (input.order.filtertype == 'customer') {
        this.customerOrderReports = true;
      }
      else if (input.order.filtertype == 'distributor') {
        this.distributorOrderReports = true;
      }
      console.log(input , 'sdgsdgdsgdhhddhdhdhdh');
      this.reportservice.printInvoice(input)
        .subscribe(
          output => this.viewOrdersReportsResult(output),
          error => {
            this.loaderService.display(false);
          });

    }
  }
  viewOrdersReportsResult(result) {
    if (result.result == 'success') {
      this.viewOrdersReportsData = result.data;
      this.noData = false;
      this.loaderService.display(false);
      if(this.customerOrderReports == true){
        this.typeOfReport = 'customerOrderReports';
      }
      else if(this.distributorOrderReports == true){
        this.typeOfReport = 'distributorOrderReports';
      }
      this.reportsPreview(this.viewOrdersReportsData);
    }
    else {
      this.viewOrdersReportsData = [];
      this.loaderService.display(false);
      this.noData = true;
    }
  }


  reportsPreview(data) {
    let formattedData = {data: data , type : this.typeOfReport }
    let dialogRef = this.dialog.open(ReportsPreviewComponent, {
      width: '80%',
      data: formattedData
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result == 'success') {
        this.typeOfReport = '';
        this.customerOrderReports = false;
        this.distributorCategoryStockReport = false;
        this.distributorOrderReports = false;
        this.distributorStockReport = false;
        this.categoryStockReport = false;
      }
      else if(result != 'success'){
        this.typeOfReport = '';
        this.customerOrderReports = false;
        this.distributorCategoryStockReport = false;
        this.distributorOrderReports = false;
        this.distributorStockReport = false;
        this.categoryStockReport = false;
      }
    });

  }




  ngOnInit() {
    this.searchReports(true, 'newlydownloaded');
    this.getCustomer();
    this.getDistributors();
    this.getSupplierList();
    this.getProductByCategory();
    this.customerCare = this.authenticationService.customerCareLoginFunction();
    this.superDealer = this.authenticationService.getSupperDelear();
    this.salesTeamLogin = this.authenticationService.salesTeamLoginFunction();
    if (!this.superDealer || !this.customerCare) {
      this.tabPanelView = 'orderdownload';
    }
  }

}
