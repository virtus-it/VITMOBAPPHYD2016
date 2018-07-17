import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import {AgmCoreModule,GoogleMapsAPIWrapper,LatLngLiteral,MapsAPILoader} from '@agm/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import { ProductsService } from '../products/products.service';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import * as moment from 'moment';
declare var google: any;

interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}

@Component({
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {
  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;
  polygonArray: any = [];
  displayPolygon: any = [];
  productPolygonArray:any = [];
  displayProductPolygon:any = [];
  distributorProdDetails:any = [];
  listOfDistributors: any = [];
  distributors:any = [];
  dialogRef: any = '';
  stockpoints:any = [];
  order = { orderId: '' };
  orderDetails = [];
  showMarkers: marker[] = [];
  bindablePoints = [];
  markers: any = [
    {
      lat: '',
      lng: ''
    }
  ];
  stockPointsArray:any = [];
  bindableArray = [];
  // stockPointsArrayDummy = [];


  // ordersMap: any = [
  //   {
  //     lat: '',
  //     lng: '',
  //     name: ''
  //   }
  // ];

  tabPanelView:any = 'distributors';
  changeButton : boolean  = false;
  allStockpointsArray = [];
  orderslocationData: marker[] = [];
  showFilterDailog = false;
  constructor(
    public gMaps: GoogleMapsAPIWrapper,
    private productService: ProductsService,
    private distributorService: DistributorServiceService,
    private authenticationService: AuthenticationService,
    public dialog: MdDialog,
    private orderLandingService: OrderLandingService,
    private loaderService: LoaderService
  ) {}
  mapClicked($event: any) {}

  categoryList: any = [];

  filterInput = {
    area: {
      user_type: 'dealer',
      user_id: 0,
      apptype: this.authenticationService.appType(),
      searchtype: '',
      searchtext: ''
    }
  };
  dropdownSettings = {
    singleSelection: false,
    text: 'Select Status',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    badgeShowLimit: 2,
    classes: 'myclass custom-class myyy'
  };
  dropdownData = { selectedItems: [] };

  allOrdersDetails: any = [];
  // categoryname = [{ "id": "pendingwithdistributor", "itemName": "Pending With Distributor" },
  // { "id": "pendingwithsupplier", "itemName": "Pending With Supplier" },
  // { "id": "ordered", "itemName": "Ordered" },
  // { "id": "backtodealer", "itemName": "Back to dealer" },
  // { "id": "delivered", "itemName": "Delivered" },
  // { "id": "cancelled", "itemName": "Cancelled" },
  // { "id": "doorlock", "itemName": "Doorlock" },
  // { "id": "rejected", "itemName": "Rejected" },
  // { "id": "notreachable", "itemName": "Not Reachable" },
  // { "id": "cantdeliver", "itemName": "Can't Deliver" }];
  // categoryName = [{"itemName":"details.categoryname"}];

  getPolygonDistributors() {
    var input = {area: {user_type: 'dealer',user_id: 0,apptype: this.authenticationService.appType()}};
    this.loaderService.display(true);
    this.distributorService.getpolygonByDistributor(input)
      .subscribe(
      output => this.getPolygonDataResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      }
    );
  }
  getPolygonDataResult(output) {
    //  //console.log(output);
    //9863636315
    //paani
    this.loaderService.display(false);
    if (output.data && output.data.length > 0) {
      for (let data of output.data) {
        if (data.polygonvalue && data.polygonvalue.length > 0) {
          for (let polygon of data.polygonvalue) {
            polygon.color = '';
            polygon.user_id = data.user_id;
            polygon.distributorName = data.username;
            polygon.supplier = data.suppliers;
            polygon.mobileno = data.mobileno;
            this.polygonArray.push(polygon);
            this.displayPolygon.push(polygon);
            for(let latsandlng of polygon.path){
              latsandlng.lat = parseFloat(latsandlng.lat);
              latsandlng.lng = parseFloat(latsandlng.lng);
            }
            console.log(polygon, 'result');
          }
        }
      }
    }
  }

  click(event, polygon) {
    this.listOfDistributors = [];
    let myLatLng = event.latLng;
    this.lat = myLatLng.lat();
    this.lng = myLatLng.lng();
    // for (let dist of this.polygonArray) {  this was before and it is changed because after filtering we are getting wrong dist details
      for(let dist of this.displayPolygon){
      var latlong = event.latLng;
      var polygonPath = new google.maps.Polygon({
        paths: dist.path
      });
      // google.maps.geometry.poly.containsLocation(latlong, polygonPath)
      if (this.gMaps.containsLocation(latlong, polygonPath)) {
        this.listOfDistributors.push(dist);
      }
    }
  }


  clickOnProductPolygon(event , polygon){

    this.listOfDistributors = [];
    let polygonCategory = polygon.category_id;
    let myLatLng = event.latLng;
    this.lat = myLatLng.lat();
    this.lng = myLatLng.lng();
    this.distributors = [];
    for (let dist of this.distributorProdDetails) {
      if(dist.categoryid == polygonCategory){
      if(dist.distributorproductdetails){
        for(let distDetails of dist.distributorproductdetails){
          this.distributors.push(distDetails);
        }
      }
    }
      // google.maps.geometry.poly.containsLocation(latlong, polygonPath)
      // if (this.gMaps.containsLocation(latlong, polygonPath)) {
      //   this.listOfDistributors.push(dist);
      // }
    //   if(dist.dealerpolygons){
    //   for(let dealerpolygon of dist.dealerpolygons){

    //     for(let path of dealerpolygon.polygonvalue){
    //       var latiandlong = event.latLng;
    //       var polygonPath = new google.maps.Polygon({
    //         paths: dist.path
    //       });
    //     }
    //   }
    // }
  }
  }
  
  DistrbutorHover(distributor) {
    if (distributor.path) {
      let allAreas = _.filter(this.polygonArray, function(e: any) {
        return e.user_id == distributor.user_id;
      });
      // this.displayPolygon = [];
      // this.displayPolygon.push(distributor);
      this.displayPolygon = allAreas;
    }
  }
  ShowAllPolygons() {
    this.listOfDistributors = [];
    this.displayPolygon = this.polygonArray;
  }
  ViewProduct(distributor) {
    if (distributor) {
      let dialogRef = this.dialog.open(ProductListDialogComponent, {
        width: '95%',
        data: distributor
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
      });
    }
  }
  getOrderDetail() {
    this.loaderService.display(true);
    let input = {appType: this.authenticationService.appType(),orderid: this.order.orderId, userId: this.authenticationService.loggedInUserId()};
    this.distributorService.getOrderById(input)
    .subscribe(
      output => this.getOrderDetailResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      }
    );
  }
  getOrderDetailResult(result) {
    //console.log(result);

    if (result && result.data) {
      let localTime = moment.utc(result.data[0].ordered_date).toDate();
      result.data[0].ordered_date = moment(localTime).format(
        'DD-MM-YYYY hh:mm A'
      );
      this.orderDetails = result.data;

      if (result.data[0].orderby_latitude && result.data[0].orderby_longitude) {
        this.markers[0].lat = parseFloat(result.data[0].orderby_latitude);
        this.markers[0].lng = parseFloat(result.data[0].orderby_longitude);
      } 
      else if (
        result.data[0].customer_latitude &&
        result.data[0].customer_longitude
      )
       {
        this.markers[0].lat = parseFloat(result.data[0].customer_latitude);
        this.markers[0].lng = parseFloat(result.data[0].customer_longitude);
      } 
      else {
        this.markers[0].lat = '';
        this.markers[0].lng = '';
      }
    }
    this.loaderService.display(false);
  }
  ViewDistributors(order) {
    let dialogRef = this.dialog.open(DistributorListDialogComponent, {
      width: '800px',
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      this.getOrderDetail();
    });
  }
  filterDailogToggle() {
    this.showFilterDailog = !this.showFilterDailog;
  }

  searchPolygon() {
    if (this.filterInput.area.searchtype == 'categoryname') {
      this.filterInput.area.searchtext = '';
      if (
        this.dropdownData.selectedItems &&
        this.dropdownData.selectedItems.length > 0
      ) {
        for (let data of this.dropdownData.selectedItems) {
          if (this.filterInput.area.searchtext) {
            this.filterInput.area.searchtext += ',' + data.itemName;
          } else {
            this.filterInput.area.searchtext += data.itemName;
          }
        }
      }
    }
    //console.log(this.filterInput);
    this.filteredList();
    this.showFilterDailog = false;
  }

  filteredList() {
    let input = this.filterInput;
    //console.log(input);
    this.distributorService.getFilteredPolygon(input)
    .subscribe(
      output => this.getFilteredPolygonResult(output),
      error => {
        //console.log("error in products category list");
      }
    );
  }
  getFilteredPolygonResult(result) {
    //console.log(result);
    if ((result.result = 'success')) {
      //  this.polygonArray= [];
      this.displayPolygon = [];
      if (result.data && result.data.length > 0) {
        for (let data of result.data) {
          if (data.polygonvalue && data.polygonvalue.length > 0) {
            for (let polygon of data.polygonvalue) {
              polygon.color = '';
              polygon.user_id = data.user_id;
              polygon.distributorName = data.username;
              polygon.supplier = data.suppliers;
              polygon.mobileno = data.mobileno;
              // this.polygonArray.push(polygon);
              this.displayPolygon.push(polygon);
              
            }
          }
        }
      }
    }
  }
  // click1(event, polygon) {
  //     this.listOfDistributors = [];
  //     let myLatLng = event.latLng;
  //     this.lat = myLatLng.lat();
  //     this.lng = myLatLng.lng();
  //     for (let dist of this.polygonArray) {
  //         var latlong = event.latLng;
  //         var polygonPath = new google.maps.Polygon({
  //             paths: dist.path
  //         });
  //         // google.maps.geometry.poly.containsLocation(latlong, polygonPath)
  //         if (this.gMaps.containsLocation(latlong, polygonPath)) {
  //             this.listOfDistributors.push(dist);
  //         }

  //     };
  // }

  getProductsPolygon(){
    let input = {"area": {"user_type": this.authenticationService.userType() ,"user_id":0,"apptype": this.authenticationService.appType() ,"devicetype":"","moyaversioncode":"","transtype":"getproductspolygons"}};
    this.loaderService.display(true);
    console.log(input);
    this.distributorService.getpolygonByDistributor(input)
      .subscribe(
      output => this.getProductsPolygonResult(output),
      error => {
        //console.log("falied");
        this.loaderService.display(false);
      });
  }
  getProductsPolygonResult(result){
    if(result.result == 'success'){
      this.loaderService.display(false);
          this.displayProductPolygon = [];
          this.distributorProdDetails = []
        for (let data of result.data) {
          if (data.serviceareas && data.serviceareas.length > 0) {
            for (let polygon of data.serviceareas) {
              polygon.color = '';
              polygon.category_id = data.categoryid;
              polygon.product_name = data.product_name;
              polygon.product_type = data.product_type;
              polygon.categoryname = data.category;
              this.productPolygonArray.push(polygon);
              this.displayProductPolygon.push(polygon);
              this.distributorProdDetails.push(data);
              console.log(polygon, 'result');
            }
          }
          // if(data.distributorproductdetails && data.distributorproductdetails.length > 0){
          //   for(let dist of data.distributorproductdetails){
          //     // dist.userid = data.userid;
          //     // dist.address = data.address;
          //     // dist.brandname = data.brandname;
          //     // dist.mobileno = data.mobileno;
          //     // dist.product_type = data.product_type;
          //     // this.distributorProdDetails.push(dist , data);

          //   }
          // }
        }
      
    }
  }

  getProductByCategory() {
    let input = {
      userId: this.authenticationService.loggedInUserId(),
      userType: 'dealer',
      loginid: this.authenticationService.loggedInUserId(),
      appType: this.authenticationService.appType()
    };
    //console.log(input);

    this.productService.getProductsCategory(input).subscribe(
      output => this.getProductsCategoryResult(output),
      error => {
        //console.log("error in products category list");
      }
    );
  }
  getProductsCategoryResult(result) {
    //console.log(result);
    let categoryListCopy = [];
    if (result.result == 'success') {
      _.each(result, function(i, j) {
        _.each(result.data, function(k, l) {
          let details: any = k;
          let value = { id: details.categoryid, itemName: details.category };
          categoryListCopy.push(value);
        });
      });

      this.categoryList = categoryListCopy;
    }
  }

  clearFilter() {
    this.showFilterDailog = false;
    this.filterInput = {
      area: {
        user_type: 'dealer',
        user_id: this.authenticationService.loggedInUserId(),
        apptype: this.authenticationService.appType(),
        searchtype: '',
        searchtext: ''
      }
    };
    this.dropdownData.selectedItems = [];
    this.getPolygonDistributors();
    this.getProductByCategory();
  }

  //   clickedMarker(label: string, index: number) {
  // }

  //   refresh(): void {
  //     window.location.reload();
  // }

  refresh() {
    this.orderDetails = [];
  }

  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }


  showTabPanel(panelName) {
    this.tabPanelView = panelName;
    if(panelName== "distributors"){
     
    }
    else if(panelName== "products"){
     this.getProductsPolygon();
     this.distributors = [];
    }
  }
  pointers: marker[] = [
    {
      lat: 17.407073254851742,
      lng: 78.40179428458215,
      label: 'A',
      icon: '../assets/images/green.png'
    },
    {
      lat: 17.70732548,
      lng: 78.179428458215,
      label: 'B',
      icon: '../assets/images/red.png'
    }
  ];




  showStockPoints(){
    var input = {area: {user_type: 'dealer',user_id: 0,apptype: this.authenticationService.appType()}};
    this.loaderService.display(true);
    this.distributorService.getpolygonByDistributor(input)
    .subscribe(
    output => this.showStockPointsResult(output),
    error => {
        //console.log("falied");
    });
   }
   showStockPointsResult(result){
     //console.log(result);
     if(result.result == 'success'){
       this.loaderService.display(false);
       this.stockpoints=result.data;
       let latlngsArray = [];
       _.each(this.stockpoints , function (i , j){
         let details:any = i;
         latlngsArray.push(details.latlngs);
       });
       this.stockPointsArray = latlngsArray;
       let stockPointsArrayDummy = [];
       _.each( this.stockPointsArray , function ( k ,l){
         let detailData:any = k;
         let dum1 = [];
         _.each(detailData , function (a,b){
           let detail:any = a;
           if(detail.latitude && detail.longitude){
           detail.latitude = parseFloat(detail.latitude);
           detail.longitude = parseFloat(detail.longitude);
           dum1.push(detail);
           }
          //  this.stockPointsArray = dum1;
         });
         stockPointsArrayDummy.push(dum1);
       });
       this.stockPointsArray = stockPointsArrayDummy;
       let array1 = [];
      //  let lats = [];
      //  let lngs = [];
      //  let  userids = [];
       _.each(this.stockPointsArray , function (m ,n){
         let markers:any = m;
         _.each(markers , function(c,d){
           let innerDetail:any = c;
           let stockpointsMarkers = {lat: 0 , lng: 0 , icon: '' , userid: 0}
         stockpointsMarkers.lat = innerDetail.latitude;
         stockpointsMarkers.lng = innerDetail.longitude;
         stockpointsMarkers.icon = '';
         stockpointsMarkers.userid = innerDetail.user_id;
         array1.push(stockpointsMarkers);   
         });   
       });
       this.bindableArray = array1;
       console.log(this.bindableArray , 'sakgfajfgka');



     }
     else{
        // this.noDataError="No Stock Points for this distributor";
        this.loaderService.display(false);
        this.bindableArray = [];
        this.changeButton = false;
     }

  }

  hideStockPoints(){
    this.stockpoints = [];
    this.showMarkers = [];
    this.changeButton = false;
  }

  ngOnInit() {
    this.getPolygonDistributors();
    this.getProductByCategory();
    // if(this.tabPanelView == 'products'){

    // }
    // this.getOrdersOnMap();
  }
}
