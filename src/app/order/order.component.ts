import { Component, OnInit } from '@angular/core';
interface marker {
	lat: number;
	lng: number;
	label?: string;
    icon: string;
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
  constructor() { }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  markers: marker[] = [
	  {
		  lat: 17.361616,
		  lng: 78.474655,
          label: 'A',
          icon:'../assets/images/red.png'
	  },
	  {
		  lat: 17.392042,
		  lng: 78.445044,
          label: 'B',
          icon:'../assets/images/orange.png'
	  },
	  {
		  lat: 17.385817,
		  lng: 78.465643,
          label: 'C',
          icon:'../assets/images/green.png'
	  }
  ]
  ngOnInit() {
  }

}
