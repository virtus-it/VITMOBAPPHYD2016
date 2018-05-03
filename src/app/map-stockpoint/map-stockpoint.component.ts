import { Component, OnInit, Inject  } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { } from '@types/googlemaps';


declare var google: any; 
interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
}
@Component({
  selector: 'app-map-stockpoint',
  templateUrl: './map-stockpoint.component.html',
  styleUrls: ['./map-stockpoint.component.css']
})
export class MapStockpointComponent implements OnInit {
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
address:any = "";
message:any="";
stockPointAddress: any = "";
buttonValue:any= "";
addressLat:any = "";
addressLng:any = "";
latitiude:any ="";
longitude:any = "";

  constructor(public thisDialogRef: MdDialogRef<MapStockpointComponent>, private distributorService: DistributorServiceService, private mapsAPILoader: MapsAPILoader, private authenticationService: AuthenticationService,  @Inject(MD_DIALOG_DATA) public Details: any, ) {
   }

  mapClicked($event: any ) { 
    this.ploymarkers =[];
    
   
    
     this.ploymarkers.push({
         lat: $event.coords.lat,
         lng: $event.coords.lng        
     }); 
     this.getGeoLocation();
     
 }



 

//  getAddress(){
//    var address = new google.maps.LatLng(this.ploymarkers[0].lat , this.ploymarkers[0].lng);
//   //  var myOptions = {
//   //    zoom:12,
//   //    center: address
//   //  }
//   //  var map = 
//   var geocoder = new google.maps.Geocoder();
//   var map = 

//   google.maps.event.addListener( $eve {
//   geocoder.geocode({
//     'latLng': event.latLng
//   }, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[0]) {
//         alert(results[0].formatted_address);
//       }
//     }
//   });
// });
//  }


public getGeoLocation(){
  if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(position=> {
        this.latitiude = this.ploymarkers[0].lat;
        this.longitude = this.ploymarkers[0].lng;
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.latitiude, this.longitude);
        let request = {
          latLng: latlng
        };   

        geocoder.geocode(request, (results, status) => {      

          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
             this.stockPointAddress = results[0].formatted_address;                      


            } 
            
            else {
              alert("No address available");
            }
          }
});

      }, error => {
        console.log(error);
      }, options);
  }
}


// myLocation(){
//   var lati = "17.3761668";
//   var longi = "78.40496280000002";
// }



  createAndUpdate(){
    if(this.validate()){
    let input= {};
    if(this.Details.id){
      input={"User":{"transtype":"update","id":this.Details.id, "latitude":this.ploymarkers[0].lat,"longitude":this.ploymarkers[0].lng,"userid":this.Details.user_id,"apptype":this.authenticationService.appType() , "address": this.stockPointAddress}};
    }
    else{
      input={"User":{"transtype":"create","address":this.stockPointAddress,"latitude":this.ploymarkers[0].lat,"longitude":this.ploymarkers[0].lng,"userid":this.Details.userid,"apptype":this.authenticationService.appType()}};
    }
    console.log(input);
    this.distributorService.StockPoint(input)
    .subscribe(
    output => this.createAndUpdateStockPointResult(output),
    error => {
    //console.log("falied");
    });
  }
}
  createAndUpdateStockPointResult(result){
    //console.log(result);
      if(result.result == 'success'){
         this.thisDialogRef.close('success');
   }
  }

  getAdd
  
  onCloseCancel(){
    this.thisDialogRef.close('cancel');
  }

  validate(){
    if(this.ploymarkers && this.ploymarkers.length > 0 ){
      
      this.message="";
      return true;

    }
    else{
      this.message="Please select stock point";
      return false;
    }
  }

  button(){
    if(this.Details.id){
      this.buttonValue = "UPDATE STOCK POINT";
    }
    else{
      this.buttonValue = "CREATE STOCK POINT";
    }

  }


  getMarker(){
    this.ploymarkers =[];
    this.ploymarkers.push({
      lat: parseFloat(this.Details.latitude),
      lng: parseFloat(this.Details.longitude)        
  });   
  
  
  }



  getMyLocation(){
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            this.latitiude = "17.391636";
            this.longitude = "78.440065";
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };



    
  }

  ngOnInit() {
    //console.log(this.Details);
    if(this.Details.id){
      this.getMarker();
      this.getMyLocation();
    }
    this.button();


  
   
}
}




// getLatLan(address: string) {
//   //console.log('Getting Address - ', address);
//   let geocoder = new google.maps.Geocoder();
//   return Observable.create(observer => {
//       geocoder.geocode( { 'address': address}, function(results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//               observer.next(results[0].geometry.location);
//               observer.complete();
//           } else {
//               //console.log('Error - ', results, ' & Status - ', status);
//               observer.next({});
//               observer.complete();
//           }
//       });
//   })
// }


// getAddress(){
//   this.mapsAPILoader.load().then(() => {
//     //console.log('google script loaded');
//     var geocoder = new google.maps.Geocoder();
//     this.Address=geocoder;
//   });
// }


  //this.getLatLan(this.address);
    // this.newMapFunction(this.geocoder, this.map, this.infowindow);


      // getAllStockPoints(){
  //   let input={"User":{"userid":this.Details.userid,"transtype":"getall","apptype":this.authenticationService.appType()}};
  //   //console.log(input);
  //   // this.distributorService.StockPoint(input)
  //   // .subscribe(
  //   // output => this.getAllStockPointsResult(output),
  //   // error => {
  //   //     //console.log("falied");
  //   // });
  //  }
  //  getAllStockPointsResult(result){
  //    //console.log(result);
  //    if(result.result == 'success'){
 
  //    }

  // }

  // positionAddress(){
  //   this.Address= new google.maps.Geocoder(this.ploymarkers[0].lat,this.ploymarkers[0].lng);
  // //   var geocoder = new google.maps.Geocoder;
  // // var infowindow = new google.maps.InfoWindow;
  // }

//   newMapFunction(geocoder, map, infowindow){
//     var latlng = {lat: this.latitude, lng:this.longitude};
//     geocoder.geocode({'location': latlng}, function(results, status){
//       if (results[0]) {
//         map.setZoom(11);
//         var marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//         });
//     }
//     });
// }





// getLatLan(address: string) {
//   //console.log('Getting Address - ', address);
//   let geocoder = new google.maps.Geocoder();
//   return Observable.create(observer => {
//       geocoder.geocode( { 'address': address}, function(results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//               observer.next(results[0].geometry.location);
//               observer.complete();
//           } else {
//               //console.log('Error - ', results, ' & Status - ', status);
//               observer.next({});
//               observer.complete();
//           }
//       });
//   })
// }