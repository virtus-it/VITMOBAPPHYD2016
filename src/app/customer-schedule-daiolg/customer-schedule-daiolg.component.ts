import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../login/loader.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { CustomerService } from '../customer/customer.service';
import { DeleteScheduledOrderComponent } from '../delete-scheduled-order/delete-scheduled-order.component';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import { weekdays } from 'moment';

@Component({
  selector: 'app-customer-schedule-daiolg',
  templateUrl: './customer-schedule-daiolg.component.html',
  styleUrls: ['./customer-schedule-daiolg.component.css']
})
export class CustomerScheduleDaiolgComponent implements OnInit {
  constructor(
    private customerservice: CustomerService,
    public dialog: MdDialog,
    private distributorService: DistributorServiceService,
    private loaderService: LoaderService,
    public thisDialogRef: MdDialogRef<CustomerScheduleDaiolgComponent>,
    private authenticationService: AuthenticationService,
    @Inject(MD_DIALOG_DATA) public Detail: any
  ) {}

  FormControl = new FormControl('', [Validators.required]);
  ScheduleFormControl = new FormControl('', [Validators.required]);
  // TimeSlotFormControl = new FormControl('', [Validators.required]);
  ProductFormControl = new FormControl('', [Validators.required]);

  scheduleInput: any = {
    schedulefor: 'weekdays',
    CustomerName: '',
    productName: {},
    weekdays: '',
    days: '',
    productQuantity: '',
    timeslot: '8AM-11AM'
  };
  createSchedule = [];
  customerDetails: any = '';
  productList = [];
  checkAll: boolean = false;
  checkAllWeek: boolean = false;
  checkAllDay: boolean = false;
  selectAllWeekDays: boolean = false;
  selectAllDays: boolean = false;
  cbMon: boolean = false;
  cbTue: boolean = false;
  cbWed: boolean = false;
  cbThur: boolean = false;
  cbFri: boolean = false;
  cbSat: boolean = false;
  cbSun: boolean = false;

  cb1: boolean = false;
  cb2: boolean = false;
  cb3: boolean = false;
  cb4: boolean = false;
  cb5: boolean = false;
  cb6: boolean = false;
  cb7: boolean = false;
  cb8: boolean = false;
  cb9: boolean = false;
  cb10: boolean = false;
  cb11: boolean = false;
  cb12: boolean = false;
  cb13: boolean = false;
  cb14: boolean = false;
  cb15: boolean = false;
  cb16: boolean = false;
  cb17: boolean = false;
  cb18: boolean = false;
  cb19: boolean = false;
  cb20: boolean = false;
  cb21: boolean = false;
  cb22: boolean = false;
  cb23: boolean = false;
  cb24: boolean = false;
  cb25: boolean = false;
  cb26: boolean = false;
  cb27: boolean = false;
  cb28: boolean = false;
  cb29: boolean = false;
  cb30: boolean = false;
  cb31: boolean = false;
  updateSchedule = [];
  product = false;
  message = '';
  eventQuantity: any = '';

  days = [];

  //create schedule

