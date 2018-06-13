import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import { MdDialog } from '@angular/material';
import { MapStockpointComponent } from '../map-stockpoint/map-stockpoint.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import * as _ from 'underscore';

declare var google: any;
 
interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}

@Component({
  selector: 'app-view-stockpoints',
  templateUrl: './view-stockpoints.component.html',
  styleUrls: ['./view-stockpoints.component.css']
})
export class ViewStockpointsComponent implements OnInit {
  lat: number = 17.3850;
  lng: number = 78.4867;
  zoom: number = 12;
 
  markers: any = [
    {
        lat: '',
        lng: '',
    }
]
ploymarkers: marker[] = [];
showMarkers: marker[] = [];
stockpoints:any = [];
noDataError:any="";
addressLat:any = "";
addressLng:any = "";
tabPanelView: string = "mapview";


  constructor(public thisDialogRef: MdDialogRef<MapStockpointComponent>, private mapsAPILoader: MapsAPILoader ,   @Inject(MD_DIALOG_DATA) public Details: any, private authenticationService: AuthenticationService, public dialog: MdDialog,  private distributorService: DistributorServiceService,) { }

  mapClicked($event: any , originalEventArgs , ok) { 
    this.ploymarkers =[];
    // this.getAddress();
     this.ploymarkers.push({
         lat: $event.coords.lat,
         lng: $event.coords.lng
         
         
     });
    
 }


 deleteStockPoint(data){
   let input={"User":{"transtype":"delete","id":data.id}};
   //console.log(input);
   this.distributorService.StockPoint(input)
   .subscribe(
   output => this.deleteStockPointResult(output),
   error => {
       //console.log("falied");
   });
 }
 deleteStockPointResult(result){
  //console.log(result);
  if(result.result == 'success'){

    this.getAllStockPoints();
  }
 }




  getAllStockPoints(){
    let input={"User":{"userid":this.Details.userid,"transtype":"getall","apptype":this.authenticationService.appType()}};
    //console.log(input);
    this.distributorService.StockPoint(input)
    .subscribe(
    output => this.getAllStockPointsResult(output),
    error => {
        //console.log("falied");
    });
   }
   getAllStockPointsResult(result){
     //console.log(result);
     if(result.result == 'success'){
       this.stockpoints=result.data;
       this.noDataError="";
       let stockpointData = {lat:0 , lng:0 , icon:"" , index: 1 };
       let markersData = [];
      //  let marker = [];
       _.each(this.stockpoints , function(i, j){
         let details:any = i;
         stockpointData = {
            lat: parseFloat(details.latitude),
            lng: parseFloat(details.longitude),
            icon:"../assets/images/green.png",
            index : j + 1 
         }
         markersData.push(stockpointData);
       });

       this.showMarkers = markersData
      
     }
     else{
      this.noDataError="No Stock Points for this distributor";
      this.stockpoints = [];
     }

  }


  createStockPoint(Details){
    let dialogRefCoverageDailog = this.dialog.open(MapStockpointComponent, {
      width: '95%',
      data: Details
    });
    dialogRefCoverageDailog.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
      this.getAllStockPoints();
      }
    });

  }


  updateStockPoint(data){
    let dialogRefCoverageDailog = this.dialog.open(MapStockpointComponent, {
      width: '95%',
      data: data
    });
    dialogRefCoverageDailog.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getAllStockPoints();
      }
    });

  }

  onCloseCancel(){
    this.thisDialogRef.close('success');

  }

  showTabPanel(panelName) {
    // this.clearFilter();
    this.tabPanelView = panelName;
    // if(panelName== "mapview"){
    //   // this.showStockpointsOnMap();
    //   this.getAllStockPoints();
    // }
    // else if(panelName== "gridview"){
     
    //   this.getAllStockPoints();
    // } 
  }


  // getMarker(){
  //   this.ploymarkers =[];
  //   this.ploymarkers.push({
  //     lat: parseFloat(this.Details.latitude),
  //     lng: parseFloat(this.Details.longitude)        
  // });   
  
  
  // }

  
  ngOnInit() {
    this.getAllStockPoints();
    //console.log(this.Details);
    
  }

}
