import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
@Component({
  selector: 'app-distributor-list-dialog',
  templateUrl: './distributor-list-dialog.component.html',
  styleUrls: ['./distributor-list-dialog.component.css']
})
export class DistributorListDialogComponent implements OnInit {
  distributors = [];
  distributorID = "";
  constructor(public thisDialogRef: MdDialogRef<DistributorListDialogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService) { }
  getDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
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
  forWardOrder() {
    let input = {
      "order": {
        "apptype": this.authenticationService.appType(), "createdthru": "website",
        "from": this.authenticationService.loggedInUserId(),
        "loginid": this.authenticationService.loggedInUserId(),
        "orderid": this.orderDetail.order_id, "orderstatus": "ordered", "product_type": "cans",
        "quantity": this.orderDetail.quantity, "to": this.distributorID,
        "usertype": this.authenticationService.userType()
      }
    }
    //let input ={"apptype":"moya","createdthru":"website","from":"289","loginid":"289","orderid":"17193","orderstatus":"ordered","product_type":"cans","quantity":"3","to":"1650","usertype":"dealer"}
    this.distributorService.forwardOrder(input)
      .subscribe(
      output => this.forWordOrderResult(output),
      error => {
        console.log("error in distrbutors");
      });

  }
  forWordOrderResult(result) {

    console.log(result);
    if (result.result == "success") {
      this.onCloseCancel();
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    this.getDistributors();
  }

}
