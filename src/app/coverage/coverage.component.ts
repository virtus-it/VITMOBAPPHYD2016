﻿import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from '../distributor/distributor-service.service'
import { AuthenticationService } from '../login/authentication.service';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
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
  icon?:string;
	
}









@Component({

    templateUrl: './coverage.component.html',
    styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {
    lat: number = 17.3850;
    lng: number = 78.4867;
    zoom: number = 12;
    polygonArray: any = [];
    displayPolygon: any = [];
    listOfDistributors: any = [];
    dialogRef: any = '';
    order = { orderId: "" };
    orderDetails = "";
    markers: any = [
        {
            lat: '',
            lng: '',
        }
    ]



    ordersMap: any = [{
        lat:"",
        lng:"",
        name:"",

    }]


    orderslocationData:marker[] = [];
    showFilterDailog= false;
    constructor(public gMaps: GoogleMapsAPIWrapper,  private productService: ProductsService, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public dialog: MdDialog, private orderLandingService: OrderLandingService , private loaderService: LoaderService) { }
    mapClicked($event: any) {

    }

    categoryList :any =[];

    filterInput = {"area":{"user_type":"dealer","user_id":0 , "apptype":this.authenticationService.appType(),"searchtype":"",
    "searchtext":""}};
    dropdownSettings = {
        singleSelection: false,
        text: "Select Status",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        badgeShowLimit: 2,
        classes: "myclass custom-class myyy"
      };
    dropdownData = { selectedItems: [] };

    allOrdersDetails:any = [];
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

        var input = { area: { user_type: "dealer", user_id: 0, "apptype": this.authenticationService.appType() } };
        this.loaderService.display(true);
        this.distributorService.getpolygonByDistributor(input)
            .subscribe(
            output => this.getPolygonDataResult(output),
            error => {
                //console.log("falied");
                this.loaderService.display(false);
            });
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
        for (let dist of this.polygonArray) {
            var latlong = event.latLng;
            var polygonPath = new google.maps.Polygon({
                paths: dist.path
            });
            // google.maps.geometry.poly.containsLocation(latlong, polygonPath)
            if (this.gMaps.containsLocation(latlong, polygonPath)) {
                this.listOfDistributors.push(dist);
            }


        };
    }
    DistrbutorHover(distributor) {
        if (distributor.path) {
            let allAreas = _.filter(this.polygonArray, function(e:any) {
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

                width: '85%',
                data: distributor
            });
            dialogRef.afterClosed().subscribe(result => {
                //console.log(`Dialog closed: ${result}`);


            });


        }
    }
    getOrderDetail() {
        this.loaderService.display(true);
        let input = { appType: this.authenticationService.appType(), orderid: this.order.orderId, userId: this.authenticationService.loggedInUserId() };
        this.distributorService.getOrderById(input)
            .subscribe(
            output => this.getOrderDetailResult(output),
            error => {
                //console.log("falied");
                this.loaderService.display(false);
            });

    }
    getOrderDetailResult(result) {
        //console.log(result);

        if (result && result.data) {
            let localTime = moment.utc(result.data[0].ordered_date).toDate();
            result.data[0].ordered_date = moment(localTime).format('DD-MM-YYYY hh:mm A');
            this.orderDetails = result.data;

            if (result.data[0].orderby_latitude && result.data[0].orderby_longitude) {
                this.markers[0].lat = parseFloat(result.data[0].orderby_latitude);
                this.markers[0].lng = parseFloat(result.data[0].orderby_longitude);
            }
            else if (result.data[0].customer_latitude && result.data[0].customer_longitude) {
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

            width: '700px',
            data: order
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.getOrderDetail();

        });



    }
    filterDailogToggle(){
        this.showFilterDailog = !this.showFilterDailog;
      }

      searchPolygon(){
        if (this.filterInput.area.searchtype == 'categoryname') {
            this.filterInput.area.searchtext = "";
            if (this.dropdownData.selectedItems && this.dropdownData.selectedItems.length > 0) {
                for (let data of this.dropdownData.selectedItems) {
                    if (this.filterInput.area.searchtext) {
                        this.filterInput.area.searchtext += "," + data.itemName;
                      }
                      else {
                        this.filterInput.area.searchtext += data.itemName;
                      }
          }
      }
    }
    //console.log(this.filterInput);
    this.filteredList();
    this.showFilterDailog =false;
}

filteredList(){
    let input = this.filterInput;
    //console.log(input);
    this.distributorService.getFilteredPolygon(input)
    .subscribe(
    output => this.getFilteredPolygonResult(output),
    error => {
      //console.log("error in products category list");
    });

}
getFilteredPolygonResult(result){
//console.log(result);
if(result.result = 'success'){
  //  this.polygonArray= [];
    this.displayPolygon= [];
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


getProductByCategory(){
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
    let categoryListCopy = [];
    if (result.result == "success") {
    _.each(result, function (i, j) {
        _.each(result.data, function(k,l){
            let details:any = k;
            let value = { "id": details.categoryid, "itemName": details.category }
            categoryListCopy.push(value);
        });

    });


      this.categoryList = categoryListCopy;

    }
  }

  clearFilter() {
    this.showFilterDailog =false;
    this.filterInput = {"area":{"user_type":"dealer","user_id":this.authenticationService.loggedInUserId() , "apptype":this.authenticationService.appType(),"searchtype":"",
    "searchtext":""}};
    this.dropdownData.selectedItems= [];
    this.getPolygonDistributors();
    this.getProductByCategory();

  }

//   clickedMarker(label: string, index: number) {
// }




//   refresh(): void {
//     window.location.reload();
// }



refresh(){
    this.orderDetails = "";
}


getOrdersOnMap(){
    let input= {"order":{"userid": this.authenticationService.loggedInUserId(),"priority":289,"usertype":"dealer","status":null,"pagesize":100,"last_orderid":null,"apptype":this.authenticationService.appType(),"createdthru":"website" , "transtype":"getordersonmap"}};
    console.log(input);
    this.orderLandingService.getOrderList(input)
      .subscribe(
      output => this.getOrderDetailsResult(output),
      error => {
        this.loaderService.display(false);
      });
}
getOrderDetailsResult(result){
    if(result.result == 'success'){
        this.allOrdersDetails  = result.data;
       
        let orderLocationArray = [];
        let data = _.each(this.allOrdersDetails , function(i, j){
            let details:any = i;
            let UserData:any = {lat:"" , lng : "" , name:"" , status:"" ,orderid:"", icon:"" , label:"" , productType:"" , quantity:""};
          
            UserData.lat = parseFloat(details.latitude);
            UserData.lng = parseFloat(details.longitude);
            UserData.name = details.firstname;
            UserData.orderid = details.order_id;
            UserData.status = details.orderstatus;
            UserData.productType = details.product_type;
            UserData.quantity = details.quantity;
            if(UserData.status == 'delivered'){
                UserData.icon = '../assets/images/green.png';
            }
            else{
                UserData.icon = '../assets/images/red.png'
            }
            if(UserData.lat && UserData.lng ){

            orderLocationArray.push(UserData);
            }

        });

        this.orderslocationData = orderLocationArray;
        console.log("lats and lngs" ,this.orderslocationData);

    }
}


clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`)
}

pointers: marker[] = [
    {
        lat: "17.407073254851742",
        lng: "78.40179428458215",
        label: 'A',
        icon: '../assets/images/green.png'
    },
    {
        lat: "17.70732548",
        lng: "78.179428458215",
        label: 'B',
        icon: '../assets/images/red.png'
    }
]


    ngOnInit() {
        this.getPolygonDistributors();
        this.getProductByCategory();
        this.getOrdersOnMap();
    }

}
