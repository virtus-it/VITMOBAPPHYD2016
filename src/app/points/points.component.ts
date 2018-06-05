import { Component, OnInit } from '@angular/core';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  constructor(public dialog: MdDialog, private distributorService: DistributorServiceService) { }

  pointsStatus:any = [];

  referalbonusState1:any = '';
  acceptStatus1:any = '';
  deliveredStatus1:any = '';
  signupStatus1:any = '';
  sameDayStatus1:any = '';
  ontimeStatus1:any = ''; 
  distCustomerStatus1:any = '';

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
      this.getPointsDetails();
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
      this.getPointsDetails();

    }
  }


  getPointsDetails(){
        console.log('abc');
    let input = {"User":{"TransType":"getallpoints"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getPointsDetailsResult(output),
    error => {    
      console.log('Error in getting all points Details');  
    });
  }

  
  getPointsDetailsResult(result){
    if(result.result == 'success'){
      this.pointsStatus = result.data;
      console.log(result.data);
      let referalbonusState:any = '';
      let acceptStatus:any = '';
      let deliveredStatus:any = '';
      let signupStatus:any = '';
      let sameDayStatus:any = '';
      let ontimeStatus:any = ''; 
      let distCustomerStatus:any = '';

      _.each(this.pointsStatus , function(i , j){
        let details:any = i;
        if(details.status == 'referalbonus'){
          referalbonusState = details.isactive; 
        }
        else if(details.status == 'accept'){ 
          acceptStatus = details.isactive;
        }
        else if(details.status == 'delivered'){
          deliveredStatus = details.isactive;
        }
        else if(details.status == 'signup'){
          signupStatus = details.isactive;
        }
        else if(details.status == 'sameday'){
          sameDayStatus = details.isactive;
        }
        else if(details.status == 'ontime'){
          ontimeStatus = details.isactive;
        }
        else if(details.status == 'D-customer'){
          distCustomerStatus = details.isactive;
        }
       
      });

      this.referalbonusState1 = referalbonusState;
      this.acceptStatus1 = acceptStatus;
      this.deliveredStatus1 =  deliveredStatus;
      this.signupStatus1 = signupStatus;
      this.sameDayStatus1 = sameDayStatus;
      this.ontimeStatus1 = ontimeStatus;
      this.distCustomerStatus1 =  distCustomerStatus;




    }

  }







  ngOnInit() {
    this.getPointsDetails();
  }

}
