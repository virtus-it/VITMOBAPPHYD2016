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
  codPaymentsCopy=[];
  creditPayments=[];
  creditPaymentsCopy=[];
  collections: any=[];
  collectionsCopy:  any=[];
  billDetails= [];
  tabPanelView = 'cod';
  payments:any= [];
  showFilterDialog = false;
  searchPaymentTerm = "";
  advAmount=[];
  advAmountCopy=[];


  getCod() {
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "type": "cod", "lastrecordtimestamp": "15", "pagesize": 100, "last_paymentid": "0", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getPayments(input)
      .subscribe(
      output => this.getCodResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });

  }
  getCodResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.codPayments = result.data;
      this.codPaymentsCopy = result.data;
    }

  }

  getCredit() {
    let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "type": "credit", "lastrecordtimestamp": "15", "pagesize": 100, "last_paymentid": "0", "apptype": this.authenticationService.appType() } };
    this.paymentservice.getPayments(input)
      .subscribe(
      output => this.getCreditResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });

  }
  getCreditResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.creditPayments = result.data;
      this.creditPaymentsCopy = result.data;
      
    }

  }


  // getBillDetails() {
  //   let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "all", "lastrecordtimestamp": "15", "pagesize": 100, "last_id": "0", "apptype": this.authenticationService.appType() } };
  //   this.paymentservice.getBillDetails(input)
  //     .subscribe(
  //     output => this.getBillDetailsResult(output),
  //     error => {
  //       //console.log("error");
  //       this.loaderService.display(false);
  //     });

  // }
  // getBillDetailsResult(result) {
  //   //console.log(result);
  //   if (result.result == 'success') {
  //   }

  // }

  // getCollections() {
  //   let input = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": this.authenticationService.userType(), "status": "all", "lastrecordtimestamp": "15", "pagesize": 100, "productid": "1", "apptype": this.authenticationService.appType() } };
  //   this.paymentservice.getPaymentsByArea(input)
  //     .subscribe(
  //     output => this.getCollectionsResult(output),
  //     error => {
  //       //console.log("error");
  //       this.loaderService.display(false);
  //     });


  // }
  // getCollectionsResult(result) {
  //   //console.log(result);
  //   if (result.result == 'success') {
  //     this.collections = result.data;
  //     this.collectionsCopy = result.data;


  //   }

  // }



  viewTabpanel(type){
this.tabPanelView = type;
  }

  changeStatus(type,data){

    //console.log(data);
    let input = {"root": {"paymentid":data.paymentid,"received_amt":data.amount_received,"orderid":data.orderid,"customerid":data.customerid,"status":type,"userid":this.authenticationService.loggedInUserId(),
    "usertype":this.authenticationService.userType(),"loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}}
    this.paymentservice.changeStatus(input)
      .subscribe(
      output => this.changeStatusResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });

  }
  changeStatusResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.getCod();
    }


  }

  filterToggle(){
    this.showFilterDialog = !this.showFilterDialog;
  }

  searchPayment() {
    let term = this.searchPaymentTerm;
    if(this.tabPanelView == 'cod'){
    if (term) {
      this.codPayments = this.codPaymentsCopy.filter(function (e) {
          return e.customer.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
       
      });
    }
    
    else {
      this.codPayments = this.codPaymentsCopy;
    }
  }
  else if(this.tabPanelView == 'credit'){

    if (term) {
      this.creditPayments = this.creditPaymentsCopy.filter(function (e) {
        if (e.customer && e.customer.firstname) {     
          return e.customer.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
        }
      });
    }
    
    else {
      this.creditPayments = this.creditPaymentsCopy;
    }
  }

  else if(this.tabPanelView == 'collections'){
    if (term) {
      this.collections = this.collectionsCopy.filter(function (e) {
        if ( e.amount){
          return e.amount.toString().indexOf(term) >= 0
        }
      });
    }
    
    else {
      this.collections = this.collectionsCopy;
    }

  }

  else if(this.tabPanelView == 'advamount'){

    if (term) {
      this.advAmount = this.advAmountCopy.filter(function (e) {
        if (e.fname) {     
          return e.fname.toLowerCase().indexOf(term.toLowerCase()) >= 0
        }
      });
    }
    
    else {
      this.advAmount = this.advAmountCopy;
    }
  }




}

getAdvAmount(){
  let input= {"User":{"userid":this.authenticationService.loggedInUserId(),"dealerid":this.authenticationService.loggedInUserId(),"usertype":"dealer"}};
  this.paymentservice.getAdvanceAmount(input)
      .subscribe(
      output => this.getAdvanceAmountResult(output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });
  }
  getAdvanceAmountResult(result){
    //console.log(result);
    if (result.result == 'success') {
      this.advAmount = result.data;
      this.advAmountCopy = result.data;
    
    }


  }

  ngOnInit() {
    this.getCod();
    this.getCredit();
    this.getAdvAmount();

    // this.getCollections();
    // this.getBillDetails();



  }

}
