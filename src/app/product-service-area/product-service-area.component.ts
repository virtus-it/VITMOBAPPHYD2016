import { Component, OnInit, Inject,ElementRef, NgModule, NgZone,ViewChild  } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
declare var google: any;
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';


@Component({
  selector: 'app-product-service-area',
  templateUrl: './product-service-area.component.html',
  styleUrls: ['./product-service-area.component.css']
})
export class ProductServiceAreaComponent implements OnInit {

  map: any;
  public searchControl: FormControl;
  selectedShape: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  polygonArray: any = {
      path: []
  }


  constructor(private ngZone: NgZone , public thisDialogRef: MdDialogRef<ProductServiceAreaComponent> , private loader: MapsAPILoader, private loaderService: LoaderService , @Inject(MD_DIALOG_DATA) public Details: any,  private authenticationService: AuthenticationService ,  public gMaps: GoogleMapsAPIWrapper  , private productService: ProductsService ) { }

  initMap() {
        
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 17.34932757, lng: 78.48117828 },
        zoom: 11,
        disableDoubleClickZoom: true,
        // only show roadmap type of map, and disable ability to switch to other type
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
    });

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });

  this.map.data.setControls(['Polygon']);
  this.map.data.setStyle({
      editable: true,
      draggable: true
  });

    google.maps.event.addListener(this.map.data, "dblclick", function (event) {
      //console.log("dblclick");
      // event.setMap(null);
      this.map.data.remove(event.feature);
  });
  
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.map.setCenter({
          lat : place.geometry.location.lat(),
          lng : place.geometry.location.lng()
      });
        //set latitude, longitude and zoom
       this.map.setZoom(15);
      });
    });
    this.bindDataLayerListeners(this.map.data);
    this.getPolygonProducts(this.map.data);

    

  }

  bindDataLayerListeners(dataLayer) {
    dataLayer.addListener('addfeature', this.savePolygon);
    dataLayer.addListener('removefeature', this.savePolygon);
    dataLayer.addListener('setgeometry', this.savePolygon);

}





savePolygon() {


  this.map.data.toGeoJson(function (json) {
      //console.log(json.features);
      localStorage.setItem('geoData', JSON.stringify(json));

  });

}



createServiceArea(){
  var input = {"product" : {userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"createserviceareas" , "pid":this.Details.productid , serviceareas : []}};
  var data = JSON.parse(localStorage.getItem('geoData'));
  for (let feature of data.features) {

    var coordinates = feature.geometry.coordinates;
    for (let coord of coordinates) {
        coord.forEach((item, index) => {

            if (coord.length - 1 != index) {
                //var path = { lat: item[1], lng: item[0] };
                var path = { lat: item[1], lng: item[0] };
                this.polygonArray.path.push(path);
            }

        });

    }
    let polygon = Object.assign({}, this.polygonArray);
    input.product.serviceareas.push(polygon);
    //console.log(input);
    this.polygonArray.path = [];
}
localStorage.setItem('geoData', '');
this.productService.createProduct(input)
    .subscribe(
    output => this.createServiceAreaResult(output),
    error => {
        //console.log("Logged in falied");
        this.loaderService.display(false);
    });



}
createServiceAreaResult(data){
  this.loaderService.display(false);
  if (data.result == 'success') {
      this.thisDialogRef.close('Ploygon created');
  }
}





getPolygonProducts(dataLayer) {
  this.loaderService.display(true);
  let productDetails = this.Details;
  var input = {"product" : {userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "transtype":"getserviceareas" , "pid":this.Details.productid  }}
  this.productService.createProduct(input)
      .subscribe(
      output => this.getPolygonProductsResult(output, dataLayer),
      error => {
          //console.log("Logged in falied");
          this.loaderService.display(false);
      });
}
getPolygonProductsResult(output, dataLayer) {
  this.loaderService.display(false);
  if (output.data && output.data.message &&  output.data.message.length > 0) {

      for (let data of output.data.message) {
          if (data.serviceareas && data.serviceareas.length > 0) {
              for (let servicearea of data.serviceareas) {
                  dataLayer.add({ geometry: new google.maps.Data.Polygon([servicearea.path]) })
              }
          }

      }
  }
}



  

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
}

  ngOnInit() {
  
    this.loader.load().then(() => {
      this.initMap();
  });
  this.searchControl = new FormControl();
  console.log(this.Details);
  }

}











// import { Component, OnInit, Inject,ElementRef, NgModule, NgZone,ViewChild  } from '@angular/core';
// import { MD_DIALOG_DATA } from '@angular/material';
// import { MdDialogRef } from '@angular/material';
// import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { DistributorServiceService } from '../distributor/distributor-service.service';
// import { AuthenticationService } from '../login/authentication.service';
// import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
// declare var google: any;
// import { LoaderService } from '../login/loader.service';
// @Component({
//     selector: 'app-map-dialog',
//     templateUrl: './map-dialog.component.html',
//     styleUrls: ['./map-dialog.component.css']
// })
// export class MapDialogComponent implements OnInit {
//     map: any;
//     public searchControl: FormControl;
//     selectedShape: any;
//     @ViewChild("search")
//     public searchElementRef: ElementRef;
//     polygonArray: any = {
//         path: []
//     }
//     constructor(public thisDialogRef: MdDialogRef<MapDialogComponent>, @Inject(MD_DIALOG_DATA) public distributorDetails: any, public gMaps: GoogleMapsAPIWrapper, private loader: MapsAPILoader, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService, private ngZone: NgZone) { }
//     initMap() {
        
