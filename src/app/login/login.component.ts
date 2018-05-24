import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LoaderService } from '../login/loader.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as moment from 'moment';
import * as _ from 'underscore';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginDetails: any = { username: "", password: "" };
    errorMsg: string = "";
    hide = true;
    username = new FormControl('', [
        Validators.required]);
    password = new FormControl('', [
        Validators.required]);
    polygonArray = [];
    distributors = [];
    supplierList:any = [];
    LastfilterRecords = false;

    constructor(private router: Router, private authenticationService: AuthenticationService , private distributorService: DistributorServiceService , private loaderService: LoaderService) { }

    ngOnInit() {
    }
    login() {

        this.authenticationService.login(this.loginDetails.username, this.loginDetails.password)
            .subscribe(
            output => this.loginResult(output),
            error => {
                //console.log("Logged in falied");
            });
    }
    loginResult(data) {
        if (data.data.user) {
            //console.log("Logged in and should navigate to diifrent page");
            localStorage.setItem('currentUser', JSON.stringify(data.data.user));
            this.authenticationService.CurrentSession = JSON.parse(localStorage.getItem('currentUser'));
            this.authenticationService.isSuperDelear = this.authenticationService.getSupperDelear();
            this.authenticationService.salesLogin = this.authenticationService.newSalesFunction();
          //  this.getDashboardDetails();
            this.getPolygonDistributors();
            this.getDistributors();
            this.getSupplier();
            this.router.navigate(['/orders']);


        }
        else {
            this.errorMsg = "Invalid Credentials";

        }
    }





    getPolygonDistributors() {

        var input = { area: { user_type: "dealer", user_id: "0", "apptype": this.authenticationService.appType() } };
      
        this.distributorService.getpolygonByDistributor(input)
          .subscribe(
          output => this.getPolygonDataResult(output),
          error => {
            //console.log("falied");
           
          });
      }
      getPolygonDataResult(output) {
          if(output.data && output.data.length > 0){
            if (output.data && output.data.length > 0) {
               var polygonArray = [];
                for (let data of output.data) {
          
                  if (data.polygonvalue && data.polygonvalue.length > 0) {
                    for (let polygon of data.polygonvalue) {
                      polygon.color = '';
                      polygon.user_id = data.user_id;
                      polygon.distributorName = data.username;
                      polygon.supplier = data.suppliers;
                      polygon.mobileno = data.mobileno;
                      polygon.mobileno1 = data.mobileno1;
                      polygon.mobileno2 = data.mobileno2;                      
                      polygonArray.push(polygon);
          
                    }
                  }
          
                }
              }
            localStorage.setItem('polygons', JSON.stringify(polygonArray));
            this.authenticationService.polygons = JSON.parse(localStorage.getItem('polygons'));
          
           
           
          }

        
        
      }


      getDistributors() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": null, "apptype": this.authenticationService.appType(), "pagesize": 1000 } }
        
      
          this.distributors = [];
         
        
        this.distributorService.getAllDistributors(input)
          .subscribe(
          output => this.getDistributorsResult(output),
          error => {
            //console.log("error in distrbutors");
            this.loaderService.display(false);
          });
      }
      getDistributorsResult(data) {
        if (data.result == 'success') {
          let distributorCopy = [];
    
          if (data.data && data.data.length) {
            _.each(data.data, function (i, j) {
              let details: any = i;
              details.fullName = details.firstname + " " + details.lastname
              distributorCopy.push(details);
    
            });
            localStorage.setItem('distributors', JSON.stringify(distributorCopy));
            this.authenticationService.distributors = JSON.parse(localStorage.getItem('distributors'));
        
            
          }
        }


       
      }


      getSupplier() {
        let input = { "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() , "transtype":"website"}; 
        this.distributorService.getAllSuppliers(input)
          .subscribe(
          output => this.getSupplierResult(output),
          error => {
            this.loaderService.display(false);
          });
      }
      getSupplierResult(data) {
        if (data.result == 'success') {
          let supplierCopy = [];
    
          if (data.data && data.data.length) {
            _.each(data.data, function (i, j) {
              let details: any = i;
              details.fullName = details.firstname + " " + details.lastname
              supplierCopy.push(details);
    
            });
    
            localStorage.setItem('suppliers', JSON.stringify(supplierCopy));
            this.authenticationService.suppliers = JSON.parse(localStorage.getItem('suppliers'));
          }
        }
      
      }







    getDashboardDetails() {
        let input = { "root": { "user_id": this.authenticationService.loggedInUserId(), "dealerid": 289, "user_type": this.authenticationService.userType(), "apptype": this.authenticationService.appType(), "transtype": "allorderscount", "fromdate": moment(new Date()).format('YYYY-MM-DD'), "todate": moment(new Date()).add(-1, 'days').format('YYYY-MM-DD') } };
        this.authenticationService.getDashboardDetails(input)
            .subscribe(
            output => this.getDashboardDetailsResult(output),
            error => {
                //console.log("Logged in falied");
            });


    }
    getDashboardDetailsResult(result) {
        //console.log(result);
        if (result.result == 'success') {
            localStorage.setItem('dashboardDetails', JSON.stringify(result.data));
            this.authenticationService.dashBoardDetails = result.data;

        }
    }
}
