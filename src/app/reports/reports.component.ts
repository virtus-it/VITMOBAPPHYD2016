import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from './reports.service';
import * as _ from 'underscore';
@Component({

  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private reportservice: ReportsService) { }
  reportDetails = { reportType: "", days: "", lastId: "0", pagesize: 100, appType: this.authenticationService.appType() };
  reportsClickMore:boolean = false;
  reportsInput: any = {};
  reportsData = [];
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloded' },
    { value: 'lastdays', viewValue: 'Last Days' },
    { value: 'pendingorders', viewValue: 'Pending Orders' },
    { value: 'rejectedorders', viewValue: 'Rejected Orders' },
    { value: 'onlydownloaded', viewValue: 'Only Downloaded' },
    { value: 'notregistered', viewValue: 'Not Registered' },
    
  ];
  searchReports(firstCall) {
    this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));
    let input = { "root": { "days": this.reportsInput.days, "lastid": this.reportsInput.lastId, "pagesize": this.reportsInput.pagesize, "transtype": this.reportsInput.reportType, "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
    if (this.reportsData && this.reportsData.length && !firstCall) {
      let lastRecord: any = _.last(this.reportsData);
      if (lastRecord) {
        input.root.lastid = lastRecord.user_id;
      }
      

    }
    else{
      this.reportsData = [];
      input.root.lastid = null;
    }
    this.reportservice.searchReports(input)
      .subscribe(
      output => this.searchReportsResult(output),
      error => {
        console.log("error");
      });
  }
  searchReportsResult(result) {
    if (result.data && result.data.output && result.data.output.length > 0) {
      this.reportsClickMore = true;
      this.reportsData = _.union(this.reportsData,result.data.output);
   }
   else{
    this.reportsClickMore = false;
   }


  }

  ngOnInit() {
  }

}