  createScheduledays() {
    if (this.validate() && this.validate1() && this.validate2()) {
      let input = {};
      if (this.scheduleInput.schedulefor == 'weekdays') {
        let weekdays = this.scheduleInput.weekdays
          .split(',')
          .sort(this.sortWeeks);
        weekdays = weekdays.join(',');
        input = {
          order: {
            userid: this.Detail.customerId, 
            apptype: this.authenticationService.appType(),
            excepted_time: this.scheduleInput.timeslot,
            orderstatus: 'ordered',
            orderto: this.Detail.data.dealerid,
            orderfrom: this.Detail.customerId,
            paymentmode: 'cash',
            usertype: this.authenticationService.userType(),
            quantity: this.scheduleInput.productQuantity,
            loginid: this.authenticationService.loggedInUserId(),
            groupid: '289',
            productid: this.scheduleInput.productName.productid,
            product_type: this.scheduleInput.productName.ptype,
            product_quantity: this.scheduleInput.productName.ptype,
            weekdays: this.scheduleInput.weekdays,
            scheduletype: this.scheduleInput.schedulefor,
            product_cost: this.scheduleInput.productName.pcost,
            amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_items: this.scheduleInput.productQuantity,
            scheduledfrom: 'admin'
          }
        };
      } else {
        input = {
          order: {
            apptype: this.authenticationService.appType(),
            excepted_time: this.scheduleInput.timeslot,
            orderstatus: 'ordered',
            userid : this.Detail.customerId, 
            orderto: this.Detail.data.dealerid,
            orderfrom: this.Detail.customerId,
            paymentmode: 'cash',
            usertype: this.authenticationService.userType(),
            quantity: this.scheduleInput.productQuantity,
            loginid: this.authenticationService.loggedInUserId(),
            groupid: '289',
            productid: this.scheduleInput.productName.productid,
            product_type: this.scheduleInput.productName.ptype,
            product_quantity: this.scheduleInput.productName.ptype,
            days: this.scheduleInput.days,
            scheduletype: this.scheduleInput.schedulefor,
            product_cost: this.scheduleInput.productName.pcost,
            amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_items: this.scheduleInput.productQuantity,
            scheduledfrom: 'admin'
          }
        };
      }
      this.loaderService.display(true);
      //this.scheduleInput.productQuantity =    this.Detail.data.discountproducts.quantity;
      console.log(input);
      this.customerservice.createSchedule(input).subscribe(
        output => this.createScheduledaysResult(output),
        error => {
          //console.log("error in create schedule");
        }
      );
    }
    // else{
    //   this.message="please select product";
    // }
  }

  createScheduledaysResult(result) {
    //console.log(result)
    if (result.result == 'success') {
      this.loaderService.display(false);
      this.createSchedule = result.data;
      this.thisDialogRef.close('success');
    }
  }

  //Update Schedule Order
  updateScheduleOrder() {
    if (this.validate() && this.validate1() && this.validate2()) {
      let input = {};
      if (this.scheduleInput.schedulefor == 'weekdays') {
        input = {
          order: {
            schdid: this.Detail.data.id,
            userid : this.Detail.userid, 
            apptype: this.authenticationService.appType(),
            excepted_time: this.scheduleInput.timeslot,
            orderstatus: 'ordered',
            orderto: this.Detail.data.dealerid,
            orderfrom: this.Detail.userid,
            product_cost: this.scheduleInput.productName.pcost,
            paymentmode: 'cash',
            usertype: this.authenticationService.userType(),
            quantity: this.scheduleInput.productQuantity,
            loginid: this.authenticationService.loggedInUserId(),
            groupid: '289',
            productid: this.scheduleInput.productName.productid,
            product_type: this.scheduleInput.productName.ptype,
            product_quantity: this.scheduleInput.productName.ptype,
            weekdays: this.scheduleInput.weekdays,
            scheduletype: this.scheduleInput.schedulefor,
            amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_items: this.scheduleInput.productQuantity,
            scheduledfrom: 'admin'
          }
        };
      } else {
        input = {
          order: {
            schdid: this.Detail.data.id,
            userid : this.Detail.userid,
            apptype: this.authenticationService.appType(),
            excepted_time: this.scheduleInput.timeslot,
            orderstatus: 'ordered',
            orderto: this.Detail.data.dealerid,
            orderfrom: this.Detail.userid,
            product_cost: this.scheduleInput.productName.pcost,
            paymentmode: 'cash',
            usertype: this.authenticationService.userType(),
            quantity: this.scheduleInput.productQuantity,
            loginid: this.authenticationService.loggedInUserId(),
            groupid: '289',
            productid: this.scheduleInput.productName.productid,
            product_type: this.scheduleInput.productName.ptype,
            product_quantity: this.scheduleInput.productName.ptype,
            days: this.scheduleInput.days,
            scheduletype: this.scheduleInput.schedulefor,
            amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_amt:
              parseInt(this.scheduleInput.productName.pcost) *
                parseInt(this.scheduleInput.productQuantity) +
              parseInt(this.scheduleInput.productName.servicecharge) *
                parseInt(this.scheduleInput.productQuantity),
            total_items: this.scheduleInput.productQuantity,
            scheduledfrom: 'admin'
          }
        };
      }
      this.loaderService.display(true);
      // this.scheduleInput.productQuantity =    this.Detail.data.discountproducts.quantity;

      AuthenticationService.showLog('update schedule input');
      AuthenticationService.showLog(JSON.stringify(input));
      this.customerservice.updateScheduleOrder(input).subscribe(
        output => this.UpdateScheduleResult(output),
        error => {
          //console.log("error in updating schedule");
          this.loaderService.display(false);
        }
      );
    }

    // else{
    //   this.message="please select product";
    // }
  }

