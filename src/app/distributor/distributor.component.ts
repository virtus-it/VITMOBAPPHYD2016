import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from './distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorCreateDialogComponent } from '../distributor-create-dialog/distributor-create-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { MdDialog } from '@angular/material';
@Component({

    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
    distributors:any = [];
    constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public dialog: MdDialog) { }
    getDistributors() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
        console.log(input);
        this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.getDistributorsResult(output),
            error => {
                console.log("error in distrbutors");
            });
    }
    getDistributorsResult(data) {
        console.log(data);
        if (data.result == 'success') {
            this.distributors = data.data;
        }
    }
    openMapDialog(data) {
        let dialogRef = this.dialog.open(MapDialogComponent, {
            height:'600px',
           width: '1100px',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    openCreateDialog() {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            height: '310px',            
            width: '700px',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            this.getDistributors();
        });
    }
    openUpdateDialog(details) {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            height: '320px',
            width: '700px',
            data: details
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            this.getDistributors();
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
    ngOnInit() {
        this.getDistributors()
    }

}
