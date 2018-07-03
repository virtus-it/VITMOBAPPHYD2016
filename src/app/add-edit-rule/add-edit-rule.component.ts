import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Component({
  selector: 'app-add-edit-rule',
  templateUrl: './add-edit-rule.component.html',
  styleUrls: ['./add-edit-rule.component.css']
})
export class AddEditRuleComponent implements OnInit {

  promocodeCtrl: FormControl;
  filteredPromoCodes: Observable<any[]>;

  pointsCtrl: FormControl;
  filteredPoints: Observable<any[]>;

  constructor( public thisDialogRef: MdDialogRef<AddEditRuleComponent> , private distributorService: DistributorServiceService ,  private authenticationService: AuthenticationService, private followupService: FollowUpService, ) {

    this.promocodeCtrl = new FormControl();
    this.filteredPromoCodes = this.promocodeCtrl.valueChanges
      .startWith(null)
      .map(promo => promo ? this.findPromoCodes(promo) : this.allPromoCodes.slice());

      this.pointsCtrl = new FormControl();
    this.filteredPoints = this.pointsCtrl.valueChanges
      .startWith(null)
      .map(points => points ? this.findPoints(points) : this.allPoints.slice());



   }


  allPromoCodes:any = [];
  allPoints:any = [];

  ruleInput = {"type":"promocode" , "code":"" , "value":""};

  getAllPromoCodes(){
    let input = {"offer":{"transtype":"getall" , "apptype":this.authenticationService.appType()}};
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.getAllPromoCodesResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  getAllPromoCodesResult(result){
    if(result.result == 'success'){
      this.allPromoCodes = result.data;
      console.log(result.data);
    }
    else{
      this.allPromoCodes = [];
    }
  }

  findPromoCodes(name : string){

        let finalPromoCodes = this.allPromoCodes.filter(promo =>
          promo.promocode.toLowerCase().indexOf(name.toLowerCase()) === 0);
        if (finalPromoCodes && finalPromoCodes.length > 0) {
          let findPromocode: any = {};
          findPromocode = _.find(finalPromoCodes, function (k, l) {
            let promoDetails: any = k;
            return promoDetails.promocode == name;
          });
          if (findPromocode) {
           this.ruleInput.code = findPromocode.promocode;
          }
        }
        return finalPromoCodes;
  }







  getAllPoints(){
    let input = {"User":{"TransType":"getpointsmst"}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getAllPointsResult(output),
    error => {    
    });
  }

  getAllPointsResult(result){
    if(result.result == 'success'){
      this.allPoints = result.data;
    }
  }


  findPoints(name : string){

    let finalPoints = this.allPoints.filter(points =>
      points.description.toLowerCase().indexOf(name.toLowerCase()) === 0);
    if (finalPoints && finalPoints.length > 0) {
      let findPoints: any = {};
      findPoints = _.find(finalPoints, function (k, l) {
        let pointsDetails : any = k;
        return pointsDetails.description == name;
      });
      if (findPoints) {
       this.ruleInput.code = findPoints.description;
      }
    }
    return finalPoints;
}





  onCloseModal(){
    this.thisDialogRef.close('cancel');
  }


  submitRule(){
    let input = {"offer":{"userid": this.authenticationService.loggedInUserId() , apptype : this.authenticationService.appType() , "type": this.ruleInput.type  , "code": this.ruleInput.code , "value": this.ruleInput.value , TransType:"addrule" }} ;
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.submitRuleResult(output),
    error => {      
    });
  }
  submitRuleResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }


  updateRule(){
    let input = {"offer":{"userid": this.authenticationService.loggedInUserId() , apptype : this.authenticationService.appType() , "type": this.ruleInput.type  , "code": this.ruleInput.code , "value": this.ruleInput.value , TransType:"updaterule" , "id":"123" }};
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.updateRuleResult(output),
    error => {      
    });
  }
  updateRuleResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }


  deleteRule(){
    let input = {"User":{"userid": this.authenticationService.loggedInUserId() , apptype : this.authenticationService.appType() ,  TransType:"deleterule" , "id":"123" }};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.deleteRuleResult(output),
    error => {      
    });
  }
  deleteRuleResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }









  ngOnInit() {
    this.getAllPromoCodes();
    this.getAllPoints();
  }

}
