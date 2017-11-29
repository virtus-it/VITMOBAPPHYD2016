import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from './distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorCreateDialogComponent } from '../distributor-create-dialog/distributor-create-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
@Component({

    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
    distributors:any = [];
    distributorClickMore = true;
    showFilterDailog = false;
    distributorInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 10 } };
    constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public dialog: MdDialog,private loaderService: LoaderService) { }
    getDistributors(firstCall) {
        this.loaderService.display(true);
        if (this.distributors && this.distributors.length && !firstCall) {
            let lastdistributor: any = _.last(this.distributors);
            if (lastdistributor) {
              this.distributorInput.root.lastuserid = lastdistributor.userid;
            }
      
          }
          else {
            this.distributors = [];
            this.distributorInput.root.lastuserid = null;
          }
        let input = this.distributorInput;
        console.log(input);
        this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.getDistributorsResult(output),
            error => {
                console.log("error in distrbutors");
                this.loaderService.display(false);
            });
    }
    getDistributorsResult(data) {
        console.log(data);
        this.loaderService.display(false);
        if (data.result == 'success') {
            
            this.distributorClickMore = true;
            this.distributors = _.union(this.distributors, data.data);
        }
        else{
            this.distributorClickMore = false;   
        }
    }
    openMapDialog(data) {
        let dialogRef = this.dialog.open(MapDialogComponent, {
           width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    openCreateDialog() {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            this.getDistributors(true);
        });
    }
    openUpdateDialog(details) {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: details
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            this.getDistributors(true);
        });
    }
    showFollowUp(details) {
        console.log(details);
        let data = {id:details.userid,firstname :details.firstname,lastName :details.lastname,type:"distributor","mobileno":details.mobileno};
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {
    
          width: '80%',
          data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
    
    
        });
    
      }
      showFollowUpDetails(details) {
        let data = {id:details.userid,firstname :details.firstname,lastName :details.lastname,type:"distributor","mobileno":details.mobileno};
        let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {
    
          width: '80%',
          data: data
        });
        dialogRefFollowDetails.afterClosed().subscribe(result => {
          console.log(`Dialog closed: ${result}`);
    
    
        });
    
      }
    ViewProduct(distributor) {
        console.log(distributor);
        if (distributor) {
            let dialogRef = this.dialog.open(ProductListDialogComponent, {

                width: '700px',
                data: distributor
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog closed: ${result}`);


            });


        }
    }
    onScrollFunction(event) {
        console.log('scroll event', event);
    }
    filterDailogToggle(){
        this.showFilterDailog = !this.showFilterDailog;
      }
    ngOnInit() {
        this.getDistributors(true)
    }

}
