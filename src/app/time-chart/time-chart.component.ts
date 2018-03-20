import { Component, OnInit, Inject } from '@angular/core';
import Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {
    public doughnutChartLabels:string[] = ['Ordered Time', 'Current time', 'Delivery time'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';
    public chartColors: Array<any> = [
        { 
          backgroundColor: 'green',
        }];
    constructor( @Inject(MD_DIALOG_DATA) public Detail: any ){}
   
    // events
    public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }
    

  ngOnInit() {  
    console.log(this.Detail);
  }
}
  

