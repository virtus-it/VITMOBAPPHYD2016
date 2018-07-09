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

  constructor(public dialog: MdDialog, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService) { }

  pointsStatus: any = [];
  allPoints = [];
  showFilterDialog = false;
  referalbonusState1: any = '';
  acceptStatus1: any = '';
  deliveredStatus1: any = '';
  signupStatus1: any = '';
  sameDayStatus1: any = '';
  ontimeStatus1: any = '';
  distCustomerStatus1: any = '';
  tabPanelView: any = '';
  customerAllPointsDetails: any = [];
  filterInput = { type: '' };
  pointsClickMore = true;

  DeactivatePoints(status) {
    console.log('de activate called');

    let input = { "User": { "TransType": "active", "status": status, "isactive": "0" } }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.DeactivatePointsResult(output),
        error => {
        });

  }
  DeactivatePointsResult(result) {
    if (result.result == 'success') {
      this.getAllPoints();
      // this.getPointsDetails();

    }
  }

  ActivatePoints(status) {
    console.log('activate called');
    let input = { "User": { "TransType": "active", "status": status, "isactive": "1" } }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.ActivatePointsResult(output),
        error => {
        });

  }
  ActivatePointsResult(result) {
    if (result.result == 'success') {
      this.getAllPoints();
      // this.getPointsDetails();

    }
  }


  getAllPoints() {
    let input = { "User": { "TransType": "getpointsmst" } };
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.getAllPointsResult(output),
        error => {
          console.log('Error in getting all points Details');
        });
  }

  getAllPointsResult(result) {
    if (result.result == 'success') {
      this.allPoints = result.data;
    }
  }


  addpoints() {
    let dialogRefEditCustomer = this.dialog.open(AddEditPointsComponent, {
      width: '700px',
      data: ''
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.getAllPoints();
      }

    });
  }

  editPoints(data) {
    let dialogRefEditCustomer = this.dialog.open(AddEditPointsComponent, {
      width: '700px',
      data: data
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.getAllPoints();
      }

    });

  }

  showTabPanel(panelName) {
    if (panelName == 'pointsDetails') {
      this.tabPanelView = 'pointsDetails';
      this.getAllPointsDetails(true);
    }
  }

  reset() {
    this.tabPanelView = '';
  }

  filterToggle() {
    this.showFilterDialog = !this.showFilterDialog;
  }

  getAllPointsDetails(firstcall) {
    let input = { "User": { "TransType": "getallpoints", "apptype": this.authenticationService.appType(), "loginid": this.authenticationService.loggedInUserId(), "type": "all", "lastId": 0 } };
    if (this.customerAllPointsDetails && this.customerAllPointsDetails.length && !firstcall) {
      let lastCustomer: any = _.last(this.customerAllPointsDetails);
      if (lastCustomer) {
        input.User.lastId = lastCustomer.userid;
      }
    }
    else {
      this.customerAllPointsDetails = [];
      input.User.lastId = 0;
    }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.getAllPointsDetailsResult(output),
        error => {
          console.log('Error in getting all points Details');
        });
  }
  getAllPointsDetailsResult(result) {
    if (result.result == 'success') {
      this.customerAllPointsDetails = _.union(this.customerAllPointsDetails, result.data);
    }
    else {
      this.pointsClickMore = false;
    }
  }

  showCustomerPoints(firstcall) {
    let input = { "User": { "TransType": "getallpoints", "apptype": this.authenticationService.appType(), "loginid": this.authenticationService.loggedInUserId(), "type": "customer", "lastId": 0 } };
    if (this.customerAllPointsDetails && this.customerAllPointsDetails.length && !firstcall) {
      let lastCustomer: any = _.last(this.customerAllPointsDetails);
      if (lastCustomer) {
        input.User.lastId = lastCustomer.userid;
      }
    }
    else {
      this.customerAllPointsDetails = [];
      input.User.lastId = 0;
    }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.showCustomerPointsResult(output),
        error => {
          console.log('Error ');
        });
  }
  showCustomerPointsResult(result) {
    if (result.result == 'success') {
      this.customerAllPointsDetails = _.union(this.customerAllPointsDetails, result.data);
    }
    else {
      this.pointsClickMore = false;
    }
  }

  showDistributorPoints(firstcall) {
    let input = { "User": { "TransType": "getallpoints", "apptype": this.authenticationService.appType(), "loginid": this.authenticationService.loggedInUserId(), "type": "dealer", "lastId": 0 } };
    if (this.customerAllPointsDetails && this.customerAllPointsDetails.length && !firstcall) {
      let lastCustomer: any = _.last(this.customerAllPointsDetails);
      if (lastCustomer) {
        input.User.lastId = lastCustomer.userid;
      }
    }
    else {
      this.customerAllPointsDetails = [];
      input.User.lastId = 0;
    }
    this.distributorService.getPoints(input)
      .subscribe(
        output => this.showDistributorPointsResult(output),
        error => {
          console.log('Error ');
        });
  }

  showDistributorPointsResult(result) {
    if (result.result == 'success') {
      this.customerAllPointsDetails = _.union(this.customerAllPointsDetails, result.data);
    }
    else {
      this.pointsClickMore = false;
    }


  }

  search() {
    let input = { "User": { "TransType": "getallpoints", "type": "all", "filterby": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "apptype": this.authenticationService.appType() } };
    if (this.filterInput.type == 'top10') {
      input.User.filterby = 'top10';
    }
    else if (this.filterInput.type == 'top50') {
      input.User.filterby = 'top50';
    }
    else if (this.filterInput.type == 'top100') {
      input.User.filterby = 'top100';
    }
    else if (this.filterInput.type == 'least10') {
      input.User.filterby = 'least10';
    }
    else if (this.filterInput.type == 'least50') {
      input.User.filterby = 'least50';
    }
    else if (this.filterInput.type == 'least100') {
      input.User.filterby = 'least100';
    }

    this.distributorService.getPoints(input)
      .subscribe(
        output => this.searchResult(output),
        error => {
          console.log('Error ');
        });
  }
  searchResult(result){
    if(result.result == 'success'){
      this.allPoints = result.data;
    }
  }

  clearFilter(){
    this.filterInput.type = '';
    this.showFilterDialog = false;
    this.getAllPoints();

  }






  ngOnInit() {
    // this.getPointsDetails();
    this.getAllPoints();
  }

}
