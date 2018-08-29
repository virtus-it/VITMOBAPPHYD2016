import { Component, OnInit , Inject} from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import {  AgmCoreModule,  GoogleMapsAPIWrapper,  LatLngLiteral,  MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
declare var google: any;
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';

interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}


@Component({
  selector: 'app-distributor-map-details',
  templateUrl: './distributor-map-details.component.html',
  styleUrls: ['./distributor-map-details.component.css']
})
export class DistributorMapDetailsComponent implements OnInit {

  constructor(public gMaps: GoogleMapsAPIWrapper, public thisDialogRef: MdDialogRef<DistributorMapDetailsComponent> ,  private authenticationService: AuthenticationService,private mapsAPILoader: MapsAPILoader, private distributorService: DistributorServiceService , private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any , private supplierservice: SupplierService) { }

  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;
  stockpoints:any = [];
  markers: any = [
    {
        lat: '',
        lng: '',
    }
]
  showMarkers: marker[] = [];
  ordersMarkers: marker[] = [];
  polygons:any = [];
  tabPanelView:string = "";
  distributorsLastTenOrders:any = [];

  getStockPointsOfDistributors(){
    let input = {"User":{"userid":this.Details.user_id ,"transtype":"getall","apptype": this.authenticationService.appType() , "loginid":this.authenticationService.loggedInUserId()}};
    this.distributorService.StockPoint(input)
    .subscribe(
    output => this.getStockPointsOfDistributorsResult(output),
    error => {
        //console.log("falied");
    });
  }
  getStockPointsOfDistributorsResult(result){
    if(result.result== 'success'){
      this.stockpoints=result.data;
      let stockpointData = {lat:0 , lng:0 , icon:"" , index: 1 };
      let markersData = [];
      _.each(this.stockpoints , function(i, j){
        let details:any = i;
        stockpointData = {
           lat: parseFloat(details.latitude),
           lng: parseFloat(details.longitude),
           icon:"../assets/images/red.png",
           index : j + 1 
        }
        markersData.push(stockpointData);
      });

      this.showMarkers = markersData;
    }
  }

  getPolygonsOfDistributor(){
    let input =  {"area":{"user_type": this.authenticationService.userType(),"user_id": this.Details.user_id,"apptype": this.authenticationService.appType() , "loginid": this.authenticationService.loggedInUserId()}}
    this.distributorService.getpolygonByDistributor(input)
    .subscribe(
      output => this.getPolygonsOfDistributorResult(output),
      error => {
        this.loaderService.display(false);
      });
  }
  getPolygonsOfDistributorResult(result){
    if(result.result == 'success'){
      console.log('success!!');
      this.polygons = [];
      if (result.data && result.data.length > 0) {
        for (let data of result.data) {
          if (data.polygonvalue && data.polygonvalue.length > 0) {
            for (let polygon of data.polygonvalue) {
              polygon.color = '';
              polygon.user_id = data.user_id;
              polygon.distributorName = data.username;
              polygon.supplier = data.suppliers;
              polygon.mobileno = data.mobileno;
              polygon.mobileno1 = data.mobileno1;
              polygon.mobileno2 = data.mobileno2;
              this.polygons.push(polygon);
            }
           }
        }
        console.log(this.polygons);
      }
    }
  }
  
  showTabPanel(panelName){
    if(panelName == 'assigned'){
      this.getDistributorsPendingOrders();
      this.ordersMarkers = [];
    }
    else if(panelName == 'lastTenOrders'){
      this.getDistributorsLastOrders();
    }
  }


  getDistributorsPendingOrders(){
    console.log('working!!');
    this.tabPanelView = 'assigned';
  }

  getDistributorsLastOrders(){
    this.tabPanelView = 'lastTenOrders';
    let input = {"order":{"userid":this.Details.user_id,"priority":"5","usertype": this.authenticationService.userType() ,"status":"all","lastrecordtimestamp":"15","pagesize":"10","supplierid":0,"customerid":0,"apptype": this.authenticationService.appType() ,"lastid":0}}
    this.supplierservice.supplierOrder(input)
        .subscribe(
        output => this.getDistributorsLastOrdersResult(output),
        error => {
          //console.log("error in customer");
          this.loaderService.display(false);
        });
  }
  getDistributorsLastOrdersResult(result){
    if(result.result == 'success'){
      this.distributorsLastTenOrders = result.data;
      let lastTenOrdersData = {lat:0 , lng:0 , icon:"" , index: 1 , orderid:'' , mobileno: '' , customerName : ''};
      let ordersMarkersData = [];
      _.each(this.distributorsLastTenOrders , function(i, j){
        let details:any = i;
        if(details.orderby_latitude && details.orderby_longitude){
        lastTenOrdersData = {
           lat: parseFloat(details.orderby_latitude),
           lng: parseFloat(details.orderby_longitude),
           icon:"../assets/images/orange.png",
           index : j + 1 ,
           orderid: details.order_id,
           mobileno: details.orderby_mobileno ,
           customerName: details.orderby_firstname ,
        }
        ordersMarkersData.push(lastTenOrdersData);
      }
      });

      this.ordersMarkers = ordersMarkersData;
      
    }
    else{
      console.log('no orders');
    }

  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }


  ngOnInit() {
    console.log(this.Details);
    // this.getPolygonDistributors(this.map);
    this.getStockPointsOfDistributors();
    this.getPolygonsOfDistributor();
    this.getDistributorsPendingOrders();

  }

}
