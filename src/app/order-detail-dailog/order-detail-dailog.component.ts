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
import { QuickNotificationComponent } from '../quick-notification/quick-notification.component';
import { SmsServiceService } from '../sms/sms-service.service';
import { MessageTemplateComponent } from '../message-template/message-template.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { FollowUpService } from '../follow-up/follow-up.service';
import { EditQuantityDailogComponent } from '../edit-quantity-dailog/edit-quantity-dailog.component';
import { LoaderService } from '../login/loader.service';
import { DistributorListDialogComponent } from '../distributor-list-dialog/distributor-list-dialog.component';
import { DistributorCreateDialogComponent } from '../distributor-create-dialog/distributor-create-dialog.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import * as _ from 'underscore';


@Component({
    selector: 'app-order-detail-dailog',
    templateUrl: './order-detail-dailog.component.html',
    styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<OrderDetailDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetail: any, public dialog: MdDialog, private followupService: FollowUpService, private orderLandingService: OrderLandingService, private loaderService: LoaderService, private smsService: SmsServiceService) { }
    dailogOrderDetails: any = {};
    deliveredStatus = false;
    customerProductDetails: any = [];
    customerProductDetailsCopy: any = [];
    message = "";
    followUpList: any = [];
    superDealer = true;
    customerCare = true;
    dataSucceed = true;
    salesTeamLogin = true;
    quickFilterView = "";
    customerAddressDetails = "";
    messageInput = { "order": { "orderstatus": "Message", "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetail.order_id, "ispublic": "0", "customerid": this.orderDetail.order_by, "reason": "", "sendSmsToCust": false } };

    notificationDetails = { "templatename": "", "status": "sent" };
    notificationHistory = [];
    orderbyallMessages: any = [];
    orderDetailsMessageToCustomer: any = '';
    orderDetailsMessageToDistributor : any = '';
    address: any = '';
    raiseInvoiceInput={loginid:this.authenticationService.loggedInUserId(),orderid: this.orderDetail.order_id, status:"",apptype: "moya"};



    // notificationsInput={"User":{"mobilenumber":[{"mobileno":this.orderDetail.customer.mobileno,"gcm_regid":this.customerProductDetails.gcm_regid,"fullName":this.orderDetail.customer.firstname}],"count":1,"name":"","smstype":"notification","user_type":"dealer","TransType":"createsms","type":"","showcomment":false,"loginid":289,"apptype":this.authenticationService.appType(),"body":"","title":"","redirecturl":"","url":"","buttons":[""], "buttonactions":[{}], "option":[""],"sliderurl":[{"image":"","count":0}],"devicetype":"","moyaversioncode":""}};

    showCustomerDetails(orderData) {
        this.onCloseCancel();
        let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
            width: '95%',
            data: orderData
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            ////console.log(`Dialog closed: ${result}`);


        });

    }
    openUpdateDialog() {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: this.dailogOrderDetails.dealerdetails
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;

        });
    }
    showEditCustomer() {

        let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

            width: '700px',
            data: this.dailogOrderDetails
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
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
            width: '550px',
            data: orderData
        });
        dialogRefeditStatus.afterClosed().subscribe(result => {
            ////console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.message = "success";
                this.getOrderDetailsById();
                this.getProductsListByCustomerId();
            }

        });

    }

    messageTemplate(data) {
        let dialogRefeditStatus = this.dialog.open(MessageTemplateComponent, {
            width: '95%',
            data: data
        });
        dialogRefeditStatus.afterClosed().subscribe(result => {
            ////console.log(`Dialog closed: ${result}`);

            if (result == undefined) {
                this.messageInput.order.reason = "";

            }


            else if (result != '') {

                this.messageInput.order.reason = result;

            }
            else if (result == '' || result === null) {
                this.messageInput.order.reason = "";
            }


        });

    }
    getOrderDetailsById() {
        ////console.log(this.orderDetail);
        this.loaderService.display(true);
        let input = {};
        if (this.orderDetail.type == 'mapviewAllOrders') {
            input = { "root": { orderid: this.orderDetail.data.orderid, apptype: this.authenticationService.appType(), userid: this.authenticationService.loggedInUserId() } };
        }
        else {
            input = { "root": { orderid: this.orderDetail.order_id, apptype: this.authenticationService.appType(), userid: this.authenticationService.loggedInUserId() } };

        }
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
        console.log(result);
        console.log("getOrderDetails");
        if (result.data && result.data.length > 0) {
            this.dailogOrderDetails = result.data[0];
            if (this.dailogOrderDetails.status == "onhold") {
                this.dailogOrderDetails.OrderModifiedStatus = "On Hold";
                this.dailogOrderDetails.StatusColor = "warning";
            }
            else if (this.dailogOrderDetails.status.toLowerCase() == "cancelled") {
                this.dailogOrderDetails.OrderModifiedStatus = "Cancelled";
                this.dailogOrderDetails.StatusColor = "danger";
            }
            else if (this.dailogOrderDetails.status.toLowerCase() == "rejected") {
                this.dailogOrderDetails.OrderModifiedStatus = "Rejected";
                this.dailogOrderDetails.StatusColor = "danger";
            }
            else if (this.dailogOrderDetails.status == "assigned") {
                this.dailogOrderDetails.OrderModifiedStatus = "Re-Assign";
                this.dailogOrderDetails.StatusColor = "info";
            }
            else if (this.dailogOrderDetails.status.toLowerCase() == "delivered") {
                this.dailogOrderDetails.OrderModifiedStatus = "Delivered";
                this.dailogOrderDetails.StatusColor = "success";
            }
            else if (this.dailogOrderDetails.status == "doorlock" || this.dailogOrderDetails.status == "Door Locked") {
                this.dailogOrderDetails.OrderModifiedStatus = "Door Locked";
                this.dailogOrderDetails.StatusColor = "warning";
            }
            else if (this.dailogOrderDetails.status == "cannot_deliver" || this.dailogOrderDetails.status == "Cant Deliver") {
                this.dailogOrderDetails.OrderModifiedStatus = "Cant Deliver";
                this.dailogOrderDetails.StatusColor = "warning";
            }
            else if (this.dailogOrderDetails.status == "Not Reachable" || this.dailogOrderDetails.status == "not_reachable") {
                this.dailogOrderDetails.OrderModifiedStatus = "Not Reachable";
                this.dailogOrderDetails.StatusColor = "warning";
            }
            else if (this.dailogOrderDetails.status == "pending") {
                this.dailogOrderDetails.OrderModifiedStatus = "Pending";
                this.dailogOrderDetails.StatusColor = "warning";
            }
            else if (this.dailogOrderDetails.status == "ordered" || this.dailogOrderDetails.status == "backtodealer" || this.dailogOrderDetails.status == "not_broadcasted") {
                this.dailogOrderDetails.OrderModifiedStatus = "Assign";
                this.dailogOrderDetails.StatusColor = "info";
            }
            console.log(this.dailogOrderDetails);
            this.notificationHistory = result.data[0].notification;
            this.getfollowUpdetails();
        }
        else {
            this.getfollowUpdetails();
        }
    }
    getProductsListByCustomerId() {
        this.loaderService.display(true);
        let input = {};
        if (this.orderDetail.type == 'mapviewAllOrders') {
            input = { customerID: this.orderDetail.customerid, appType: this.authenticationService.appType() }
        }
        else {
            input = { customerID: this.orderDetail.order_by, appType: this.authenticationService.appType() };
        }
        console.log(input);
        this.orderLandingService.getProductsByCustomerID(input)

            .subscribe(
                output => this.getProductsListByCustomerIdResult(output),
                error => {
                    ////console.log("error in order details");
                    this.loaderService.display(false);
                });

    }
    getProductsListByCustomerIdResult(result) {
        AuthenticationService.showLog(result);
        AuthenticationService.showLog("stock data");

        this.loaderService.display(false);
        if (result.data) {
            this.customerAddressDetails = result.data.user.address;
        }
        if (result.data.user.stock && result.data.user.stock.length > 0) {
            ////console.log(result.data.user.stock);
            this.customerProductDetails = _.filter(result.data.user.stock, function (e: any) { return e.avaliablecans !== 0; });
            this.customerProductDetailsCopy = _.filter(result.data.user.stock, function (e: any) { return e.avaliablecans !== 0; });
            _.each(this.customerProductDetails, function (i, j) {
                let details: any = i;
                if (details.avaliablecans < 0) {
                    details.showIcon = true;
                    details.avaliablecans = Math.abs(details.avaliablecans);
                }
                else {
                    details.showIcon = false;
                }

            });

        }
    }
    sendMessage() {
        this.loaderService.display(true);
        // let input:any =  JSON.parse(JSON.stringify(this.messageInput)); deep copy
        let input:any = Object.assign({}, this.messageInput); //json copy
         if (input.order.ispublic == true) {
            input.order.sendSmsToCust = false;
            }
      else if(input.order.sendSmsToCust){
          input.order.sendSmsToCust = true;
      }
      else{
          input.order.sendSmsToCust = false;
      }
        this.orderLandingService.sendMessage(input)
            .subscribe(
                output => this.sendMessageResult(output),
                error => {
                    ////console.log("error in order details");
                });
    }
    sendMessageResult(result) {
        this.loaderService.display(false);
        ////console.log(result);
        if (result.result == 'success') {
            this.messageInput.order.reason = "";
            this.getOrderDetailsById();
        }
    }
    // sendSmsToCust(){
    //     this.loaderService.display(true);
    //     let input = this.messageInput;
    //     if(this.sendSmsToCust){
    //         input.order.ispublic = '1';
    //     }
    //     this.orderLandingService.sendMessage(input)
    //         .subscribe(
    //             output => this.sendMessageResult(output),
    //             error => {
    //                 ////console.log("error in order details");
    //             });
    // }

    onCloseCancel() {
        this.thisDialogRef.close('success');
    }

    deliveryStatus() {
        if (this.orderDetail.OrderModifiedStatus == 'Delivered') {
            this.deliveredStatus = true;
        }
        else {
            this.deliveredStatus = false;
        }

    }

    onCloseModel() {

        this.thisDialogRef.close("success");
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


    // notification(type){
    // let input = this.notificationsInput;
    // if(type == 'radio'){
    //     this.notificationsInput.User.smstype = "notification";
    //     this.notificationsInput.User.type = "radio";
    //     this.notificationsInput.User.body= "body tag message here";
    //     this.notificationsInput.User.title = "title bar message";
    //     this.notificationsInput.User.buttons = ["Radio Button"];

    // }
    // if(type == 'checkbox'){
    //     input.User.smstype = "notification";
    //     input.User.type = "checkbox";
    //     input.User.body= "body tag message here";
    //     input.User.title = "title bar message";
    //     input.User.buttons = ["Radio Button"];
    //     input.User.option= ["option1"];
    // }
    // if(type=='website'){
    //     input.User.smstype = "notification";
    //     input.User.type = "website";
    //     input.User.body= "body tag message here";
    //     input.User.title = "title bar message";
    //     input.User.redirecturl = "http://www.moya.online";
    // }
    // if(type=='slide'){
    //     input.User.smstype = "notification";
    //     input.User.type = "slide";
    //     input.User.body= "body tag message here";
    //     input.User.title = "title bar message";
    //     input.User.sliderurl= [{"image":"https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?h=350&auto=compress&cs=tinysrgb","count":0}];
    // }
    // if(type == 'playstore'){
    //     input.User.smstype = "notification";
    //     input.User.type = "playstore";
    //     input.User.body= "body tag message here";
    //     input.User.title = "title bar message";
    //     input.User.buttons = ["Rate us now!!"];
    //     input.User.buttonactions = [{text: "Rate Now", actiontype: "playstore"}];
    // }
    // console.log(input);
    // this.smsService.CreateSms(input)
    // .subscribe(
    // output => this.saveMobileSmsResult(output),
    // error => {
    // });
    // }
    // saveMobileSmsResult(result) {
    //   if(result.result == 'success'){

    //   }
    // }


    getTemplates(data) {
        let dialogRefeditStatus = this.dialog.open(QuickNotificationComponent, {
            width: '600px',
            data: data
        });
        dialogRefeditStatus.afterClosed().subscribe(result => {
            ////console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getOrderDetailsById();

                // this.notificationDetails.templatename = result.User.tempname;
            }

        });

    }


    getfollowUpdetails() {
        let input = {};
        if (this.orderDetail.type == 'mapviewAllOrders') {
            input = { "User": { "type": "order", "typeid": this.orderDetail.data.orderid, "transtype": "getall" } }
        }
        else {
            input = { "User": { "type": "order", "typeid": this.orderDetail.order_id, "transtype": "getall" } }
        }

        this.followupService.getFollowUp(input)
            .subscribe(
                output => this.getfollowUpdetailsResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    getfollowUpdetailsResult(result) {
        //console.log(result);
        if (result.result == 'success') {
            this.followUpList = result.data.output;
            this.orderbyallMessages = _.union(this.dailogOrderDetails.messages, this.followUpList);

            //    var sortablearray = this.orderbyallMessages;
            //     var sortedList = _.sortBy(sortablearray, 'createddate');
            //     console.log(sortedList , 'sortedList');
            //     this.orderbyallMessages = sortedList;
        }
    }


    editQuantity(data) {
        let dialogRefEditQun = this.dialog.open(EditQuantityDailogComponent, {
            width: '80%',
            data: data
        });

        dialogRefEditQun.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getOrderDetailsById();
            }
        });
    }

    assignOrder(data) {
        let formattedData = { type: 'assignfromOrderDetails', data: data }
        //   console.log(data, 'sdgsdgsd');
        let dialogRefDist = this.dialog.open(DistributorListDialogComponent, {

            width: '70%',
            data: formattedData
        });
        dialogRefDist.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getOrderDetailsById();
                this.thisDialogRef.close('success');
            }

        });
    }

    internalMessage(orderDetails) {
        console.log(orderDetails);
        let data = { "id": orderDetails.order_id, "firstname": orderDetails.orderby_firstname, "lastName": orderDetails.orderby_lastname, "type": "order", "mobileno": orderDetails.orderby_mobileno, "followupstatus": orderDetails.followupstatus };
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {

            width: '70%',
            data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            if (result == 'Success') {
                this.getOrderDetailsById();
            }
        });
    }


    // This is to send sms to customer
    sendOrderDetailsMessage(data: any) {
        console.log(data, 'order details sms to user');
        if (!data.orderby_firstname) {
            data.orderby_firstname = ' ';
        }
        else if (!data.distributor.firstname) {
            data.distributor.firstname = ' ';
        }
        else if (!data.order_id) {
            data.order_id = ' ';
        }
        else if (!data.buildingname) {
            data.buildingname = '';
        }
        else if (!data.locality) {
            data.locality = '';
        }
        else if (!data.orderby_address) {
            data.orderby_address = '';
        }
        this.address = data.buildingname + '' + data.locality + '' + data.orderby_address;

        this.orderDetailsMessageToCustomer = 'Hi ' + data.orderby_firstname + ' Your order with Moya The waterman is being handled by distributor ' + data.distributor.firstname + '. Your Order Details are : Order ID ' + data.order_id + 'Product : ' + data.productdetails.category + ', Quantity : ' + data.quantity + ' . At address : ' + this.address + '.';
        let userMessageInput = { "User": { "mobilenumber": [{ "mobileno": data.orderby_mobileno, "gcm_regid": "0", "fullName": data.orderby_firstname }], "count": 1, "name": 'Moya', "smstype": "sms", "user_type": this.authenticationService.userType(), "transtype": "createsms", "type": "", "showcomment": false, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "body": this.orderDetailsMessageToCustomer, "title": "", "redirecturl": "", "url": "", "buttons": [""], "buttonactions": [], "option": [""], "sliderurl": [{ "image": "", "count": 0 }] } }
        let formattedInput = { type: '', getAllMobileInput: {}, sendSmsInput: userMessageInput };
        this.messageInput.order.reason = this.orderDetailsMessageToCustomer;
        this.messageInput.order.ispublic = '0';
        // this.smsService.CreateSms(formattedInput)
        //     .subscribe(
        //         output => this.sendOrderDetailsMessageResult(output),
        //         error => {
        //         });
    }
    sendOrderDetailsMessageResult(result) {
    console.log(result);
    // this.thisDialogRef.close(result);
    }



    // This is to send sms to distributor
    sendOrderDetailsMessageToDistributor(data: any) {
        console.log(data, 'order details sms to user');
        if (!data.orderby_firstname) {
            data.orderby_firstname = ' ';
        }
        else if (!data.distributor.firstname) {
            data.distributor.firstname = ' ';
        }
        else if (!data.order_id) {
            data.order_id = ' ';
        }
        else if (!data.buildingname) {
            data.buildingname = '';
        }
        else if (!data.locality) {
            data.locality = '';
        }
        else if (!data.orderby_address) {
            data.orderby_address = '';
        }
        this.address = data.buildingname + '' + data.locality + '' + data.orderby_address;

        this.orderDetailsMessageToDistributor = 'Hi ' + data.distributor.firstname + ' You received an order from' + data.distributor.firstname + '. The Order Details are : Order ID ' + data.order_id + 'Product : ' + data.productdetails.category + ', Quantity : ' + data.quantity + ' . At address : ' + this.address + '.';
        let userMessageInput = { "User": { "mobilenumber": [{ "mobileno": data.orderby_mobileno, "gcm_regid": "0", "fullName": data.orderby_firstname }], "count": 1, "name": 'Moya', "smstype": "sms", "user_type": this.authenticationService.userType(), "transtype": "createsms", "type": "", "showcomment": false, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "body": this.orderDetailsMessageToCustomer, "title": "", "redirecturl": "", "url": "", "buttons": [""], "buttonactions": [], "option": [""], "sliderurl": [{ "image": "", "count": 0 }] } }
        let formattedInput = { type: '', getAllMobileInput: {}, sendSmsInput: userMessageInput };
        this.messageInput.order.reason = this.orderDetailsMessageToDistributor;
        this.messageInput.order.ispublic = '1';
    //     this.smsService.CreateSms(formattedInput)
    //         .subscribe(
    //             output => this.sendOrderDetailsMessageToDistributorResult(output),
    //             error => {
    //             });
     }
    sendOrderDetailsMessageToDistributorResult(result) {
    console.log(result);
    // this.thisDialogRef.close(result);
    }
