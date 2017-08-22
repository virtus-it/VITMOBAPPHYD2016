import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader  } from '@agm/core';
declare var google:any; 
interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    lat: number = 17.3850;
    lng: number = 78.4867;
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
    constructor(public gMaps: GoogleMapsAPIWrapper, private _loader: MapsAPILoader) { }
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
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
        let polygon = Object.assign([], this.polygonArray);
        polygon.distibutorname = dist.distibutorname;
        this.allDistibutors.push(polygon);
        dist.area.push(polygon);
        console.log("all distbtors" +this.distubutors);
        this.polygonArray.name = "";
        this.polygonArray.path = [];
        this.ploymarkers = [];
    }
    saveDistibutor() {
        console.log(this.polygonArray);
        
        let distibutors = Object.assign([], this.DistributorArray);
        this.distubutors.push(distibutors);
        this.DistributorArray.distibutorname = "";
       

    }
    customerMapClicked($event: any) {
        for (let dist of this.allDistibutors) {
            var latlong = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
            var polygonPath = new google.maps.Polygon({
                paths: dist.path
            });
            // google.maps.geometry.poly.containsLocation(latlong, polygonPath)
            if (this.gMaps.containsLocation(latlong, polygonPath)) {
                console.log(true);
                alert("Distibutor location : " + dist.distibutorname);
                return false;
            }
            
        };
    }
    mapClicked($event: any) {
       //var bermudaTriangle = new google.maps.Polygon({
        //    paths: this.distubutors[0].area[0].path
        //});
        
        
       
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
            distibutorname: "Kinley",
            path: [
                { lat: 17.383406, lng: 78.400841 },
                { lat: 17.353495, lng: 78.380756 },
                { lat: 17.359722, lng: 78.417835 }
            ],
        },
        {
            name: "marmuda",
            distibutorname: "Kinley",
            path: [
                { lat: 25.774, lng: -80.190 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.3212, lng: -64.757 }
            ],
        },
        {
            name: "test2",
            distibutorname: "Kinley",
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
            distibutorname: "Kinley",
            path: [
                { lat: 17.409195, lng: 78.506413 },
                { lat: 17.384624, lng: 78.516026 },
                { lat: 17.407557, lng: 78.545895 }
            ],
        },
            {
                name: "marmuda",
                distibutorname: "Kinley",
                path: [
                    { lat: 25.774, lng: -80.190 },
                    { lat: 18.466, lng: -66.118 },
                    { lat: 32.3212, lng: -64.757 }
                ],
            },
            {
                name: "test",
                distibutorname: "Kinley",
                path: [
                    { lat: 17.383406, lng: 78.400841 },
                    { lat: 17.353495, lng: 78.380756 },
                    { lat: 17.359722, lng: 78.417835 }
                ],
            }]
      }
    ];
    distPolygon = this.allDistibutors;
    //paths: Array<LatLngLiteral> = [
    //   { lat: 17.383406,  lng: 78.400841 },
    //   { lat: 17.353495,  lng: 78.380756 },
    //   { lat: 17.359722,  lng: 78.417835 }
    //];


    
    ngOnInit() :void{
        
  }

}
