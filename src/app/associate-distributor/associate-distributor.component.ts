import { Component, OnInit , Inject } from '@angular/core';
import { MdDialogRef , MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';




@Component({
  selector: 'app-associate-distributor',
  templateUrl: './associate-distributor.component.html',
  styleUrls: ['./associate-distributor.component.css']
})
export class AssociateDistributorComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AssociateDistributorComponent> , private authenticationService: AuthenticationService , private distributorService: DistributorServiceService,  @Inject(MD_DIALOG_DATA) public Details: any ) { }

  allDistributors:any = [];
  noDistributors:boolean = false;
  searchDistributor = "";
  distributorsCopy:any = [];
  distributorID :any = "";






  associateDistributor(){
    let input = {"root":{"userid": this.authenticationService.loggedInUserId() ,"customerid":this.Details.userid ,"dealerid": this.distributorID ,"apptype": this.authenticationService.appType() ,"usertype": this.authenticationService.userType() ,"devicetype":"website" }};
    console.log(input , 'Associate dist input');
    this.distributorService.associateCustomerToDistributor(input)
    .subscribe(
      output => this.associateDistributorResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }
  associateDistributorResult(result){
    console.log(result , 'result after asssociation');
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }



  getAllDistributors(){
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "getalldistributors", "apptype": this.authenticationService.appType(), "pagesize": 1000 } };
    this.distributorService.getAllDistributors(input)
    .subscribe(
        output => this.getAllDistributorsResult(output),
        error => {
            //console.log("error in distrbutors");
        });
  }
  getAllDistributorsResult(result){
    if(result && result.data){
      let distCopyDetails = [];
      _.each(result.data, function (i, j) {
        let details: any = i;
        details.fullName = details.firstname + " " + details.lastname
        distCopyDetails.push(details);
      });
      this.allDistributors = distCopyDetails;
      this.distributorsCopy = distCopyDetails;
      this.noDistributors = false;
      console.log(this.allDistributors , 'distributors list');


    }
    else{
      this.allDistributors = [];
      this.noDistributors = true;
    }
  }

  searchDistrubutors() {
    let term = this.searchDistributor;
    this.allDistributors = this.distributorsCopy.filter(function (e) {
      return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.getAllDistributors();
    console.log(this.Details ,  'injected details');
  }

}
