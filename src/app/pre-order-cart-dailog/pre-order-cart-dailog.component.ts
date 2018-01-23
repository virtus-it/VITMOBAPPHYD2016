import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import {DeliverpreorderComponent} from '../deliverpreorder/deliverpreorder.component';
import { FormControl, Validators } from '@angular/forms';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';


@Component({
  selector: 'app-pre-order-cart-dailog',
  templateUrl: './pre-order-cart-dailog.component.html',
  styleUrls: ['./pre-order-cart-dailog.component.css']
})
export class PreOrderCartDailogComponent implements OnInit {
  stateCtrl: FormControl;
  filteredDistributor: Observable<any[]>;
  constructor(public dialog: MdDialog,public thisDialogRef: MdDialogRef<PreOrderCartDailogComponent>,   private authenticationService: AuthenticationService, private distributorService: DistributorServiceService,) {
    this.stateCtrl = new FormControl();
    this.filteredDistributor = this.stateCtrl.valueChanges

    .startWith(null)
      .map(dist => dist ? this.filterDistributors(dist) : this.distributors.slice());
   }

   distributors: any = [];
   //FilterInputs
  filter: any = { "distributorid": "", "customerNumber": "", "searchtype": "", "weekdays": "", "days": "", "searchtext": "", "date":null , "last_orderid":null };
 

  deliverPreOrder() {
    let dialogRefEditCustomer = this.dialog.open(DeliverpreorderComponent, {

        width: '600px',
        data: ''
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if(result == "success"){
        }

    });

}

//getting distributors


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
    let distributorCopy = [];

    if (data.data && data.data.length) {
      _.each(data.data, function (i, j) {
        let details: any = i;
        details.fullName = details.firstname + " " + details.lastname
        distributorCopy.push(details);

      });
      this.distributors = distributorCopy;
    }
  }
}

//filtered distributors

filterDistributors(name: string) {
  console.log(name);
  let finalDistributors = this.distributors.filter(dist =>
    dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  console.log(finalDistributors);
  if (finalDistributors && finalDistributors.length > 0) {
    let findDistributor: any = {};

    findDistributor = _.find(finalDistributors, function (k, l) {
      let distDetails: any = k;
      return distDetails.fullName == name;
    });

    if (findDistributor) {
      this.filter.distributorid = findDistributor.userid;
    }

  }
  return finalDistributors;
}


onCloseCancel(){
  this.thisDialogRef.close('Cancel');
}


  ngOnInit() {
    this.getDistributors();
  }

}
