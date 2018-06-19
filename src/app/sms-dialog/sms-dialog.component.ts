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

  orderinput = { orderType: "", fromDate: null, toDate: null, days: null, distributorid: null , date: null , timeSlot:"" };
  smsInput:any = { name: "", mobilenumber: [], body: "", smsType: "sms", customBody: "", customMobilenumber: "",title:"",type:"",redirecturl:"",showcomment:false,url:"",buttons:[{name:"", actiontype:"", count:0}], option:[{name:"",count:0}],sliderurl:[{image:"",count:0}], radio : '' , tempname: "" };
  mobileDetails: any = [];
  mobileDetailsCopy:any = [];
  distributors: any = [];
  searchMobileNumber:string = "";
  checkAll: boolean = false;
  getAllTemplates:any = [];
  checkAllMobile: boolean = false;
  tempName:any = "";
  filterType:any = {template_name:"", template_desc: "", id: ""};
  LastfilterRecords = false;
  smallLoader: boolean = false;
  buttonCount:number = 0;
  buttonActionCount:number = 0;
  optionCount:number = 0;
  silderCount:number = 0;
  template:any = "";
  tabPanelView:string="panel1";
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
    {value: 'notregistered' , viewValue:'Not registered'},
    {value: 'distributorsdeliveredcustomer' , viewValue:'Distributors Delivered Customers'},
    {value: 'distributorsdeliveredorders' , viewValue:'Distributors Delivered Orders'},
    {value: 'distributorspendingorders' , viewValue:'Distributors Pending Orders '},
    {value: 'customerspendingorders' , viewValue:'Customers Pending Orders '},
    {value: 'distributorsdeliveryslot' , viewValue:'Distributors Delivery-Slot '},
    {value: 'deliveryslotcustomers' , viewValue:'Delivery-Slot Customers '}
    

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
    // console.log(name);
    if(this.getAllTemplates){
    let finalTemplates = this.getAllTemplates.filter(temp =>  
      temp.template_name.toLowerCase().indexOf(temp.template_name.toLowerCase()) === 0);
    console.log(finalTemplates);
    if (finalTemplates && finalTemplates.length > 0) {
      let findTemplate: any = {};

      findTemplate = _.find(finalTemplates, function (k, l) {
        let tempDetails: any = k;
        return tempDetails.template_name == name;
      });

      if (findTemplate) {
        this.filterType.template_name = findTemplate.template_name;
        this.filterType.template_desc = findTemplate.template_desc;
        this.filterType.id = findTemplate.id;

        let  JsonObj:any = {};
        if( this.filterType.template_desc){
          JsonObj = JSON.parse(this.filterType.template_desc);
        console.log("json parsed successfully" , JsonObj  );
        }
        this.smsInput.body = JsonObj.body;
        this.smsInput.name = JsonObj.name;    
        this.smsInput.redirecturl = JsonObj.redirecturl;
        this.smsInput.showcomment = JsonObj.showcomment;
        this.smsInput.title = JsonObj.title;
        this.smsInput.type = JsonObj.type;
        this.smsInput.url = JsonObj.url;
        this.smsInput.tempname = JsonObj.tempname;                
        if(JsonObj.buttonactions && JsonObj.buttonactions.length > 0){
          let buttons= [];
          this.smsInput.buttons= [];
          _.each(JsonObj.buttonactions, function(i,j){
            let buttonDetails:any = i;
            let buttonObject = {name: buttonDetails.text, actiontype:buttonDetails.actiontype, count:j+1};
            buttons.push(buttonObject)
          });
          this.smsInput.buttons = buttons;
        }
        console.log(this.smsInput.buttons);


        if(JsonObj.option && JsonObj.option.length > 0){
          let options =[];
          _.each(JsonObj.option , function(i, j){
            let optionDetails:any = i;
            if(optionDetails && optionDetails.length > 0){
            let optionObject = {name: optionDetails ,count:j+1}
            options.push(optionObject);
            }
            else{
              let optionObject = {}
              options.push(optionObject);
            }
          });
          this.smsInput.option = options;
        }

        if(JsonObj.sliderurl && JsonObj.sliderurl.length > 0){
          let slider = [];
          _.each(JsonObj.sliderurl , function(i , j){
            let sliderDetails:any = i;
        if(sliderDetails.image){
            let sliderObject = {image: sliderDetails.image ,count:j+1}
            slider.push(sliderObject);
        }
        else{
          let sliderObject = {}
          slider.push(sliderObject);          
        }
          });
          this.smsInput.sliderurl = slider;
          
        }
        console.log(this.smsInput); 
       
      }

    }

    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        
        this.getTemplates();
      }
    }
    return finalTemplates;
  }
  // 
}

trackByFn(index, item) {
  return index; // or item.id
}



  onChangeType() {
    this.orderinput.fromDate = null;
    this.orderinput.toDate = null;
    this.orderinput.date = null;    
    this.orderinput.days = null;
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
        "apptype": this.authenticationService.appType(), fromdate: null, todate: null, days: this.orderinput.days, distributorid: this.orderinput.distributorid , date:null , timeSlot: ""
      }
    };
    if (this.orderinput.fromDate) {
      input.User.fromdate = moment(this.orderinput.fromDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if (this.orderinput.toDate) {
      input.User.todate = moment(this.orderinput.toDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    if(this.orderinput.date){
      input.User.date = moment(this.orderinput.date).format('YYYY-MM-DD 00:00:00');
    }
    if(this.orderinput.timeSlot){

      let selectedTime = this.orderinput.timeSlot;
      let endTime = selectedTime.split('-');
      let endTime2 = endTime[1];
  let time24 = moment(endTime2, ["hA"]).format("HH:mm:ss");
  console.log("time24" , time24);

  input.User.date = moment(this.orderinput.date).format("YYYY-MM-DD");
  var slotDate = input.User.date + " " + time24; 
  
  input.User.date = slotDate;

      // input.User.timeSlot = time24;
    }
    // if(this.orderinput.date){


    // }
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
      });
      if(this.smsInput.radio == "save"){
        this.saveTemplate(createSmsInput);
      }
      else if(this.smsInput.radio == "overWrite"){
         this.templateOverwrite(createSmsInput);
      }
      
      
  }
  saveMobileSmsResult(result) {
    console.log(result);
    this.thisDialogRef.close(result);
  }


  saveTemplate(data){
    let input = Object.assign({}, data)
   input.User.transtype = "notification";
   input.User.type = "notification";

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

  templateOverwrite(data){
    let input = Object.assign({}, data)
    console.log(data);
    input.User.transtype = "updatenotification";
    input.User.id = this.filterType.id;
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
      output => this.updateTemplateResult(output),
      error => {
      });
  }
  updateTemplateResult(result){
    if(result == 'success'){

    }

  }




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
// this.buttonActionCount = this.buttonActionCount + 1;
// let buttonActionObject = {text: "", actiontype: "" , count:this.buttonActionCount};
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
      let allTemplates = [];
      if(result.data && result.data.length >0){
      _.each(result.data, function(i,j){
        let details:any = i;
        if(details.template_name !== null){ 
          allTemplates.push(details);
          console.log(allTemplates);
        }
      });
    
    }
    this.getAllTemplates = allTemplates; 
    console.log("check" ,  this.getAllTemplates);
    }
  }

    //function to show panel
    showTabPanel(panelName) {
      this.tabPanelView=panelName;
      
        }


  // addTemplateInput(){
  //   let bodyObject = this.getAllTemplates.template_desc;
  //   this.smsInput.body.push(bodyObject);
  // }











  ngOnInit() {
    this.getDistributors();
    this.getTemplates();

  }

}
