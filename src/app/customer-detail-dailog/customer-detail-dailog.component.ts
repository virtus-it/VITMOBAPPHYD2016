import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SelectProductsForassingComponent } from '../select-products-forassing/select-products-forassing.component';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';

@Component({
  selector: 'app-customer-detail-dailog',
  templateUrl: './customer-detail-dailog.component.html',
  styleUrls: ['./customer-detail-dailog.component.css']
})
export class CustomerDetailDailogComponent implements OnInit {
  DistributorCtrl: FormControl;
  filteredDistributors: Observable<any[]>;

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<CustomerDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog,private distributorService: DistributorServiceService, private orderLandingService: OrderLandingService,private loaderService: LoaderService) {
    this.DistributorCtrl = new FormControl();
    this.filteredDistributors = this.DistributorCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.distributors.slice());
   }
  customerOrderDetails = [];
  noDataError = "";
  distributors: any = [];
  LastfilterRecords = false;
  filterType = {distributorid: ""};
  distributorID = "";


  findDistributors(name: string) {
    //console.log(name);
    let finalDistributors = this.distributors.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    //console.log(finalDistributors);
    if (finalDistributors && finalDistributors.length > 0) {
      let findDistributor: any = {};

      findDistributor = _.find(finalDistributors, function (k, l) {
        let distDetails: any = k;
        return distDetails.fullName == name;
      });

      if (findDistributor) {
        this.filterType.distributorid = findDistributor.userid;
      }


    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        
        this.getDistributors();
      }


    }
    return finalDistributors;
  }

  getDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 200 } }
    if (this.distributors && this.distributors.length) {
      let lastDistributor: any = _.last(this.distributors);
      if (lastDistributor) {
        input.root.lastuserid = lastDistributor.userid;
      }


    }
    else {
      this.distributors = [];
      input.root.lastuserid = null;
    }

    //console.log(input);
    this.loaderService.display(true);
    this.distributorService.getAllDistributors(input)
      .subscribe(
      output => this.getDistributorsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getDistributorsResult(data) {
    //console.log(data);
    this.loaderService.display(false);
    if (data.result == 'success') {
      let distributorCopy = [];

      if (data.data && data.data.length) {
        _.each(data.data, function (i, j) {
          let details: any = i;
          details.fullName = details.firstname + " " + details.lastname
          distributorCopy.push(details);

        });

        this.distributors = _.union(this.distributors, distributorCopy);
        //  this.distributors = distributorCopy;
      }
    }
    else {
      this.LastfilterRecords = true;
    }
  }






  getCustomerOrder() {
    this.loaderService.display(true);
    let input = { "order": { "userid": this.orderDetail.order_by, "status": "all", "lastrecordtimestamp": "15", "pagesize": "100", "apptype": this.authenticationService.appType(), "usertype": "customer", "createdthru": "website" } }
    this.orderLandingService.getOrderByPaymentCycle(input)
      .subscribe(
      output => this.getCustomerOrderResult(output),
      error => {
        //console.log("error in order details");
        this.loaderService.display(false);
      });
  }
  getCustomerOrderResult(result) {
    //console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.customerOrderDetails = result.data;
    }
    else {
      this.noDataError = "No more data";

    }
  }


  openProductAssingDialog(){
    let data = {orderDetails:this.orderDetail,disributorId:this.filterType.distributorid};

    let dialogRef = this.dialog.open(SelectProductsForassingComponent, {
       width: '90%',
        data: data
    });
    dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);

      if(result == 'success'){
        this.forWardOrder();
      }
    });

  }

  forWardOrder() {
    this.loaderService.display(true);
    let input = {
      "order": {
        "apptype": this.authenticationService.appType(), "createdthru": "website",
        "from": this.authenticationService.loggedInUserId(),
        "loginid": this.authenticationService.loggedInUserId(),
        "orderid": this.orderDetail.order_id, "orderstatus": "ordered", "product_type": "cans",
        "quantity": this.orderDetail.quantity, "to": this.filterType.distributorid,
        "usertype": this.authenticationService.userType()
      }
    }
    //let input ={"apptype":"moya","createdthru":"website","from":"289","loginid":"289","orderid":"17193","orderstatus":"ordered","product_type":"cans","quantity":"3","to":"1650","usertype":"dealer"}
    this.distributorService.forwardOrder(input)
      .subscribe(
      output => this.forWordOrderResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  forWordOrderResult(result) {
    this.loaderService.display(false);

    if (result.result == "success") {
      this.thisDialogRef.close('Cancel');
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    //console.log(this.orderDetail);
    this.getCustomerOrder();
    this.getDistributors();
  }

}
