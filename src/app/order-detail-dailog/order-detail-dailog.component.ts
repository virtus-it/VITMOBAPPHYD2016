import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerDetailDailogComponent } from '../customer-detail-dailog/customer-detail-dailog.component';
import { EmptyCanDailogComponent } from '../empty-can-dailog/empty-can-dailog.component';
import { OnHoldOrderStatusComponent } from '../on-hold-order-status/on-hold-order-status.component';
import { EditOrderStatusComponent } from '../edit-order-status/edit-order-status.component';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { SmsServiceService } from '../sms/sms-service.service';
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';


@Component({
    selector: 'app-order-detail-dailog',
    templateUrl: './order-detail-dailog.component.html',
    styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OrderDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService,private loaderService: LoaderService, private smsService: SmsServiceService) { }
    dailogOrderDetails: any = {};
    deliveredStatus= false;
    customerProductDetails: any = [];
    customerProductDetailsCopy: any = [];
    customerAddressDetails="";
    messageInput = {"order":{ "orderstatus":"Message", "usertype":this.authenticationService.userType(), "loginid":this.authenticationService.loggedInUserId(), "orderid":this.orderDetail.order_id, "ispublic":"0", "customerid":this.orderDetail.order_by, "reason":"" } };

    notificationsInput={"User":{"mobilenumber":[{"mobileno":this.orderDetail.customer.mobileno,"gcm_regid":this.customerProductDetails.gcm_regid,"fullName":this.orderDetail.customer.firstname}],"count":1,"name":"","smstype":"notification","user_type":"dealer","TransType":"createsms","type":"","showcomment":false,"loginid":289,"apptype":this.authenticationService.appType(),"body":"","title":"","redirecturl":"","url":"","buttons":[""],"option":[""],"sliderurl":[{"image":"","count":0}],"devicetype":"","moyaversioncode":""}};

showCustomerDetails(orderData) {
    let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
        width: '95%',
        data: orderData
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);


    });

}
editCan(orderData) {
    this.customerProductDetailsCopy.order_by = orderData.order_by;
    let dialogRefEditCan = this.dialog.open(EmptyCanDailogComponent, {
        width: '700px',
        data: this.customerProductDetailsCopy
    });
    dialogRefEditCan.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);
        if (result == 'success') {
            this.getProductsListByCustomerId();
        }

    });

}
onHoldStatus(orderData) {
    let dialogRefonHoldStatus = this.dialog.open(OnHoldOrderStatusComponent, {
        width: '550px',
        data: orderData
    });
    dialogRefonHoldStatus.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);
        if (result == 'success') {
            this.getOrderDetailsById();
        }

    });

}
editStatus(orderData) {
    let dialogRefeditStatus = this.dialog.open(EditOrderStatusComponent, {
        width: '750px',
        data: orderData
    });
    dialogRefeditStatus.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);
        if (result == 'success') {
            this.getOrderDetailsById();
            this.getProductsListByCustomerId();
        }

    });

}
getOrderDetailsById() {
    ////console.log(this.orderDetail);
    this.loaderService.display(true);
    let input = { orderId: this.orderDetail.order_id, appType: this.authenticationService.appType(), userId: this.authenticationService.loggedInUserId() };
    this.orderLandingService.getOrderById(input)
        .subscribe(
        output => this.getOrderDetailsByIdResult(output),
        error => {
            ////console.log("error in order details");
            this.loaderService.display(false);
        });
}
getOrderDetailsByIdResult(result) {
    this.loaderService.display(false);
    ////console.log(result);
    if (result.data && result.data.length > 0) {
        this.dailogOrderDetails = result.data[0];
        if (this.dailogOrderDetails .status == "onhold") {
            this.dailogOrderDetails .OrderModifiedStatus = "On Hold";
            this.dailogOrderDetails .StatusColor = "warning";
          }
          else if (this.dailogOrderDetails .status.toLowerCase() == "cancelled") {
            this.dailogOrderDetails .OrderModifiedStatus = "Cancelled";
            this.dailogOrderDetails .StatusColor = "danger";
          }
          else if (this.dailogOrderDetails .status.toLowerCase() == "rejected") {
            this.dailogOrderDetails .OrderModifiedStatus = "Rejected";
            this.dailogOrderDetails .StatusColor = "danger";
          }
          else if (this.dailogOrderDetails .status == "assigned") {
            this.dailogOrderDetails .OrderModifiedStatus = "Re-Assign";
            this.dailogOrderDetails .StatusColor = "logo-color";
          }
          else if (this.dailogOrderDetails .status.toLowerCase() == "delivered") {
            this.dailogOrderDetails .OrderModifiedStatus = "Delivered";
            this.dailogOrderDetails .StatusColor = "success";
          }
          else if (this.dailogOrderDetails .status == "doorlock" || this.dailogOrderDetails .status == "Door Locked") {
            this.dailogOrderDetails .OrderModifiedStatus = "Door Locked";
            this.dailogOrderDetails .StatusColor = "warning";
          }
          else if (this.dailogOrderDetails .status == "cannot_deliver" || this.dailogOrderDetails .status == "Cant Deliver") {
            this.dailogOrderDetails .OrderModifiedStatus = "Cant Deliver";
            this.dailogOrderDetails .StatusColor = "warning";
          }
          else if (this.dailogOrderDetails .status == "Not Reachable" || this.dailogOrderDetails .status == "not_reachable") {
            this.dailogOrderDetails .OrderModifiedStatus = "Not Reachable";
            this.dailogOrderDetails .StatusColor = "warning";
          }
          else if (this.dailogOrderDetails .status == "pending") {
            this.dailogOrderDetails .OrderModifiedStatus = "Pending";
            this.dailogOrderDetails .StatusColor = "logo-color";
          }
          else if (this.dailogOrderDetails .status == "ordered" || this.dailogOrderDetails .status == "backtodealer" || this.dailogOrderDetails .status == "not_broadcasted") {
            this.dailogOrderDetails .OrderModifiedStatus = "Assign";
            this.dailogOrderDetails .StatusColor = "logo-color";
          }
        ////console.log(this.dailogOrderDetails);
    }
}
getProductsListByCustomerId() {
    this.loaderService.display(true);
    let input = { customerID: this.orderDetail.order_by, appType: this.authenticationService.appType() };
    this.orderLandingService.getProductsByCustomerID(input)
        .subscribe(
        output => this.getProductsListByCustomerIdResult(output),
        error => {
            ////console.log("error in order details");
            this.loaderService.display(false);
        });

}
getProductsListByCustomerIdResult(result) {
    this.loaderService.display(false);
    this.customerAddressDetails =result.data.user.address;
    if (result.data.user.stock && result.data.user.stock.length > 0) {
        ////console.log(result.data.user.stock);
        this.customerProductDetails = _.filter(result.data.user.stock, function (e: any) { return e.avaliablecans !== 0; });
        this.customerProductDetailsCopy = _.filter(result.data.user.stock, function (e: any) { return e.avaliablecans !== 0; });
        _.each(this.customerProductDetails, function (i, j)  {
            let details: any = i;
            if (details.avaliablecans < 0 ) {
                details.showIcon = true;
                details.avaliablecans = Math.abs(details.avaliablecans);
            }
            else{
                details.showIcon = false;
            }
  
          });
  
    }
}
sendMessage(){
    this.loaderService.display(true);
    let input = this.messageInput;
    this.orderLandingService.sendMessage(input)
    .subscribe(
    output => this.sendMessageResult(output),
    error => {
        ////console.log("error in order details");
    });
}
sendMessageResult(result){
    this.loaderService.display(false);
    ////console.log(result);
    if(result.result == 'success'){
        this.messageInput.order.reason = "";
        this.getOrderDetailsById();
    }
}
onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}

