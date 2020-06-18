import { Component, OnInit,Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
//import { } from '@types/googlemaps';
import * as _ from 'underscore';

interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}

@Component({
  selector: 'app-customermapview',
  templateUrl: './customermapview.component.html',
  styleUrls: ['./customermapview.component.css']
})
export class CustomermapviewComponent implements OnInit {

  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;

  constructor(public thisDialogRef: MdDialogRef<CustomermapviewComponent>, private mapsAPILoader: MapsAPILoader ,   @Inject(MD_DIALOG_DATA) public Details: any, private authenticationService: AuthenticationService, public dialog: MdDialog,) { }


  // clickOnProductPolygon(event, polygon) {

  //   this.listOfDistributors = [];
  //   let polygonCategory = polygon.category_id;
  //   let myLatLng = event.latLng;
  //   this.lat = myLatLng.lat();
  //   this.lng = myLatLng.lng();
  //   this.distributors = [];
  //   for (let dist of this.distributorProdDetails) {
  //     if (dist.categoryid == polygonCategory) {
  //       if (dist.distributorproductdetails) {
  //         for (let distDetails of dist.distributorproductdetails) {
  //           this.distributors.push(distDetails);
  //         }
  //       }
  //     }
  //    }
  // }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
