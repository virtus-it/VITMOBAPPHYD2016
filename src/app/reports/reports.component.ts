import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from './reports.service';
@Component({

  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private reportservice: ReportsService) { }
  reportDetails = { reportType: "", days: "", lastId: "0", pagesize: 100, appType: this.authenticationService.appType() };
  reportsInput: any = {};
  reportsData = [];
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloded' },
    { value: 'lastdays', viewValue: 'Last Days' },
    { value: 'pendingorders', viewValue: 'Pending Orders' },
    { value: 'rejectedorders', viewValue: 'Rejected' },

  ];
  searchReports() {
    this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));
    let input = { "root": { "days": this.reportsInput.days, "lastid": this.reportsInput.lastId, "pagesize": this.reportsInput.pagesize, "transtype": this.reportsInput.reportType,"userid": this.authenticationService.loggedInUserId(),"apptype": this.authenticationService.appType() } }
    this.reportservice.searchReports(input)
      .subscribe(
      output => this.searchReportsResult(output),
      error => {
        console.log("error");
      });
  }
  searchReportsResult(result) {

    this.reportsData = result.data.output;

  }

  ngOnInit() {
  }

}
