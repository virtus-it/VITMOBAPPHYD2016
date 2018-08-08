﻿import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
import { AddproductconfirmComponent } from '../addproductconfirm/addproductconfirm.component';
import { MdDialog } from '@angular/material';
import { AddStockDistributorComponent } from '../add-stock-distributor/add-stock-distributor.component';
@Component({
  selector: 'app-distributor-create-dialog',
  templateUrl: './distributor-create-dialog.component.html',
  styleUrls: ['./distributor-create-dialog.component.css']
})
export class DistributorCreateDialogComponent implements OnInit {
    dist = { firstName: "", lastName: "", phone: '', mobile1:"", mobile2:"",  companyname:"",address:"", emailid:"", referCode:"", selectedItems:[] , phonetype : ""};
    areaList = [];
    phone = false; 
    isSuperDealer:boolean = false;
    validateMessage:string = '';
    

    dropdownSettings = {};
    constructor(public thisDialogRef: MdDialogRef<DistributorCreateDialogComponent>, @Inject(MD_DIALOG_DATA) public distributorDetail: any,  private distributorService: DistributorServiceService, public authenticationService: AuthenticationService,private loaderService: LoaderService,public dialog: MdDialog) { }
     firstFormControl = new FormControl('', [
         Validators.required]);
         lastFormControl = new FormControl('', [
            Validators.required]);
            addressFormControl = new FormControl('', [
                Validators.required]);

            
            phoneFormControl = new FormControl('', [
                    Validators.required]);

    
     getAreasName() {
        this.loaderService.display(true);
         var input = { userId: this.authenticationService.loggedInUserId(), appType: this.authenticationService.appType() };
         this.distributorService.getAllArea(input)
             .subscribe(
             output => this.getAreasNameResult(output),
             error => {
                 //console.log("error in distrbutors");
                 this.loaderService.display(false);
             });
     }
     getAreasNameResult(output) {
        this.loaderService.display(false);
         //console.log(output);
         if (output && output.data) {
             
             for (let area of output.data) {
                 var areaDetails = { "id": area.areaid, "itemName": area.areaname, };
                 this.areaList.push(areaDetails);
             }
         }
     }
     onSubmit() {
         //console.log(this.dist);

        

         this.loaderService.display(true);
         var input:any = {
             "User": {
                "pwd":this.dist.phone,"user_type": "dealer", "TransType": "create","referCode": this.dist.referCode ,"firstname": this.dist.firstName,  "lastname": this.dist.lastName, "companyname":this.dist.companyname,"address":this.dist.address, "loginid": this.authenticationService.loggedInUserId(), "mobileno": this.dist.phone, "mobileno_one":this.dist.mobile1, "mobileno_two":this.dist.mobile2,  "emailid": this.dist.emailid,"dealer_mobileno": this.authenticationService.dealerNo(), "apptype": this.authenticationService.appType() , "phonetype": this.dist.phonetype
             }
         }
         //console.log(input);
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
             input.User.TransType = "update";
             if(this.validateCreateDistributor()){
             this.distributorService.updateDistributor(input)
                 .subscribe(
                 output => this.onSubmitResult(output),
                 error => {
                     //console.log("error in distrbutors");
                     this.loaderService.display(false);
                 });

                }
         }
         else {
            if(this.validateCreateDistributor()){
             this.distributorService.createDistributor(input)
                 .subscribe(
                 output => this.onSubmitResult(output),
                 error => {
                     //console.log("error in distrbutors");
                     this.loaderService.display(false);
                 });
                }
         }
     }
     onSubmitResult(result) {
         //console.log(result);
         this.loaderService.display(false);
         if (result.result == 'success') {
         this.loaderService.display(false);             
            if (this.distributorDetail) {
                this.thisDialogRef.close('success');
               
            }
            else{
                let data = {id:result.data.user_id}
                this.openStockDialog(data);
                
                

            }
            
         }
         else{
             
         }
     }




     getDetails() {
         if (this.distributorDetail) {
             this.phone = true;
             var areatime =[];
             this.phoneFormControl = new FormControl({valid: true}, [
             Validators.required]);
             this.dist.firstName = this.distributorDetail.firstname;
             this.dist.lastName = this.distributorDetail.lastname;
             this.dist.phone = this.distributorDetail.mobileno;
             this.dist.mobile1 = this.distributorDetail.mobileno_one;
             this.dist.mobile2 = this.distributorDetail.mobileno_two;
             this.dist.companyname = this.distributorDetail.companyname;
             this.dist.address = this.distributorDetail.address;
             this.dist.emailid = this.distributorDetail.emailid;
             this.dist.referCode = this.distributorDetail.reference_code;
             this.dist.phonetype = this.distributorDetail.phonetype;
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
            width: '70%',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if( result == 'success'){
                this.thisDialogRef.close('success');
            }
        });
    }
     onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }

    validateCreateDistributor(){
        var validate : string = '1';
        switch(validate){
            case "1" : {
                if(this.dist.address == ''){
                    this.validateMessage = 'Enter Distributors Address';
                }
        }
            case '2' : {
                if(this.dist.phone == ''){
                    this.validateMessage = 'Enter Phone Number';
                }     
        }
            case '3' : {
                if(this.dist.lastName == ''){
                    this.validateMessage = "Enter Last name";
                }
        }
            case '4' : {
                if(this.dist.firstName == ''){
                    this.validateMessage = "Enter First name";
                }
            
        }                
            case '6' : {
            if(this.dist.firstName && this.dist.lastName && this.dist.phone && this.dist.address){
                this.validateMessage = "";
                return true;
            }
        }
    }
    }

    numberEvent(e:any){
        console.log(e);
            if(isNaN(e.key) || e.key == ''){
                e.preventDefault();
            }
    }


     ngOnInit() {
         console.log(this.distributorDetail);

         if(this.authenticationService.isSuperDelear){
            this.isSuperDealer = true;
          }
          else{
            this.isSuperDealer = false;
          }
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