  UpdateScheduleResult(result) {
    if (result.result == 'success') {
      this.updateSchedule = result.data;
      this.loaderService.display(false);
      this.thisDialogRef.close('success');
    }
  }

  //Create and Update scheduled order
  createAndUpdateScheduleOrder() {
    if (this.Detail.type == 'create') {
      this.createScheduledays();
      //console.log(this.createScheduledays);
    } else {
      this.updateScheduleOrder();
      //console.log(this.updateScheduleOrder);
    }
  }

  //get products list

  getProductsList() {
    this.loaderService.display(true);
    let input = {
      apptype: this.authenticationService.appType(),
      userid: this.Detail.customerId,
      delearId: 0
    };
    //console.log(input);

    if (this.Detail.data.dealers) {
      input.delearId = this.Detail.data.dealers.user_id;
    } else if (this.Detail.data && this.Detail.data.dealerid) {
      input.delearId = this.Detail.data.dealerid;
    } else {
      input.delearId = this.authenticationService.loggedInUserId();
    }
    //console.log(input);
    this.distributorService.getProductsList(input).subscribe(
      output => this.getProductsListResult(output),
      error => {
        //console.log("error in distrbutors");
      }
    );
  }

  getProductsListResult(result) {
    //console.log("distributor products list", result);
    if (result.result == 'success') {
      this.loaderService.display(false);
      let productListCopy = [];
      let filteredArray = [];
      _.each(result.data.products, function(i, j) {
        let details: any = i;
        let customerProduct = _.find(result.data.customerproducts, function(
          e: any
        ) {
          return e.productid == details.productid;
        });

        if (customerProduct) {
          productListCopy.push(customerProduct);
        }
         else {
          productListCopy.push(details);
        }

        // if(details.stockstatus != 'Soldout'){

        // }
      });

      this.productList = productListCopy;
      // filteredArray = _.without(this.productList, function(i,j){
      //   let details:any = i;
      //   return details.stockstatus === 'Soldout';
      // });

      // this.productList = filteredArray;

      this.productList = _.filter(this.productList, function(e: any) {
        return e.stockstatus !== 'Soldout';
      });
    }
    this.createOrUpdate();
  }

  //sorting week days

  sortWeeks(a, b) {
    let daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
  }

  //check for particular weekday
  onChangeCheckWeek(week: string, isChecked: boolean) {
    if (isChecked) {
      this.checkAll = false;
      if (this.scheduleInput.weekdays) {
        this.scheduleInput.weekdays = this.scheduleInput.weekdays + ',' + week;
      } else {
        this.scheduleInput.weekdays = this.scheduleInput.weekdays + week;
      }
    } else {
      this.checkAll = false;
      this.selectAllWeekDays = false;

      let replaceValue = this.scheduleInput.weekdays.replace(
        new RegExp(week + ',', 'g'),
        ''
      );
      replaceValue = this.scheduleInput.weekdays.replace(
        new RegExp(week, 'g'),
        ''
      );
      this.scheduleInput.weekdays = replaceValue;
    }
  }

