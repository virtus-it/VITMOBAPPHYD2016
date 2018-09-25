import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import * as _ from 'underscore';
import {AgmCoreModule,GoogleMapsAPIWrapper,LatLngLiteral,MapsAPILoader} from '@agm/core';
import { MdDialog } from '@angular/material';
import {RaiseRequestDetailDailogComponent } from '../raise-request-detail-dailog/raise-request-detail-dailog.component';
declare var google: any;

interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}


@Component({
  selector: 'app-stock-notifications',
  templateUrl: './stock-notifications.component.html',
  styleUrls: ['./stock-notifications.component.css']
})
export class StockNotificationsComponent implements OnInit {
  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;

  constructor(private authenticationService: AuthenticationService , private reportsService: ReportsService, public gMaps: GoogleMapsAPIWrapper, public dialog: MdDialog  ) { }


  allStockRequests:any = [];
  panelView:string = 'all';
  tabPanelView = 'all';
  pageView = 'grid';
  markers: any = [
    {
      lat: '',
      lng: ''
    }
  ];
  stockPointMarkers :any = [];


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
      else if(this.tabPanelView == 'all'){
      this.getPointsOnMap();
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
    this.getPointsOnMap();
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
    this.getPointsOnMap();
  }

  showPanelType(pageType){
    if(pageType == 'grid'){
      this.pageView = 'grid';
    }
    else{
      this.pageView = 'map';
      this.getStockRequests();

    }

  }

  getPointsOnMap(){
    let stockPoints = [];
    let stockPointsOnMap = _.each(this.allStockRequests , function(i , j){
      let markerArray = {lat: 0 , lng: 0 , icon: '' , label : 'stockpoint' , userid : '' , name: '' , mobileno : ''}
      let details:any = i;
      if(details.stockpoint_details){
        if(details.stockpoint_details.latitude && details.stockpoint_details.longitude){
        markerArray.lat = parseFloat(details.stockpoint_details.latitude);
        markerArray.lng = parseFloat(details.stockpoint_details.longitude);
        markerArray.userid = details.stockpoint_details.userid;
        markerArray.name = details.distributor.firstname + ' ' + details.distributor.lastname;
        markerArray.mobileno = details.distributor.mobileno;
        }
        stockPoints.push(markerArray);
      }
    });

     this.stockPointMarkers = stockPoints;

    console.log(stockPoints , 'stockPoints');


  }


  viewDetails(data){
    let formattedData = {type : 'acceptRequestFromDealer' , data : data}
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
