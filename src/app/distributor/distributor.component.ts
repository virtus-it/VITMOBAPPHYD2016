import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from './distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorCreateDialogComponent } from '../distributor-create-dialog/distributor-create-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import { SupplierOrderListComponent } from '../supplier-order-list/supplier-order-list.component';
import { ViewCustomerComponent } from '../view-customer/view-customer.component';
import { ViewSupplierComponent } from '../view-supplier/view-supplier.component';
import { AddproductconfirmComponent } from '../addproductconfirm/addproductconfirm.component';
import { MapStockpointComponent } from '../map-stockpoint/map-stockpoint.component';
import { ViewStockpointsComponent } from '../view-stockpoints/view-stockpoints.component';

import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
@Component({

    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
    setPosition: any = "";
    ordersList = [];
    distributors: any = [];
    distributorsCopy: any = [];
    searchDistributorTerm = "";
    searchDistributorNumber = "";
    filterType = "";
    distributorClickMore = true;
    isActive:any= "";
    showFilterDailog = false;
    distributorInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0,"transtype":"getalldistributors",  "apptype": this.authenticationService.appType(), "pagesize": 500 } };
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
        //console.log(input);
        this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.getDistributorsResult(output),
            error => {
                //console.log("error in distrbutors");
                this.loaderService.display(false);
            });
    }
    getDistributorsResult(data) {
        //console.log(data);
        this.loaderService.display(false);
        if (data.result == 'success') {

            this.distributorClickMore = true;
            let finalDistributor = _.union(this.distributors, data.data);
            this.distributors = finalDistributor;
            this.distributorsCopy = finalDistributor;

        }
        else {
            this.distributorClickMore = false;

        }
    }
    openMapDialog(data) {
        let dialogRef = this.dialog.open(MapDialogComponent, {
            width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    openCreateDialog() {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if (result == 'success') {
                this.getDistributors(true);
            }
        });
    }
    openUpdateDialog(details) {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: details
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if (result == 'success') {
                this.getDistributors(true);
            }
        });
    }
    showFollowUp(details) {
        //console.log(details);
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "distributor", "mobileno": details.mobileno };
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {

            width: '70%',
            data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    showFollowUpDetails(details) {
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "distributor", "mobileno": details.mobileno };
        let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {

            width: '80%',
            data: data
        });
        dialogRefFollowDetails.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    ViewProduct(distributor) {
        //console.log(distributor);
        if (distributor) {
            let dialogRef = this.dialog.open(ProductListDialogComponent, {

                width: '85%',
                data: distributor
            });
            dialogRef.afterClosed().subscribe(result => {
                //console.log(`Dialog closed: ${result}`);


            });


        }
    }

    //Search distributor with name

    searchDistributorByName() {
        let term = this.searchDistributorTerm;
        if (term) {
            this.distributors = this.distributorsCopy.filter(function (e) {
                return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0

            });
        }
        else {
            this.distributors = this.distributorsCopy;
        }
    }

    //Search distributor with number
    searchDistributorbyNumber() {
        let term = this.searchDistributorNumber;
        if (term) {
            this.distributors = this.distributorsCopy.filter(function (e) {
                return e.mobileno.indexOf(term) >= 0
            });
        }
        else {
            this.distributors = this.distributorsCopy;
        }
    }

    //View Orders
    viewOrders(data) {
        let formatteddata: any = { "type": "distributorOrder", "data": data };
        let dialogRefSupplierOrderList = this.dialog.open(SupplierOrderListComponent, {
            width: '75%',
            data: formatteddata
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);

        });
    }

    //view Suppliers
    viewSuppliers(data) {
        let dialogRefSupplierOrderList = this.dialog.open(ViewSupplierComponent, {
            width: '65%',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);

        });
    }

    //view Customers
    viewCustomers(data) {
        let dialogRefSupplierOrderList = this.dialog.open(ViewCustomerComponent, {
            width: '95%',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);

        });
    }
    filterDailogToggle() {
        this.showFilterDailog = !this.showFilterDailog;
    }
    addProductsConfirmDialog(data){
        let dialogRefSupplierOrderList = this.dialog.open(AddproductconfirmComponent, {
            width: '700px',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if(result == 'success'){
                
            }

        })


    }

    // deactivateDistributor(dist){
    //     let input={"User":{"TransType":"deactivate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":""}};
    //     //console.log(input);
    //     this.distributorService.createDistributor(input)
    //     .subscribe(
    //     output => this.deactivateDistributorResult(output),
    //     error => {
    //         //console.log("error in distrbutors");
    //         this.loaderService.display(false);
    //     });
    // }
    // deactivateDistributorResult(result){
    //     //console.log(result);
    //     if(result.result == 'success'){
    //         this.getDistributors(true);

    //     }

    // }

    // activateDistributor(dist){
    //     let input={"User":{"TransType":"activate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":""}};
    //     //console.log(input);
    //     this.distributorService.createDistributor(input)
    //     .subscribe(
    //         output => this.activateDistributorResult(output),
    //         error => {
    //             //console.log("error in distrbutors");
    //             this.loaderService.display(false);
    //         });

    // }

    // activateDistributorResult(result){
    //     //console.log(result);
    //     if(result.result =='success'){
    //         this.getDistributors(true);

    //     }
    // }



    stockPoint(data) {
        let dialogRefCoverageDailog = this.dialog.open(MapStockpointComponent, {
          width: '95%',
          data: data
        });
        dialogRefCoverageDailog.afterClosed().subscribe(result => {
          //console.log(`Dialog closed: ${result}`);
          if (result == 'success') {
          }
        });
      }

      viewStockPoints(data){
        let dialogRefCoverageDailog = this.dialog.open(ViewStockpointsComponent, {
            width: '75%',
            data: data
          });
          dialogRefCoverageDailog.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
            }
          });

      }


      activateDeactivateDist(dist){
          let input={};
          if(dist.isactive == '0'){
          input={"User":{"TransType":"activate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":"", "apptype": this.authenticationService.appType()}};
          }
          else{
        input={"User":{"TransType":"deactivate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":"" , "apptype": this.authenticationService.appType()}};
          }
          console.log(input);
          this.distributorService.createDistributor(input)
            .subscribe(
            output => this.activateDeactivateDistributorResult(output),
            error => {
                //console.log("error in distrbutors");
                this.loaderService.display(false);
            });
      }
      activateDeactivateDistributorResult(result){
            console.log(result);
            if(result.result =='success'){
                this.getDistributors(true);
            }
        }

        clearSearch(){
            this.showFilterDailog = false;
            this.filterType = "";
             this.searchDistributorTerm= "";
            this.searchDistributorNumber = "";
            this.getDistributors(true);
        }
    

    ngOnInit() {
        this.getDistributors(true);
        // if(window.navigator.geolocation){
        //     window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        //     };





        
    
    }

}
