import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SmsServiceService } from '../sms/sms-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { Observable } from 'rxjs/Observable';
import { FollowUpService } from '../follow-up/follow-up.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';
@Component({

  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent implements OnInit {
  templateCtrl: FormControl;
  filteredTemplates: Observable<any[]>;


  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;


  constructor(private distributorService: DistributorServiceService, public thisDialogRef: MdDialogRef<SmsDialogComponent>, @Inject(MD_DIALOG_DATA) public smsDetail: any, private smsService: SmsServiceService, private followupService: FollowUpService,  private authenticationService: AuthenticationService) {

    

    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.filterDistributors(dist) : this.distributors.slice());


      this.templateCtrl = new FormControl();
      this.filteredTemplates = this.templateCtrl.valueChanges
        .startWith(null)
        .map(temp => temp ? this.findTemplate(temp) : this.getAllTemplates.slice());


  }

  orderinput = { orderType: "", fromDate: null, toDate: null, days: null, distributorid: null };
  smsInput:any = { name: "", mobilenumber: [], body: "", smsType: "sms", customBody: "", customMobilenumber: "",title:"",type:"",redirecturl:"",showcomment:false,url:"",buttons:[{name:"", actiontype:"", count:0}], option:[{name:"",count:0}],sliderurl:[{image:"",count:0}], radiosave : false , radioDontsave: false , radioOverWrite : false , tempname: "" };
  mobileDetails: any = [];
  mobileDetailsCopy:any = [];
  distributors: any = [];
  searchMobileNumber:string = "";
  checkAll: boolean = false;
  getAllTemplates:any = [];
  checkAllMobile: boolean = false;
  tempName:any = "";
  smallLoader: boolean = false;
  buttonCount:number = 0;
  buttonActionCount:number = 0;
  optionCount:number = 0;
  silderCount:number = 0;
  template:any = "";
  OrderTypeDetails = [
    { value: 'all', viewValue: 'All Orders' },
    { value: 'ordered', viewValue: 'Unassign Orders' },
    { value: 'delivered', viewValue: 'Delivered Orders' },
    { value: 'assigned', viewValue: 'Pending Orders' },
    { value: 'allcustomers', viewValue: 'All customers' },
    { value: 'unassociatedcustomer', viewValue: 'Unassociated Customer' },
    { value: 'customerbydays', viewValue: 'Customer Not ordered' },
    { value: 'distributorscustomer', viewValue: 'Customer By distributor' },
    { value: 'onlydownloaded', viewValue: 'Newly downloaded customers' },
    { value: 'cancel', viewValue: 'Cancelled Orders' },
    { value: 'latestdownloadedunassociate', viewValue: 'Newly downloaded unassociate customers' },
    { value: 'allsuppliers', viewValue: 'All Suppliers' },
    { value: 'alldistributors', viewValue: 'All Distributors' },
    { value: 'sms', viewValue: 'SMS' },
    {value: 'notregistered' , viewValue:'Not registered'}
    // { value: 'customersbyarea', viewValue: 'customer By Area' },
  ];


  filterDistributors(name: string) {
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
        this.orderinput.distributorid = findDistributor.userid;
      }

    }
    return finalDistributors;
  }

  findTemplate(name:string){
    console.log(name);
    if(this.getAllTemplates && this.getAllTemplates.template_name){
    let finalTemplates = this.getAllTemplates.filter(temp =>
      temp.template_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    console.log(finalTemplates);
    if (finalTemplates && finalTemplates.length > 0) {
      let findTemplate: any = {};

      findTemplate = _.find(finalTemplates, function (k, l) {
        let tempDetails: any = k;
        return tempDetails.template_name == name;
      });
    }
  

    return finalTemplates;
  }
}
  onChangeType() {
    this.orderinput.fromDate = null;
    this.orderinput.toDate = null
    this.orderinput.days = null
    this.orderinput.distributorid = null;
    this. smsInput = { name: "", mobilenumber: [], body: "", smsType: this.smsInput.smsType , customBody: "", customMobilenumber: "",title:"",type:"",redirecturl:"",showcomment:false,url:"",buttons:[{name:"", actiontype:"",count:0}], option:[{name:"",count:0}],sliderurl:[{image:"",count:0}] };
  }
  onChangeSmsType(type){
    this. smsInput = { name: "", mobilenumber: [], body: "", smsType: this.smsInput.smsType, customBody: "", customMobilenumber: "",title:"",type:"",redirecturl:"",showcomment:false,url:"",buttons:[{name:"",  actiontype:"",count:0}],option:[{name:"",count:0}],sliderurl:[{image:"",count:0}] };
  }
  getMobileNumber() {
    this.smallLoader = true;
    let input = {
      User: {
        "user_type": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), type: this.orderinput.orderType,"smstype":"",
        "apptype": this.authenticationService.appType(), fromdate: null, todate: null, days: this.orderinput.days, distributorid: this.orderinput.distributorid
      }
    };
    if (this.orderinput.fromDate) {
      input.User.fromdate = moment(this.orderinput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.orderinput.toDate) {
      input.User.todate = moment(this.orderinput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if(this.smsInput.smsType == 'sms'){
      input.User.smstype = this.smsInput.smsType
    }
    else{
      input.User.smstype = this.smsInput.smsType
    }
    console.log(input);
    this.smsService.getMobileNumbers(input)
      .subscribe(
      output => this.getMobileNumberResult(output),
      error => {
        //console.log("error in distrbutors");
        this.smallLoader = false;
      });
  }
  getMobileNumberResult(result) {
    console.log(result);
    let mobile = [];
    this.smallLoader = false;
    if (result && result.data && result.data.length) {
      _.each(result.data, function (i, j) {
        let details: any = i;
        if(details.mobileno){
        let mobiles = { mobileno: details.mobileno, gcm_regid: details.gcm_regid, fullName: details.fullname, referal_code: details.referal_code };
        mobile.push(mobiles);
      }

      });

      this.mobileDetails = mobile;
      this.mobileDetailsCopy = mobile;
    
    }
    else{
     this.mobileDetails= [];
     this.mobileDetailsCopy = [];
    }
  }
  searchMobileNo() {
    let term = this.searchMobileNumber;

    this.mobileDetails = this.mobileDetailsCopy.filter(function (e) {
      return e.mobileno.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }
  onChangeCheck(number: any, isChecked: boolean) {


    if (isChecked) {
      this.smsInput.mobilenumber.push(number);

    } else {
      this.checkAll = false;
      this.smsInput.mobilenumber = _.without(this.smsInput.mobilenumber, number);

    }
  }
  onChangeCheckAll(isChecked: boolean) {


    if (isChecked) {
      this.smsInput.mobilenumber = this.mobileDetails;

      this.checkAllMobile = true;

    } else {
      this.smsInput.mobilenumber = [];
      this.checkAll = false;
      this.checkAllMobile = false;

    }
  }
  saveMobileSms() {
    //console.log(this.smsInput);
    let createSmsInput = {
      "User": {
        "mobilenumber": this.smsInput.mobilenumber,
        "count": this.smsInput.mobilenumber.length,
        "name": this.smsInput.name,
        "smstype": this.smsInput.smsType,
        "user_type": this.authenticationService.userType(),
        "transtype": "createsms",
        "type": this.smsInput.type,
        "showcomment":this.smsInput.showcomment,
        "loginid": this.authenticationService.loggedInUserId(),
        "apptype": this.authenticationService.appType(),
        "body": this.smsInput.body,
        "title": this.smsInput.title,
        "redirecturl": this.smsInput.redirecturl,
        "url": this.smsInput.url,
        "buttons":[],
        "buttonactions":[],
        "option": [],
        "sliderurl":this.smsInput.sliderurl,
        "tempname": this.smsInput.tempname
      }
    }
   

    _.each(this.smsInput.buttons, function (i, j) {
      let details: any = i;
      
      createSmsInput.User.buttons.push(details.name);
      var action =  {text:details.name, actiontype: details.actiontype};
      if(action.text.length > 0 && action.actiontype.length > 0 ){
      createSmsInput.User.buttonactions.push(action);
      }

    });
    _.each(this.smsInput.option, function (i, j) {
      let details: any = i;
      createSmsInput.User.option.push(details.name);
    });

    _.each(this.smsInput.buttonactions, function (i, j) {
      let details: any = i;
      
      createSmsInput.User.buttonactions.push(details.text,details.actiontype);

    });


    if(this.orderinput.orderType == 'sms'){
      let mobileArray = this.smsInput.customMobilenumber.split(';');
      let modifiedNumbers = [];
      _.each(mobileArray, function (i, j) {
        let details: any = i;
        var mobile = {mobileno:""};
      if(details){
        mobile.mobileno = details;

      }
      modifiedNumbers.push(mobile);

      });
      createSmsInput.User.mobilenumber = modifiedNumbers;
      createSmsInput.User.count = modifiedNumbers.length;
      createSmsInput.User.body = this.smsInput.customBody;

    }

    let formattedInput:any = {}
      if( this.checkAll = true && createSmsInput.User.count > 400){
        createSmsInput.User.mobilenumber = [];
         formattedInput = {
          type:'checkall',
          getAllMobileInput : {User: {"user_type": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(),type: this.orderinput.orderType,"smstype":"","apptype": this.authenticationService.appType(), fromdate: null, todate: null, days: this.orderinput.days, distributorid: this.orderinput.distributorid }},
          sendSmsInput : createSmsInput,
        }
        if (this.orderinput.fromDate) {
          formattedInput.getAllMobileInput.User.fromdate = moment(this.orderinput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
        }
        if (this.orderinput.toDate) {
          formattedInput.getAllMobileInput.User.todate = moment(this.orderinput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
        }
        if(this.smsInput.smsType == 'sms'){
          formattedInput.getAllMobileInput.User.smstype = this.smsInput.smsType
        }
        else{
          formattedInput.getAllMobileInput.User.smstype = this.smsInput.smsType
        }
        console.log(formattedInput);
      }
      else{
         formattedInput = {
          type:'',
          getAllMobileInput : {},
          sendSmsInput : createSmsInput,
        }
        console.log(formattedInput);
      }

      
    console.log("input",formattedInput);
   
    this.smsService.CreateSms(formattedInput)
      .subscribe(
      output => this.saveMobileSmsResult(output),
      error => {
        //console.log("error in distrbutors");
      });
      if(this.smsInput.radiosave == "save"){
        this.saveTemplate(createSmsInput);
      }
      else if(this.smsInput.radioOverWrite == "overWrite"){
        // this.templateOverwrite(createSmsInput);
      }
      
  }
  saveMobileSmsResult(result) {
    //console.log(result);
    this.thisDialogRef.close(result);
  }


  saveTemplate(data){
    let input = Object.assign({}, data)
   input.User.transtype = "notification";
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
      output => this.saveTemplateResult(output),
      error => {
      });
  }
  saveTemplateResult(result){
    if(result.result == 'success'){

    }
  }

  // templateOverwrite(data){
  //   let input = Object.assign({}, data)
  //   input.transtype = "notification";
  //   console.log(input);
  //   // this.followupService.followUpTemplate(input)
  //   // .subscribe(
  //   //   output => this.updateTemplateResult(output),
  //   //   error => {
  //   //   });
  // }
  // updateTemplate(result){
  //   if(result.result == 'success'){

  //   }

  // }

  // getAllTemplates(){

  // }


  getDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
    //console.log(input);
    this.distributorService.getAllDistributors(input)
      .subscribe(
      output => this.getDistributorsResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }
  getDistributorsResult(data) {
    //console.log(data);
    if (data.result == 'success') {
      let distributorCopy = [];

      if (data.data && data.data.length) {
        _.each(data.data, function (i, j) {
          let details: any = i;
          details.fullName = details.firstname + " " + details.lastname
          distributorCopy.push(details);

        });


        this.distributors = distributorCopy;
      }
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  addButton(){
    this.buttonCount = this.buttonCount + 1;
    let buttonObject = {name:"",count:this.buttonCount};
this.smsInput.buttons.push(buttonObject);
this.buttonActionCount = this.buttonActionCount + 1;
let buttonActionObject = {text: "", actiontype: "" , count:this.buttonActionCount};
// this.smsInput.buttonactions.push(buttonActionObject);

  }
  removeButton(item){
    let filteredButton = _.filter(this.smsInput.buttons, function(e:any) {
      return e.count !== item.count;  
  });
  let filteredActionButton = _.filter(this.smsInput.buttonactions, function(e:any) {
    return e.count !== item.count;
  });
  this.smsInput.buttonactions = filteredActionButton;
  this.smsInput.buttons = filteredButton;
  }
  addOption(){
    this.optionCount = this.optionCount + 1;
    let optionObject = {name:"",count:this.optionCount};
this.smsInput.option.push(optionObject);

  }
  removeoption(item){
    let filteredOption = _.filter(this.smsInput.option, function(e:any) {
      return e.count !== item.count;
  });
  this.smsInput.option = filteredOption;
  
  }
  addSlider(){
    this.silderCount = this.silderCount + 1;
    let sliderObject = {image:"",count:this.silderCount};
this.smsInput.sliderurl.push(sliderObject);

  }
  removeSilder(item){
    let filteredOption = _.filter(this.smsInput.sliderurl, function(e:any) {
      return e.count !== item.count;
  });
  this.smsInput.sliderurl = filteredOption;
  
  }


  getTemplates(){
    let input = {"User":{"user_type":"dealer","transtype":"getnotification","loginid":this.authenticationService.loggedInUserId()}};
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.getTemplatesResult(output),
    error => {
    });
  }
  getTemplatesResult(result){
    console.log(result);
    if(result.result == 'success'){
      this.getAllTemplates = result.data; 
      console.log(this.getAllTemplates);
    //  this.tempName = this.getAllTemplates.template_name ;
    }
  }
  ngOnInit() {
    this.getDistributors();
    this.getTemplates();

  }

}
