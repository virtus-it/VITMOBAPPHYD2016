import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
import { SelectProductsForassingComponent } from '../select-products-forassing/select-products-forassing.component';
import * as _ from 'underscore';
@Component({
  selector: 'app-distributor-list-dialog',
  templateUrl: './distributor-list-dialog.component.html',
  styleUrls: ['./distributor-list-dialog.component.css']
})
export class DistributorListDialogComponent implements OnInit {
  distributors = [];
  suppliers = [];
  autoAssign = false;
  distributorsCopy = [];
  suppliersCopy = [];
  distributorID = "";
  supplierID = "";
  searchDistTerm = "";
  searchSupplierTerm = "";
  superDealer =true;
  constructor(public thisDialogRef: MdDialogRef<DistributorListDialogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, private distributorService: DistributorServiceService,public dialog: MdDialog, private authenticationService: AuthenticationService, private loaderService: LoaderService) { }
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
    let distCopyDetails = [];
    if (data.result == 'success') {
      _.each(data.data, function (i, j) {
        let details: any = i;
        details.fullName = details.firstname + " " + details.lastname
        distCopyDetails.push(details);

      });
      this.distributors = distCopyDetails;
      this.distributorsCopy = distCopyDetails;

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
    let supplierCopyDetails = [];
    if (result.result == 'success') {
      _.each(result.data, function (i, j) {
        let details: any = i;
        details.fullName = details.firstname + " " + details.lastname
        supplierCopyDetails.push(details);

      });
      this.suppliers = supplierCopyDetails;
      this.suppliersCopy = supplierCopyDetails;
      if (this.orderDetail.supplierdetails) {
        this.supplierID= this.orderDetail.supplierdetails.userid;
      }
      
      // before this.orderDetail.supplierid   newchange this.orderDetail.supplierdetails.userid;
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
  assignOrder() {
    this.loaderService.display(true);
    let input = {
      "order": {
        "apptype": this.authenticationService.appType(), "createdthru": "website",
        "from": this.authenticationService.loggedInUserId(), "autoassign":this.autoAssign,
        "loginid": this.authenticationService.loggedInUserId(),
        "actiontype": "reassigned" ,
        "reason":"Order Confirmed: "+ this.orderDetail.brandname +"  "+ this.orderDetail.prod_type+"  water cans " + (this.orderDetail.quantity) + " with order id: " +this.orderDetail.order_id + " from Moya-The Waterman App, is confimed by the supplier. Please call our customer care centre at mobile: 9863636314/15 for any queries.", 
        "userid": this.authenticationService.loggedInUserId(),
        "orderid": this.orderDetail.order_id, "orderstatus": "assigned", "product_type": "cans",
        "quantity": this.orderDetail.quantity, "to": this.supplierID,
        "usertype": this.authenticationService.userType()
      }
    }
    //let input ={"apptype":"moya","createdthru":"website","from":"289","loginid":"289","orderid":"17193","orderstatus":"ordered","product_type":"cans","quantity":"3","to":"1650","usertype":"dealer"}
    console.log(input);
    this.distributorService.assingOrder(input)
      .subscribe(
      output => this.assignOrderResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  assignOrderResult(result) {
    console.log(result);
    this.loaderService.display(false);
    if (result.result == "success") {
      this.Closedailog();
    }
  }
  searchDistrubutors() {
    let term = this.searchDistTerm;
    this.distributors = this.distributorsCopy.filter(function (e) {
      return e.fullName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }
  searchSupplier() {
    let term = this.searchSupplierTerm;

    this.suppliers = this.suppliersCopy.filter(function (e) {
      return e.fullName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }
  openProductAssingDialog() {
    
    let data = {orderDetails:this.orderDetail,disributorId:this.distributorID};

    let dialogRef = this.dialog.open(SelectProductsForassingComponent, {
       width: '90%',
        data: data
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
       
      if(result == 'success'){
        this.forWardOrder();
      }
    });
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
    this.superDealer = this.authenticationService.getSupperDelear();
    console.log(this.orderDetail);
  }

}
