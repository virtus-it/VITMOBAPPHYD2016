import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from './order-landing.service';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { EditQuantityDailogComponent } from '../edit-quantity-dailog/edit-quantity-dailog.component';
import { OrderCoverageDetailDailogComponent } from '../order-coverage-detail-dailog/order-coverage-detail-dailog.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { SupplierService } from '../supplier/supplier.service';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import { CustomerDetailDailogComponent } from '../customer-detail-dailog/customer-detail-dailog.component';
import { DistributorOrderListComponent } from '../distributor-order-list/distributor-order-list.component';
import { SupplierOrderListComponent } from '../supplier-order-list/supplier-order-list.component';
import { SocketmessagesComponent } from '../socketmessages/socketmessages.component';
import { InboxComponent } from '../inbox/inbox.component';
import { ProductsService } from '../products/products.service';
import { NgxGaugeModule } from 'ngx-gauge';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  

  templateUrl: './order-landing.component.html',
  styleUrls: ['./order-landing.component.css']
})
export class OrderLandingComponent implements OnInit {
  DistributorCtrl: FormControl;
  filteredDistributors: Observable<any[]>;
  SupplierCtrl: FormControl;
  filteredSupplier: Observable<any[]>;
  superDealer = true;
  SupplierOrderList=[];
  ordersClickMore = true;
  followUpResultStatus:any = "";
  categoryList:any = [];


  //for guage
  timeRemaining:any = '';
  guageValue:any = "";
  guageMinimum = -12;
  guageMaximum = 12;
  // min:any = -10000;
  // max:any = 10000;
  thresholdConfig = {
    '-12': {color: 'red'},
      '1': {color: 'orange'},
      '3': {color: 'green'}
  };
  gaugeType = "arch";

  gaugeLabel = '';
  gaugeAppendText = "Hours";
  guageBackGround = '#ff0000'

  orderedDate:any = "";
  orderedHour:any = "";
  deliveryDate:any = "";
  deliveryHour:any = "";
  nextDate:any = "";
  nextDaytimeRemainingHours:any = "";
  samedaytimeRemainingHours:any ="";
  currentHour:any = "";
  currentdate:any ="";



  //for guage ends here

    

  constructor(public dialog: MdDialog, private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, private orderLandingService: OrderLandingService, private supplierservice: SupplierService, private loaderService: LoaderService,private router:Router ,   private productService: ProductsService) {

    
    this.DistributorCtrl = new FormControl();
    this.filteredDistributors = this.DistributorCtrl.valueChanges
      .startWith(null)
      .map(dist => dist ? this.findDistributors(dist) : this.distributors.slice());
      this.SupplierCtrl = new FormControl();
      this.filteredSupplier = this.SupplierCtrl.valueChanges
        .startWith(null)
        .map(supplier =>supplier ? this.findSupplier(supplier) : this.supplierList.slice());

  }

  timesRemaining:any = [];
  distributors: any = [];
  supplierList:any = [];
  completeOrders:any =[];
  LastfilterRecords = false;
  showFilterDailog = false;
  selectedDistForFilter: any = "";
  orderListInput = { "order": { "userid": this.authenticationService.loggedInUserId(), "priority": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "status": "", "pagesize": 30, "last_orderid": null, "apptype": this.authenticationService.appType(), "createdthru": "website" } };
  tabPanelView: string = "forward";
  quickFilterView: any = "";
  forwardOrders: any = [];
  allOrders: any = [];
  distId:any="";
  time:any =""
  orderedTime:any="";
  currentTime:any= "";
  deliveryTime:any="";
  cantFilterMessage:any = '';
  filterRecords = false;
  forwardClickMore = true;
  orderClickMore = true;
  cantFilter = false;
  // forwardAddress:any = ""
  // allAddress:any = this.allOrders.orderby_address;
  completeClickMore = false;
  polygonArray = [];
  filterInput = { "order": { "pagesize": "30", "searchtype": "", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };

  globalFilterInput= { "order": { "pagesize": "30", "searchtype": "orderid", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };


//   {"order":{"userid":"289","usertype":"dealer","status":"ordered","last_orderid":"0",
// "searchtype":"category","searchtext":"Bailey, Bisleri","pagesize":"10","apptype":"moya"}}



  globalfilterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date:null };

  dropdownData = { selectedItems: [] };

  categoryProduct = { selectedItems : []};
  filterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date:null };
  dropdownSettings = {
    singleSelection: false,
    text: "Select Status",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    badgeShowLimit: 2,
    classes: "myclass custom-class myyy"
  };
  statusListForward = [{ "id": "pendingwithdistributor", "itemName": "Pending With Distributor" },
  { "id": "pendingwithsupplier", "itemName": "Pending With Supplier" },
  { "id": "ordered", "itemName": "Ordered" },
  { "id": "backtodealer", "itemName": "Back to dealer" },
  { "id": "delivered", "itemName": "Delivered" },
  { "id": "cancelled", "itemName": "Cancelled" },
  { "id": "doorlock", "itemName": "Doorlock" },
  { "id": "rejected", "itemName": "Rejected" },
  { "id": "notreachable", "itemName": "Not Reachable" },
  { "id": "cantdeliver", "itemName": "Can't Deliver" }];
  statusListAll = [
    { "id": "pendingwithsupplier", "itemName": "Pending With Supplier" },
    { "id": "ordered", "itemName": "Ordered" },
    { "id": "backtodealer", "itemName": "Back to dealer" },
    { "id": "delivered", "itemName": "Delivered" },
    { "id": "cancelled", "itemName": "Cancelled" },
    { "id": "doorlock", "itemName": "Doorlock" },
    { "id": "rejected", "itemName": "Rejected" },
    { "id": "ordered", "itemName": "Ordered" },
    { "id": "notreachable", "itemName": "Not Reachable" },
    { "id": "cantdeliver", "itemName": "Can't Deliver" }];

