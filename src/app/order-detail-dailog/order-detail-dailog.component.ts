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
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';
@Component({
    selector: 'app-order-detail-dailog',
    templateUrl: './order-detail-dailog.component.html',
    styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OrderDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService,private loaderService: LoaderService) { }
    dailogOrderDetails: any = {};
    customerProductDetails: any = [];
    messageInput = {"order":{ "orderstatus":"Message", "usertype":this.authenticationService.userType(), "loginid":this.authenticationService.loggedInUserId(), "orderid":this.orderDetail.order_id, "ispublic":"0", "customerid":this.orderDetail.order_by, "reason":"" } };
showCustomerDetails(orderData) {
    let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
        width: '95%',
        data: orderData
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);


    });

}
editCan(orderData) {
    this.customerProductDetails.order_by = orderData.order_by;
    let dialogRefEditCan = this.dialog.open(EmptyCanDailogComponent, {
        width: '700px',
        data: this.customerProductDetails
    });
    dialogRefEditCan.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
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
        console.log(`Dialog closed: ${result}`);
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
        console.log(`Dialog closed: ${result}`);
        if (result == 'success') {
            this.getOrderDetailsById();
            this.getProductsListByCustomerId();
        }

    });

}
getOrderDetailsById() {
    console.log(this.orderDetail);
    this.loaderService.display(true);
    let input = { orderId: this.orderDetail.order_id, appType: this.authenticationService.appType(), userId: this.authenticationService.loggedInUserId() };
    this.orderLandingService.getOrderById(input)
        .subscribe(
        output => this.getOrderDetailsByIdResult(output),
        error => {
            console.log("error in order details");
            this.loaderService.display(false);
        });
}
getOrderDetailsByIdResult(result) {
    this.loaderService.display(false);
    console.log(result);
    if (result.data && result.data.length > 0) {
        this.dailogOrderDetails = result.data[0];
    }
}
getProductsListByCustomerId() {
    this.loaderService.display(true);
    let input = { customerID: this.orderDetail.order_by, appType: this.authenticationService.appType() };
    this.orderLandingService.getProductsByCustomerID(input)
        .subscribe(
        output => this.getProductsListByCustomerIdResult(output),
        error => {
            console.log("error in order details");
            this.loaderService.display(false);
        });

}
getProductsListByCustomerIdResult(result) {
    this.loaderService.display(false);
    if (result.data.user.stock && result.data.user.stock.length > 0) {
        console.log(result.data.user.stock);
        this.customerProductDetails = _.filter(result.data.user.stock, function (e: any) { return e.avaliablecans !== 0; });

    }
}
sendMessage(){
    this.loaderService.display(true);
    let input = this.messageInput;
    this.orderLandingService.sendMessage(input)
    .subscribe(
    output => this.sendMessageResult(output),
    error => {
        console.log("error in order details");
    });
}
sendMessageResult(result){
    this.loaderService.display(false);
    console.log(result);
    if(result.result == 'success'){
        this.messageInput.order.reason = "";
        this.getOrderDetailsById();
    }
}
onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}
ngOnInit() {
    this.getOrderDetailsById();
    this.getProductsListByCustomerId();
}

}
