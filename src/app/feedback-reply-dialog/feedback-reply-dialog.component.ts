import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import {FeedbackService} from '../feedback/feedback.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-feedback-reply-dialog',
  templateUrl: './feedback-reply-dialog.component.html',
  styleUrls: ['./feedback-reply-dialog.component.css']
})
export class FeedbackReplyDialogComponent implements OnInit {

  errorMessage = false;

  constructor(private feedbackService: FeedbackService,public thisDialogRef: MdDialogRef<FeedbackReplyDialogComponent>, @Inject(MD_DIALOG_DATA) public Detail: any,  private authenticationService: AuthenticationService,private loaderService: LoaderService) { }
  feedbackInput = {"root":{"issueid":this.Detail.issueid,"issuetype":"feedback","loginid":this.authenticationService.loggedInUserId(),"userid":this.authenticationService.loggedInUserId(),"message":""}}

  emailFormControl = new FormControl('', [
    Validators.required]);


sendFeedback(){

  if (this.feedbackInput.root.message.length >= 3) {
    let Input=this.feedbackInput;
    this.feedbackService.createReplyToFeedback(Input)
    .subscribe(
      Output =>this.sendFeedbackResult(Output),
      error => {
        //console.log("error");
        this.loaderService.display(false);
      });
      }
      else{
        this.errorMessage = true;
      }
    
  }
  

    sendFeedbackResult(result){
      //console.log(result);
      if (result.result= 'success') {
        
        this.thisDialogRef.close('success');
      }
    }
    onCloseCancel() {
      this.thisDialogRef.close('Cancel');
    }
  ngOnInit() {
    //console.log(this.Detail);
  }
}

