import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import { MdDialog } from '@angular/material';
import {RaiseRequestDetailDailogComponent } from '../raise-request-detail-dailog/raise-request-detail-dailog.component';


@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.css']
})
export class RaiseRequestComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService , private reportsService: ReportsService ,  public dialog: MdDialog) { }


  allStockRequests:any = [];


  getStockRequests(){
    let input = {"root":{"userid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.superDelearId() ,"pid":"0","lastrecord":"0", "distributorid": this.authenticationService.loggedInUserId() , "viewtype":"notification","pagesize":"10","apptype": this.authenticationService.appType()}}
    this.reportsService.stockRequests(input)
    .subscribe(
      output => this.getStockRequestsResult(output),
      error => {
        //console.log("error in feedbacklist");
      });
  }
  getStockRequestsResult(result){
    if(result.result == 'success'){
      this.allStockRequests = result.data;
    }
  }

  viewDetails(){
    let dialogRefAddSupplier = this.dialog.open(RaiseRequestDetailDailogComponent, {
      width: '70%',
      data: ''
  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      if(result == 'success'){
        this.getStockRequests();
      }
  });
  }


  raiseRequest(){
    let formattedData = {type : 'newRaiseRequest'}
    let dialogRefAddSupplier = this.dialog.open(RaiseRequestDetailDailogComponent, {
      width: '70%',
      data: formattedData
  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      if(result == 'success'){
        this.getStockRequests();
      }
  });

  }




  ngOnInit() {
    this.getStockRequests();
  }

}
