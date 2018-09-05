import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';


@Component({
  selector: 'app-stock-notifications',
  templateUrl: './stock-notifications.component.html',
  styleUrls: ['./stock-notifications.component.css']
})
export class StockNotificationsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService , private reportsService: ReportsService ) { }


  allStockRequests:any = [];
  panelView:string = 'all';


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

  showTabPanel(panelView){
    if(panelView == 'all'){
      this.getStockRequests();
    }

  }

  ngOnInit() {
    this.getStockRequests();
  }

}
