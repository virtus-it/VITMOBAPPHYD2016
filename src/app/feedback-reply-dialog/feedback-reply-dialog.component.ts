import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
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

  constructor(private feedbackService: FeedbackService,public thisDialogRef: MdDialogRef<FeedbackReplyDialogComponent>, @Inject(MD_DIALOG_DATA) public Detail: any,  private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
