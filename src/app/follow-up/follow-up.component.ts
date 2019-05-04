import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import * as moment from 'moment';
@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<FollowUpComponent>, @Inject(MD_DIALOG_DATA) public details: any, public dialog: MdDialog, private loaderService: LoaderService, private followupService: FollowUpService) { }
  numbers = 250;
  saveSuccess : boolean = false;
  followUpList = [];
  followUpStatus="";
  followupDate  = null;
  followUpTemplate=[];
  refresh:any = "";
  hideDetailsInFollow : boolean = false;
  followUpInput = {
    "User": {
      "type": this.details.type, "typeid": this.details.id, "username": this.authenticationService.userFullName(),
      "remarks": "", "mobileno": this.details.mobileno, "transtype": "create", "userid": this.authenticationService.loggedInUserId(),"followupdate":null
    }
  };

  stockNotificationInput : '';
  
  createFollowUp() {
    if (this.followupDate) {
      this.followUpInput.User.followupdate = moment(this.followupDate).format('YYYY-MM-DD 00:02:00');
    }
    //console.log(this.followUpInput);
    let input = this.followUpInput;
    input.User.remarks = input.User.remarks.replace(/'/g, "");
    input.User.remarks = input.User.remarks.replace(/"/g, "");
    this.followupService.createFollowUp(input)
      .subscribe(
      output => this.createFollowUpResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  createFollowUpResult(result) {
    //console.log(result);
    if (result.result = 'success') {
      //this.thisDialogRef.close('success');
      this.saveSuccess = true;
      this.getfollowUpdetails();
      this.followUpInput.User.remarks = "";
      this.followUpInput.User.followupdate = null;
      this.followupDate = null;
    }
  }
 
  getfollowUpdetails() {
    let input = { "User": { "type": this.details.type, "typeid": this.details.id, "transtype": "getall" } }
    this.followupService.getFollowUp(input)
      .subscribe(
      output => this.getfollowUpdetailsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getfollowUpdetailsResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.followUpList = result.data.output;
      if(result.data.output){
      this.followUpStatus = this.followUpList[0].followupstatus;
    }
  }
  }
  onCloseCancel() {
    if(this.saveSuccess == true){
      this.thisDialogRef.close('Success');
    }
    else{
      this.thisDialogRef.close('Cancel');
    }
  }

  followUpCompleted(){
    let input= {"User":{"typeid": this.details.id,"type": this.details.type,"followupstatus":"close","transtype":"followupstatus","userid":this.authenticationService.loggedInUserId()}}
    //console.log(input);
    
    this.followupService.followUpCompleted(input)
      .subscribe(
      output => this.followUpCompletedResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  followUpCompletedResult(result) {
    //console.log(result);
    if (result.result = 'success') {
      this.details.refresh = 'success'; 
      this.getfollowUpdetails();

  }
}

startFollowUp(){
  let input= {"User":{"typeid": this.details.id,"type": this.details.type,"followupstatus":"open","transtype":"followupstatus","userid":this.authenticationService.loggedInUserId()}}
  //console.log(input);
  this.followupService.followUpCompleted(input)
      .subscribe(
      output => this.followUpCompletedResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });

}
startFollowUpCompleteResult(result) {
  //console.log(result);
  if (result.result = 'success') {
    this.details.refresh = 'success'; 
    this.getfollowUpdetails();
  
}
}


getFollowUpTemplate(){
  let input={"User":{"transtype":"getfollowup",apptype:this.authenticationService.appType(),userid:this.authenticationService.loggedInUserId(),loginid:this.authenticationService.loggedInUserId()}};
  //console.log(input);
  this.followupService.followUpTemplate(input)
      .subscribe(
      output => this.getFollowUpTemplateResult(output),
      error => {
        //console.log("error in getting followUp templates");
        this.loaderService.display(false);
      });
}
getFollowUpTemplateResult(result){
  //console.log(result);
  if(result.result){
    this.followUpTemplate = result.data;
  }
  

}

createFollowUpForStockNotification(){
  console.log('Need ip for this implementation');
}
  
  ngOnInit() {
    console.log(this.details);
    this.getfollowUpdetails();
    this.getFollowUpTemplate();
    if(this.details && this.details.type == 'followupOnStockNotification'){
      console.log('follow up from stock notification');
      this.hideDetailsInFollow  = true;
    }
  }

}