raiseInvoice(){
this.raiseInvoiceInput.status="raiseinvoice";
let input={"order":this.raiseInvoiceInput};
console.log(this.raiseInvoiceInput);
this.orderLandingService.raiseInvoiceStatus(input)
            .subscribe(
                output => this.raiseInvoiceResult(output),
                error => {
                    console.log("failed");
                });
}
raiseInvoiceResult(data){
    if(data.result == "success")
    this.getOrderDetailsById();
    this.getProductsListByCustomerId();
    this.deliveryStatus();
    console.log(data);
}
paymentReceived(){
    this.raiseInvoiceInput.status="invoicepaymentconfirm";
    let input={"order":this.raiseInvoiceInput};
    console.log(this.raiseInvoiceInput);
    this.orderLandingService.raiseInvoiceStatus(input)
            .subscribe(
                output => this.paymentReceivedResult(output),
                error => {
                    console.log("failed");
                });
}
paymentReceivedResult(data){
    if(data.result == "success")
    this.getOrderDetailsById();
    this.getProductsListByCustomerId();
    this.deliveryStatus();
console.log(data);
}



ngOnInit() {
    this.getOrderDetailsById();
    this.getProductsListByCustomerId();
    this.deliveryStatus();
    // this.getfollowUpdetails();
    this.superDealer = this.authenticationService.getSupperDelear();
    this.customerCare = this.authenticationService.customerCareLoginFunction();
    this.salesTeamLogin = this.authenticationService.salesTeamLoginFunction();
    console.log(this.orderDetail);
    // this.getUserDetails();

}

}
