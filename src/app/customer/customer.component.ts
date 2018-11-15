import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CustomerOrderListComponent } from '../customer-order-list/customer-order-list.component';
import { CustomerPlaceorderDailogComponent } from '../customer-placeorder-dailog/customer-placeorder-dailog.component';
import { CustomerResendInvitationComponent } from '../customer-resend-invitation/customer-resend-invitation.component';
import { CustomerMakeInactiveComponent } from '../customer-make-inactive/customer-make-inactive.component';
import { CustomerSettingDailogComponent } from '../customer-setting-dailog/customer-setting-dailog.component';
import { CustomerSetPaymentCycleComponent } from '../customer-set-payment-cycle/customer-set-payment-cycle.component';
import { CustomerScheduleDaiolgComponent } from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { PreOrderCartDailogComponent } from '../pre-order-cart-dailog/pre-order-cart-dailog.component';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import { SetpricecustomerComponent } from '../setpricecustomer/setpricecustomer.component';
import { CustomerScheduleEditDailogComponent } from '../customer-schedule-edit-dailog/customer-schedule-edit-dailog.component';
import { CustomerDetailDailogComponent } from '../customer-detail-dailog/customer-detail-dailog.component';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import * as _ from 'underscore';
import * as moment from 'moment';
import { LoaderService } from '../login/loader.service';
import * as FileSaver from 'file-saver';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { SortingPipe } from '../pipes/sorting.pipe';
@Component({

    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    constructor(public dialog: MdDialog, private authenticationService: AuthenticationService, private customerService: CustomerService, private loaderService: LoaderService) { }
    customerClickMore = true;
    customerList: any = [];
    showFilterDailog = false;
    followUpdate = null;
    filterRecords = false;
    replacetext = "test";
    loginId: any = 0;
    superDealer = true;
    customerCare = true;
    salesTeamLogin = true;
    customersCount: number = 0;
    filterInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtype": "name", "searchtext": "", "lastcustomerid": "0", "pagesize": "50", "apptype": this.authenticationService.appType() } };
    FilterTypeDetails = [
        { value: 'alias', viewValue: 'Alias' },
        { value: 'name', viewValue: 'Name' },
        { value: 'mobile', viewValue: 'Mobile' },
        { value: 'address', viewValue: 'Address' },
        { value: 'paymenttype', viewValue: 'Payment Mode' },
        { value: 'customertype', viewValue: 'Customer Type' },
        { value: 'followupdate', viewValue: 'Followup Date' },
        { value: 'points', viewValue: 'Points' },
        { value: 'advamt', viewValue: 'Adv Amt < available cans' }


    ];

    sortCustomer = {
        name: '',
        sorting: null
    };

    // customersSort : customers[];
    // path: string[] = ['customers'];
    // order: number = 1; // 1 asc, -1 desc;


    // showOrderList(data) {
    //     let dialogRefOrderList = this.dialog.open(CustomerOrderListComponent, {
    //         width: '90%',
    //         data: data
    //     });
    //     dialogRefOrderList.afterClosed().subscribe(result => {
    //         //console.log(`Dialog closed: ${result}`);
    //         //this.dialogResult = result;
    //     });
    // }


    showCustomerAllOrders(orderData) {
        let formatteddata: any = { "type": "customersPage", "data": orderData }
        let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
            width: '95%',
            data: formatteddata
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
        });

    }

    // sort() {  
    //     // this.customerList
    //     //   .sort((a: any, b: any) => {
    //     //     return a.firtname - b.firstname;
    //     //   })
    //     let names :any = [];
    //     _.each(this.customerList , function(i,j){
    //         let details:any = i;
    //         names.push(details.firstname);
    //     });
    //     let newNames = names.sort();
    //     console.log(newNames , 'ascend')
    //     // let descnames = names.reverse();
    //     // console.log(descnames , 'descend');
    //   }


    showPlaceOrder(data) {
        let dialogRefPlaceorder = this.dialog.open(PreOrderCartDailogComponent, {
            width: '90%',
            data: data
        });
        dialogRefPlaceorder.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showResendInvitation() {
        let dialogRefResend = this.dialog.open(CustomerResendInvitationComponent, {
            width: '700px',
            data: ''
        });
        dialogRefResend.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showInactive(data) {
        let dialogRefInactive = this.dialog.open(CustomerMakeInactiveComponent, {
            width: '600px',
            data: data
        });
        dialogRefInactive.afterClosed().subscribe(result => {
            if (result == 'success') {
                this.getCustomerList(true);
            }
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSetting() {
        let dialogRefSetting = this.dialog.open(CustomerSettingDailogComponent, {
            width: '810px',
            data: ''
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSetPayment(data) {
        let dialogRefSetting = this.dialog.open(CustomerSetPaymentCycleComponent, {
            width: '700px',
            data: data
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    showSchedule(data) {
        let formatteddata: any = { "type": "create", "data": data, 'productName': data.product_type, customerId: data.userid, customerName: data.firstname }
        let dialogRefSetting = this.dialog.open(CustomerScheduleDaiolgComponent, {
            width: '700px',
            data: formatteddata
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            if (result == 'success') {
                this.loaderService.display(false);
            }
            else {
                this.loaderService.display(false);
            }
        });
    }


    //Edit scheduled orders
    editScheduleOrder(data) {
        let dialogRefSetting = this.dialog.open(CustomerScheduleEditDailogComponent, {
            width: "65%",
            data: data
        });
        dialogRefSetting.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);

        });

    }
    showEditCustomer(customerDetails) {
        let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

            width: '700px',
            data: customerDetails
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == "success") {
                this.loaderService.display(false);
                this.getCustomerList(true);
            }
            else {
                this.loaderService.display(false);

            }

        });

    }
    showAddCustomer() {
        let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {

            width: '700px',
            data: ''
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == "success") {
                this.getCustomerList(true);
                this.loaderService.display(false);
            }
            else {
                this.loaderService.display(false);
            }
        });

    }
    showFollowUp(details) {
        //console.log(details);
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "customer", "mobileno": details.mobileno };
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {

            width: '50%',
            data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    showFollowUpDetails(details) {
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "customer", "mobileno": details.mobileno };
        let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {

            width: '80%',
            data: data
        });
        dialogRefFollowDetails.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    getCustomerList(firstcall) {
        this.loaderService.display(true);
        let input = { userId: this.authenticationService.loggedInUserId(), lastId: 0, userType: this.authenticationService.userType(), appType: this.authenticationService.appType(), "transtype": "getallcustomers", pagesize: 100, "loginid": this.authenticationService.loggedInUserId() };
        //console.log(input);
        if (this.customerList && this.customerList.length && !firstcall) {
            let lastCustomer: any = _.last(this.customerList);
            if (lastCustomer) {
                input.lastId = lastCustomer.userid;
            }

        }
        else {
            this.customerList = [];
            input.lastId = 0;
        }
        console.log(input);
        this.customerService.getCustomerList(input)
            .subscribe(
                output => this.getCustomerListResult(output),
                error => {
                    //console.log("error in customer");
                    this.loaderService.display(false);
                });
    }
    getCustomerListResult(result) {
        //console.log(result);

        this.loaderService.display(false);
        if (result.result == 'success') {
            this.customerList = _.union(this.customerList, result.data);
            this.customersCount = this.customerList.length;
        }
        else {
            this.customerClickMore = false;
        }

    }
    filterDailogToggle() {
        this.showFilterDailog = !this.showFilterDailog;
    }
    onChangeType() {
        this.filterInput.root.searchtext = "";
    }
    getCustomerByFilter(firstcall) {
        if (this.filterInput.root.searchtype == 'followupdate') {
            this.filterInput.root.searchtext = moment(this.followUpdate).format('YYYY-MM-DD HH:MM:SS');
        }
        if (this.filterInput.root.searchtype == 'advamt') {
            this.filterInput.root.searchtext = 'empty';
        }

        let input = this.filterInput;
        // if (this.filterInput.root.searchtext && this.filterInput.root.searchtext.length > 2) {

        if (this.customerList && this.customerList.length && !firstcall) {
            let lastCustomer: any = _.last(this.customerList);
            if (lastCustomer) {
                input.root.lastcustomerid = lastCustomer.userid;
            }

        }
        else {
            this.customerList = [];
            input.root.lastcustomerid = "0";
        }
            this.customerService.searchCustomer(input)
                .subscribe(
                    output => this.getCustomerByFilterResult(output),
                    error => {
                        //console.log("error in customer");
                        this.loaderService.display(false);
                    });

        // }

    }
    getCustomerByFilterResult(result) {
        //console.log(result);
        if (result.result == 'success') {
            this.filterRecords = true;
            this.customerList = _.union(this.customerList, result.data);
            // this.customersSort = this.customerList;
        }
        // else {
        //     this.customerClickMore = false;
        // }

    }
    getcustomerByPaging() {
        if (this.filterRecords) {
            this.getCustomerByFilter(false);
        }
        else {
            this.getCustomerList(false);
        }

    }
    downloadCustomer() {
        let inputjson = {
            "root": {
                "userid": this.authenticationService.loggedInUserId(), "priority": "5", "usertype": this.authenticationService.userType(), "status": "assigned",
                "lastrecordtimestamp": "15",
                "pagesize": "5", "loginid": this.authenticationService.loggedInUserId(),
                "searchtext": "", "searchtype": "name", "apptype": this.authenticationService.appType()
            }
        };
        this.customerService.getDownloadedFile(inputjson)
            .subscribe(
                output => this.downloadCustomerResult(output),
                error => {
                    //console.log("error in customer");
                    this.loaderService.display(false);
                });

    }
    downloadCustomerResult(result) {
        let path = result.data.filename;
        this.customerService.getFile(path)
            .subscribe(
                output => this.getFileResult(output),
                error => {
                    //console.log("error in customer");
                    this.loaderService.display(false);
                });
    }
    getFileResult(result) {
        FileSaver.saveAs(result, "excel.xlsx");

    }
    clearFilter() {
        this.showFilterDailog = false;
        this.filterRecords = false;
        this.followUpdate = null;
        this.customerClickMore = true;
        this.filterInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "searchtype": "name", "searchtext": "", "lastcustomerid": "0", "pagesize": "50", "apptype": this.authenticationService.appType() } };
        this.getCustomerList(true);

    }

    setPrice(details) {
        let dialogRefEditCustomer = this.dialog.open(SetpricecustomerComponent, {
            width: '700px',
            data: details
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == "success") {
                this.getCustomerList(true);


            }

        });
    }


    showPoints(data) {

        let dialogRefEditCustomer = this.dialog.open(EditPointsComponent, {
            width: '700px',
            data: data
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == "success") {
            }

        });
    }

    // sendQuickNotification(data){
    //     let formattedData = {data: data , "type":"notificationFromCustomers"}
    //     let dialogRefeditStatus = this.dialog.open(QuickNotificationComponent, {
    //         width: '600px',
    //         data: formattedData
    //     });
    //     dialogRefeditStatus.afterClosed().subscribe(result => {
    //         ////console.log(`Dialog closed: ${result}`);
    //         if (result =='success') {

    //         }

    //     });
    // }

    sortDescending() {
        var sortablearray = this.customerList;
        var sortedList = _.sortBy(sortablearray, 'firstname').reverse();
        console.log(sortedList);
        this.customerList = sortedList;
    }

    sortAscending() {
        var sortablearray = this.customerList;
        var sortedList = _.sortBy(sortablearray, 'firstname');
        console.log(sortedList);
        this.customerList = sortedList;
    }

    showAllNotifications(data) {
        let dialogRefeditStatus = this.dialog.open(NotificationDetailsComponent, {
            width: '85%',
            data: data
        });
        dialogRefeditStatus.afterClosed().subscribe(result => {
            ////console.log(`Dialog closed: ${result}`);
            if (result == 'success') {

            }

        });

    }


    ngOnInit() {
        this.getCustomerList(true);
        this.superDealer = this.authenticationService.getSupperDelear();
        this.customerCare = this.authenticationService.customerCareLoginFunction();
        this.salesTeamLogin = this.authenticationService.salesTeamLoginFunction();
        this.loginId = this.authenticationService.loggedInUserId();
    }

}


