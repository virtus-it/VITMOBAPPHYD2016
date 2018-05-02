import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import { MdDialog } from '@angular/material';
import { MapStockpointComponent } from '../map-stockpoint/map-stockpoint.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';

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
stockpoints:any = [];
noDataError:any="";
addressLat:any = "";
addressLng:any = "";


  constructor(public thisDialogRef: MdDialogRef<MapStockpointComponent>,   @Inject(MD_DIALOG_DATA) public Details: any, private authenticationService: AuthenticationService, public dialog: MdDialog,  private distributorService: DistributorServiceService,) { }

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
     }
     else{
      this.noDataError="No Stock Points for this distributor";
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
  
  ngOnInit() {
    this.getAllStockPoints();
    //console.log(this.Details);
    
  }

}
