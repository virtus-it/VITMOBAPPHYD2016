import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-edit-points',
  templateUrl: './edit-points.component.html',
  styleUrls: ['./edit-points.component.css']
})
export class EditPointsComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<EditPointsComponent> ,  private distributorService: DistributorServiceService ,  @Inject(MD_DIALOG_DATA) public Detail: any) { }

  customerPoints:any = [];
  customerPointsDetails:any = [];
  distributorPoints:any = [];
  distributorPointsDetails:any = [];
  noPoints:boolean = false;
  errorMessage :boolean= false;
  isDesc:boolean = false;
  column:any;

  getAllPointsCustomer(){
    let input = {"User":{"TransType":"getpoints","userid": this.Detail.userid,"usertype":"customer"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getAllPointsResult(output),
    error => {
    });
  }
  getAllPointsResult(result){
    if(result.result == 'success'){
      this.customerPoints = result.data;
    }
    else{
      this.noPoints = true;
    }

  }

  getPointsDetails(){
    let input = {"User":{"TransType":"getpointsdetails","userid":this.Detail.userid,"usertype":"customer"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getPointsDetailsResult(output),
    error => {      
    });
  }
  getPointsDetailsResult(result){
    if(result.result == 'success'){
      if(result.data && result.data.length > 0){    
      _.each(result.data , function(i , j){
        let details:any = i;
      if(details.status == 'delivered'){
        details.status = 'Order Completed';
      }
      else if(details.status == 'signup'){
        details.status = 'Signup';
      }
      else if(details.status == 'referalbonus'){
        details.status = 'Referal Bonus';
      }
      

    });
    this.customerPointsDetails = result.data;
    
      this.errorMessage = false;
  }
  else{
    this.errorMessage = true;
  }
    }

  }

  getAllPointsDistributor(){

    let input = {"User":{"TransType":"getpoints","userid": this.Detail.userid,"usertype":"dealer"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getAllPointsDistributorResult(output),
    error => {
        //console.log("error in customer");
       
    });
  }
  getAllPointsDistributorResult(result){
    if(result.result == 'success'){
      this.distributorPoints = result.data;
    }
    else{
      this.noPoints = true;
    }
    
  }


  getPointsDistributorDetails(){
    let input = {"User":{"TransType":"getpointsdetails","userid":this.Detail.userid,"usertype":"customer"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getPointsDistributorDetailsResult(output),
    error => {
        //console.log("error in customer");
       
    });
  }
  getPointsDistributorDetailsResult(result){
    if(result.result == 'success'){
      _.each(result.data , function(i , j){
        let details:any = i;
        if(details.status == 'accept'){
          details.status = 'Order Accepted';
        }
        else if(details.status == 'ontime'){
          details.status = 'On time Delivery';
        }
        else if(details.status == 'sameday'){
          details.status = 'Same Day Delivery';
        }
    });
      this.distributorPointsDetails = result.data;
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }

  sortTable(parm) {
    if(this.isDesc == true) {
      this.isDesc = false;
      this.customerPointsDetails.sort((a, b) => {
          if(a[parm]){
       return a[parm].localeCompare(b[parm]);
    }
      });
      this.column = parm;
      console.log('customerPointsDetails List');
      console.log(this.customerPointsDetails);
    } else {
      this.isDesc = true;
      this.customerPointsDetails.sort((a, b) => {
        if(b[parm]){
        return b[parm].localeCompare(a[parm]);
    }
     });
     this.column = parm;
   }
  }

  ngOnInit() {
    console.log(this.Detail);
    if(this.Detail.usertype == 'customer'){
    this.getAllPointsCustomer();
    }
    else{
      this.getAllPointsDistributor();
    }
  }

}
