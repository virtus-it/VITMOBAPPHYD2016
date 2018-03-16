import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { FeedbackService } from './feedback.service';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
import { FeedbackReplyDialogComponent } from '../feedback-reply-dialog/feedback-reply-dialog.component';
import * as _ from 'underscore';

@Component({

  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public dialog: MdDialog, private loaderService: LoaderService, private feedbackService: FeedbackService) { }
  showFilterDailog = false;
  feedbackList = [];
  searchFeedbackTerm = "";
  feedbackListCopy = [];



  filterViewToggle() {
    this.showFilterDailog = !this.showFilterDailog;

  }
  getAllFeedback() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "customerid": "0", "issueid": "0", "apptype": this.authenticationService.appType() } }
    this.feedbackService.getallFeedback(input)
      .subscribe(
      output => this.getAllFeedbackResult(output),
      error => {
        //console.log("error in feedbacklist");
        this.loaderService.display(false);
      });

  }

  getAllFeedbackResult(result) {
    //console.log(result)
    if (result.result == "success") {
      this.feedbackList = result.data;
      this.feedbackListCopy = result.data;

    }

  }

  searchFeedback() {
    let term = this.searchFeedbackTerm;
    if (term) {
      this.feedbackList = this.feedbackListCopy.filter(function (e) {

        if (e.createdby) {
          let fullName = e.createdby.firstname + " " + e.createdby.lastname;
          return e.createdby.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
        }
      });
    }
    else {
      this.feedbackList = this.feedbackListCopy;
    }
  }




  openStatus(feed) {
    //console.log(feed);
    let input = { "root": { "issueid": feed.issueid, "loginid": this.authenticationService.loggedInUserId(), "userid": this.authenticationService.loggedInUserId(), "status": "close" } };
    this.feedbackService.openAndCloseStatus(input)
      .subscribe(
      output => this.openStatusResult(output),
      error => {
        //console.log("error in open status");
        this.loaderService.display(false);
      });

  }
  openStatusResult(result) {
    //console.log(result)
    if (result.result == 'success') {
      this.getAllFeedback();

    }
  }
  closeStatus(feed) {
    //console.log(feed);
    let input = { "root": { "issueid": feed.issueid, "loginid": this.authenticationService.loggedInUserId(), "userid": this.authenticationService.loggedInUserId(), "status": "open" } };
    this.feedbackService.openAndCloseStatus(input)
      .subscribe(
      Output => this.closeStatusResult(Output),
      error => {
        //console.log("error in close status");
        this.loaderService.display(false);
      });
  }
  closeStatusResult(result) {
    //console.log(result)
    if (result.result == 'success') {
      this.getAllFeedback();


    }
  }
  openReplyModel(data) {
    let dialogRef = this.dialog.open(FeedbackReplyDialogComponent, {
      width: '40%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getAllFeedback();

      }

    });
  }

  refresh(){
    this.getAllFeedback();
    // //console.log(result);
  }
  
  ngOnInit() {
    this.getAllFeedback();
  }
}

