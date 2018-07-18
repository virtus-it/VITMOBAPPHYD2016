import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { SmsServiceService } from '../sms/sms-service.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-quick-notification',
  templateUrl: './quick-notification.component.html',
  styleUrls: ['./quick-notification.component.css']
})
export class QuickNotificationComponent implements OnInit {
  templateCtrl: FormControl;
  filteredTemplates: Observable<any[]>;
  LastfilterRecords = false;


  constructor(public thisDialogRef: MdDialogRef<QuickNotificationComponent>, private followupService: FollowUpService,  private authenticationService: AuthenticationService, @Inject(MD_DIALOG_DATA) public Details: any, private smsService: SmsServiceService) {

    this.templateCtrl = new FormControl();
      this.filteredTemplates = this.templateCtrl.valueChanges
        .startWith(null)
        .map(temp => temp ? this.findTemplate(temp) : this.getAllTemplates.slice());
   }

   getAllTemplates:any = [];
   filterType:any = { template_desc: "" , tempname:""};
   smsInput :any = {};
   NewJsonObj:any = {};
   


   findTemplate(name:string){
    if(this.getAllTemplates){
    let finalTemplates = this.getAllTemplates.filter(temp =>
      temp.template_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    console.log(finalTemplates);
    let JsonObj:any = {};
  
    if (finalTemplates && finalTemplates.length > 0) {
      let findTemplate: any = {};
      findTemplate = _.find(finalTemplates, function (k, l) {
        let tempDetails: any = k;
        return tempDetails.template_name == name;
      });
      if(findTemplate){
        this.filterType.template_desc = findTemplate.template_desc;
        this.filterType.tempname = findTemplate.template_name;
        let replace = this.Details;
       
        if( this.filterType.template_desc){
          JsonObj = JSON.parse(this.filterType.template_desc);
          this.filterType.template_desc = JsonObj.body;
          this.filterType.template_desc = this.filterType.template_desc.replace("<<CUSTOMER_NAME>>" , replace.orderby_firstname);
          this.filterType.template_desc = this.filterType.template_desc.replace("<<ORDER_ID>>" , replace.order_id);
          this.filterType.template_desc = this.filterType.template_desc.replace("<<ORDER_QUANTITY>>" , replace.quantity);
          this.filterType.template_desc = this.filterType.template_desc.replace("<<PRODUCT_NAME>>" , replace.brandname);
          this.filterType.template_desc = this.filterType.template_desc.replace("<<PRODUCT_TYPE>>" , replace.prod_type);
          this.filterType.template_desc = this.filterType.template_desc.replace("<<CUSTOMER_PHNO>>" , replace.orderby_mobileno);

        
          let mobileObject = [{}];
          if(this.Details.type == 'notificationFromCustomers'){
            mobileObject =  [{"mobileno":this.Details.data.mobileno,"gcm_regid":this.Details.data.gcm_regid,"fullName":this.Details.data.firstname}];
          }
          else if(this.Details.type == 'notificationfromReports'){
            mobileObject =  [{"mobileno":this.Details.data.mobileno,"gcm_regid":this.Details.data.gcm_regid,"fullName":this.Details.data.firstname}];
          }
          else{
            mobileObject = [{"mobileno":this.Details.orderby_mobileno,"gcm_regid":this.Details.gcm_regid,"fullName":this.Details.orderby_firstname}];
          }

          JsonObj.mobilenumber = mobileObject;
          JsonObj.transtype = "createsms";
          JsonObj.type = JsonObj.notificationType;
          var key = 'id';
          delete JsonObj[key];
          this.smsInput = {"User": JsonObj};
      
    }

    
}
  }

  else {
    if (name.length >= 3 && !this.LastfilterRecords) {
      
      this.getTemplates();
    }
  }
  return finalTemplates;

  }
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
        // console.log(allTemplates);
      }
    });
  
  }
  this.getAllTemplates = allTemplates; 
  // console.log("check" ,  this.getAllTemplates);
  }
}


sendNotification(){
  let input = this.smsInput;
  this.smsInput.User.body = this.filterType.template_desc;
  let formattedInput:any = {type:'',getAllMobileInput : {}, sendSmsInput : input}
  if(this.Details){
    formattedInput.sendSmsInput.User.mobile = this.Details.orderby_mobileno;
    formattedInput.sendSmsInput.User.message = this.filterType.tempname;   

  }
  console.log(formattedInput)
  this.smsService.CreateSms(formattedInput)
      .subscribe(
      output => this.sendNotificationResult(output),
      error => {
      });

}
sendNotificationResult(result){
  if(result.result == 'success'){
    let sendbackData = this.smsInput
    this.thisDialogRef.close(sendbackData);

  }
}





  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }


  ngOnInit() {
    this.getTemplates();
    console.log(this.Details);
  }

}