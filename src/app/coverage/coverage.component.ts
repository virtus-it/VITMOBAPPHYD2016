import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from '../distributor/distributor-service.service'
import { AuthenticationService } from '../login/authentication.service';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { MdDialog } from '@angular/material';
declare var google: any;
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
    constructor(public gMaps: GoogleMapsAPIWrapper, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public dialog: MdDialog) { }
    mapClicked($event: any) {

    }
    getPolygonDistributors() {
       
        var input = { area: { user_type: "dealer", user_id: 0, "apptype": this.authenticationService.appType() } };
        this.distributorService.getpolygonByDistributor(input)
            .subscribe(
            output => this.getPolygonDataResult(output),
            error => {
                console.log("Logged in falied");
            });
    }
    getPolygonDataResult(output) {
      //  console.log(output);
        //9863636315
        //paani
        if (output.data && output.data.length > 0) {
            for (let data of output.data) {
              
                if (data.polygonvalue && data.polygonvalue.length > 0) {
                    for (let polygon of data.polygonvalue) {
                        polygon.color = '';
                        polygon.user_id = data.user_id;
                        polygon.distributorName = data.username;
                        polygon.supplier = data.suppliers;
                        this.polygonArray.push(polygon);
                        this.displayPolygon.push(polygon);
                    }
                }

            }
        }
    }
    
    click(event, polygon) {
        this.listOfDistributors = [];
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
    ViewProduct(distributor){
if(distributor){
    let dialogRef = this.dialog.open(ProductListDialogComponent, {
        height: '350px',
        width: '700px',
        data: distributor
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        //this.dialogResult = result;
    
    });

   
}
}
   
    ngOnInit() {
        this.getPolygonDistributors();
    }

}
