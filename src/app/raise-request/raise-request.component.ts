import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.css']
})
export class RaiseRequestComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService , private reportsService: ReportsService) { }


  allStockRequests:any = [];


  getStockRequests(){
    let input = {"root":{"userid": this.authenticationService.loggedInUserId() ,"usertype": this.authenticationService.userType() ,"dealerid": this.authenticationService.superDelearId() ,"pid":"0","lastrecord":"0","viewtype":"allnotification","pagesize":"10","apptype": this.authenticationService.appType()}}
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




  ngOnInit() {
    this.getStockRequests();
  }

}
