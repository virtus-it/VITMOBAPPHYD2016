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
import * as _ from 'underscore';
@Component({
    selector: 'app-order-detail-dailog',
    templateUrl: './order-detail-dailog.component.html',
    styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OrderDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private orderLandingService: OrderLandingService) { }
    dailogOrderDetails: any = {};
    customerProductDetails:any = [];
    showCustomerDetails() {
        let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
            width: '95%',
            data: ''
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    editCan() {
        let dialogRefEditCan = this.dialog.open(EmptyCanDailogComponent, {
            width: '700px',
            data: ''
        });
        dialogRefEditCan.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    onHoldStatus() {
        let dialogRefonHoldStatus = this.dialog.open(OnHoldOrderStatusComponent, {
            width: '550px',
            data: ''
        });
        dialogRefonHoldStatus.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    editStatus() {
        let dialogRefeditStatus = this.dialog.open(EditOrderStatusComponent, {
            width: '750px',
            data: ''
        });
        dialogRefeditStatus.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);


        });

    }
    getOrderDetailsById() {
        console.log(this.orderDetail);
        let input = { orderId: this.orderDetail.order_id, appType: this.authenticationService.appType(), userId: this.authenticationService.loggedInUserId() };
        this.orderLandingService.getOrderById(input)
            .subscribe(
            output => this.getOrderDetailsByIdResult(output),
            error => {
                console.log("error in order details");
            });
    }
    getOrderDetailsByIdResult(result) {
        console.log(result);
        if (result.data && result.data.length > 0) {
            this.dailogOrderDetails = result.data[0];
        }
    }
    getProductsListByCustomerId(){
        let input = { customerID: this.orderDetail.order_by, appType: this.authenticationService.appType() };
        this.orderLandingService.getProductsByCustomerID(input)
            .subscribe(
            output => this.getProductsListByCustomerIdResult(output),
            error => {
                console.log("error in order details");
            });

    }
    getProductsListByCustomerIdResult(reuslt){
        
                if(reuslt.data.user.stock && reuslt.data.user.stock.length > 0){
                   
                    this.customerProductDetails = _.filter(reuslt.data.user.stock, function(e:any) { return e.avaliablecans !== 0; });
                    
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
