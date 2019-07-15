import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { SupplierService } from '../supplier/supplier.service';
import { AuthenticationService } from '../login/authentication.service';

import * as _ from 'underscore';
import * as moment from 'moment';
declare var google: any;
interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}
@Component({
  selector: 'app-salestracking',
  templateUrl: './salestracking.component.html',
  styleUrls: ['./salestracking.component.css']
})
export class SalestrackingComponent implements OnInit {
  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 10;
 
  public renderOptions = {
    suppressMarkers: true,
     }
  //    public markerOptions = {
  //     origin: {
  //         icon: 'https://i.imgur.com/7teZKif.png',
  //          infoWindow: `
  //         <a  target='_blank'>hi</a>
  //         `
  //     },
  //     destination: {
  //         icon: 'https://i.imgur.com/7teZKif.png',
  //         infoWindow: `
  //         <a target='_blank'>hi</a>
  //         `
  //     },
  // };
  constructor(public gMaps: GoogleMapsAPIWrapper, private router: Router, private supplierservice: SupplierService, private authenticationService: AuthenticationService) { }
  mapData:any=[];
  userInputs = { userid: "", date: null };
  getLatLong = [];  //array to store the latlongs of persons
  salesPersonsList = []; //array to store the salespersons list
  //  mapRoute={
  //    origin:{lat:17.394608, long:-281.560704},
  //    destination:{lat:17.395760,long:-281.568141}

  //   } ;
  mapClicked($event) {

  }
  getUsersLatLong() { //to get the users latlong details
    var date = moment(this.userInputs.date).format('YYYY-MM-DD'); //changing the date format as per the given input
    date = date + " 00:00:00";
    var input = { "root": { "transtype": "getsalespersontracking", "userid": this.userInputs.userid, "fromdate": date } };
    console.log(input);
    this.supplierservice.getSalesPerson(input)
      .subscribe(
        output => this.getUsersLatLongResult(output),
        error => {
          console.log("falied");
        }
      );

  }
  getUsersLatLongResult(data) { //result of users latlong
    console.log(data);
    if (data.result == "success") {  //if the condition satisfy then execute next
      let i = 0;

      if (data.data && data.data.length > 0) {  //if the output is greater than zero then execute for each
     data.data=_.sortBy(data.data, function(o:any) { return o.createddate; });
this.mapData=data.data;
        for (i = 0; i < data.data.length; i++) {

          var detailsData = {
            origin: { lat: 0, lng: 0},
            destination: { lat: 0, lng: 0},
            originDate:"",destinationDate:""
          };
        //  var markerOptions = {
        //     origin: {
        //         icon: '../assets/images/red.png',
        //          infoWindow: `
        //         <a  target='_blank'>hi</a>
        //         `
        //     },
        //     destination: {
        //         icon: '../assets/images/red.png',
        //         infoWindow: `
        //         <a target='_blank'>hi</a>
        //         `
        //     },
        // }; 
        let localTime = moment.utc(data.data[i].createddate).toDate();  //converting the UTC time to local time
        this.mapData[i].createddate= moment(localTime).format(
          'DD-MM-YYYY hh:mm A');
          this.mapData[i].latitude= parseFloat(data.data[i].latitude); //converting the sting to decimal using parseFloat
          this.mapData[i].longitude = parseFloat(data.data[i].longitude);
          //;
          let Details =  JSON.parse(JSON.stringify(detailsData)); //deep copying the objects
          if (data.data.length-1 != i) {
            Details.origin.lat = parseFloat(data.data[i].latitude); //converting the sting to decimal using parseFloat
            Details.origin.lng = parseFloat(data.data[i].longitude);
           
              Details.destination.lat = parseFloat(data.data[i + 1].latitude);
              Details.destination.lng = parseFloat(data.data[i + 1].longitude);
            // let destinationTime = moment.utc(data.data[i + 1].createddate).toDate();
            // Details.destinationDate= moment(destinationTime).format(
            //   'DD-MM-YYYY hh:mm A');

         //   let Details =  JSON.parse(JSON.stringify(detailsData));
            this.getLatLong.push(Details);   // pushing the Details data into getlanglong arrray
          }
        }
        console.log(this.mapData);
       
      }
    }
  }
  getSalesPerson() {  // to get the salespersons list
    var input = { "root": { "transtype": "getsalespersons", "loginid": this.authenticationService.loggedInUserId(), apptype: "moya" } }
    this.supplierservice.getSalesPerson(input)
      .subscribe(
        output => this.getSalesPersonResult(output),
        error => {
          console.log("falied");
        }
      );
  }
  getSalesPersonResult(data) {  //result of the salespersons list
    console.log(data);
    if (data.result == "success") {   //if the condition satisfy
      this.salesPersonsList = data.data; // store the data into salespersonslist array
    }
  }
  liveData(){
    var date = moment(new Date()).format('YYYY-MM-DD'); 
    date = date + " 00:00:00";
    var input = { "root": { "transtype": "getlivetracking", "userid": this.userInputs.userid, "fromdate": date } };

    this.supplierservice.getSalesPerson(input)
      .subscribe(
        output => this.getUsersLatLongResult(output),
        error => {
          console.log("falied");
        }
      );
  }
  
   onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
   }

   onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
   }

  ngOnInit() {

    this.getSalesPerson();  // load the function getsalesperson initially
  }

}
