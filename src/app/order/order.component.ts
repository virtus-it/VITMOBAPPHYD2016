import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';

interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}
declare const google: any;
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    lat: number = 17.3850;
    lng: number = 78.4867;
    lat1: number = 24.886;
    lng1: number = -70.269; 
    zoom: number = 12;
    selectedDist: any = "0";
    selectedDistView: any = "0";
    DistributorArray: any = {
        distibutorname: "",
        area: []
    }
    ploymarkers: marker[] = [];
    polygonArray: any = {
        name: "",
        path: []
    }
    constructor(public gMaps: GoogleMapsAPIWrapper) { 

        
    }
    
      
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }
    viewAllDistPolygon(){
        this.distPolygon = this.allDistibutors;
    }
    customerMapClicked(event: any){
var latlng = new google.maps.LatLng(event.coords.lat, event.coords.lat);
var triangleCoords = [
    {lat: 25.774, lng: -80.19},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757}
  ];

  var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});
       console.log(latlng);
      
  google.maps.geometry.poly.containsLocation(latlng, bermudaTriangle).then((map) => {
      
      console.log(map);
    });
//        for (let dist of this.distubutors) {
//    for(let area of dist.area){
// let Polygon = new google.maps.Polygon({paths: area.path});

//  if(google.maps.geometry.poly.containsLocation(latlng, Polygon)){
//      alert(true);
//  }
//     else{

//         alert(false);
//     }
//    }
// }
       
//  var resultColor =google.maps.geometry.poly.containsLocation(latlng, bermudaTriangle)?
//               console.log("true"):
//               console.log("false");
          
//  if(resultColor){
//             console.log(resultColor);
//         }
    //    var bermudaTriangle = new google.maps.Polygon({paths: this.distubutors[0].area[0].path});
    //     this.gMaps.containsLocation(latlng, bermudaTriangle).then((mapss) => {
    //         console.log(mapss);
    //     });
    //    var test =   this.gMaps.containsLocation(latlng, bermudaTriangle);
    //    if(test){
    //        console.log(test);
    //    }

    }
    click($event: any) {
        console.log(`click event is called {$event}`);
    }

    delete($event: any) {
        console.log(`delete is called {$event}`);
    }
    savePloygon(dist) {
        console.log(this.polygonArray);
        console.log(dist);
        let polygon = Object.assign([], this.polygonArray);;
        this.allDistibutors.push(polygon);
        dist.area.push(polygon);
        console.log("all distbtors" +this.distubutors);
        this.polygonArray.name = "";
        this.polygonArray.path = [];
        this.ploymarkers = [];
    }
    saveDistibutor() {
        console.log(this.polygonArray);
        
        let distibutors = Object.assign([], this.DistributorArray);;
        this.distubutors.push(distibutors);
        this.DistributorArray.distibutorname = "";
       

    }
    mapClicked($event: any) {
        
        // var latlng = <LatLngLiteral>{lat : $event.coords.lat, lng:$event.coords.lng};
       this.ploymarkers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng
        });
        this.polygonArray.path.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng
        });
       
    }
    viewDistPolygon(dist) {
        this.distPolygon = dist.area;
    }
    
    markers: marker[] = [
        {
            lat: 17.359066,
            lng: 78.399639,
            label: 'A',
            icon: '../assets/images/green.png'
        },
        {
            lat: 17.399695,
            lng: 78.522549,
            label: 'B',
            icon: '../assets/images/red.png'
        },
        {
            lat: 17.385817,
            lng: 78.465643,
            label: 'C',
            icon: '../assets/images/orange.png'
        }
    ]
    allDistibutors: any[] = [
        {
            name: "test",
            path: [
                { lat: 17.383406, lng: 78.400841 },
                { lat: 17.353495, lng: 78.380756 },
                { lat: 17.359722, lng: 78.417835 }
            ],
        },
        {
            name: "test2",
            path: [
                { lat: 17.409195, lng: 78.506413 },
                { lat: 17.384624, lng: 78.516026 },
                { lat: 17.407557, lng: 78.545895 }
            ],
        }

    ];
    distubutors: any[] = [{
        distibutorname: "Kinley",
        area: [{
            name: "test2",
            path: [
                { lat: 17.409195, lng: 78.506413 },
                { lat: 17.384624, lng: 78.516026 },
                { lat: 17.407557, lng: 78.545895 }
            ],
        },
            {
                name: "test",
                path: [
                    { lat: 17.383406, lng: 78.400841 },
                    { lat: 17.353495, lng: 78.380756 },
                    { lat: 17.359722, lng: 78.417835 }
                ],
            }]
      }
    ];
    distPolygon = this.allDistibutors;
    //path: Array<LatLngLiteral> = [
    //   { lat: 17.383406,  lng: 78.400841 },
    //   { lat: 17.353495,  lng: 78.380756 },
    //   { lat: 17.359722,  lng: 78.417835 }
    //];
   
    ngOnInit() {
        
  }

}