  // check for particular day
  onChangeCheckDay(day: any, isChecked: boolean) {
    if (isChecked) {
      this.checkAll = false;
      if (this.scheduleInput.days) {
        this.scheduleInput.days = this.scheduleInput.days + ',' + day;
      } else {
        this.scheduleInput.days = this.scheduleInput.days + day;
      }
    } else {
      this.checkAll = false;
      this.selectAllDays = false;
      let replaceValue = this.scheduleInput.days.replace(
        new RegExp(day + ',', 'g'),
        ''
      );
      replaceValue = this.scheduleInput.days.replace(new RegExp(day, 'g'), '');
      this.scheduleInput.days = replaceValue;
    }
    let toBeSort: string = this.scheduleInput.days; // making the in string datatype
    let sortedDays = toBeSort
      .split(',')
      .sort()
      .join(','); //it should be string if we want to split it in typscript and soritng

    this.scheduleInput.days = sortedDays;
  }

  //check all weekdays
  onChangeCheckAll(isChecked: boolean) {
    if (isChecked) {
      this.checkAllWeek = true;
      this.scheduleInput.weekdays =
        'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday';
    } else {
      this.checkAll = false;
      this.checkAllWeek = false;
      this.scheduleInput.weekdays = '';
    }
  }

  //Check all days
  onChangeCheckAllDays(isChecked: boolean) {
    if (isChecked) {
      this.checkAllDay = true;
      this.scheduleInput.days =
        '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31';
    } else {
      this.checkAll = false;
      this.checkAllDay = false;
      this.scheduleInput.days = '';
    }
  }

  createOrUpdate() {
    if (this.Detail.type == 'create') {
      this.scheduleInput.CustomerName = this.Detail.customerName;
      this.scheduleInput.productName = this.Detail.productName;
    } 
    else {
      this.product = true;
      this.ProductFormControl = new FormControl({ valid: true }, [
        Validators.required
      ]);
      this.scheduleInput.CustomerName = this.Detail.customerName;
      this.scheduleInput.productQuantity = this.Detail.data.quantity;
      this.scheduleInput.schedulefor = this.Detail.data.scheduletype;
      this.scheduleInput.timeslot = this.Detail.data.delivery_exceptedtime;
      let productId = this.Detail.data.productid;
      let productItem = _.find(this.productList, function(k, l) {
        let prodId: any = k;
        return prodId.productid == productId;
      });
      if (productItem) {
        this.scheduleInput.productName = productItem;
      }
      else{
        this.scheduleInput.productName = this.Detail.productName;
      }
    }
  }

