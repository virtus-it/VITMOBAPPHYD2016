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
import { InvoiceHistoryComponent } from '../invoice-history/invoice-history.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({

  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  customerCtrl: FormControl;
  filteredcustomer: Observable<any[]>;
  DistributorCtrl: FormControl;
  filteredDistributors: Observable<any[]>;
  constructor(private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, public dialog: MdDialog, private reportservice: ReportsService, private loaderService: LoaderService, private customerService: CustomerService) {
    this.DistributorCtrl = new FormControl();
    this.filteredDistributors = this.DistributorCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.distributors.slice());
    this.customerCtrl = new FormControl();
    this.filteredcustomer = this.customerCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findCustomers(dist) : this.customerList.slice());


  }
  reportDetails = {
    reportType: "", days: null, lastId: "0", pagesize: 100, appType: this.authenticationService.appType
      ()
  };
  downloadInput = { fromDate: null, toDate: null, filterBy: "", filterId: "0", customerId: "", distributorId: "", distributorEmail: "", customerEmail: "" };
  reportsClickMore: boolean = false;
  reportsInput: any = {};
  reportsData = [];
  customerList = [];
  distributors: any = [];
  tabPanelView = 'newlydownloaded';
  superDealer = true;
  LastfilterRecords = false;
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloaded Customers', issuperDelear: this.superDealer },
    { value: 'lastdays', viewValue: 'Customers not Ordered in Last 10 Days', issuperDelear: this.superDealer },
    { value: 'pendingorders', viewValue: 'Pending Orders', issuperDelear: this.superDealer },
    { value: 'rejectedorders', viewValue: 'Rejected Orders', issuperDelear: this.superDealer },
    { value: 'notregistered', viewValue: 'Customers not Registered', issuperDelear: this.superDealer },
    { value: 'orderdownload', viewValue: 'Order Downloads', issuperDelear: true }
  ];

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
        console.log("error");
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
    console.log(input);
    this.reportservice.downloadReports(input)
      .subscribe(
      output => this.downloadOrdersResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  downloadOrdersResult(result) {
    console.log("downloaded result", result);
    if (result.result == 'success') {
      let path = result.data.filename;
      this.customerService.getFile(path)
        .subscribe(
        output => this.getFileResult(output),
        error => {
          console.log("error in customer");
          this.loaderService.display(false);
        });

    }

  }
  getFileResult(result) {
    FileSaver.saveAs(result, "orders" + moment().format() + ".xlsx");

  }
  getCustomer() {
    let input = { root: { "apptype": this.authenticationService.appType(), userid: this.authenticationService.loggedInUserId(), usertype: this.authenticationService.userType(), loginid: this.authenticationService.loggedInUserId(), transtype: "getcustomer" } };
    this.reportservice.getCustomer(input)
      .subscribe(
      output => this.getCusotmerResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  getCusotmerResult(result) {
    console.log(result);
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
    // console.log(name);
    let finalcustomer = this.customerList.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);

    // console.log(finalcustomer);
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
      console.log(`Dialog closed: ${result}`);
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
      console.log(`Dialog closed: ${result}`);
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
    console.log(input);
    this.showInvoice(input);
    // this.reportservice.raiseInvoice(input)
    //   .subscribe(
    //   output => this.raiseInvoiceOfOrderResult(output),
    //   error => {
    //     console.log("error");
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

    console.log(input);
    this.loaderService.display(true);
    this.distributorService.getAllDistributors(input)
      .subscribe(
      output => this.getDistributorsResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getDistributorsResult(data) {
    console.log(data);
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
    console.log(name);
    let finalDistributors = this.distributors.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    console.log(finalDistributors);
    if (finalDistributors && finalDistributors.length > 0) {
      let findDistributor: any = {};

      findDistributor = _.find(finalDistributors, function (k, l) {
        let distDetails: any = k;
        return distDetails.fullName == name;
      });

      if (findDistributor) {
        this.downloadInput.distributorId = findDistributor.userid;
        this.downloadInput.distributorEmail = findDistributor.emailid;
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
    console.log(input);
    this.reportservice.printInvoice(input)
      .subscribe(
      output => this.printFileResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });
    // 


  }
  printFileResult(result) {
    
    if(result.result == 'success'){
      let path = result.data.filename;
     
      this.customerService.getPrintFile(path)
        .subscribe(
        output => this.printgetFileResult(output),
        error => {
          console.log("error in customer");
          this.loaderService.display(false);
        });
    }
  }
  printgetFileResult(result){
    console.log(result);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = URL.createObjectURL(result);

    document.body.appendChild(iframe);
    iframe.contentWindow.print();

  }
  ngOnInit() {
    this.searchReports(true, 'newlydownloaded');
    this.getCustomer();
    this.getDistributors();
    this.superDealer = this.authenticationService.getSupperDelear();
    if (!this.superDealer) {
      this.tabPanelView = 'orderdownload';
    }
  }

}
