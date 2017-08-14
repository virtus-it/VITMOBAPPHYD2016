import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, LatLngLiteral} from '@agm/core';
interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon?:string;
	
}

interface polygonArray {
  name:string,
	path:any[]
	
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
  ploymarkers: marker[] = [];
  polygonArray:any ={
    name:"",
	path:[]
  }
  constructor() { }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
     click($event: any){
    console.log(`click event is called {$event}`);
  }
  
  delete($event: any){
    console.log(`delete is called {$event}`);
  }
   savePloygon(){
    console.log(this.polygonArray);
    let polygon = Object.assign([], this.polygonArray);;
    this.distibutors.push(polygon);
  this.polygonArray.name="";
  this.polygonArray.path =[];
    this.ploymarkers = [];
  }
  mapClicked($event: any) {
    this.ploymarkers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
     });
    this.polygonArray.path.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
     });
   
  }
  markers: marker[] = [
	  {
		  lat: 17.359066,
		  lng: 78.399639,
      label: 'A',
      icon:'../assets/images/green.png'
	  },
	  {
		  lat: 17.399695,
		  lng: 78.522549,
      label: 'B',
        icon:'../assets/images/red.png'
	  },
	  {
		  lat: 17.385817,
		  lng: 78.465643,
      label: 'C',
      icon:'../assets/images/orange.png'
	  }
  ]
  distibutors:any[] =[
{
  name : "test",
  path:[
      { lat: 17.383406,  lng: 78.400841 },
      { lat: 17.353495,  lng: 78.380756 },
      { lat: 17.359722,  lng: 78.417835 }
    ],
},
  {
  name : "test2",
  path:[
      { lat: 17.409195,  lng: 78.506413 },
      { lat: 17.384624,  lng: 78.516026 },
      { lat:17.407557,  lng: 78.545895 }
    ],
}

  ];
  //  path: Array<LatLngLiteral> = [
  //     { lat: 17.383406,  lng: 78.400841 },
  //     { lat: 17.353495,  lng: 78.380756 },
  //     { lat: 17.359722,  lng: 78.417835 }
  //   ];
  ngOnInit() {
  }

}
