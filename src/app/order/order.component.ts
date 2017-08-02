import { Component, OnInit } from '@angular/core';
interface marker {
	lat: number;
	lng: number;
	label?: string;
	
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  lat: number = 17.3850;
  lng: number = 78.4867;
  constructor() { }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  markers: marker[] = [
	  {
		  lat: 17.361616,
		  lng: 78.474655,
		  label: 'A'
	  },
	  {
		  lat: 17.392042,
		  lng: 78.445044,
		  label: 'B'
	  },
	  {
		  lat: 17.385817,
		  lng: 78.465643,
		  label: 'C'
	  }
  ]
  ngOnInit() {
  }

}