//         this.map = new google.maps.Map(document.getElementById('map'), {
//             center: { lat: 17.34932757, lng: 78.48117828 },
//             zoom: 11,
//             disableDoubleClickZoom: true,
//             // only show roadmap type of map, and disable ability to switch to other type
//             // mapTypeId: google.maps.MapTypeId.ROADMAP,
//             mapTypeControl: false,

//         });
//         let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
//             types: ["address"]
//           });
//         this.map.data.setControls(['Polygon']);
//         this.map.data.setStyle({
//             editable: true,
//             draggable: true
//         });
//         //this.map.data.add({ geometry: new google.maps.Data.Polygon([triangleCoords]) })

//         google.maps.event.addListener(this.map.data, "dblclick", function (event) {
//             //console.log("dblclick");
//             // event.setMap(null);
//             this.map.data.remove(event.feature);
//         });
        
//           autocomplete.addListener("place_changed", () => {
//             this.ngZone.run(() => {
//               //get the place result
//               let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      
//               //verify result
//               if (place.geometry === undefined || place.geometry === null) {
//                 return;
//               }
//               this.map.setCenter({
//                 lat : place.geometry.location.lat(),
//                 lng : place.geometry.location.lng()
//             });
//               //set latitude, longitude and zoom
//              this.map.setZoom(15);
//             });
//           });
//         this.getPolygonDistributors(this.map.data);
//         this.bindDataLayerListeners(this.map.data);

//         //load saved data
//         //loadPolygons(map);
//     }

//     getPolygonDistributors(dataLayer) {
//         this.loaderService.display(true);
//         let distDetails = this.distributorDetails;
//         var input = { area: { user_type: "dealer", user_id: distDetails.userid, "apptype": this.authenticationService.appType() } };
//         this.distributorService.getpolygonByDistributor(input)
//             .subscribe(
//             output => this.getPolygonDataResult(output, dataLayer),
//             error => {
//                 //console.log("Logged in falied");
//                 this.loaderService.display(false);
//             });
//     }
//     getPolygonDataResult(output, dataLayer) {
//         this.loaderService.display(false);
//         //console.log(output);
//         //9863636315
//         //paani
//         if (output.data && output.data.length > 0) {
//             for (let data of output.data) {
//                 //console.log(data.polygonvalue[0].path);
//                 if (data.polygonvalue && data.polygonvalue.length > 0) {
//                     for (let polygon of data.polygonvalue) {
//                         dataLayer.add({ geometry: new google.maps.Data.Polygon([polygon.path]) })
//                     }
//                 }

//             }
//         }
//     }
//     bindDataLayerListeners(dataLayer) {
//         dataLayer.addListener('addfeature', this.savePolygon);
//         dataLayer.addListener('removefeature', this.savePolygon);
//         dataLayer.addListener('setgeometry', this.savePolygon);

//     }

//     savePolygon() {


//         this.map.data.toGeoJson(function (json) {
//             //console.log(json.features);
//             localStorage.setItem('geoData', JSON.stringify(json));

//         });

//     }
//     saveData(distributorDetails) {
//         if(distributorDetails.type == 'assignFromOrders'){
//         var input:any ={ area: { user_type: "dealer", user_id: distributorDetails.data.distId, polygonvalue: [] } }
//         }
//         else{
//         var input:any = { area: { user_type: "dealer", user_id: distributorDetails.userid, polygonvalue: [] } }
//         }
//         var data = JSON.parse(localStorage.getItem('geoData'));
//         for (let feature of data.features) {

//             var coordinates = feature.geometry.coordinates;
//             for (let coord of coordinates) {
//                 coord.forEach((item, index) => {

//                     if (coord.length - 1 != index) {
//                         //var path = { lat: item[1], lng: item[0] };
//                         var path = { lat: item[1], lng: item[0] };
//                         this.polygonArray.path.push(path);
//                     }

//                 });

//             }
//             let polygon = Object.assign({}, this.polygonArray);
//             input.area.polygonvalue.push(polygon);
//             //console.log(input);
//             this.polygonArray.path = [];
//         }
//         localStorage.setItem('geoData', '');
//         this.distributorService.createPolygonDistributors(input)
//             .subscribe(
//             output => this.saveDataResult(output),
//             error => {
//                 //console.log("Logged in falied");
//                 this.loaderService.display(false);
//             });
//     }
//     saveDataResult(data) {
//         this.loaderService.display(false);
//         if (data.result == 'success') {
//             this.thisDialogRef.close('Ploygon created');
//         }
//     }


//     // assignFromOrders(){
//     //     if(){

//     //     }

//     // }
   
//     ngOnInit() {
//         console.log(this.distributorDetails);
//         this.loader.load().then(() => {
//             this.initMap();
//         });
//         this.searchControl = new FormControl();
//     }
//     onCloseConfirm() {
//         this.thisDialogRef.close('Confirm');
//     }
//     onCloseCancel() {
//         this.thisDialogRef.close('Cancel');
//     }
// }