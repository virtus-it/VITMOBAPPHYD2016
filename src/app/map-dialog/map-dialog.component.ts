import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  NgModule,
  NgZone,
  ViewChild
} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import {
  AgmCoreModule,
  GoogleMapsAPIWrapper,
  LatLngLiteral,
  MapsAPILoader
} from '@agm/core';
declare var google: any;
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';

interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {
  map: any;
  marker: any = [];
  public searchControl: FormControl;
  selectedShape: any;
  @ViewChild('search') public searchElementRef: ElementRef;
  polygonArray: any = {
    path: []
  };
  // stockPointLocationData: marker[] = [];
  stockpointsLocationArray1 = [];
  stockpointArray: any = [];
  // polygonexists: boolean = false;

  // stockpoints: any = [];
  constructor(
    public thisDialogRef: MdDialogRef<MapDialogComponent>,
    @Inject(MD_DIALOG_DATA) public distributorDetails: any,
    public gMaps: GoogleMapsAPIWrapper,
    private loader: MapsAPILoader,
    private distributorService: DistributorServiceService,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    private ngZone: NgZone
  ) {}
  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 17.34932757, lng: 78.48117828 },
      zoom: 12,
      disableDoubleClickZoom: false,
      // only show roadmap type of map, and disable ability to switch to other type
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    });
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      {
        types: ['address']
      }
    );
    this.map.data.setControls(['Polygon']);
    this.map.data.setStyle({
      editable: true,
      draggable: true
    });
    //this.map.data.add({ geometry: new google.maps.Data.Polygon([triangleCoords]) })

    google.maps.event.addListener(this.map.data, 'dblclick', function(event) {
      //console.log("dblclick");
      // event.setMap(null);
      this.map.data.remove(event.feature);
    });



    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.map.setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        //set latitude, longitude and zoom
        this.map.setZoom(15);
      });
    });
    this.getPolygonDistributors(this.map.data);
    this.bindDataLayerListeners(this.map.data);
    // this.getAllStockPoints();
    // this.showStockpoints();

    // this.showStockPoint(this.stockpointArray);

    //load saved data
    //loadPolygons(map);
  }

  getAllStockPoints() {
    let input = {
      User: {
        userid: this.distributorDetails.userid,
        transtype: 'getall',
        apptype: this.authenticationService.appType()
      }
    };
    //console.log(input);
    this.distributorService.StockPoint(input).subscribe(
      output => this.getAllStockPointsResult(output),
      error => {
        //console.log("falied");
      }
    );
  }
  getAllStockPointsResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      // this.stockpoints = result.data;
      // this.showStockPoint(this.stockpoints);

      if (result.data && result.data[0].latitude && result.data.length > 0) {
         let stockpointsLocationArray = [];
        _.each(result.data, function(i, j) {
          let details: any = i;
          if (details.latitude !== null && details.longitude !== null) {
            let distData = {
              lat: 0,
              lng: 0,
              icon: ''
            };
            if (details.latitude && details.longitude) {
              distData.lat = parseFloat(details.latitude);
              distData.lng = parseFloat(details.longitude);
              distData.icon = '../assets/images/green.png';
  
              if (distData.lat != 0) {
                stockpointsLocationArray.push(distData);
              }
            }
          }
        });

        this.stockpointsLocationArray1 = stockpointsLocationArray;
      }


      // this.loader.load().then(() => {
      //   this.initMap();
      // });
    }

    this.loader.load().then(() => {
      this.initMap();
    });

  //   else{

  //   this.loader.load().then(() => { // calling this in else coz if there are no polygons or stockpoints search is not happening
  //     this.initMap();
  //   });

  // }

  }

  showMarkers() {
    for (let location of this.stockpointsLocationArray1) {
      let latLng = {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      };

      // Set the position and title
      this.marker = new google.maps.Marker({
        position: latLng
      });

      // place marker in map
      this.marker.setMap(this.map);

      // Add circle overlay and bind to marker
      var circle = new google.maps.Circle({
        map: this.map,
        radius: 500, // 10 miles in metres
        fillColor: '#AA0000'
      });
      circle.bindTo('center', this.marker, 'position');
    }
  }

  

  getPolygonDistributors(dataLayer) {
    this.loaderService.display(true);
    let distDetails = this.distributorDetails;
    var input = {
      area: {
        user_type: 'dealer',
        user_id: distDetails.userid,
        apptype: this.authenticationService.appType()
      }
    };
    this.distributorService.getpolygonByDistributor(input).subscribe(
      output => this.getPolygonDataResult(output, dataLayer),
      error => {
        this.loaderService.display(false);
      }
    );
  }
  getPolygonDataResult(output, dataLayer) {
    this.loaderService.display(false);
    //console.log(output);
    //9863636315
    //paani
    if (output.data && output.data.length > 0) {
      if (output.data[0].polygonvalue.length > 0) {
        // this.polygonexists = true;
        // this.newFunction();
      }
      for (let data of output.data) {
        //console.log(data.polygonvalue[0].path);
        if (data.polygonvalue && data.polygonvalue.length > 0) {
          for (let polygon of data.polygonvalue) {
            dataLayer.add({
              geometry: new google.maps.Data.Polygon([polygon.path])
            });
          }
        }
      }
    } 
    else {
      // this.polygonexists = false;
      this.showMarkers();
    }
  }
  bindDataLayerListeners(dataLayer) {
    dataLayer.addListener('addfeature', this.savePolygon);
    dataLayer.addListener('removefeature', this.savePolygon);
    dataLayer.addListener('setgeometry', this.savePolygon);
  }

  // newFunction() {
  //   if (this.polygonexists == false) {
      
  //   }
  // }

  savePolygon() {
    this.map.data.toGeoJson(function(json) {
      //console.log(json.features);
      localStorage.setItem('geoData', JSON.stringify(json));
    });
  }
  saveData(distributorDetails) {
    if (distributorDetails.type == 'assignFromOrders') {
      var input: any = {
        area: {
          user_type: 'dealer',
          user_id: distributorDetails.data.distId,
          polygonvalue: []
        }
      };
    } else {
      var input: any = {
        area: {
          user_type: 'dealer',
          user_id: distributorDetails.userid,
          polygonvalue: []
        }
      };
    }
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
      input.area.polygonvalue.push(polygon);
      //console.log(input);
      this.polygonArray.path = [];
    }
    localStorage.setItem('geoData', '');
    this.distributorService.createPolygonDistributors(input).subscribe(
      output => this.saveDataResult(output),
      error => {
        //console.log("Logged in falied");
        this.loaderService.display(false);
      }
    );
  }
  saveDataResult(data) {
    this.loaderService.display(false);
    if (data.result == 'success') {
      this.thisDialogRef.close('Ploygon created');
    }
  }

  ngOnInit() {
    this.getAllStockPoints();
    console.log(this.distributorDetails);
    // this.loader.load().then(() => {
    //   this.initMap();
    // });
    this.searchControl = new FormControl();
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
