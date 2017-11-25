import { Component, OnInit,Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import * as moment from 'moment';
import { MdDialog } from '@angular/material';
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
  polygonArray: any = [];
  displayPolygon: any = [];
  listOfDistributors: any = [];
  dialogRef: any = '';
  order = { orderId: "" };
  gpsMessage:string = "";
  //orderDetails = "";
  markers: any = [
      {
          lat: '',
          lng: '',
      }
  ]
  constructor(public gMaps: GoogleMapsAPIWrapper, private distributorService: DistributorServiceService,private authenticationService: AuthenticationService,public thisDialogRef: MdDialogRef<OrderCoverageDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any,public dialog: MdDialog) { }
  dailogCloseResult = "cancel";

        assignPolygon(){
            this.polygonArray= this.orderDetail.polygons;
            this.displayPolygon=this.orderDetail.polygons;
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
                    console.log(`Dialog closed: ${result}`);
    
    
                });
    
    
            }
        }
        getOrderDetail() {
          let input = { appType: this.authenticationService.appType(), orderid: this.orderDetail.orders.order_id, userId: this.authenticationService.loggedInUserId() };
          this.distributorService.getOrderById(input)
              .subscribe(
              output => this.getOrderDetailResult(output),
              error => {
                  console.log("falied");
              });
  
      }
      getOrderDetailResult(result) {
          console.log(result);
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
        
                    width: '700px',
                    data: this.orderDetail.orders
                });
                dialogRefDist.afterClosed().subscribe(result => {
                    console.log(`Dialog closed: ${result}`);
                    if(result == 'success'){
                    this.dailogCloseResult = 'success';
                    this.getOrderDetail();
                    }
        
                });
        
        
        
            }
      onCloseCancel() {
        this.thisDialogRef.close(this.dailogCloseResult);
      }
  ngOnInit() {
    //this.getPolygonDistributors();
    this.assignPolygon();
    this.getOrderDetail();
  }

}
