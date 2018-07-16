import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { SupplierService } from '../supplier/supplier.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.css']
})
export class AssignVehicleComponent implements OnInit {

  constructor(private supplierservice: SupplierService, @Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<AssignVehicleComponent>, private authenticationService: AuthenticationService) { }

  assignVehicleInput = { "User": { "vehhicleno": "", "starttime": "", "supplierid": "", "transtype": "create", "expectedtime": "", "meter": "", "fuel": "", "canscount": "", "arrivedtime": "", "emptycans": "", "tracking_status": "", "tracking_interval": "", "fuelend": "", "meterend": "" } };

  endTime = '';
  startTime = '';




  assignVehicle() {
    let input = this.assignVehicleInput;
    if (this.assignVehicleInput.User.starttime) {
      let formattedStartDate = moment(new Date()).format('YYYY-MM-DD') + " " + this.assignVehicleInput.User.starttime + ':00';
      this.assignVehicleInput.User.starttime = formattedStartDate;
    }
    else {
      this.assignVehicleInput.User.starttime = null;
    }
    if (this.assignVehicleInput.User.expectedtime) {
      let formattedEndDate = moment(new Date()).format('YYYY-MM-DD') + " " + this.assignVehicleInput.User.expectedtime + ':00';
      this.assignVehicleInput.User.expectedtime = formattedEndDate;
    }
    else {
      this.assignVehicleInput.User.expectedtime = null;
    }
    this.assignVehicleInput.User.supplierid = this.Details.userid;
    if (this.assignVehicleInput.User.emptycans == '') {
      this.assignVehicleInput.User.emptycans = null;
    }
    if (this.assignVehicleInput.User.arrivedtime == '') {
      this.assignVehicleInput.User.arrivedtime = null;
    }
    delete this.assignVehicleInput.User.fuelend;
    delete this.assignVehicleInput.User.meterend;
    console.log(input);
    this.supplierservice.trackSupplier(input)
      .subscribe(
        output => this.assignVehicleResult(output),
        error => {
          //console.log("error in supplier order list");
        });
  }
  assignVehicleResult(result) {
    if (result.result == 'success') {
      console.log(result.data, 'result');
      this.thisDialogRef.close('success');

    }
  }



  updateVehicle() {
    let input = this.assignVehicleInput;
    this.assignVehicleInput.User.transtype = 'update';
    if (this.assignVehicleInput.User.starttime) {
      let formattedStartDate = moment(new Date()).format('YYYY-MM-DD') + " " + this.assignVehicleInput.User.starttime + ':00';
      this.assignVehicleInput.User.starttime = formattedStartDate;
    }
    else {
      this.assignVehicleInput.User.starttime = null;
    }
    if (this.assignVehicleInput.User.expectedtime) {
      let formattedEndDate = moment(new Date()).format('YYYY-MM-DD') + " " + this.assignVehicleInput.User.expectedtime + ':00';
      this.assignVehicleInput.User.expectedtime = formattedEndDate;
    }
    else {
      this.assignVehicleInput.User.expectedtime = null;
    }

    if (this.assignVehicleInput.User.arrivedtime) {
      let formatDate = moment(new Date()).format('YYYY-MM-DD') + " " + this.assignVehicleInput.User.arrivedtime + ':00';
      this.assignVehicleInput.User.arrivedtime = formatDate;
    }
    else {
      this.assignVehicleInput.User.arrivedtime = null;
    }

    this.assignVehicleInput.User.supplierid = this.Details.userid;
    console.log(input);
    this.supplierservice.trackSupplier(input)
      .subscribe(
        output => this.updateVehicleResult(output),
        error => {
          //console.log("error in supplier order list");
        });
  }
  updateVehicleResult(result) {
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }




  getVehicleDetails() {
    if (this.Details) {
      let input = { "User": { "transtype": "get", "id": this.Details.data.vehicleid, "supplierid": this.Details.data.userid, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
      this.supplierservice.trackSupplier(input)
        .subscribe(
          output => this.getVehicleDetailsResult(output),
          error => {
            //console.log("error in supplier order list");
          });
    }
  }

  getVehicleDetailsResult(result) {
    if (result.result == 'success') {
      // this.assignVehicleInput.User.vehhicleno = result.data;
      this.assignVehicleInput.User.vehhicleno = result.data[0].vehicleno;
      this.assignVehicleInput.User.canscount = result.data[0].cans_count;
      if(result.data[0].expected_endtime){
        var timestamp = (result.data[0].expected_endtime).split('T');
        var tS1 = timestamp[1];
        this.endTime = tS1.substring(0,5);
        this.assignVehicleInput.User.expectedtime = this.endTime;
      }
      if(result.data[0].start_time){
        var timestamp1 = (result.data[0].start_time).split('T');
        var tS2 = timestamp1[1];
        this.startTime = tS2.substring(0,5);
        this.assignVehicleInput.User.starttime = this.startTime;
      }
     
      this.assignVehicleInput.User.fuel = result.data[0].fuel_in_litre;
      this.assignVehicleInput.User.meter = result.data[0].meter_reading;
      this.assignVehicleInput.User.tracking_status = result.data[0].istracking;
      this.assignVehicleInput.User.tracking_interval = result.data[0].trackingtime;
    }
  }

  onCloseModal() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if (this.Details.type == 'edit') {
      this.getVehicleDetails();
    }

  }

}
