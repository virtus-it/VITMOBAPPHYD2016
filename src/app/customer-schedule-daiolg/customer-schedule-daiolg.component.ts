import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
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

  constructor(private customerservice: CustomerService,public dialog: MdDialog, private distributorService: DistributorServiceService, private loaderService: LoaderService, public thisDialogRef: MdDialogRef<CustomerScheduleDaiolgComponent>, private authenticationService: AuthenticationService, @Inject(MD_DIALOG_DATA) public Detail: any, ) { }
  FormControl = new FormControl('', [
    Validators.required]);


  scheduleInput:any = { schedulefor: "weekdays" , CustomerName:"" , productName: {} , weekdays:""  , days:"" , productQuantity:"" , timeslot: "" }
  createSchedule = [];
  customerDetails:any = "";
  productList = [];
  checkAll: boolean = false;
  checkAllWeek: boolean = false;
  checkAllDay: boolean = false;
  selectAllWeekDays : boolean = false;
  selectAllDays: boolean = false;
  updateSchedule=[];

 
  days = [];

  
  //create schedule

  createScheduledays() {
    let input = {};
    if(this.scheduleInput.schedulefor=="weekdays" ){
      let weekdays = this.scheduleInput.weekdays.split(',').sort(this.sortWeeks);
      weekdays = weekdays.join(",");
       input = { "order": { "apptype": this.authenticationService.appType(), "excepted_time": this.scheduleInput.timeslot, "orderstatus": "ordered", "orderto": this.authenticationService.loggedInUserId() , "orderfrom":this.Detail.customerId, "paymentmode": "cash", "usertype":this.authenticationService.userType(), "quantity": this.scheduleInput.productQuantity, "loginid": this.authenticationService.loggedInUserId(), "groupid": "289", "productid": this.scheduleInput.productName.productid, "product_type": this.scheduleInput.productName.ptype  , "product_quantity": this.scheduleInput.productName.ptype , "weekdays":this.scheduleInput.weekdays , "scheduletype": this.scheduleInput.schedulefor , "product_cost": this.scheduleInput.productName.pcost, "amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_items": this.scheduleInput.productQuantity   , "scheduledfrom": "admin" } };
    }
     else{
     input = { "order": { "apptype": this.authenticationService.appType(), "excepted_time":this.scheduleInput.timeslot , "orderstatus": "ordered", "orderto":this.authenticationService.loggedInUserId(), "orderfrom":this.Detail.customerId, "paymentmode": "cash", "usertype":this.authenticationService.userType() , "quantity": this.scheduleInput.productQuantity , "loginid": this.authenticationService.loggedInUserId(), "groupid": "289", "productid": this.scheduleInput.productName.productid , "product_type":this.scheduleInput.productName.ptype , "product_quantity":this.scheduleInput.productName.ptype , "days": this.scheduleInput.days, "scheduletype": this.scheduleInput.schedulefor, "product_cost": this.scheduleInput.productName.pcost, "amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity), "total_amt":parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_items": this.scheduleInput.productQuantity   , "scheduledfrom": "admin" } };
   }
    this.customerservice.createSchedule(input)
      .subscribe(
      output => this.createScheduledaysResult(output),
      error => {
        console.log("error in create schedule");
        this.loaderService.display(false);
      });  
  }
  
  createScheduledaysResult(result) {
    console.log(result)
    if (result.result == "success") {
      this.createSchedule = result.data;
      this.thisDialogRef.close('success');
    }

  }

  //Update Schedule Order
  updateScheduleOrder(){
    let input={}
    if(this.scheduleInput.schedulefor=="weekdays" ){
    input={"order":{"schdid":this.Detail.data.id,"apptype":this.authenticationService.appType(),"excepted_time":this.scheduleInput.timeslot,"orderstatus":"ordered","orderto":this.authenticationService.loggedInUserId() ,"orderfrom":this.Detail.userid,"product_cost":this.scheduleInput.productName.pcost ,"paymentmode":"cash","usertype":this.authenticationService.userType() ,"quantity":this.scheduleInput.productQuantity,"loginid":this.authenticationService.loggedInUserId(),"groupid":"289","productid": this.scheduleInput.productName.productid, "product_type": this.scheduleInput.productName.ptype  , "product_quantity": this.scheduleInput.productName.ptype , "weekdays":this.scheduleInput.weekdays , "scheduletype": this.scheduleInput.schedulefor , "amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_items": this.scheduleInput.productQuantity   , "scheduledfrom": "admin"}};
    }
    else{
      input={"order":{"schdid":this.Detail.data.id,"apptype":this.authenticationService.appType(),"excepted_time":this.scheduleInput.timeslot,"orderstatus":"ordered","orderto":this.authenticationService.loggedInUserId() ,"orderfrom":this.Detail.userid,"product_cost":this.scheduleInput.productName.pcost ,"paymentmode":"cash","usertype":this.authenticationService.userType() ,"quantity":this.scheduleInput.productQuantity,"loginid":this.authenticationService.loggedInUserId(),"groupid":"289","productid": this.scheduleInput.productName.productid, "product_type": this.scheduleInput.productName.ptype  , "product_quantity": this.scheduleInput.productName.ptype , "days": this.scheduleInput.days, "scheduletype": this.scheduleInput.schedulefor,  "amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_amt": parseInt(this.scheduleInput.productName.pcost) * parseInt(this.scheduleInput.productQuantity) , "total_items": this.scheduleInput.productQuantity   , "scheduledfrom": "admin"}};

    }
    console.log(input);
    this.customerservice.updateScheduleOrder(input)
    .subscribe(
      output => this.UpdateScheduleResult(output),
      error => {
        console.log("error in updating schedule");
        this.loaderService.display(false);
      });
  }
  UpdateScheduleResult(result){
    if(result.result== "success"){
      this.updateSchedule = result.data;
      this.thisDialogRef.close("success");
    }
  }


   //Create and Update scheduled order
   createAndUpdateScheduleOrder(){
    if (this.Detail.type=='create') {
      this.createScheduledays();
      console.log(this.createScheduledays);
    }
    else{
      this.updateScheduleOrder();
      console.log(this.updateScheduleOrder);
    }
  }

  //get products list

    getProductsList() {
      this.loaderService.display(true);
      let input = { apptype: this.authenticationService.appType(), userid: this.Detail.customerId, delearId: this.authenticationService.loggedInUserId()}
      this.distributorService.getProductsList(input)
        .subscribe(
        output => this.getProductsListResult(output),
        error => {
          console.log("error in distrbutors");
          this.loaderService.display(false);
        });

    }
    getProductsListResult(result) {
      console.log("distributor products list", result);
      if (result.result == 'success') {
        let productListCopy = [];
        _.each(result.data.products, function (i, j) {
          let details: any = i;
          let customerProduct = _.find(result.data.customerproducts, function (e: any) { return e.productid == details.productid; });
          if (customerProduct) {


            productListCopy.push(customerProduct);

          }
          else {
            productListCopy.push(details);
          }

        });
        this.productList = productListCopy;
    }
    this.createOrUpdate();

  }

  //sorting week days

  sortWeeks(a,b){
    let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    
}
  


  //check for particular weekday
  onChangeCheckWeek(week:string,  isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if(this.scheduleInput.weekdays){
        this.scheduleInput.weekdays= this.scheduleInput.weekdays +','  + week;

      }
      else{
      this.scheduleInput.weekdays= this.scheduleInput.weekdays  + week;
      }
      
 
    } else {
      this.checkAll = false;
      this.selectAllWeekDays= false;

    let replaceValue = this.scheduleInput.weekdays.replace(new RegExp(week+',', 'g'), '');
    replaceValue = this.scheduleInput.weekdays.replace(new RegExp(week, 'g'), '');
    this.scheduleInput.weekdays = replaceValue;
    }
  }

  // check for particular day
  onChangeCheckDay(day: any, isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if(this.scheduleInput.days){
        this.scheduleInput.days= this.scheduleInput.days + ',' + day;
      }
      else{
        this.scheduleInput.days= this.scheduleInput.days  + day;
        }
     
    } else {
      this.checkAll = false;
      this.selectAllDays= false;
      let replaceValue = this.scheduleInput.days.replace(new RegExp(day+',', 'g'), '');
      replaceValue = this.scheduleInput.days.replace(new RegExp(day, 'g'), '');
      this.scheduleInput.days = replaceValue;
     
    }
    let toBeSort:string  = this.scheduleInput.days; // making the in string datatype
    let sortedDays = toBeSort.split(",").sort().join(",");  //it should be string if we want to split it in typscript and soritng
   
    this.scheduleInput.days = sortedDays;
  }

  //check all weekdays
  onChangeCheckAll(isChecked: boolean) {


    if (isChecked) {
      
      this.checkAllWeek = true;
      this.scheduleInput.weekdays="Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday";

    } else {
      this.checkAll = false;
      this.checkAllWeek = false;
      this.scheduleInput.weekdays="";


    }
  }

  //Check all days
  onChangeCheckAllDays(isChecked: boolean) {


    if (isChecked) {
      
      this.checkAllDay = true;
      this.scheduleInput.days="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31";

    } else {
      this.checkAll = false;
      this.checkAllDay = false;
      this.scheduleInput.days="";


    }
  }

  createOrUpdate(){
   if (this.Detail.type == "create"){
     this.scheduleInput.CustomerName=this.Detail.customerName;
   
   }
   else{
     this.scheduleInput.CustomerName=this.Detail.customerName;
    this.scheduleInput.productQuantity=this.Detail.data.quantity;
    this.scheduleInput.schedulefor=this.Detail.data.scheduletype;
    this.scheduleInput.timeslot=this.Detail.data.delivery_exceptedtime;
    let productId = this.Detail.data.productid;
    let productItem = _.find(this.productList, function(k,l) {
      let prodId: any =k;
      return prodId.productid ==  productId;
    });
    if(productItem){
      this.scheduleInput.productName=productItem;

    }
    }
   }


   deleteSchedule(data) {
    console.log();
    let dialogRefSetting = this.dialog.open(DeleteScheduledOrderComponent, {
      width: '700px',
      data: this.Detail.data
    });
    dialogRefSetting.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.thisDialogRef.close("success");
      this.getProductsList();


    });

  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {

    console.log(this.Detail);
    this.getProductsList();
  }

}
