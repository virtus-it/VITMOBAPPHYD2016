import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
import { AddStockDistributorComponent } from '../add-stock-distributor/add-stock-distributor.component';
@Component({
  selector: 'app-distributor-create-dialog',
  templateUrl: './distributor-create-dialog.component.html',
  styleUrls: ['./distributor-create-dialog.component.css']
})
export class DistributorCreateDialogComponent implements OnInit {
    dist = { firstName: "", lastName: "", phone: "", companyname:"",address:"", emailid:"", referCode:"", selectedItems:[]};
    areaList = [];
    

    dropdownSettings = {};
    constructor(public thisDialogRef: MdDialogRef<DistributorCreateDialogComponent>, @Inject(MD_DIALOG_DATA) public distributorDetail: any,  private distributorService: DistributorServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService,public dialog: MdDialog) { }
     firstFormControl = new FormControl('', [
         Validators.required]);
         lastFormControl = new FormControl('', [
            Validators.required]);
            addressFormControl = new FormControl('', [
                Validators.required]);
            phoneFormControl = new FormControl('', [
                    Validators.required]);

    
        //  phoneFormControl = new FormControl({value: '', disabled: false}, [
        //     Validators.required]);
     getAreasName() {
        this.loaderService.display(true);
         var input = { userId: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() };
         this.distributorService.getAllArea(input)
             .subscribe(
             output => this.getAreasNameResult(output),
             error => {
                 console.log("error in distrbutors");
                 this.loaderService.display(false);
             });
     }
     getAreasNameResult(output) {
        this.loaderService.display(false);
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
         this.loaderService.display(true);
         var input:any = {
             "User": {
                "pwd":this.dist.phone,"user_type": "dealer", "TransType": "create","referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType()
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
                     this.loaderService.display(false);
                 });
         }
         else {
             this.distributorService.createDistributor(input)
                 .subscribe(
                 output => this.onSubmitResult(output),
                 error => {
                     console.log("error in distrbutors");
                     this.loaderService.display(false);
                 });
         }
     }
     onSubmitResult(result) {
         console.log(result);
         this.loaderService.display(false);
         if (result.result == 'success') {
            // this.thisDialogRef.close('success');
            if (this.distributorDetail) {
                this.thisDialogRef.close('success');
               
            }
            else{
                let data = {id:result.data.user_id}
                this.openStockDialog(data);

            }
            
         }
     }
     getDetails() {
         if (this.distributorDetail) {
             var areatime =[];
             
            //  this.phoneFormControl = new FormControl({value: '', disabled: true}, [
            //     Validators.required]);
             this.dist.firstName = this.distributorDetail.firstname;
             this.dist.lastName = this.distributorDetail.lastname;
             this.dist.phone = this.distributorDetail.mobileno;
             this.dist.companyname = this.distributorDetail.companyname;
             this.dist.address = this.distributorDetail.address;
             this.dist.emailid = this.distributorDetail.emailid;
             this.dist.referCode = this.distributorDetail.reference_code;
             _.each(this.distributorDetail.areainfo, function (i, j) {
                 var area:any = i;
                 var areaDetails = { id: parseInt(area.areaid), itemName: area.areaname + ',' + area.subarea, };
                 areatime.push(areaDetails);
                 
             });
             this.dist.selectedItems = areatime;
             
         }
         
     }
     openStockDialog(data) {
        let dialogRef = this.dialog.open(AddStockDistributorComponent, {
            width: '700px',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if( result == 'success'){
                this.thisDialogRef.close('success');
            }
        });
    }
     onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }
     ngOnInit() {
         console.log(this.distributorDetail);
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



