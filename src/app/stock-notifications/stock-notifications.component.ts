import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-stock-notifications',
  templateUrl: './stock-notifications.component.html',
  styleUrls: ['./stock-notifications.component.css']
})
export class StockNotificationsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService , private reportsService: ReportsService ) { }


  allStockRequests:any = [];
  panelView:string = 'all';
  tabPanelView = 'all';


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
      if(this.tabPanelView == 'pending'){
        this.showPendingRequests();
      }
      else if(this.tabPanelView == 'confirmed'){
      this.showConfirmedRequests();

      }
    }
  }

  showTabPanel(panelView){
    if(panelView == 'all'){
      this.tabPanelView = 'all';
      this.getStockRequests();
    }
    else if(panelView == 'pending'){
      this.tabPanelView = 'pending';
      this.getStockRequests();
    }
    else if(panelView == 'confirmed'){
      this.tabPanelView = 'confirmed';
      this.getStockRequests();
      
    }


  }

  showPendingRequests(){
    let pendingRequestsArray = [];
    let pendingRequests = _.each(this.allStockRequests , function( i , j){
      let details:any = i;
      if(details.status == 'reqconfirm' || details.status == 'stockrequested'){
        pendingRequestsArray.push(details);
      }
    });
    this.allStockRequests = pendingRequestsArray;
  }

  showConfirmedRequests(){
    let confirmedRequestsArray = [];
    let confirmedRequests = _.each(this.allStockRequests , function(i , j){
      let details:any  = i;
      if(details.status == 'confirm'){
        confirmedRequestsArray.push(details);
      }
    });
    this.allStockRequests = confirmedRequestsArray;
  }



  viewDetails(){
  //   let dialogRef = this.dialog.open(MapDialogComponent, {
  //     width: '90%',
  //      data: ''
  //  });
  //  dialogRef.afterClosed().subscribe(result => {
  //      //console.log(`Dialog closed: ${result}`);
  //  });
  }

  ngOnInit() {
    this.getStockRequests();
  }

}
