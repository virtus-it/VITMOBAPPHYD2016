import { Component, OnInit } from '@angular/core';
import { PaymentsService } from './payments.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentservice: PaymentsService, private loaderService: LoaderService, private authenticationService: AuthenticationService) { }


  codPayments=[];
  creditPayments=[];
  areaPayments=[];
  billDetails= [];
  tabPanelView = 'cod';
  payments:any= [];

  getCod() {
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "type": "cod", "lastrecordtimestamp": "15", "pagesize": 100, "last_paymentid": "0", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getPayments(input)
      .subscribe(
      output => this.getCodResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  getCodResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.codPayments = result.data;
    }

  }

  getCredit() {
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "type": "credit", "lastrecordtimestamp": "15", "pagesize": 100, "last_paymentid": "0", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getPayments(input)
      .subscribe(
      output => this.getCreditResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  getCreditResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.creditPayments = result.data;
      
    }

  }


  getBillDetails() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "lastrecordtimestamp": "15", "pagesize": 100, "last_id": "0", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getBillDetails(input)
      .subscribe(
      output => this.getBillDetailsResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  getBillDetailsResult(result) {
    console.log(result);
    if (result.result == 'success') {
    }

  }

  getPaymentByArea() {
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": this.authenticationService.userType(), "status": "all", "lastrecordtimestamp": "15", "pagesize": 100, "productid": "1", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getPaymentsByArea(input)
      .subscribe(
      output => this.getPaymentsByAreaResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  getPaymentsByAreaResult(result) {
    console.log(result);
    if (result.result == 'success') {


    }

  }
  viewTabpanel(type){
this.tabPanelView = type;
  }

  changeStatus(type,data){

    console.log(data);
    let input = {"root": {"paymentid":data.paymentid,"received_amt":data.amount_received,"orderid":data.orderid,"customerid":data.customerid,"status":type,"userid":this.authenticationService.loggedInUserId(),
    "usertype":this.authenticationService.userType(),"loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}}
    this.paymentservice.changeStatus(input)
      .subscribe(
      output => this.changeStatusResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });

  }
  changeStatusResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.getCod();
    }


  }
  




  ngOnInit() {
    this.getCod();
    this.getCredit();
    this.getPaymentByArea();
    this.getBillDetails();



  }

}
