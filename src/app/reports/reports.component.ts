import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from './reports.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { CustomerService } from '../customer/customer.service';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({

  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  customerCtrl: FormControl;
  filteredcustomer: Observable<any[]>;
  constructor(private authenticationService: AuthenticationService, private reportservice: ReportsService,private loaderService: LoaderService,private customerService: CustomerService) {
    this.customerCtrl = new FormControl();
    this.filteredcustomer = this.customerCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.customerList.slice());
     

   }
  reportDetails = { reportType: "", days: null, lastId: "0", pagesize: 30, appType: this.authenticationService.appType
  () };
  downloadInput = {fromDate:null,toDate:null,filterBy:"",filterId:"0",customerId:""};
  reportsClickMore:boolean = false;
  reportsInput: any = {};
  reportsData = [];
  customerList = [];
  tabPanelView = 'newlydownloaded';
  superDealer = true;
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloaded Customers',issuperDelear:this.superDealer },
    { value: 'lastdays', viewValue: 'Customers not Ordered in Last 10 Days',issuperDelear:this.superDealer },
    { value: 'pendingorders', viewValue: 'Pending Orders',issuperDelear:this.superDealer },
    { value: 'rejectedorders', viewValue: 'Rejected Orders',issuperDelear:this.superDealer },
    { value: 'notregistered', viewValue: 'Customers not Registered',issuperDelear:this.superDealer },
    { value: 'orderdownload', viewValue: 'Order Downloads',issuperDelear:true }
  ];
 
  searchReports(firstCall,Rtype) {
    this.loaderService.display(true);
    this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));
  
    this.tabPanelView = Rtype;
    
   let input = { "root": { "days": null, "last_id": this.reportsInput.lastId, "pagesize": this.reportsInput.pagesize, "transtype": Rtype, "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
   if(Rtype == 'lastdays'){
    input.root.days = 10;
        }
    if (this.reportsData && this.reportsData.length && !firstCall) {
      let lastRecord: any = _.last(this.reportsData);
      if (lastRecord) {
        if(input.root.transtype == 'pendingorders'){
          input.root.last_id = lastRecord.orderid; 
        }
        else if(input.root.transtype == 'rejectedorders'){
          input.root.last_id = lastRecord.orderid;
        }
        else{
        input.root.last_id = lastRecord.user_id;
        }
      }
      

    }
    else{
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
      this.reportsData = _.union(this.reportsData,result.data.output);
   }
   else{
    this.reportsClickMore = false;
   }


  }
  downloadOrders(){
let input = {order: { userid: this.authenticationService.loggedInUserId(), priority: "5", usertype: this.authenticationService.userType(), status: 'all',
      lastrecordtimestamp: "15", pagesize: "10", fromdate: this.downloadInput.fromDate, todate: this.downloadInput.toDate, supplierid: 0,
      customerid: 0,filterid:this.downloadInput.filterId,filtertype:this.downloadInput.filterBy}};
      if (this.downloadInput.fromDate) {
        input.order.fromdate = moment(this.downloadInput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
      }
      if (this.downloadInput.toDate) {
        input.order.todate = moment(this.downloadInput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
      }
      if(this.downloadInput.filterBy == 'customer'){
        input.order.filterid = this.downloadInput.customerId;
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
  downloadOrdersResult(result){
console.log("downloaded result",result);
if(result.result == 'success'){
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
  getFileResult(result){
    FileSaver.saveAs(result, "orders"+moment().format()+".xlsx");

}
getCustomer(){
  let input = { root: { "apptype": this.authenticationService.appType(), userid: this.authenticationService.loggedInUserId(), usertype: this.authenticationService.userType(), loginid: this.authenticationService.loggedInUserId(),transtype:"getcustomer" } };
  this.reportservice.getCustomer(input)
  .subscribe(
  output => this.getCusotmerResult(output),
  error => {
    console.log("error");
    this.loaderService.display(false);
  });
  
  }
  getCusotmerResult(result){
  console.log(result);
  if(result.result == 'success'){
    let cusotmerCopy = [];
    _.each(result.data, function (i, j) {
      let details: any = i;
      if(details.firstname){
      details.fullName = details.firstname;
      cusotmerCopy.push(details);
      }

    });
this.customerList = cusotmerCopy;

  }
  
  } 
  findDistributors(name: string) {
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
      }


    }
    
    return finalcustomer;
  }
  ngOnInit() {
    this.searchReports(true,'newlydownloaded');
    this.getCustomer(); 
    this.superDealer = this.authenticationService.getSupperDelear();
    if(!this.superDealer){
      this.tabPanelView = 'orderdownload';
          }
  }

}
