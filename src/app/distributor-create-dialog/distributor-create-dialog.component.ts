import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-distributor-create-dialog',
  templateUrl: './distributor-create-dialog.component.html',
  styleUrls: ['./distributor-create-dialog.component.css']
})
export class DistributorCreateDialogComponent implements OnInit {
    dist = { firstName: "", lastName: "", phone: "", selectedItems:[]};
    areaList = [];

    dropdownSettings = {};
    constructor(public thisDialogRef: MdDialogRef<DistributorCreateDialogComponent>, @Inject(MD_DIALOG_DATA) public distributorDetail: any,  private distributorService: DistributorServiceService, private authenticationService: AuthenticationService) { }
     emailFormControl = new FormControl('', [
         Validators.required]);
     getAreasName() {
         var input = { userId: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() };
         this.distributorService.getAllArea(input)
             .subscribe(
             output => this.getAreasNameResult(output),
             error => {
                 console.log("error in distrbutors");
             });
     }
     getAreasNameResult(output) {
         console.log(output);
         if (output && output.data) {
             
             for (let area of output.data) {
                 var areaDetails = { "id": area.areaid, "itemName": area.areaname, };
                 this.areaList.push(areaDetails);
             }
         }
     }
     onSubmit() {
         console.log(this.dist);
         var input:any = {
             "User": {
                 "user_type": "dealer", "TransType": "create", "firstname": this.dist.firstName, "lastname": this.dist.lastName, "areaid": [], "areaname": [], "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()
             }
         }
         if (this.distributorDetail) {
             input.User.userid = this.distributorDetail.userid;
         }
         if (this.dist.selectedItems) {

             for (let area of this.dist.selectedItems) {
                 input.User.areaid.push(area.id);
                 input.User.areaname.push(area.itemName);
             }
         }
         if (this.distributorDetail) {
             input.User.userid = this.distributorDetail.userid;
             this.distributorService.updateDistributor(input)
                 .subscribe(
                 output => this.onSubmitResult(output),
                 error => {
                     console.log("error in distrbutors");
                 });
         }
         else {
             this.distributorService.createDistributor(input)
                 .subscribe(
                 output => this.onSubmitResult(output),
                 error => {
                     console.log("error in distrbutors");
                 });
         }
     }
     onSubmitResult(result) {
         console.log(result);
         if (result.result == 'success') {
             this.thisDialogRef.close('Ploygon created');
         }
     }
     getDetails() {
         if (this.distributorDetail) {
             var areatime =[]
             this.dist.firstName = this.distributorDetail.firstname;
             this.dist.lastName = this.distributorDetail.lastname;
             this.dist.phone = this.distributorDetail.mobileno;
             _.each(this.distributorDetail.areainfo, function (i, j) {
                 var area:any = i;
                 var areaDetails = { id: parseInt(area.areaid), itemName: area.areaname + ',' + area.subarea, };
                 areatime.push(areaDetails);
                 
             });
             this.dist.selectedItems = areatime;
             
         }
     }
     onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }
     ngOnInit() {
         this.getAreasName();
         this.getDetails();
         this.dropdownSettings = {
             singleSelection: false,
             text: "Select Areas",
             selectAllText: 'Select All',
             unSelectAllText: 'UnSelect All',
             enableSearchFilter: true,
             badgeShowLimit: 2,
             classes: "myclass custom-class myyy"
         };    
  }

}
