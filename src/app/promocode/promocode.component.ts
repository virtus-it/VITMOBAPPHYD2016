import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddPromocodeDialogComponent } from '../add-promocode-dialog/add-promocode-dialog.component';
import { RedeemSettingsDialogComponent } from '../redeem-settings-dialog/redeem-settings-dialog.component';
import { PromocodeServiceService } from '../promocode/promocode-service.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProcessPaymentDialogComponent } from '../process-payment-dialog/process-payment-dialog.component';
import { ProcessedPaymentsDetailsComponent } from '../processed-payments-details/processed-payments-details.component';
import { DeletePromocodeComponent } from '../delete-promocode/delete-promocode.component';
import * as moment from 'moment';
import * as _ from 'underscore';
import {DeleteRedeemSettingsComponent} from '../delete-redeem-settings/delete-redeem-settings.component';





@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor( public dialog: MdDialog, private promocodeservice: PromocodeServiceService ,  private authenticationService: AuthenticationService, private followupService: FollowUpService,  private distributorService: DistributorServiceService) { }

allPromoCodes:any = [];
tabPanelView:string="promoCode";
redeemDetails:any = [];
redeemSettingsDetails:any = [];
showFilterDailog = false;
filterInput = {"searchtype":"",  "status":''};
filterType = {"startdate": null , "enddate": null};
filterText = '';
startDate = '';
endDate = '';
superDealer = false;
detailsClickMore =  true;
userView:string = '';
noRecords:boolean = false;
isDesc:boolean = false;
column:any;


  addPromoCode(){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllPromoCodes();
    }

  });
  }

  editPromoCode(data){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllPromoCodes();

    }

  });

  }


  deletePromoCodeDialog(data){

    let dialogRef = this.dialog.open(DeletePromocodeComponent, {
      width: '50%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllPromoCodes();
    }
  });
  }

  getAllPromoCodes(){
    let input = {"offer":{"transtype":"getall" , "apptype":this.authenticationService.appType()}};
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.getAllPromoCodesResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  getAllPromoCodesResult(result){
    if(result.result == 'success'){
      this.allPromoCodes = result.data;
      console.log(result.data);
    }
    else{
      this.allPromoCodes = [];
    }
  }

  
//   showTabPanel(panelName) {
// this.tabPanelView=panelName;
// if(this.tabPanelView == 'redeemSetting'){
//   this.redeemSettingsDialog();
// }
// else if(this.tabPanelView == 'redeemDetails'){
//   this.getRedeemDetails();
// }
//   }

  redeemSettingsDialog(){
    let dialogRef = this.dialog.open(RedeemSettingsDialogComponent , {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getRedeemSettingsDetails();
      this.getRedeemDetails(true);
      this.getAllPromoCodes();
    }
  });
  }


  showTabPanel(panelName) {
    this.tabPanelView=panelName;
    if(this.tabPanelView == 'redeemSetting'){
      this.userView = '';
      this.noRecords = false;
      this.getRedeemSettingsDetails();
    }
    else if(this.tabPanelView == 'redeemDetails'){
      this.getRedeemDetails(true);
    }
      }


      getRedeemSettingsDetails(){
        let input = {"User": {"TransType":"getredeemsettings" , apptype: this.authenticationService.appType() , "loginid":  this.authenticationService.loggedInUserId() }};
        this.distributorService.getPoints(input)
        .subscribe(
        output => this.getRedeemSettingsDetailsResult(output),
        error => {      
        });
      }
      getRedeemSettingsDetailsResult(result){
        if(result.result == 'success'){
          this.redeemSettingsDetails = result.data;
        }
        else{
          this.redeemSettingsDetails = [];
        }
      }

      changeSettings(data){

        let dialogRef = this.dialog.open(RedeemSettingsDialogComponent , {
          width: '50%',
          data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'success'){
          this.getRedeemSettingsDetails();
        }
      });

      }
  getRedeemDetails(firstcall){
    let input = {"User":{"TransType":"getredeemdetails" , appType: this.authenticationService.appType() , "lastId":0,"pagesize":10  }};
    console.log(input , 'sdlkuasfasj kughs' );

    if (this.redeemDetails && this.redeemDetails.length && !firstcall) {
      let lastDetails: any = _.last(this.redeemDetails);
      if (lastDetails) {
          input.User.lastId = lastDetails.id;
      }

  }
  else {
      this.redeemDetails = [];
      input.User.lastId = 0;
  }

    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getRedeemDetailsResult(output),
    error => {      
    });

  }
  getRedeemDetailsResult(result){
    if(result.result == 'success'){
      this.redeemDetails = _.union(this.redeemDetails, result.data);
    }
    else{
      this.detailsClickMore = false;
    }
  }

  processPaymentDialog(data){

    let dialogRef = this.dialog.open(ProcessPaymentDialogComponent , {
      width: '75%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getRedeemDetails(true);
    }
  });

  }

  viewProcessedDetails(data){
    let dialogRef = this.dialog.open(ProcessedPaymentsDetailsComponent , {
      width: '75%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
     
    }
  });

  }

  deleteRedeemSettingDialog(data){
    let dialogRef = this.dialog.open(DeleteRedeemSettingsComponent , {
      width: '75%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
     this.getRedeemSettingsDetails();
    }
  });

  }

  deleteRedeemSetting(data){
    console.log('data ', data);
    let input = {"User":{loginid : this.authenticationService.loggedInUserId() , apptype: this.authenticationService.appType() , id: data.id , TransType:'delete'}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.deleteRedeemSettingResult(output),
    error => {      
    });
  }
  deleteRedeemSettingResult(result){
    if(result.result == 'success'){
      this.getRedeemSettingsDetails();
    }
  }

  filterDailogToggle(){
    this.showFilterDailog = !this.showFilterDailog;
  }


  searchFilter(){

    if(this.filterInput.searchtype == 'date'){
      this.searchByDate();
    }

    else if(this.filterInput.searchtype == 'mobile'){
      this.searchByNumber();
    }
    else{
      this.searchByType();
    }
  }

  searchByType(){
    let input = {};
    if(this.filterInput.searchtype == 'type' && this.filterInput.status == 'completed'){
      input = {"User":{"TransType":"searchwithstatus","apptype": this.authenticationService.appType() ,"pagesize":"100", "loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.loggedInUserId() , filterby: 'Complete'}}
    }
    if(this.filterInput.searchtype == 'type' && this.filterInput.status == 'inprocess'){
      input = {"User":{"TransType":"searchwithstatus","apptype": this.authenticationService.appType() ,"pagesize":"100", "loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.loggedInUserId() , filterby: 'inprocess'}}
    }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.searchByTypeResult(output),
        error => {
          console.log('Error in getting all points Details');
        });
  }
  searchByTypeResult(result){
    if(result && result.data){
      this.redeemDetails = result.data;
      this.noRecords = false;
    }
    else{
      this.noRecords = true;
    }
  }

  searchByDate(){
    let input = {};
    if(this.filterType.startdate && this.filterType.enddate === null){
      this.startDate = moment(this.filterType.startdate).format('YYYY-MM-DD');
      input = {"offer":{"transtype":"filters","apptype": this.authenticationService.appType() ,"pagesize":"100","startdate": this.startDate ,"loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.loggedInUserId() }}
    }
    else if(this.filterType.enddate && this.filterType.startdate === null ){
      this.endDate = moment(this.filterType.enddate).format('YYYY-MM-DD');
      input = {"offer":{"transtype":"filters","apptype": this.authenticationService.appType() ,"pagesize":"100","enddate": this.endDate ,"loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.loggedInUserId() }}
    }
    else if(this.filterType.startdate && this.filterType.enddate){
      this.startDate = moment(this.filterType.startdate).format('YYYY-MM-DD');
      this.endDate = moment(this.filterType.enddate).format('YYYY-MM-DD');
      input = {"offer":{"transtype":"filters","apptype": this.authenticationService.appType() ,"pagesize":"100","enddate": this.endDate ,"startdate": this.startDate,  "loginid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.loggedInUserId() }}
    }
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.searchByDateResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  searchByDateResult(result){
    if(result.result == 'success'){
      this.allPromoCodes = result.data;
    }
    else{
      this.allPromoCodes = [];
    }
  }


  clearFilter(){
    this.showFilterDailog = false;
    this.filterInput = {"searchtype":"" , "status":''};
    this.filterType = {"startdate": null , "enddate": null};
    this.getAllPromoCodes();
  }

  showUserView(data){
    if(data && data =='customer'){
      this.userView = 'customer'
      this.detailsClickMore = true;
      this.getRedeemDetailsofCustomers();
    }
    else{
      this.userView = 'dealer'
      this.detailsClickMore = true;
      this.getRedeemDetailsofCustomersOfDealer();
    }
  }

  getRedeemDetailsofCustomers(){

    let input = {"User":{ appType: this.authenticationService.appType()  , filterby : this.userView , TransType: 'searchwithusertype' }};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getRedeemDetailsofCustomersResult(output),
    error => {      
    });
  }
  getRedeemDetailsofCustomersResult(result){
    if(result && result.data){
      this.redeemDetails =  result.data;
    }
    else{
      this.redeemDetails = [];
    }
  }

  getRedeemDetailsofCustomersOfDealer(){
    let input = {"User":{ appType: this.authenticationService.appType()  , filterby : this.userView , TransType: 'searchwithusertype' }};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getRedeemDetailsofCustomersOfDealerResult(output),
    error => {      
    });
  }
  getRedeemDetailsofCustomersOfDealerResult(result){
    if(result && result.data){
      this.redeemDetails = result.data;
    }
    else{
      this.redeemDetails = [];
    }
  }

  searchByNumber(){
    console.log('Need to be implemented');
    let input = {"User":{"TransType":"searchwithmobileno","filterby":"mobile","redeemmobileno": this.filterText}};
    this.distributorService.getPoints(input)
    .subscribe(
      output => this.searchByNumberResult(output),
      error => {      
      });
  }
  searchByNumberResult(result){
    if(result && result.data){
      this.redeemDetails = result.data;
    }
    else{
      this.redeemDetails = [];
    }
  }

  sortPromoCode(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.allPromoCodes.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('all PromoCodes List');
      console.log(this.allPromoCodes);
    } else {
      this.isDesc = true;
      this.allPromoCodes.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }

  sortReedemSettings(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.redeemSettingsDetails.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('all redeemSettings List');
      console.log(this.redeemSettingsDetails);
    } else {
      this.isDesc = true;
      this.redeemSettingsDetails.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }

  sortReedemDetails(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.redeemDetails.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('all redeemDetails List');
      console.log(this.redeemDetails);
    } else {
      this.isDesc = true;
      this.redeemDetails.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }


  ngOnInit() {
    this.getAllPromoCodes();
    this.superDealer = this.authenticationService.getSupperDelear();
  }

}
