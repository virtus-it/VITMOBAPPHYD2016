import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { FeedbackService } from './feedback.service';
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';
@Component({

  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private loaderService: LoaderService, private feedbackService: FeedbackService) { }
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
  ngOnInit() {
    this.getAllFeedback();
  }


}
