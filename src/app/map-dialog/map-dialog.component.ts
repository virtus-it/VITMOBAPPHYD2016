import { Component, OnInit, Inject  } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {
    map: any;
    polygonArray: any = {
       path: []
    }
    constructor(public thisDialogRef: MdDialogRef<MapDialogComponent>, @Inject(MD_DIALOG_DATA) public distributorDetails: string,public gMaps: GoogleMapsAPIWrapper, private loader: MapsAPILoader) { }
    initMap() {
       
        var triangleCoords = [
            { lat: 25.774, lng: -80.190 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 }
           
        ];
        var triangleCoords2 = [
            { lat: 45.774, lng: -80.190 },
            { lat: 12.466, lng: -66.118 },
            { lat: 75.321, lng: -64.757 }
           ];
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 17.4471, lng: 78.454 },
            zoom: 10,
            // only show roadmap type of map, and disable ability to switch to other type
            // mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,

        });

        this.map.data.setControls(['Polygon']);
        this.map.data.setStyle({
            editable: true,
            draggable: true
        });
        this.map.data.add({ geometry: new google.maps.Data.Polygon([triangleCoords]) })
        this.map.data.add({ geometry: new google.maps.Data.Polygon([triangleCoords2]) })
        this.bindDataLayerListeners(this.map.data);

        //load saved data
        //loadPolygons(map);
    }
    bindDataLayerListeners(dataLayer) {
        dataLayer.addListener('addfeature', this.savePolygon);
        dataLayer.addListener('removefeature', this.savePolygon);
        dataLayer.addListener('setgeometry', this.savePolygon);
    }
    savePolygon() {
        this.map.data.toGeoJson(function (json) {
            console.log(json.features);
            localStorage.setItem('geoData', JSON.stringify(json));

        });
    }
    saveData(distributorDetails) {
        var input = { area: { user_type: "dealer", user_id: distributorDetails.userid, polygonvalue: [] } }
        var data = JSON.parse(localStorage.getItem('geoData'));
    for (let feature of data.features) {

            var coordinates = feature.geometry.coordinates;
            for (let coord of coordinates) {
                coord.forEach((item, index) => {
                    
                    if (coord.length - 1 != index) {
                        var path = { lat: item[1], lng: item[0] };
                        this.polygonArray.path.push(path);
                    }
                    
                });

            }
            let polygon = Object.assign({}, this.polygonArray);
        input.area.polygonvalue.push(polygon);
            console.log(input);
          this.polygonArray.path = [];
         }
    localStorage.setItem('geoData', '');
    }
    ngOnInit() {
        this.loader.load().then(() => {
            this.initMap();
        });
  }
  onCloseConfirm() {
      this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
      this.thisDialogRef.close('Cancel');
  }
}
