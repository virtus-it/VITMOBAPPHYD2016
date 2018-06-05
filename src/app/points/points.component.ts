import { Component, OnInit } from '@angular/core';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  constructor(public dialog: MdDialog, private distributorService: DistributorServiceService) { }

  pointsStatus:any = [];

  DeactivatePoints(status){
    console.log('de activate called');
    
    let input = {"User":{"TransType":"active" , "status": status ,"isactive":"0"}}
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.DeactivatePointsResult(output),
    error => {      
    });

  }
  DeactivatePointsResult(result){
    if(result.result == 'success'){
      // this.getPointsDetails();
    }
  }

  ActivatePoints(status){
    console.log('activate called');
    let input = {"User":{"TransType":"active" , "status": status ,"isactive":"1"}}
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.ActivatePointsResult(output),
    error => {      
    });

  }
  ActivatePointsResult(result){
    if(result.result == 'success'){
      // this.getPointsDetails();

    }
  }


  getPointsDetails(){
        console.log('abc');
    let input = {"User":{"TransType":"getallpoints"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.DeactivatePointsResult(output),
    error => {    
      console.log('Error in getting all points Details');  
    });
  }
  getAllPointsDetailsResult(result){
    if(result.result == 'success'){
      this.pointsStatus = result.data;
      console.log('result' , result.data);
    }

  }







  ngOnInit() {
    this.getPointsDetails();
  }

}
