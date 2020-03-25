import {  Component,  OnInit,  Inject,  ElementRef,  NgModule,  NgZone,  ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import {  AgmCoreModule,  GoogleMapsAPIWrapper,  LatLngLiteral,  MapsAPILoader} from '@agm/core';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import * as moment from 'moment';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import { SelectProductsForassingComponent } from '../select-products-forassing/select-products-forassing.component';
import {DistributorMapDetailsComponent } from '../distributor-map-details/distributor-map-details.component';
import * as _ from 'underscore';
import { DistributorOrderListComponent } from '../distributor-order-list/distributor-order-list.component';
//import {} from '@types/googlemaps';
declare var google: any;

interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-order-coverage-detail-dailog',
  templateUrl: './order-coverage-detail-dailog.component.html',
  styleUrls: ['./order-coverage-detail-dailog.component.css']
})
export class OrderCoverageDetailDailogComponent implements OnInit {
  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;
  public searchControl: FormControl;
  polygonArray: any = [];
  displayPolygon: any = [];
  floatPolygon:any = [];
  listOfDistributors: any = [];
  dialogRef: any = '';
  order = { orderId: '' };
  gpsLocation: any = '';
  gpsMessage: string = '';
  filterInputkmvalue = { kmvalue: '0.03' };
  smallLoader: boolean = false;
  categoryList: any = [];
  reasonOnHold: any;
  dropdownSettings = {
    singleSelection: false,
    text: 'Select Category',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    badgeShowLimit: 2,
    classes: 'myclass custom-class myyy'
  };
  filterInput = {
    area: {
      user_type: 'dealer',
      user_id: 0,
      apptype: this.authenticationService.appType(),
      searchtype: 'categoryname',
      searchtext: ''
    }
  };

  stockPointLocationData: marker[] = [];
  stockpoints :any = [];
  showMarkers: marker[] = [];

  dropdownData = { selectedItems: [] };
  //orderDetails = "";
  @ViewChild('search') public searchElementRef: ElementRef;
  markers: any = [
    {
      lat: '',
      lng: ''
    }
  ];
  constructor(    public gMaps: GoogleMapsAPIWrapper,    private distributorService: DistributorServiceService,    private authenticationService: AuthenticationService,    public thisDialogRef: MdDialogRef<OrderCoverageDetailDailogComponent>,    @Inject(MD_DIALOG_DATA) public orderDetail: any,    public dialog: MdDialog,    private loaderService: LoaderService,    private mapsAPILoader: MapsAPILoader,    private ngZone: NgZone,    private productService: ProductsService  ) {}
  dailogCloseResult = 'cancel';

  assignPolygon() {

    this.polygonArray = this.authenticationService.getPolygons();
    this.floatPolygon = this.authenticationService.getPolygons();
    _.each( this.floatPolygon , function(i , j){
      let details: any = i;
      _.each(details.path , function(k , l){
        let detailData:any = k;
        detailData.lat = parseFloat(detailData.lat);
        detailData.lng = parseFloat(detailData.lng);
      });
    });

    this.displayPolygon = this.floatPolygon
  }
  click(event, polygon) { // Normal click anywhere
    this.listOfDistributors = [];
    let myLatLng = event.latLng;
    this.lat = myLatLng.lat();
    this.lng = myLatLng.lng();
    for (let dist of this.polygonArray) {
      var latlong = event.latLng;
      var polygonPath = new google.maps.Polygon({
        paths: dist.path
      });
      if (this.gMaps.containsLocation(latlong, polygonPath)) {
        this.listOfDistributors.push(dist);
      }
    }
  }
  
  DistrbutorHover(distributor) {
    this.getAllStockpoints(distributor); /* This is for getting stockpoints without logout */

    if (distributor.path) {
      this.displayPolygon = [];
      let DistributorData: any = {
        lat: '',
        lng: '',
        name: '',
        icon: '',
        label: ''
      };
      DistributorData.lat = parseFloat(distributor.latitude);
      DistributorData.lng = parseFloat(distributor.longitude);
      var findDistributor = _.filter(this.polygonArray, function(k, l) {
        let distDetails: any = k;
        return distDetails.user_id == distributor.user_id;
      });
      if (findDistributor) {
        this.displayPolygon = findDistributor;
      }

      // this.displayPolygon.push(distributor);
    }

    if (distributor.stockpoint && distributor.stockpoint.length > 0) {
      this.stockPointLocationData = [];
      let stockpointsLocationArray = [];
      _.each(distributor.stockpoint, function(i, j) {
        let details: any = i;
        if (details.latitude !== null && details.longitude !== null) {
          let distData: any = {
            lat: '',
            lng: '',
            icon: ''
          };
          if (details.latitude && details.longitude) {
            distData.lat = parseFloat(details.latitude);
            distData.lng = parseFloat(details.longitude);
            distData.icon = '../assets/images/green.png';

            if (distData.lat != '') {
              stockpointsLocationArray.push(distData);
            }
          }
        }
      });

      if (stockpointsLocationArray.length > 0) {
        this.stockPointLocationData = stockpointsLocationArray;
        console.log('lats and lngs', this.stockPointLocationData);
      }
    }
    else{
      this.stockPointLocationData = [];
    }
  }

