import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {
  
    constructor( @Inject(MD_DIALOG_DATA) public Detail: any ){}
   
   
  ngOnInit() {  
    console.log(this.Detail);
  }
}
  

