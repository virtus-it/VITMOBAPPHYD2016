import { Component, OnInit } from '@angular/core';
import { DistributorServiceService } from './distributor-service.service'
import { AuthenticationService } from '../login/authentication.service';
@Component({

    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
    distributors:any = [];
    constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService) { }
    getDistributors() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 10 } }
        console.log(input);
        this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.getDistributorsResult(output),
            error => {
                console.log("error in distrbutors");
            });
    }
    getDistributorsResult(data) {
        console.log(data);
        if (data.result == 'success') {
            this.distributors = data.data;
        }
    }
    ngOnInit() {
        this.getDistributors()
    }

}
