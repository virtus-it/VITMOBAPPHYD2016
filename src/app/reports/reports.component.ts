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
  reportDetails = { reportType: "", days: null, lastId: "0", pagesize: 30, appType: this.authenticationService.appType() };
  reportsClickMore:boolean = false;
  reportsInput: any = {};
  reportsData = [];
  tabPanelView = 'newlydownloaded';
  reportsType = [
    { value: 'newlydownloaded', viewValue: 'Newly Downloaded Customers' },
    { value: 'lastdays', viewValue: 'Customers not Ordered in Last 10 Days' },
    { value: 'pendingorders', viewValue: 'Pending Orders' },
    { value: 'rejectedorders', viewValue: 'Rejected Orders' },
    { value: 'notregistered', viewValue: 'Customers not Registered' },
    
  ];
  searchReports(firstCall,Rtype) {
    this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));
  
    this.tabPanelView = Rtype;
    
   let input = { "root": { "days": null, "last_id": this.reportsInput.lastId, "pagesize": this.reportsInput.pagesize, "transtype": Rtype, "userid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
   if(Rtype == 'lastdays'){
    input.root.days = 10;
        }
    if (this.reportsData && this.reportsData.length && !firstCall) {
      let lastRecord: any = _.last(this.reportsData);
      if (lastRecord) {
        if(input.root.transtype == 'pendingorders'){
          input.root.last_id = lastRecord.orderid; 
        }
        else if(input.root.transtype == 'rejectedorders'){
          input.root.last_id = lastRecord.orderid;
        }
        else{
        input.root.last_id = lastRecord.user_id;
        }
      }
      

    }
    else{
      this.reportsData = [];
      input.root.last_id = null;
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
    this.searchReports(true,'newlydownloaded') 
  }

}
