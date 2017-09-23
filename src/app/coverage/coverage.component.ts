import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from '../distributor/distributor-service.service'
import { AuthenticationService } from '../login/authentication.service';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MdDialog } from '@angular/material';
@Component({

    templateUrl: './coverage.component.html',
    styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {
    lat: number = 17.3850;
    lng: number = 78.4867;
    zoom: number = 12;
    polygonArray: any = [];
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
        console.log(output);
        //9863636315
        //paani
        if (output.data && output.data.length > 0) {
            for (let data of output.data) {
                console.log(data.polygonvalue[0].path);
                if (data.polygonvalue && data.polygonvalue.length > 0) {
                    for (let polygon of data.polygonvalue) {
                        this.polygonArray.push(polygon);
                    }
                }

            }
        }
    }
    polygonOver(polygon) {
        
    }
    polygonOut(polygon) {
       
            //this.dialogRef.close('Pizza!');
        
    }
    ngOnInit() {
        this.getPolygonDistributors();
    }

}
