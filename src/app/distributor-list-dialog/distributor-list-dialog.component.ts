import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
@Component({
  selector: 'app-distributor-list-dialog',
  templateUrl: './distributor-list-dialog.component.html',
  styleUrls: ['./distributor-list-dialog.component.css']
})
export class DistributorListDialogComponent implements OnInit {
  distributors = [];
  suppliers = [];
  distributorID = "";
  supplierID = "";
  constructor(public thisDialogRef: MdDialogRef<DistributorListDialogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService) { }
  tabPanelView: string = "suppliers";
  showTabPanel(panelName) {
    this.tabPanelView = panelName;

  }
  getDistributors() {
    this.loaderService.display(true);
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 200 } }
    console.log(input);
    this.distributorService.getAllDistributors(input)
      .subscribe(
      output => this.getDistributorsResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getDistributorsResult(data) {
    
    this.loaderService.display(false);
    if (data.result == 'success') {
      this.distributors = data.data;
    }
  }
  getSuppliers() {
    this.loaderService.display(true);
    let input = { "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() };
    this.distributorService.getAllSuppliers(input)
      .subscribe(
      output => this.getSuppliersResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getSuppliersResult(result) {
    this.loaderService.display(false);
    console.log(result);
    if (result.result == 'success') {
      this.suppliers = result.data;

    }
  }
  forWardOrder() {
    this.loaderService.display(true);
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
        this.loaderService.display(false);
      });

  }
  forWordOrderResult(result) {
    this.loaderService.display(false);
    
    if (result.result == "success") {
      this.Closedailog();
    }
  }
  assignOrder(){
    this.loaderService.display(true);
    let input = {
      "order": {
        "apptype": this.authenticationService.appType(), "createdthru": "website",
        "from": this.authenticationService.loggedInUserId(),
        "loginid": this.authenticationService.loggedInUserId(),
        "actiontype":"reassigned",
        "userid":this.authenticationService.loggedInUserId(),
        "orderid": this.orderDetail.order_id, "orderstatus": "assigned", "product_type": "cans",
        "quantity": this.orderDetail.quantity, "to": this.supplierID,
        "usertype": this.authenticationService.userType()
      }
    }
    //let input ={"apptype":"moya","createdthru":"website","from":"289","loginid":"289","orderid":"17193","orderstatus":"ordered","product_type":"cans","quantity":"3","to":"1650","usertype":"dealer"}
    this.distributorService.assingOrder(input)
      .subscribe(
      output => this.assignOrderResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  assignOrderResult(result){
    console.log(result);
    this.loaderService.display(false);
    if (result.result == "success") {
      this.Closedailog();
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  Closedailog() {
    this.thisDialogRef.close('success');
  }
  ngOnInit() {
    this.getDistributors();
    this.getSuppliers();
  }

}