deliveryStatus(){
    if (this.orderDetail.OrderModifiedStatus == 'Delivered') {
        this.deliveredStatus = true;
    }
    else{
        this.deliveredStatus = false;
    }

}

//test function
// getUserDetails(){
//     let input={"User":{"userid": this.orderDetail.order_by,"mobileno":this.orderDetail.customer.mobileno,"emailid":this.orderDetail.customer.emailid,"loginid":this.authenticationService.loggedInUserId()}};
//     ////console.log(input);

//     this.orderLandingService.getUserDetails(input)
//     .subscribe(
//     output => this.getUserDetailsResult(output),
//     error => {
//         ////console.log("error in order details");
//         this.loaderService.display(false);
//     });
// }
// getUserDetailsResult(result){
//     ////console.log(result);
// }


notification(type){
    let input = this.notificationsInput;
    if(type == 'radio'){
        input.User.smstype = "notification";
        input.User.type = "radio";
        input.User.body= "body tag message here";
        input.User.title = "title bar message";
        input.User.buttons = ["Radio Button"];
    }
    if(type == 'checkbox'){
        input.User.smstype = "notification";
        input.User.type = "checkbox";
        input.User.body= "body tag message here";
        input.User.title = "title bar message";
        input.User.buttons = ["Radio Button"];
        input.User.option= ["option1"]; 
    }
    if(type=='website'){
        input.User.smstype = "notification";
        input.User.type = "website";
        input.User.body= "body tag message here";
        input.User.title = "title bar message";
        input.User.redirecturl = "http://www.moya.online";
    }
    if(type=='slide'){ 
        input.User.smstype = "notification";
        input.User.type = "slide";
        input.User.body= "body tag message here";
        input.User.title = "title bar message";
        input.User.sliderurl= [{"image":"https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?h=350&auto=compress&cs=tinysrgb","count":0}];
    }
    if(type == 'playstore'){
        input.User.smstype = "notification";
        input.User.type = "playstore";
        input.User.body= "body tag message here";
        input.User.title = "title bar message";
        input.User.buttons = ["Rate us now!!"];
    }
    // this.smsService.CreateSms(input)
    // .subscribe(
    // output => this.saveMobileSmsResult(output),
    // error => {
    // });
}
saveMobileSmsResult(result) {
  if(result.result == 'success'){

  }
}
    

ngOnInit() {
    this.getOrderDetailsById();
    this.getProductsListByCustomerId();
    this.deliveryStatus();
    console.log(this.orderDetail);
    // this.getUserDetails();
}

}