  pointers: marker[] = [
    {
      lat: '17.407073254851742',
      lng: '78.40179428458215',
      label: 'A',
      icon: '../assets/images/green.png'
    },
    {
      lat: '17.70732548',
      lng: '78.179428458215',
      label: 'B',
      icon: '../assets/images/red.png'
    }
  ];

  ShowAllPolygons() {
    this.listOfDistributors = [];
    this.displayPolygon = this.polygonArray;
  }
  ClearAllPolygons() {
    this.listOfDistributors = [];
    this.displayPolygon = [];
  }
  ViewProduct(distributor) {
    if (distributor) {
      let dialogRef = this.dialog.open(ProductListDialogComponent, {
        width: '95%',
        data: distributor
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  getAllStockpoints(data){
    let input={"User":{"userid":data.user_id ,"transtype":"getall","apptype":this.authenticationService.appType()}};
    this.distributorService.StockPoint(input)
    .subscribe(
    output => this.getAllStockPointsResult(output),
    error => {
    });
   }
   getAllStockPointsResult(result){
     if(result.result == 'success'){
       this.stockpoints=result.data;
       let stockpointData = {lat:0 , lng:0 , icon:"" , index: 1 };
       let markersData = [];
       _.each(this.stockpoints , function(i, j){
         let details:any = i;
         stockpointData = {
            lat: parseFloat(details.latitude),
            lng: parseFloat(details.longitude),
            icon:"../assets/images/green.png",
            index : j + 1 
         }
         markersData.push(stockpointData);
       });

        this.stockPointLocationData = markersData;;
     }
     else{
      this.stockpoints = [];
      this.showMarkers = [];
      this.stockPointLocationData = [];
     }

  }


  getOrderDetail() {
    this.loaderService.display(true);
    let input = {
      appType: this.authenticationService.appType(),
      orderid: this.orderDetail.orders.order_id,
      userId: this.authenticationService.loggedInUserId()
    };
    this.distributorService.getOrderById(input).subscribe(
      output => this.getOrderDetailResult(output),
      error => {
        this.loaderService.display(false);
      }
    );
  }
  getOrderDetailResult(result) {
    this.loaderService.display(false);
    if (result && result.data) {
      this.gpsLocation = true;

      if (result.data[0].orderby_latitude && result.data[0].orderby_longitude) {
        this.markers[0].lat = parseFloat(result.data[0].orderby_latitude);
        this.markers[0].lng = parseFloat(result.data[0].orderby_longitude);
        this.lat = parseFloat(result.data[0].orderby_latitude);
        this.lng = parseFloat(result.data[0].orderby_longitude);
      } else if (
        result.data[0].customer_latitude &&
        result.data[0].customer_longitude
      ) {
        this.markers[0].lat = parseFloat(result.data[0].customer_latitude);
        this.markers[0].lng = parseFloat(result.data[0].customer_longitude);
        this.lat = parseFloat(result.data[0].customer_latitude);
        this.lng = parseFloat(result.data[0].customer_longitude);
      } else {
        this.gpsMessage = 'No GPS for this Customer';
        this.markers[0].lat = '';
        this.markers[0].lng = '';
      }
    }
  }
  ViewDistributors() {
    let dialogRefDist = this.dialog.open(DistributorListDialogComponent, {
      width: '70%',
      data: this.orderDetail.orders
    });
    dialogRefDist.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.dailogCloseResult = 'success';
        this.getOrderDetail();
        this.thisDialogRef.close('success');
      }
    });
  }
  onCloseCancel() {
    this.thisDialogRef.close(this.dailogCloseResult);
  }
  filterDistancePolygon() {
    if (this.filterInputkmvalue.kmvalue) {
      if (this.filterInputkmvalue.kmvalue == 'all') {
        this.listOfDistributors = [];
        this.displayPolygon = this.polygonArray;
      } else {
        var myPosition = new google.maps.LatLng(
          this.markers[0].lat,
          this.markers[0].lng
        );
        this.displayPolygon = [];
        for (let dist of this.polygonArray) {
          var polygonPath = new google.maps.Polygon({
            paths: dist.path
          });
          // 0.03 3km
          // 0.05 5km
          // 0.1   10km
          let distance = parseFloat(this.filterInputkmvalue.kmvalue);
          if (
            google.maps.geometry.poly.isLocationOnEdge(
              myPosition,
              polygonPath,
              distance
            )
          ) {
            this.displayPolygon.push(dist);
          }
        }
      }
    }

    this.smallLoader = false;
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
  // getProductsCategoryResult(result) {
  //     //console.log(result);
  //     let categoryListCopy = [];
  //     if (result.result == "success") {
  //         _.each(result, function (i, j) {
  //             _.each(result.data, function (k, l) {
  //                 let details: any = k;
  //                 let value = { "id": details.categoryid, "itemName": details.category }
  //                 categoryListCopy.push(value);
  //             });

  //         });

  //         this.categoryList = categoryListCopy;

  //     }
  // }

  getProductsCategoryResult(result) {
    //console.log(result);
    let categoryListCopy = [];
    if (result.result == 'success') {
      _.each(result.data, function(i, j) {
        let details: any = i;
        let value = { id: details.categoryid, itemName: details.category };
        categoryListCopy.push(value);
      });
      this.categoryList = categoryListCopy;
    }
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
  }

  filteredList() {
    let input = this.filterInput;
    //console.log(input);
    this.distributorService.getFilteredPolygon(input)
    .subscribe(
      output => this.getFilteredPolygonResult(output),
      error => {
        this.smallLoader = false;
        //console.log("error in products category list");
      }
    );
  }

  getFilteredPolygonResult(result) {
    //console.log(result);
    if ((result.result = 'success')) {
      //this.polygonArray= [];
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
              polygon.mobileno1 = data.mobileno1;
              polygon.mobileno2 = data.mobileno2;
              // this.polygonArray.push(polygon);
              if (
                this.filterInputkmvalue.kmvalue &&
                this.filterInputkmvalue.kmvalue != 'all'
              ) {
                var polygonPath = new google.maps.Polygon({
                  paths: polygon.path
                });
                let distance = parseFloat(this.filterInputkmvalue.kmvalue);
                var myPosition = new google.maps.LatLng(
                  this.markers[0].lat,
                  this.markers[0].lng
                );
                if (
                  google.maps.geometry.poly.isLocationOnEdge(
                    myPosition,
                    polygonPath,
                    distance
                  )
                ) {
                  this.displayPolygon.push(polygon);
                }
              } else {
                this.displayPolygon.push(polygon);
              }
            }
          }
        }
        this.smallLoader = false;
      } else {
        this.smallLoader = false;
      }
    }
  }

  openMapDialog(data) {
    let dialogRef = this.dialog.open(MapDialogComponent, {
      width: '90%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  distributorsOrders(data) {
    let formatteddata: any = {
      type: 'distributorOrdersfromCoverage',
      data: this.orderDetail,
      distributorId: data.user_id,
      distributorName: data.distributorName,
      distributorNumber: data.mobileno
    };
    let dialogRefSupplierOrderList = this.dialog.open(
      DistributorOrderListComponent,
      {
        width: '95%',
        data: formatteddata
      }
    );
    dialogRefSupplierOrderList.afterClosed().subscribe(result => {
    });
  }

  openProductAssingDialog(data) {
    let formattedData = {
      data: this.orderDetail,
      disributorId: data.user_id,
      type: 'coveragePage'
    };

    let dialogRef = this.dialog.open(SelectProductsForassingComponent, {
      width: '90%',
      data: formattedData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.forWardOrder(data);
      }
    });
  }

  forWardOrder(data) {
    let input = {order: {apptype: this.authenticationService.appType(),createdthru: 'website',from: this.authenticationService.loggedInUserId(),loginid: this.authenticationService.loggedInUserId(),orderid: this.orderDetail.orders.order_id,orderstatus: 'ordered',product_type: 'cans',quantity: this.orderDetail.orders.quantity,to: data.user_id,usertype: this.authenticationService.userType()}};
    console.log(input);
    this.distributorService.forwardOrder(input).subscribe(
      output => this.forWordOrderResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      }
    );
  }
  forWordOrderResult(result) {
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.thisDialogRef.close('success');
    }
  }

  filterPolygon() {
    this.smallLoader = true;
    if (
      this.dropdownData.selectedItems &&
      this.dropdownData.selectedItems.length > 0
    ) {
      this.searchPolygon();
    } else {
      this.filterDistancePolygon();
    }
  }

  clickAfterFilter(event, polygon){
    this.listOfDistributors = [];
    let myLatLng = event.latLng;
    this.lat = myLatLng.lat();
    this.lng = myLatLng.lng();
    for (let dist of this.displayPolygon) {
      var latlong = event.latLng;
      var polygonPath = new google.maps.Polygon({
        paths: dist.path
      });
      if (this.gMaps.containsLocation(latlong, polygonPath)) {
        this.listOfDistributors.push(dist);
        console.log('List of Distributors');
        console.log(this.listOfDistributors)
      }
    }

  }

  openDistributorsMap(data){
    let dialogRef = this.dialog.open(DistributorMapDetailsComponent, {
      width: '90%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
      }
    });
  }

  ngOnInit() {
    //this.getPolygonDistributors(); [this.orderDetail.orders.productdetails.category]
    this.polygonArray = this.authenticationService.getPolygons();
    this.assignPolygon();
    this.dropdownData.selectedItems = [
      {
        id: this.orderDetail.orders.prod_id,
        itemName: this.orderDetail.orders.productdetails.category
      }
    ];
    this.getOrderDetail();
    this.getProductByCategory();
    // setTimeout(function() { this.filterPolygon() }, 2000);

    console.log(this.orderDetail);
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    setTimeout(() => {
      if (!this.gpsMessage) {
        this.filterPolygon();
      }
    }, 2000);
  }
}


  