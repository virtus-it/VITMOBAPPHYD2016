import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import {AgmCoreModule,GoogleMapsAPIWrapper,LatLngLiteral,MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-track-supplier',
  templateUrl: './track-supplier.component.html',
  styleUrls: ['./track-supplier.component.css']
})
export class TrackSupplierComponent implements OnInit {
  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;

  constructor( public gMaps: GoogleMapsAPIWrapper, public thisDialogRef: MdDialogRef<TrackSupplierComponent> , private mapsAPILoader: MapsAPILoader ,  private authenticationService: AuthenticationService,  @Inject(MD_DIALOG_DATA) public Details: any , private supplierservice: SupplierService) { }

  latlng:any = [];

  trackSuppliersLocation(){
    let input = {"User":{"supplierid": this.Details.userid  ,"usertype": this.authenticationService.userType() ,"loginid": this.authenticationService.loggedInUserId() , "apptype": this.authenticationService.appType() }};
    console.log(input);
    this.supplierservice.trackSupplier(input)
      .subscribe(
      output => this.trackSuppliersLocationResult(output),
      error => {
        //console.log("error in supplier order list");
      });
  }
  trackSuppliersLocationResult(result){
    if(result.result == 'success'){
      console.log(result.data, 'Result');
    }
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
    
  }

  ngOnInit() {
    console.log(this.Details);
    this.trackSuppliersLocation();
    // this.latlng = [{latitude: 17.385044,longitude: 78.486671},{latitude: 17.383542,longitude: 78.471527}, {latitude: 17.372975 ,longitude: 78.460584 }];
  }

}
