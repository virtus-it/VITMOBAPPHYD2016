import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { CustomerService } from '../customer/customer.service';
import { DeleteScheduledOrderComponent } from '../delete-scheduled-order/delete-scheduled-order.component';
import { CustomerScheduleDaiolgComponent } from '../customer-schedule-daiolg/customer-schedule-daiolg.component';
import { CustomerScheduleEditDailogComponent } from '../customer-schedule-edit-dailog/customer-schedule-edit-dailog.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  constructor(private distributorService: DistributorServiceService, public dialog: MdDialog, private authenticationService: AuthenticationService, private loaderService: LoaderService, private customerservice: CustomerService) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
    
      .startWith(null)
      .map(dist => dist ? this.filterDistributors(dist) : this.distributors.slice());
  }
  scheduleOrdersList: any = [];
  showFilterDailog = false;
  checkAll: boolean = false;
  checkAllWeek: boolean = false;
  checkAllDay: boolean = false;
  selectAllWeekDays: boolean = false;
  selectAllDays: boolean = false;
  filterRecords = false;
  distributors: any = [];
  //FilterInputs
  filter: any = { "distributorid": "", "customerNumber": "", "searchtype": "", "weekdays": "", "days": "", "searchtext": "", "date":null };

  //filtered distributors

  filterDistributors(name: string) {
    console.log(name);
    let finalDistributors = this.distributors.filter(dist =>
      dist.fullName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    console.log(finalDistributors);
    if (finalDistributors && finalDistributors.length > 0) {
      let findDistributor: any = {};

      findDistributor = _.find(finalDistributors, function (k, l) {
        let distDetails: any = k;
        return distDetails.fullName == name;
      });

      if (findDistributor) {
        this.filter.distributorid = findDistributor.userid;
      }

    }
    return finalDistributors;
  }




  //clearFilter
  clearFilter() {
    this.showFilterDailog = false;
    this.filterRecords = false;
    this.selectAllWeekDays = false;
    this.selectAllDays = false;
    this.checkAllWeek = false;
    this.checkAllDay = false;

    this.filter = { distributorid: "", customerNumber: "", date: "", weekdays: "", days: "", searchtype: "", searchtext: "" };
    this.scheduleOrderList();

  }

  //Search in filter

  searchScheduledOrder() {

    let input :any= { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "searchtext": "", "searchtype": this.filter.searchtype, "apptype": this.authenticationService.appType() } }


    if (this.filter.searchtype == 'bydistributor') {
      input.root.searchtext = this.filter.distributorid;
    }
    else if (this.filter.searchtype == 'bycustomer') {
      input.root.searchtext = this.filter.customerNumber;
      input.root.cmobilenumber=this.filter.customerNumber;

    }
    else if (this.filter.searchtype == 'distributorcustomer') {
      input.root.searchtext = this.filter.distributorid;
      input.root.cmobilenumber=this.filter.customerNumber;
    }
    else if (this.filter.searchtype == 'bydate') {
      input.root.searchtext = moment(this.filter.date).format('YYYY-MM-DD');
    }
    else if (this.filter.searchtype == 'weekdays') {
      input.root.searchtext = this.filter.weekdays;
    }
    else if (this.filter.searchtype == 'days') {
      input.root.searchtext = this.filter.days;
    }
    console.log(input);

    this.loaderService.display(true);
    this.customerservice.ScheduleList(input)
    .subscribe(
      output => this.filteredScheduleResult(output),
      error => {
        console.log("falied");
        this.loaderService.display(false);
      });
     }
    filteredScheduleResult(result){
      console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.scheduleOrdersList = result.data;

    }
    }




  //Filter check weeks and days
  //Sorting weekdays
  sortWeeks(a, b) {
    let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);

  }

  //check for particular weekday
  onChangeCheckWeek(week: string, isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if (this.filter.weekdays) {
        this.filter.weekdays = this.filter.weekdays + ',' + week;

      }
      else {
        this.filter.weekdays = this.filter.weekdays + week;
      }


    } else {
      this.checkAll = false;
      this.selectAllWeekDays = false;

      let replaceValue = this.filter.weekdays.replace(new RegExp(week + ',', 'g'), '');
      replaceValue = this.filter.weekdays.replace(new RegExp(week, 'g'), '');
      this.filter.weekdays = replaceValue;
    }
  }

  // check for particular day
  onChangeCheckDay(day: any, isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if (this.filter.days) {
        this.filter.days = this.filter.days + ',' + day;
      }
      else {
        this.filter.days = this.filter.days + day;
      }

    } else {
      this.checkAll = false;
      this.selectAllDays = false;
      let replaceValue = this.filter.days.replace(new RegExp(day + ',', 'g'), '');
      replaceValue = this.filter.days.replace(new RegExp(day, 'g'), '');
      this.filter.days = replaceValue;

    }
    let toBeSort: string = this.filter.days; // making the in string datatype
    let sortedDays = toBeSort.split(",").sort().join(",");  //it should be string if we want to split it in typscript and soritng

    this.filter.days = sortedDays;
  }


  //check all weekdays
  onChangeCheckAll(isChecked: boolean) {


    if (isChecked) {

      this.checkAllWeek = true;
      this.filter.weekdays = "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday";

    } else {
      this.checkAll = false;
      this.checkAllWeek = false;
      this.filter.weekdays = "";


    }
  }

  //Check all days
  onChangeCheckAllDays(isChecked: boolean) {


    if (isChecked) {

      this.checkAllDay = true;
      this.filter.days = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31";

    } else {
      this.checkAll = false;
      this.checkAllDay = false;
      this.filter.days = "";


    }
  }

  //getting distributors


  getDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 100 } }
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
      let distributorCopy = [];

      if (data.data && data.data.length) {
        _.each(data.data, function (i, j) {
          let details: any = i;
          details.fullName = details.firstname + " " + details.lastname
          distributorCopy.push(details);

        });
        this.distributors = distributorCopy;
      }
    }
  }







  //Dialog model for creating new schedule

  createSchedule(data) {
    console.log(data);
    let formatteddata: any = { "type": "create", "data": data, customerId: data.customerid, customerName: data.customerdetails.scheduledby }
    let dialogRefSetting = this.dialog.open(CustomerScheduleDaiolgComponent, {
      width: '700px',
      data: formatteddata
    });
    dialogRefSetting.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.scheduleOrderList();
      }
    });
  }

  // Dialog Model for Edit
  editSchedule(data) {
    console.log(data);
    let formatteddata: any = { "type": "update", "data": data, customerId: data.customerid, customerName: data.customerdetails.scheduledby }
    let dialogRefOrderList = this.dialog.open(CustomerScheduleDaiolgComponent, {
      width: '700px',
      data: formatteddata
    });
    dialogRefOrderList.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.scheduleOrderList();
      }
    });
  }

  // Dialog model for delete

  deleteSchedule(data) {
    console.log(data);
    let dialogRefSetting = this.dialog.open(DeleteScheduledOrderComponent, {
      width: '700px',
      data: data
    });
    dialogRefSetting.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == "success") {
        this.scheduleOrderList();
      }
    });

  }

  //Scheduled Order list

  scheduleOrderList() {
    this.loaderService.display(false);
    let input: any = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "apptype": this.authenticationService.appType(), "searchtype": "0", "searchtext": "0" } }
    console.log(input);
    this.customerservice.ScheduleList(input)
      .subscribe(
      output => this.ScheduleListResult(output),
      error => {
        console.log("error in showing schedules");
        this.loaderService.display(false);
      });
  }
  ScheduleListResult(result) {
    console.log(result);
    if (result.result == 'success') {
      this.scheduleOrdersList = result.data;
    }

  }

  filterViewToggle() {
    this.showFilterDailog = !this.showFilterDailog;
  }

  ngOnInit() {
    this.scheduleOrderList();
    this.getDistributors();


  }

}
