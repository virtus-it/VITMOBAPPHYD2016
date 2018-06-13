import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Details: any,  public thisDialogRef: MdDialogRef<OrderHistoryComponent> ,  private orderLandingService: OrderLandingService, private authenticationService: AuthenticationService, ) { }
  orderHistoryDetails:any = [];



  orderHistoryData(){
    let input = {"order":{"userid":this.authenticationService.loggedInUserId(),"orderid": this.Details.order_id,"usertype": this.authenticationService.userType() ,"transtype":"ordershistory","pagesize":30,"last_orderid":null,"apptype": this.authenticationService.appType(),"createdthru":"website","devicetype":"","moyaversioncode":""}};
    this.orderLandingService.getOrderList(input)
    .subscribe(
    output => this.orderHistoryResult(output),
    error => {
    //console.log("error in distrbutors");
    });
  }
  orderHistoryResult(result){
    if(result.result == 'success'){
      this.orderHistoryDetails = result.data;
    }
  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}


  ngOnInit() {
    console.log(this.Details);
    this.orderHistoryData();
  }

}
