import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, LatLngLiteral} from '@agm/core';
interface marker {
	lat: number;
	lng: number;
  label?: string;
  icon:string;
	
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  lat: number = 17.3850;
  lng: number = 78.4867;
  paths : Array<LatLngLiteral>;
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
  markers: marker[] = [
	  {
		  lat: 17.361616,
		  lng: 78.474655,
      label: 'A',
      icon:'../assets/images/green.png'
	  },
	  {
		  lat: 17.392042,
		  lng: 78.445044,
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
