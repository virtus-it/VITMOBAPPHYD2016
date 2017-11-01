import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import {ReportsService} from './reports.service';
@Component({
  
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private reportservice : ReportsService) { }
  reportDetails = {reportType:"", days: "", lastId:"0",pagesize:100,appType:this.authenticationService.appType()};
reportsInput:any = {};
reportsData =[];
  reportsType = [
    { value: 'newlydownloded', viewValue: 'Newly Downloded' },
    { value: 'lastdays', viewValue: 'Last Days' },
    { value: 'pendingorders', viewValue: 'Pending Orders' },
    { value: 'rejected', viewValue: 'Rejected' },
    
  ];
  searchReports(){
this.reportsInput = JSON.parse(JSON.stringify(this.reportDetails));
    if(this.reportsInput.reportType =='newlydownloded'){
this.getNewlyDownloded();
    }
    else if(this.reportsInput.reportType =='lastdays'){

this.getLastDay()
    }
    else if(this.reportsInput.reportType =='pendingorders'){
      
      this.getPendingOrders();
          }
          else if(this.reportsInput.reportType =='rejected'){
            
            this.getrejectedOrders()
                }
  }
  getNewlyDownloded() {
   
    this.reportservice.newlyDownloded(this.reportsInput)
      .subscribe(
      output => this.getNewlyDownlodedResult(output),
      error => {
        console.log("error");
      });
  }
  getNewlyDownlodedResult(result) {
  
   this.reportsData = result.data.output;
   
  }
  getLastDay() {
    
     this.reportservice.lastDays(this.reportsInput)
       .subscribe(
       output => this.getLastDayResult(output),
       error => {
         console.log("error");
       });
   }
   getLastDayResult(result) {
   
    this.reportsData = result.data.output;
    
   }
   getPendingOrders() {
    
     this.reportservice.pendingOrders(this.reportsInput)
       .subscribe(
       output => this.getPendingOrdersResult(output),
       error => {
         console.log("error");
       });
   }
   getPendingOrdersResult(result) {
   
    this.reportsData = result.data.output;
    
   }
   getrejectedOrders() {
    
     this.reportservice.rejectedOrders(this.reportsInput)
       .subscribe(
       output => this.getrejectedOrdersResult(output),
       error => {
         console.log("error");
       });
   }
   getrejectedOrdersResult(result) {
   
    this.reportsData = result.data.output;
    
   }
  ngOnInit() {
  }

}
