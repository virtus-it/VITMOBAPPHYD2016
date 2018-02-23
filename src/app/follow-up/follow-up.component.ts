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
  followUpList = [];
  followupDate  = null;
  followUpInput = {
    "User": {
      "type": this.details.type, "typeid": this.details.id, "username": this.authenticationService.userFullName(),
      "remarks": "", "mobileno": this.details.mobileno, "transtype": "create", "userid": this.authenticationService.loggedInUserId(),"followupdate":null
    }
  }
  createFollowUp() {
    if (this.followupDate) {
      this.followUpInput.User.followupdate = moment(this.followupDate).format('YYYY-MM-DD HH:MM:SS.sss');
    }
    console.log(this.followUpInput);
    let input = this.followUpInput;
    input.User.remarks = input.User.remarks.replace(/'/g, "");
    input.User.remarks = input.User.remarks.replace(/"/g, "");
    this.followupService.createFollowUp(input)
      .subscribe(
      output => this.createFollowUpResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  createFollowUpResult(result) {
    console.log(result);
    if (result.result = 'success') {
      //this.thisDialogRef.close('success');
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
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getfollowUpdetailsResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.followUpList = result.data.output;

    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  followUpCompleted(){
    let input= {"User":{"typeid": this.details.id,"type": this.details.type,"followupstatus":"close","transtype":"followupstatus","userid":this.authenticationService.loggedInUserId()}}
    console.log(input);
    this.followupService.followUpCompleted(input)
      .subscribe(
      output => this.followUpCompletedResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  followUpCompletedResult(result) {
    console.log(result);
    if (result.result = 'success') {

  }
}
  
  ngOnInit() {
    console.log(this.details);
    this.getfollowUpdetails();
  }

}
