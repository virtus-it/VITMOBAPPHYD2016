import { Component, OnInit, Inject, ElementRef, NgModule, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import * as moment from 'moment';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';
import { } from '@types/googlemaps';
declare var google: any;
@Component({
    selector: 'app-order-coverage-detail-dailog',
    templateUrl: './order-coverage-detail-dailog.component.html',
    styleUrls: ['./order-coverage-detail-dailog.component.css']
})
export class OrderCoverageDetailDailogComponent implements OnInit {
    lat: number = 17.3850;
    lng: number = 78.4867;
    zoom: number = 12;
    public searchControl: FormControl;
    polygonArray: any = [];
    displayPolygon: any = [];
    listOfDistributors: any = [];
    dialogRef: any = '';
    order = { orderId: "" };
    gpsMessage: string = "";
    filterInputkmvalue = { kmvalue: "" };
    categoryList: any = [];
    reasonOnHold:any;
    dropdownSettings = {
        singleSelection: false,
        text: "Select Status",
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        badgeShowLimit: 2,
        classes: "myclass custom-class myyy"
    };
    filterInput = {
        "area": {
            "user_type": "dealer", "user_id": 0, "apptype": this.authenticationService.appType(), "searchtype": "categoryname",
            "searchtext": ""
        }
    };
    dropdownData = { selectedItems: [] };
    //orderDetails = "";
    @ViewChild("search")
    public searchElementRef: ElementRef;
    markers: any = [
        {
            lat: '',
            lng: '',
        }
    ]
    constructor(public gMaps: GoogleMapsAPIWrapper, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OrderCoverageDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private loaderService: LoaderService, private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, private productService: ProductsService) { }
    dailogCloseResult = "cancel";

    assignPolygon() {
        this.polygonArray = this.orderDetail.polygons;
        this.displayPolygon = this.orderDetail.polygons;
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
            this.displayPolygon = [];
            this.displayPolygon.push(distributor);
        }
    }
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

                width: '700px',
                data: distributor
            });
            dialogRef.afterClosed().subscribe(result => {
                //console.log(`Dialog closed: ${result}`);


            });


        }
    }
    getOrderDetail() {
        this.loaderService.display(true);
        let input = { appType: this.authenticationService.appType(), orderid: this.orderDetail.orders.order_id, userId: this.authenticationService.loggedInUserId() };
        this.distributorService.getOrderById(input)
            .subscribe(
            output => this.getOrderDetailResult(output),
            error => {
                //console.log("falied");
                this.loaderService.display(false);
            });

    }
    getOrderDetailResult(result) {

        this.loaderService.display(false);
        if (result && result.data) {
            if (result.data[0].orderby_latitude && result.data[0].orderby_longitude) {
                this.markers[0].lat = parseFloat(result.data[0].orderby_latitude);
                this.markers[0].lng = parseFloat(result.data[0].orderby_longitude);
                this.lat = parseFloat(result.data[0].orderby_latitude);
                this.lng = parseFloat(result.data[0].orderby_longitude);
            }
            else if (result.data[0].customer_latitude && result.data[0].customer_longitude) {
                this.markers[0].lat = parseFloat(result.data[0].customer_latitude);
                this.markers[0].lng = parseFloat(result.data[0].customer_longitude);
                this.lat = parseFloat(result.data[0].customer_latitude);
                this.lng = parseFloat(result.data[0].customer_longitude);
            }
            else {
                this.gpsMessage = "No GPS for this customer";
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
            //console.log(`Dialog closed: ${result}`);
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
            }
            else {
                var myPosition = new google.maps.LatLng(this.markers[0].lat, this.markers[0].lng);
                this.displayPolygon = [];
                for (let dist of this.polygonArray) {

                    var polygonPath = new google.maps.Polygon({
                        paths: dist.path
                    });
                    // 0.03 3km
                    // 0.05 5km
                    // 0.1   10km
                    let distance = parseFloat(this.filterInputkmvalue.kmvalue);
                    if (google.maps.geometry.poly.isLocationOnEdge(myPosition, polygonPath, distance)) {

                        this.displayPolygon.push(dist);
                    }

                }
            }
        }

    }
    getProductByCategory() {
        let input = { "userId": this.authenticationService.loggedInUserId(), "userType": "dealer", "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
        //console.log(input);

        this.productService.getProductsCategory(input)
            .subscribe(
            output => this.getProductsCategoryResult(output),
            error => {
                //console.log("error in products category list");
            });
    }
    getProductsCategoryResult(result) {
        //console.log(result);
        let categoryListCopy = [];
        if (result.result == "success") {
            _.each(result, function (i, j) {
                _.each(result.data, function (k, l) {
                    let details: any = k;
                    let value = { "id": details.categoryid, "itemName": details.category }
                    categoryListCopy.push(value);
                });

            });


            this.categoryList = categoryListCopy;

        }
    }
    searchPolygon() {
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

    }

    filteredList() {
        let input = this.filterInput;
        //console.log(input);
        this.distributorService.getFilteredPolygon(input)
            .subscribe(
            output => this.getFilteredPolygonResult(output),
            error => {
                //console.log("error in products category list");
            });

    }

    getFilteredPolygonResult(result) {
        //console.log(result);
        if (result.result = 'success') {
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
                            // this.polygonArray.push(polygon);
                            if(this.filterInputkmvalue.kmvalue && this.filterInputkmvalue.kmvalue != 'all'){
                                var polygonPath = new google.maps.Polygon({
                                    paths: polygon.path
                                });
                                let distance = parseFloat(this.filterInputkmvalue.kmvalue);
                                var myPosition = new google.maps.LatLng(this.markers[0].lat, this.markers[0].lng);
                                if (google.maps.geometry.poly.isLocationOnEdge(myPosition, polygonPath, distance)) {
            
                                    this.displayPolygon.push(polygon);
                                }
                            }
                            else{
                                this.displayPolygon.push(polygon);
                            }
                           
                        }
                    }

                }
            }

        }
    }


    openMapDialog(data) {
        //console.log(data);
        let modelData={"type":"assignFromOrders", data:data}
        let dialogRef = this.dialog.open(MapDialogComponent, {
            width: '90%',
            data: modelData
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);

           
        });
    }



    filterPolygon() {
        if (this.dropdownData.selectedItems) {
            this.searchPolygon();

        }
        else {
            this.filterDistancePolygon();
        }
    }
    ngOnInit() {
        //this.getPolygonDistributors();
        this.assignPolygon();
        this.getOrderDetail();
        this.getProductByCategory();
        //console.log(this.orderDetail);
        this.searchControl = new FormControl();
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
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
    }

}
