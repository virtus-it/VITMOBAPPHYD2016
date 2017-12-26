import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { FeedbackService } from './feedback.service';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
import{FeedbackReplyDialogComponent} from '../feedback-reply-dialog/feedback-reply-dialog.component';
import * as _ from 'underscore';
import { error } from 'selenium-webdriver';
import { Output } from '@angular/core/src/metadata/directives';
@Component({

  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public dialog: MdDialog,private loaderService: LoaderService, private feedbackService: FeedbackService) { }
  showFilterDailog = false;
  feedbackList = [];

  filterViewToggle() {
    this.showFilterDailog = !this.showFilterDailog;

  }
  getAllFeedback() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "customerid": "0", "issueid": "0", "apptype": this.authenticationService.appType() } }
    this.feedbackService.getallFeedback(input)
      .subscribe(
      output => this.getAllFeedbackResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  
  getAllFeedbackResult(result) {
    console.log(result)
    if (result.result == "success") {
      this.feedbackList = result.data;
    }

  }
  openStatus(feed){
    console.log(feed);
    let input ={"root":{"issueid":feed.issueid,"loginid":this.authenticationService.loggedInUserId(),"userid":this.authenticationService.loggedInUserId(),"status":"close"}};
    this.feedbackService.openAndCloseStatus(input)
    .subscribe(
      output => this.openStatusResult(output),
      error => {
        console.log("error");
        this.loaderService.display(false);
      });
    
      }
      openStatusResult(result) {
    console.log(result)
    if (result.result == 'success') {
      this.getAllFeedback();
    
    }
      }
    closeStatus(feed){
      console.log(feed);
      let input = {"root":{"issueid":feed.issueid,"loginid":this.authenticationService.loggedInUserId(),"userid":this.authenticationService.loggedInUserId(),"status":"open"}};
      this.feedbackService.openAndCloseStatus(input)
      .subscribe(
        Output => this.closeStatusResult(Output),
        error => {
          console.log("error");
          this.loaderService.display(false);
        });
    }
    closeStatusResult(result) {
      console.log(result)
      if (result.result == 'success') {
        this.getAllFeedback();

    
      }
    }
    openReplyModel(data){
      let dialogRef = this.dialog.open(FeedbackReplyDialogComponent, {
        width: '80%',
        data: data
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
       

    });
    }
    ngOnInit() {
      this.getAllFeedback();
    }
    }

