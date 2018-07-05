import { Component, OnInit } from '@angular/core';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { AddEditPointsComponent } from '../add-edit-points/add-edit-points.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  constructor(public dialog: MdDialog, private distributorService: DistributorServiceService , private authenticationService: AuthenticationService) { }

  pointsStatus:any = [];
  allPoints = [];
  showFilterDialog = false;
  referalbonusState1:any = '';
  acceptStatus1:any = '';
  deliveredStatus1:any = '';
  signupStatus1:any = '';
  sameDayStatus1:any = '';
  ontimeStatus1:any = ''; 
  distCustomerStatus1:any = '';
  tabPanelView:any = '';
  customerAllPointsDetails:any = [];
  filterInput = {type:''}

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
      this.getAllPoints();
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
      this.getAllPoints();
      // this.getPointsDetails();

    }
  }


  getAllPoints(){
    let input = {"User":{"TransType":"getpointsmst"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getAllPointsResult(output),
    error => {    
      console.log('Error in getting all points Details');  
    });
  }

  getAllPointsResult(result){
    if(result.result == 'success'){
      this.allPoints = result.data;
    }
  }


  addpoints(){
    let dialogRefEditCustomer = this.dialog.open(AddEditPointsComponent, {
      width: '700px',
      data: ''
  });
  dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
if(result == "success"){
  this.getAllPoints();
}

});
}

editPoints(data){
  let dialogRefEditCustomer = this.dialog.open(AddEditPointsComponent, {
    width: '700px',
    data: data
});
dialogRefEditCustomer.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
if(result == "success"){
this.getAllPoints();
}

});

}

showTabPanel(panelName){
  if(panelName == 'pointsDetails'){
    this.tabPanelView = 'pointsDetails';
    this.getCustomersPoints();
  }
}

reset(){
  this.tabPanelView = '';
}

filterToggle(){
  this.showFilterDialog = !this.showFilterDialog;
}

getCustomersPoints(){
  let input = {"User":{"TransType":"getallpoints" , "apptype": this.authenticationService.appType() , "loginid": this.authenticationService.loggedInUserId()}};
  this.distributorService.getPoints(input)
    .subscribe(
    output => this.getCustomersPointsResult(output),
    error => {    
      console.log('Error in getting all points Details');  
    });
}
getCustomersPointsResult(result){
  if(result.result == 'success'){
    this.customerAllPointsDetails = result.data;
  }
}






  ngOnInit() {
    // this.getPointsDetails();
    this.getAllPoints();
  }

}