    statusListComplete = [{ "id": "pendingwithdistributor", "itemName": "Pending With Distributor" },
    { "id": "pendingwithsupplier", "itemName": "Pending With Supplier" },
    { "id": "ordered", "itemName": "Ordered" },
    { "id": "backtodealer", "itemName": "Back to dealer" },
    { "id": "delivered", "itemName": "Delivered" },
    { "id": "cancelled", "itemName": "Cancelled" },
    { "id": "doorlock", "itemName": "Doorlock" },
    { "id": "rejected", "itemName": "Rejected" },
    { "id": "notreachable", "itemName": "Not Reachable" },
    { "id": "cantdeliver", "itemName": "Can't Deliver" }];


    categories = [];
    
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
        this.globalfilterType.distributorid = findDistributor.userid;
      }


    }
    // else {
    //   if (name.length >= 3 && !this.LastfilterRecords) {
        
    //     this.getDistributors();
    //   }


    // }
    return finalDistributors;
  }


  deliverySlot(){
    let date  = moment(this.filterType.date).format('DD-MM-YYYY');
    this.filterInput.order.searchtext = date + " " + this.time;
  }
  findSupplier(name: string) {
    //console.log(name);
    let finalsupplier = this.supplierList.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    //console.log(finalsupplier);
    if (finalsupplier && finalsupplier.length > 0) {
      let findSupplier: any = {};

      findSupplier = _.find(finalsupplier, function (k, l) {
        let supplierDetails: any = k;
        return supplierDetails.fullName == name;
      });

      if (findSupplier) {
        this.filterType.supplierid = findSupplier.userid;
        this.globalfilterType.supplierid = findSupplier.userid;
      }


    }
  
    return finalsupplier;
  }
  showTabPanel(panelName) {
    // this.clearFilter();
    this.quickFilterView = "";
    this.tabPanelView = panelName;
    this.showFilterDailog =false;
    this.filterRecords = false;
    this.filterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date:null };
    this.filterInput = { "order": { "pagesize": "30", "searchtype": "", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };
    if(panelName== "forward"){
      this.getForwardOrderDetails(true);
    }
    else if(panelName== "allorder"){
      this.getAllOrderDetails(true);
    }
    // else if(panelName == 'complete'){
    //   this.getAllOrderDetails(true);
    //   this.getForwardOrderDetails(true);
    // }
    
    
    
  }
  showEditCustomer(orderDetails) {
    let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

      width: '700px',
      data: orderDetails
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
      if(result == 'success'){
      //console.log(`Dialog closed: ${result}`);
      this.clearFilter();
      }

    });

  }

  filterValidation(){
    if(this.filterInput.order.searchtype == ""){
      this.cantFilter = true;
    }
    else{
      this.cantFilter = false;
    }
  }
  showCoverageDetails(orderDetails) {
    let distributorId ="";
    if(orderDetails.distributor){
    distributorId = orderDetails.distributor.userid;
    }
    else{
      distributorId = "";
    }
    let modelData = { orders: orderDetails, polygons: this.polygonArray, distId:distributorId , distDetails: orderDetails.distributor  }
    let dialogRefCoverageDailog = this.dialog.open(OrderCoverageDetailDailogComponent, {
      width: '98%',
      data: modelData
    });
    dialogRefCoverageDailog.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getForwardOrderDetails(true);
        this.getAllOrderDetails(true);
        
      }

    });

  }
  showOrderDetails(orderData) {
    let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {

      width: '95%',
      data: orderData
    });
    dialogRefShowOrder.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result == 'success'){
        this.refresh();
      }


    });

  }
  editQuanity(orderDetails) {
    let dialogRefEditQun = this.dialog.open(EditQuantityDailogComponent, {

      width: '500px',
      data: orderDetails
    });
    dialogRefEditQun.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getForwardOrderDetails(true);
        this.getAllOrderDetails(true);
        this.refresh();

      }

    });

  }
  showFollowUp(orderDetails) {
    let data = {"id":orderDetails.order_id,"firstname" :orderDetails.orderby_firstname,"lastName" :orderDetails.orderby_lastname,"type":"order","mobileno":orderDetails.orderby_mobileno, "followupstatus":orderDetails.followupstatus , "refresh":"" };
    let dialogRefFollow = this.dialog.open(FollowUpComponent, {

      width: '70%',
      data: data
    });
    dialogRefFollow.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(data.refresh == 'success'){
        if(this.tabPanelView=='forward'){
            this.getForwardOrderDetails(true);
           }
           else{
            this.getAllOrderDetails(true);
           }
      }
    });

  }
  showFollowUpDetails(orderDetails) {
    let data = {id:orderDetails.order_id,firstname :orderDetails.customer.firstname,lastName :orderDetails.customer.lastname,type:"order"};
    let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {

      width: '80%',
      data: data
    });
    dialogRefFollowDetails.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);


    });

  }

  getForwardOrderDetails(firstcall) {
    this.orderListInput.order.status = 'forwardedorders';
    if (this.forwardOrders && this.forwardOrders.length && !firstcall) {
      let lastForwardOrder: any = _.last(this.forwardOrders);
      if (lastForwardOrder) {
        this.orderListInput.order.last_orderid = lastForwardOrder.order_id;
      }

    }
    else {
      this.forwardOrders = [];
      this.orderListInput.order.last_orderid = null;
    }
    let forwardInput = this.orderListInput;
    //console.log(forwardInput);
    this.loaderService.display(true);
    this.orderLandingService.getOrderList(forwardInput)
      .subscribe(
      output => this.getForwardOrderDetailsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getForwardOrderDetailsResult(result) {
    // this.forwardOrders = result.data;
    this.loaderService.display(false);
    console.log(this.forwardOrders);
    if (result.data && result.data.length > 0) {
      let data = this.ModifyOrderList(result.data);
      this.forwardClickMore = true;
      this.forwardOrders = _.union(this.forwardOrders, data);
      // this.oneFuncForAll();


    }
    else {
      this.forwardClickMore = false;
    }
  }
  getAllOrderDetails(firstcall) {

    this.orderListInput.order.status = 'all';
    if (this.allOrders && this.allOrders.length && !firstcall) {
      let lastAllOrder: any = _.last(this.allOrders);
      if (lastAllOrder) {
        this.orderListInput.order.last_orderid = lastAllOrder.order_id;
      }


    }
    else {
      this.allOrders = [];
      this.orderListInput.order.last_orderid = null;
    }
    let orderInput = this.orderListInput;
    this.loaderService.display(true);
    this.orderLandingService.getOrderList(orderInput)
      .subscribe(
      output => this.getAllOrderDetailsResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  getAllOrderDetailsResult(result) {
    //  this.allOrders = result.data;
    this.loaderService.display(false);
    //console.log(this.allOrders);
    if (result.data && result.data.length > 0) {
      let data = this.ModifyOrderList(result.data);
      this.orderClickMore = true;
      this.allOrders = _.union(this.allOrders, data);
    }
    else {
      this.orderClickMore = false;
    }
  }






  // getPolygonDistributors() {

  //   var input = { area: { user_type: "dealer", user_id: "0", "apptype": this.authenticationService.appType() } };
  //   this.loaderService.display(true);
  //   this.distributorService.getpolygonByDistributor(input)
  //     .subscribe(
  //     output => this.getPolygonDataResult(output),
  //     error => {
  //       //console.log("falied");
  //       this.loaderService.display(false);
  //     });
  // }
  // getPolygonDataResult(output) {
  //   this.loaderService.display(false);
  //   if (output.data && output.data.length > 0) {
  //     this.polygonArray = [];
  //     for (let data of output.data) {

  //       if (data.polygonvalue && data.polygonvalue.length > 0) {
  //         for (let polygon of data.polygonvalue) {
  //           polygon.color = '';
  //           polygon.user_id = data.user_id;
  //           polygon.distributorName = data.username;
  //           polygon.supplier = data.suppliers;
  //           polygon.mobileno = data.mobileno;
  //           this.polygonArray.push(polygon);

  //         }
  //       }

  //     }
  //   }
  // }







  // showTabPanel(panelName) {
    
  //   this.tabPanelView = panelName;
  //   this.showFilterDailog =false;
  //   this.filterRecords = false;
  //   this.filterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" };
  //   this.filterInput = { "order": { "pagesize": "10", "searchtype": "", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };
  //   if(panelName== "forward"){
  //     this.getForwardOrderDetails(true);
  //   }
  //   else if(panelName== "allorder"){
  //     this.getAllOrderDetails(true);
  //   }

  quickFilter(type){
    this.quickFilterView = type;
    if(this.tabPanelView=='forward'){
      this.filterInput.order.status = 'forwardedorders';
    }
    else{
      this.filterInput.order.status = 'all';
    }
    if(type=='ordered'){
      this.filterInput.order.searchtype = 'status';
      this.filterInput.order.searchtext = "ordered";
    }
    if(type=='delivered'){
      this.filterInput.order.searchtype = 'status';
      this.filterInput.order.searchtext = "delivered";
    }
    if(type=='followupdate'){
      this.filterInput.order.searchtype = 'followupdate';
      this.filterInput.order.searchtext = moment(new Date()).format('YYYY-MM-DD 00:02:00');
    }
    // if(type == 'deliverySlot'){
    //   this.filterInput.order.searchtype = 'deliverySlot';
    //   this.filterInput.order.searchtext = moment()
    // }
    if(type=='notDelivered'){
      this.filterInput.order.searchtype = 'status';
      this.filterInput.order.searchtext = "pendingwithdistributor,pendingwithsupplier,ordered,backtodealer,doorlock,notreachable,cantdeliver"
    }
    console.log(this.filterInput);
    this.loaderService.display(true);
    this.orderLandingService.getOrdersByfilter(this.filterInput)
      .subscribe(
      output => this.quickFilterResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  quickFilterResult(result) {
    console.log(result);
    if (result.result == 'success') {
      let data = this.ModifyOrderList(result.data);
      if(this.tabPanelView=='forward'){
        this.forwardOrders= data;
        this.forwardClickMore = true;
      }
      else{
        this.allOrders = data;
        this.orderClickMore = true;
      }
    }
    else{  
      this.allOrders = [];
      this.forwardOrders = [];
      if (this.tabPanelView == 'forward') {
        this.forwardClickMore = false;
      }
      else if(this.tabPanelView == 'allorder') {
        this.orderClickMore = false;
      } 
    }
    this.getFilteredQuickFilter(true);
  }

  //test code

  getFilteredQuickFilter(firstcall){
    if (!firstcall) {
      if (this.tabPanelView == 'forward') {
        let lastForwardOrder: any = _.last(this.forwardOrders);
        if (lastForwardOrder) {
          this.filterInput.order.last_orderid = lastForwardOrder.order_id;
        }
      }
      else if (this.tabPanelView == 'allorder') {
        let lastallOrder: any = _.last(this.allOrders);
        if (lastallOrder) {
          this.filterInput.order.last_orderid = lastallOrder.order_id;
        }
      }
    }
    else {
      if (this.tabPanelView == 'forward') {
        this.forwardOrders = [];
        this.filterInput.order.last_orderid = "0";
      }
      else if (this.tabPanelView == 'allorder') {
        this.allOrders = [];
        this.filterInput.order.last_orderid = "0";
      }
    }
    let input = this.filterInput;
    //console.log(input);
    this.loaderService.display(true);
    this.orderLandingService.getOrdersByfilter(input)
      .subscribe(
      output => this.getFilteredOrdersResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  getFilteredQuickFilterResult(result){
    this.loaderService.display(false);
    if (result.result == 'success') {
      
      this.filterRecords = true;
      if (this.tabPanelView == 'forward') {
        let data = this.ModifyOrderList(result.data);
        this.forwardClickMore = true;
        this.forwardOrders = _.union(this.forwardOrders, data);
      }

      else if (this.tabPanelView == 'allorder') {
        let data = this.ModifyOrderList(result.data);
        this.orderClickMore = true;
        this.allOrders = _.union(this.allOrders, data);
      }
    }
    else {
      if (this.tabPanelView == 'forward') {
        this.forwardClickMore = false;
      }
      else if (this.tabPanelView == 'allorder') {
        this.orderClickMore = false;
      }
    }
  }

  //test code for pagination ends here

  searchOrderList() {
   
    this.deliverySlot();
 
    if (this.filterInput.order.searchtype == 'name') {
      this.filterInput.order.searchtext = this.filterType.customerName;
    }
    else if (this.filterInput.order.searchtype == 'mobile') {
      this.filterInput.order.searchtext = this.filterType.customerMobile;
    }
    else if (this.filterInput.order.searchtype == 'orderid') {
      this.filterInput.order.searchtext = this.filterType.orderid;
    }
    else if (this.filterInput.order.searchtype == 'supplierid') {
      this.filterInput.order.searchtext = this.filterType.supplierid;
    }
    else if (this.filterInput.order.searchtype == 'distributor_id') {
      this.filterInput.order.searchtext = this.filterType.distributorid;
    }
    else if (this.filterInput.order.searchtype == 'followupdate') {
      this.filterInput.order.searchtext = moment(this.filterType.followUpdate).format('YYYY-MM-DD 00:02:00');
     
    }
    else if (this.filterInput.order.searchtype == 'status') {
      this.filterInput.order.searchtext = "";
      if (this.dropdownData.selectedItems && this.dropdownData.selectedItems.length > 0) {
        for (let data of this.dropdownData.selectedItems) {
          if (this.filterInput.order.searchtext) {
            this.filterInput.order.searchtext += "," + data.id;
          }
          else {
            this.filterInput.order.searchtext += data.id;
          }
        }
      }
    }

    else if (this.filterInput.order.searchtype == 'category'){
      this.filterInput.order.searchtext = "";
      if(this.categoryProduct.selectedItems && this.categoryProduct.selectedItems.length > 0){
        for(let data of this.categoryProduct.selectedItems){
          if(this.filterInput.order.searchtext){
            this.filterInput.order.searchtext += "," + data.itemName; 
          }
          else {
            this.filterInput.order.searchtext += data.itemName;
          }

        }
      }
    }

    else if(this.filterInput.order.searchtype == 'deliveryslot'){   
    }




    if(this.cantFilter == true){
      this.cantFilterMessage="Please Select to filter";
      this.showFilterDailog =true;
    }
    else{
      this.cantFilter == false;
      this.cantFilterMessage = '';
    }

    this.filterValidation();

    if (this.tabPanelView == 'forward') {
      this.filterInput.order.status = 'forwardedorders';
    }
    else if(this.tabPanelView == 'allorder'){
      this.filterInput.order.status = 'all';
    }
    console.log(this.filterInput);
    if(this.cantFilter == false){
    this.getFilteredOrders(true);
    }
// this.showFilterDailog =false;

  }
  getFilteredOrders(firstcall) {
    if (!firstcall) {
      if (this.tabPanelView == 'forward') {
        let lastForwardOrder: any = _.last(this.forwardOrders);
        if (lastForwardOrder) {
          this.filterInput.order.last_orderid = lastForwardOrder.order_id;
        }
      }

      else if (this.tabPanelView == 'allorder') {
        let lastallOrder: any = _.last(this.allOrders);
        if (lastallOrder) {
          this.filterInput.order.last_orderid = lastallOrder.order_id;
        }

      }
    //   else if(this.tabPanelView == 'complete'){
    //     let lastCompleteOrder:any = _.last(this.completeOrders);
    //     if(lastCompleteOrder){
    //       this.globalFilterInput.order.last_orderid = lastCompleteOrder.order_id;
    //     }
      
    // }


    }
    else {
      if (this.tabPanelView == 'forward') {
        this.forwardOrders = [];
        this.filterInput.order.last_orderid = "0";
      }
      else if (this.tabPanelView == 'allorder') {
        this.allOrders = [];
        this.filterInput.order.last_orderid = "0";
      }
      // else if(this.tabPanelView == 'complete'){
      //   this.completeOrders = [];
      //   this.globalFilterInput.order.last_orderid = '0';

      // }
    }
    let input = this.filterInput;
    console.log(this.filterInput);
    // if(this.tabPanelView == 'complete'){
    //   let input = this.globalFilterInput;
    // }
    //console.log(input);
    this.loaderService.display(true);
    this.orderLandingService.getOrdersByfilter(input)
      .subscribe(
      output => this.getFilteredOrdersResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  getFilteredOrdersResult(result) {
    //console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.filterRecords = true;
      if (this.tabPanelView == 'forward') {
        let data = this.ModifyOrderList(result.data);
        this.forwardClickMore = true;
        this.forwardOrders = _.union(this.forwardOrders, data);
      }

      else if (this.tabPanelView == 'allorder') {
        let data = this.ModifyOrderList(result.data);
        this.orderClickMore = true;
        this.allOrders = _.union(this.allOrders, data);
      }
    }
    else {
      if (this.tabPanelView == 'forward') {

        this.forwardClickMore = false;
      }
      else if (this.tabPanelView == 'allorder') {

        this.orderClickMore = false;
      }
      else if(this.tabPanelView == 'complete'){
        this.completeClickMore = false;
      }

    }
  }


  globalSearch(firstcall){
    this.tabPanelView = 'complete';
    this.deliverySlot();
    if (this.globalFilterInput.order.searchtype == 'name') {
      this.globalFilterInput.order.searchtext = this.globalfilterType.customerName;
    }
    else if (this.globalFilterInput.order.searchtype == 'mobile') {
      this.globalFilterInput.order.searchtext = this.globalfilterType.customerMobile;
    }
    else if (this.globalFilterInput.order.searchtype == 'orderid') {
      this.globalFilterInput.order.searchtext = this.globalfilterType.orderid;
    }
    else if (this.globalFilterInput.order.searchtype == 'supplierid') {
      this.globalFilterInput.order.searchtext = this.globalfilterType.supplierid;
    }
    else if (this.globalFilterInput.order.searchtype == 'distributor_id') {
      this.globalFilterInput.order.searchtext = this.globalfilterType.distributorid;
    }
    else if (this.globalFilterInput.order.searchtype == 'followupdate') {
      this.globalFilterInput.order.searchtext = moment(this.globalfilterType.followUpdate).format('YYYY-MM-DD 00:02:00');
     
    }
    else if (this.globalFilterInput.order.searchtype == 'status') {
      this.globalFilterInput.order.searchtext = "";
      if (this.dropdownData.selectedItems && this.dropdownData.selectedItems.length > 0) {
        for (let data of this.dropdownData.selectedItems) {
          if (this.globalFilterInput.order.searchtext) {
            this.globalFilterInput.order.searchtext += "," + data.id;
          }
          else {
            this.globalFilterInput.order.searchtext += data.id;
          }
        }
      }
    }

    else if (this.globalFilterInput.order.searchtype == 'category'){
      this.globalFilterInput.order.searchtext = "";
      if(this.categoryProduct.selectedItems && this.categoryProduct.selectedItems.length > 0){
        for(let data of this.categoryProduct.selectedItems){
          if(this.globalFilterInput.order.searchtext){
            this.globalFilterInput.order.searchtext += "," + data.itemName; 
          }
          else {
            this.globalFilterInput.order.searchtext += data.itemName;
          }

        }
      }
    }
   else if(this.globalFilterInput.order.searchtype == 'deliveryslot'){
      this.globalFilterInput.order.searchtext = "";
      let date:any= "";
      let time:any = "";
      date = moment(this.globalfilterType.date).format('DD-MM-YYYY');
      time = this.time;
      this.globalFilterInput.order.searchtext = date + " " + time ;
      console.log("check del slot" , this.globalFilterInput.order.searchtext); 

      
    }

    if (this.tabPanelView == 'allorder') {
      this.globalFilterInput.order.status = 'complete';
    }
    else{
      this.globalFilterInput.order.status = 'complete';
    }
    console.log(this.globalFilterInput);

    if(!firstcall){
         if(this.tabPanelView == 'complete'){
        let lastCompleteOrder:any = _.last(this.completeOrders);
        if(lastCompleteOrder){
          this.globalFilterInput.order.last_orderid = lastCompleteOrder.order_id;
        }
    }
    else{
      if(this.tabPanelView == 'complete'){
        this.completeOrders = [];
        this.globalFilterInput.order.last_orderid = '0';
    }
  }
    }
  this.showFilterDailog =false;
let input = this.globalFilterInput;
AuthenticationService.showLog("Search Input");
AuthenticationService.showLog(JSON.stringify(input));
this.orderLandingService.getOrdersByfilter(input)
      .subscribe(
      output => this.getGlobalFilteredOrdersResult(output),
      error => {
        this.loaderService.display(false);
      });
  
}
  getGlobalFilteredOrdersResult(result) {
    AuthenticationService.showLog(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      if(this.tabPanelView == 'complete'){
        let data = this.ModifyOrderList(result.data);
        this.completeClickMore = true;
        this.completeOrders = _.union(data);
      }
    }
    else {
      if(this.tabPanelView == 'complete'){
        this.completeClickMore = false;
      }
    }
  }

  
  // refreshOrders() {
  //   this.clearFilter();
  //   this.filterRecords = false;
  //   this.getForwardOrderDetails(true);
  //   this.getAllOrderDetails(true);
  //   //this.getPolygonDistributors();
  // }
  clearFilter() {
    this.showFilterDailog =false;
    this.filterRecords = false;
    this.quickFilterView = "";
    this.tabPanelView = 'forward';
    this.cantFilterMessage = "";

    // this.completeOrders = [];
    this.filterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date: null };
    this.filterInput = { "order": { "pagesize": "10", "searchtype": "", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };
    this.globalFilterInput= { "order": { "pagesize": "30", "searchtype": "orderid", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };
    this.globalfilterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date:null };
    this.getForwardOrderDetails(true);
    this.getAllOrderDetails(true);
  }


  refresh(){
    this.showFilterDailog =false;
    this.quickFilterView = "";
    this.cantFilterMessage = "";
    // this.globalFilterInput= { "order": { "pagesize": "30", "searchtype": "orderid", "status": "", "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0" } };
    // this.globalfilterType = { customerName: "", customerMobile: "", orderid: "", supplierid: "", distributorid: "",followUpdate:"" , date:null };
    if(this.tabPanelView == 'forward'){
      this.getForwardOrderDetails(true);
    }
    else if(this.tabPanelView == 'allorder'){
      this.getAllOrderDetails(true);
    }
    else if(this.tabPanelView == 'complete'){
      this.globalSearch(true);
    }    
  }
  ModifyOrderList(result) {
   
    _.each(result, function (i, j) {
      let GV ="";
      let details: any = i;
      details.timeRemaining = "";
      let currentTime = moment.utc(new Date());
      if(details.slotdate){
        let deliveryTime = moment(details.slotdate);
        var duration = moment.duration(deliveryTime.diff(currentTime));
        var hours = duration.asHours();
        let floorValue = Math.floor(hours);
          // console.log(hours);
        details.timeRemaining = floorValue;
        // console.log('success1' , details.timeRemaining );
      }
      else{
        let delivery_exceptedtime = details.delivery_exceptedtime;
        if(delivery_exceptedtime){
        let onlyDate = delivery_exceptedtime.split(" ");
        let datePart = "";
        datePart = onlyDate[0];
        let endTimeValue = onlyDate[1];
        let formattedDate = moment(datePart , 'DD-MM-YYYY').format('YYYY-MM-DD');
        // console.log("formatted date" , formattedDate );
         let expectedTime = details.delivery_exceptedtime;
        let    timeConvert = endTimeValue;
         let   time24 = moment(timeConvert, ["hA"]).format("HH:MM:SS");
            let date =  formattedDate+ " " +time24;
             let deliveryTimetest = moment(date);
             var duration = moment.duration(deliveryTimetest.diff(currentTime));
             var hours = duration.asHours();
             let floorValue = Math.floor(hours);
              //  console.log(hours);
             details.timeRemaining = floorValue;
            //  console.log('success 2' , details.timeRemaining);
      }
    } 

      GV = details.timeRemaining;
      
      // this.timesRemaining = details.timeRemaining;
    
     
      if (details.status && details.status == "onhold") {
        details.OrderModifiedStatus = "On Hold";
        details.StatusColor = "warning";

      }
      else if (details.status && details.status.toLowerCase() == "cancelled") {
        details.OrderModifiedStatus = "Cancelled";
        details.StatusColor = "danger";

      }
      else if (details.status && details.status.toLowerCase() == "rejected") {
        details.OrderModifiedStatus = "Rejected";
        details.StatusColor = "danger";
     
      }
      else if (details.status &&  details.status == "assigned") {
        details.OrderModifiedStatus = "Re-Assign";
        details.StatusColor = "logo-color";
   
      }
      else if (details.status && details.status.toLowerCase() == "delivered") {
        details.OrderModifiedStatus = "Delivered";
        details.StatusColor = "success";

      }
      else if ( details.status && (details.status == "doorlock" || details.status == "Door Locked")) {
        details.OrderModifiedStatus = "Door Locked";
        details.StatusColor = "warning";
     
      }
      else if (details.status && (details.status == "cannot_deliver" || details.status == "Cant Deliver")) {
        details.OrderModifiedStatus = "Cant Deliver";
        details.StatusColor = "warning";
  
      }
      else if (details.status && (details.status == "Not Reachable" || details.status == "not_reachable")) {
        details.OrderModifiedStatus = "Not Reachable";
        details.StatusColor = "warning";

      }
      else if (details.status && details.status == "pending") {
        details.OrderModifiedStatus = "Pending";
        details.StatusColor = "logo-color";
     
      }
      else if (details.status && (details.status == "ordered" || details.status == "backtodealer")) {
        details.OrderModifiedStatus = "Assign";
        details.StatusColor = "logo-color";
 
      }
      else if(details.status && details.status == 'accept' ){
        details.OrderModifiedStatus = 'Assign';
        details.StatusColor = "logo-color";
      }


    });
    // this.timesRemaining = details.timeRemaining;

    return result;
  }
  getPagingOrderDetails(firstcall, tab) {
    if (this.filterRecords) {

      this.getFilteredOrders(firstcall);
    }
    else {
      if (tab == 'forward') {

        this.getForwardOrderDetails(firstcall);
      }
      else if (tab == 'allorder') {

        this.getAllOrderDetails(firstcall);
      }
      else if(tab == 'complete'){
       this.globalSearch(firstcall);
      }
    }

  }



  getAllCategories(){
    let input= {"userId":this.authenticationService.loggedInUserId(),"userType":"dealer","loginid":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    //console.log(input);

    this.productService.getProductsCategory(input)
    .subscribe(
    output => this.getProductsCategoryResult(output),
    error => {
      //console.log("error in products category list");
    });
  }
  getProductsCategoryResult(result){
    //console.log(result);
    if (result.result == "success") {
      // this.categoryList = result.data;
      let categoryProducts = [];
      if(result.data && result.data.length > 0){
        _.each(result.data , function(i, j){
          let details :any = i ;
          let categoryJSON = {"id": details.categoryid , "itemName":details.category };
          categoryProducts.push(categoryJSON);
        });
        
        this.categories = categoryProducts;
      }
      
      
    }
  }


  // getDistributors() {
  //   let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 500 } }
  //   if (this.distributors && this.distributors.length) {
  //     let lastDistributor: any = _.last(this.distributors);
  //     if (lastDistributor) {
  //       input.root.lastuserid = lastDistributor.userid;
  //     }


  //   }
  //   else {
  //     this.distributors = [];
  //     input.root.lastuserid = null;
  //   }

  //   //console.log(input);
  //   this.loaderService.display(true);
  //   this.distributorService.getAllDistributors(input)
  //     .subscribe(
  //     output => this.getDistributorsResult(output),
  //     error => {
  //       //console.log("error in distrbutors");
  //       this.loaderService.display(false);
  //     });
  // }
  // getDistributorsResult(data) {
  //   //console.log(data);
  //   this.loaderService.display(false);
  //   if (data.result == 'success') {
  //     let distributorCopy = [];

  //     if (data.data && data.data.length) {
  //       _.each(data.data, function (i, j) {
  //         let details: any = i;
  //         details.fullName = details.firstname + " " + details.lastname
  //         distributorCopy.push(details);

  //       });

  //       this.distributors = _.union(this.distributors, distributorCopy);
  //       //  this.distributors = distributorCopy;
  //     }
  //   }
  //   else {
  //     this.LastfilterRecords = true;
  //   }
  // }


  // getSupplier() {
  //   let input = { "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() }; 
  //  //console.log(input);
  //  this.loaderService.display(true);
  //   this.distributorService.getAllSuppliers(input)
  //     .subscribe(
  //     output => this.getSupplierResult(output),
  //     error => {
  //       this.loaderService.display(false);
  //       //console.log("error in distrbutors");
  //     });
  // }
  // getSupplierResult(data) {
  //   //console.log(data);
  //   this.loaderService.display(false);
  //   if (data.result == 'success') {
  //     let supplierCopy = [];

  //     if (data.data && data.data.length) {
  //       _.each(data.data, function (i, j) {
  //         let details: any = i;
  //         details.fullName = details.firstname + " " + details.lastname
  //         supplierCopy.push(details);

  //       });

  //       this.supplierList = _.union(this.supplierList, supplierCopy);
  //       //  this.distributors = distributorCopy;
  //     }
  //   }
  //   else {
  //     this.LastfilterRecords = true;
  //   }
  // }



  filterDailogToggle(){
    this.showFilterDailog = !this.showFilterDailog;
  }

  acceptOrder(Details){
    //console.log(Details);
    let input={"order":{"orderid":Details.order_id,"status":"accept","loginid":this.authenticationService.loggedInUserId(),"userid":this.authenticationService.loggedInUserId(),"usertype":"dealer","apptype":this.authenticationService.appType()}};
    console.log(input);
    this.orderLandingService.AcceptOrder(input)
      .subscribe(
      output => this.AcceptOrderResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  AcceptOrderResult(result){
    this.loaderService.display(false);
    console.log(result);
    if(result.result='success'){
      this.getForwardOrderDetails(true);
      this.refresh();


    }
  }

  rejectOrder(Details){
    //console.log(Details);
    let input={"order":{"orderid":Details.order_id,"loginid":this.authenticationService.loggedInUserId(),"userid":this.authenticationService.loggedInUserId(),"reason":"comments","orderstatus":"backtodealer","usertype":"dealer","apptype":this.authenticationService.appType()}};
    //console.log(input);
    this.orderLandingService.updateOnHold(input)
      .subscribe(
      output => this.rejectOrderResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  rejectOrderResult(result){
    //console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.getForwardOrderDetails(true);
    this.refresh();
    }
  }

  showCustomerAllOrders(orderData) {
    let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
        width: '95%',
        data: orderData
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);


    });

}

  viewDistributorsOrders(data){
    let formatteddata: any = { "type": "distributorOrder", "data": data , distributorId: data.distributor.userid };
        let dialogRefSupplierOrderList = this.dialog.open(DistributorOrderListComponent, {
          width: '95%',
          data: formatteddata
      });
      dialogRefSupplierOrderList.afterClosed().subscribe(result => {

        if(result == 'success'){
          this.loaderService.display(false);
        }
        else{
          this.loaderService.display(false);
        }
       
          //console.log(`Dialog closed: ${result}`);
        

      });
  }




  // copyAddress() {
  //   var copyText = document.getElementById('copyAddress');
  //   copyText.select();
  //   document.execCommand("Copy");
  // }





  //let vvv = moment().startOf('hour').;
    // let abc = moment(end.diff(this.forwardOrders.ordered_date)).format("m[m] s[s]");
    // var duration = moment.duration(.diff(this.forwardOrders.ordered_date));
    // var hours = duration.asHours();

  //time(){
    // let orderedDate =  this.forwardOrders.ordered_date;
    // let B = moment(orderedDate).endOf('hour').fromNow();
    // console.log(B);
    // this.timeRemaining = B;

// let orderedDate = this.forwardOrders.ordered_date;
// let formatttedOrderedDate = moment(this.forwardOrders.ordered_date).format('YYYY-MM-DD HH:MM:SS');
// let deliveryDate = this.forwardOrders.delivery_exceptedtime;
// let formatttedDeliveryDate = moment(this.forwardOrders.delivery_exceptedtime).format('YYYY-MM-DD HH:MM:SS');
// var timeStart:any = moment(new Date(formatttedOrderedDate)).format('HH');
// var timeEnd:any = moment(new Date(formatttedDeliveryDate)).format('HH');
// var timeStart = new Date(formatttedOrderedDate).getTime();
// var timeEnd = new Date(formatttedDeliveryDate).getTime();
 //var hourDiff = timeEnd - timeStart; //in ms
//var secDiff = hourDiff / 1000; //in s
//var minDiff = hourDiff / 60 / 1000; //in minutes
// var hDiff = hourDiff / 3600 / 1000; //in hours
// console.log(hDiff);
// var humanReadable = {};
// humanReadable.hours = Math.floor(hDiff);
// humanReadable.minutes = minDiff - 60 * humanReadable.hours;
// console.log(humanReadable); //{hours: 0, minutes: 30}
 // }

  ViewDistributors(data) {
    if(data.OrderModifiedStatus == 'Assign' || data.OrderModifiedStatus == 'Re-Assign'){
            let dialogRefDist = this.dialog.open(DistributorListDialogComponent, {
    
                width: '70%',
                data: data
            });
            dialogRefDist.afterClosed().subscribe(result => {
                //console.log(`Dialog closed: ${result}`);
                if(result == 'success'){
                  this.getForwardOrderDetails(true);
                  this.getAllOrderDetails(true);
                  this.refresh();
              
                }
    
            });
          }
          }
          getMessage() {
            this.orderLandingService
                .getMessages()
                .subscribe((message: string) => {
                    console.log(message);
                    var praseMsg = JSON.parse(message);
                    let currentUrl = this.router.url.split('/');
                    if(currentUrl[1] != 'preorder'){
                      this.opensocketMessage(praseMsg);
  
                    }
                });
    
        }
        getMessagesfromWebsite() {
          this.orderLandingService
              .getMessagesfromWebsite()
              .subscribe((message: string) => {
                  console.log(message);
                  var praseMsg = JSON.parse(message);
                  let currentUrl = this.router.url.split('/');
                  if(currentUrl[1] != 'preorder'){
                    this.opensocketMessage(praseMsg);

                  }
                 
              });
  
      }
        opensocketMessage(data){
          let dialogRef= this.dialog.open(SocketmessagesComponent, {
            
                  width: '500px',
                  data: data
                });
                dialogRef.afterClosed().subscribe(result => {
                  
                  if (result == 'success') {
                   
            
                  }
            
                });

        }

        inbox(){
          let dialogRef= this.dialog.open(InboxComponent, {
            
            width: '80%',
            data: ''
          });
          dialogRef.afterClosed().subscribe(result => {
            
            if (result == 'success') {
             
      
            }
      
          });



        }

        copyElement(val: string){
          let selectedElement = document.createElement('textarea');
          selectedElement.style.position = 'fixed';
          selectedElement.style.left = '0';
          selectedElement.style.top = '0';
          selectedElement.style.opacity = '0';
          selectedElement.value = val;
          document.body.appendChild(selectedElement);
          selectedElement.focus();
          selectedElement.select();
          document.execCommand('copy');
          document.body.removeChild(selectedElement);
        }





  ngOnInit() {
    // this.getDistributorsOrders();
    // this.getPolygonDistributors();

    if(this.tabPanelView == 'forward'){
    this.getForwardOrderDetails(true);
    }
    else if(this.tabPanelView == 'allorder'){
    this.getAllOrderDetails(true);
    }
    // this.getDistributors();
    // this.getSupplier();

    this.getAllCategories();
    this.getMessage();
    this.getMessagesfromWebsite();
    this.distributors = this.authenticationService.getDistributors();
    this.supplierList = this.authenticationService.getSuppliers();
    // this.onInItConditions();
    // this.timesimu();
    // this.timeSimultor();
   
    this.superDealer = this.authenticationService.getSupperDelear();
    if(!this.superDealer){
this.tabPanelView = 'allorder';
    }
  }

}


