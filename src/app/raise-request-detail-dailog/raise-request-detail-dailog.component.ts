import { Component, OnInit , Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';




@Component({
  selector: 'app-raise-request-detail-dailog',
  templateUrl: './raise-request-detail-dailog.component.html',
  styleUrls: ['./raise-request-detail-dailog.component.css']
})
export class RaiseRequestDetailDailogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<RaiseRequestDetailDailogComponent> , private authenticationService: AuthenticationService, private distributorService: DistributorServiceService,) { }

  requestdate = null;
  allProducts = [];
  requestquantity = '';


  getProducts(){ // call proper function of products
    let input = {"root":{"userid":this.authenticationService.loggedInUserId() ,"dealerid": this.authenticationService.superDelearId() ,"distributorid": this.authenticationService
    .loggedInUserId() ,"usertype": this.authenticationService.userType() ,"loginid": this.authenticationService.loggedInUserId() ,"apptype": this.authenticationService.appType()}}
    this.distributorService.raiseRequestProducts(input)
    .subscribe(
    output => this.getProductsResult(output),
    error => {
        //console.log("Logged in falied");
    });
  }
  getProductsResult(result){
    if(result.result == 'success'){
      this.allProducts = result.data;
      _.each(this.allProducts , function(i , j){
        let details:any = i;
      });
      console.log(result.data , 'products' );
    }
  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  
  ngOnInit() {
    console.log(this.Details);
    if(this.Details.type == 'newRaiseRequest'){
      this.getProducts();
    }
}

}