  deleteSchedule(data) {
    //console.log();
    let dialogRefSetting = this.dialog.open(DeleteScheduledOrderComponent, {
      width: '700px',
      data: this.Detail.data
    });
    dialogRefSetting.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      this.thisDialogRef.close('success');
      this.getProductsList();
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  validate() {
    if (
      this.scheduleInput.productName &&
      this.scheduleInput.productName.productid
    ) {
      this.message = '';
      return true;
    } else {
      this.message = 'please select product';
      return false;
    }
  }

  validate1() {
    if (
      this.scheduleInput.weekdays.length > 0 ||
      this.scheduleInput.days.length > 0
    ) {
      this.message = '';
      return true;
    } else {
      this.message = 'Please select atleast one weekday/day';
    }
  }

  validate2() {
    // if((this.scheduleInput.productName && this.scheduleInput.productName.productid) && (this.scheduleInput.weekdays.length > 0 || this.scheduleInput.days.length > 0)){
    //   this.message="";
    //   return true;
    // }
    // else{
    //   this.message="Please select Product quantity and weekdays/day to create a schedule";
    // }

    if (this.scheduleInput.productQuantity > 0) {
      this.message = '';
      return true;
    } else {
      this.message = 'Please select quantity';
    }
  }

  minQuantity(product , event){
    if(event.value.default_qty){
      this.eventQuantity = event.value.default_qty;
     this.scheduleInput.productQuantity = this.eventQuantity;
    }
    else{
      this.eventQuantity = event.value.minorderqty;
      this.scheduleInput.productQuantity = this.eventQuantity;

    }
  }

  validateScheduleDays() {
    if (this.Detail.data.scheduletype) {
      if (this.Detail.data.scheduletype.toLowerCase() == 'weekdays') {
        if (this.Detail.data.weekdays) {
          let weekdays = this.Detail.data.weekdays.toLowerCase();
          AuthenticationService.showLog(weekdays);
          if (weekdays.indexOf('monday') != -1) {
            this.cbMon = true;
          }
          if (weekdays.indexOf('tuesday') != -1) {
            this.cbTue = true;
          }
          if (weekdays.indexOf('wednesday') != -1) {
            this.cbWed = true;
          }
          if (weekdays.indexOf('thursday') != -1) {
            this.cbThur = true;
          }
          if (weekdays.indexOf('friday') != -1) {
            this.cbFri = true;
          }
          if (weekdays.indexOf('saturday') != -1) {
            this.cbSat = true;
          }
          if (weekdays.indexOf('sunday') != -1) {
            this.cbSun = true;
          }
        }
      } else if (this.Detail.data.scheduletype.toLowerCase() == 'days') {
        if (this.Detail.data.days) {
          let days = this.Detail.data.days;
          AuthenticationService.showLog(days);
          if (days.indexOf('1') != -1) {
            this.cb1 = true;
          }
          if (days.indexOf('2') != -1) {
            this.cb2 = true;
          }
          if (days.indexOf('3') != -1) {
            this.cb3 = true;
          }
          if (days.indexOf('4') != -1) {
            this.cb4 = true;
          }
          if (days.indexOf('5') != -1) {
            this.cb5 = true;
          }
          if (days.indexOf('6') != -1) {
            this.cb6 = true;
          }
          if (days.indexOf('7') != -1) {
            this.cb7 = true;
          }
          if (days.indexOf('8') != -1) {
            this.cb8 = true;
          }
          if (days.indexOf('9') != -1) {
            this.cb9 = true;
          }
          if (days.indexOf('10') != -1) {
            this.cb10 = true;
          }
          if (days.indexOf('11') != -1) {
            this.cb11 = true;
          }
          if (days.indexOf('12') != -1) {
            this.cb12 = true;
          }
          if (days.indexOf('13') != -1) {
            this.cb13 = true;
          }
          if (days.indexOf('14') != -1) {
            this.cb14 = true;
          }
          if (days.indexOf('15') != -1) {
            this.cb15 = true;
          }
          if (days.indexOf('16') != -1) {
            this.cb16 = true;
          }
          if (days.indexOf('17') != -1) {
            this.cb17 = true;
          }
          if (days.indexOf('18') != -1) {
            this.cb18 = true;
          }
          if (days.indexOf('19') != -1) {
            this.cb19 = true;
          }
          if (days.indexOf('20') != -1) {
            this.cb20 = true;
          }
          if (days.indexOf('21') != -1) {
            this.cb21 = true;
          }
          if (days.indexOf('22') != -1) {
            this.cb22 = true;
          }
          if (days.indexOf('23') != -1) {
            this.cb23 = true;
          }
          if (days.indexOf('24') != -1) {
            this.cb24 = true;
          }
          if (days.indexOf('25') != -1) {
            this.cb25 = true;
          }
          if (days.indexOf('26') != -1) {
            this.cb26 = true;
          }
          if (days.indexOf('27') != -1) {
            this.cb27 = true;
          }
          if (days.indexOf('28') != -1) {
            this.cb28 = true;
          }
          if (days.indexOf('29') != -1) {
            this.cb29 = true;
          }
          if (days.indexOf('30') != -1) {
            this.cb30 = true;
          }
          if (days.indexOf('31') != -1) {
            this.cb31 = true;
          }
        }
      }
      AuthenticationService.showLog(this.scheduleInput.weekdays);
    }
  }

  ngOnInit() {
    AuthenticationService.showLog('Edit Schedule details ');
    console.log(this.Detail);
    this.getProductsList();
    if (this.Detail.type == 'update') {
      this.validateScheduleDays();
    }
  }
}
