import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';
import { LoaderService } from '../login/loader.service';
@Component({
  selector: 'app-edit-quantity-dailog',
  templateUrl: './edit-quantity-dailog.component.html',
  styleUrls: ['./edit-quantity-dailog.component.css']
})
export class EditQuantityDailogComponent implements OnInit {
  quantity = { value: null };
  changeSlot = false;
  //Change time slot input
  changeTimeSlot : any = {"timeslot":"" , date:null}
    minDate = new Date() ;
    maxDate = new Date(2020, 0, 1);
    disableSlot = false;
    todaysDate:any = "";
    newChange : any ='';
    hideTimeSlot= false;
    hours:any = "";
  constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, private orderLandingService: OrderLandingService, public thisDialogRef: MdDialogRef<EditQuantityDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetails: any, public dialog: MdDialog,private loaderService: LoaderService) { }
  updateQuantity() {
    let date= moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
    let datetime = date + " " + this.changeTimeSlot.timeslot;
    this.loaderService.display(true);
    let input = { "order": { "excepted_time":  datetime ,  "product_type": this.orderDetails.prod_type, "quantity": this.quantity.value, "loginid": this.authenticationService.loggedInUserId(), "orderid": this.orderDetails.order_id, "product_name": this.orderDetails.brandname, "apptype": this.authenticationService.appType(), "createdthru": "website" } };
    //console.log(input);
    this.orderLandingService.updateQuantity(input)
      .subscribe(
      output => this.updateQuantityResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });

  }
  updateQuantityResult(result) {
    //console.log(result);
    this.loaderService.display(false);
    if (result.result == 'success') {
      this.onCloseModal('success')
      
    }
  }
  onCloseModal(message) {
    this.thisDialogRef.close(message);
  }


//   autoTimeSlot(){

//     let hours = moment().format("HH");
//     if(parseInt(hours) <= 8){
// this.changeTimeSlot.timeslot = "9AM-1PM";
// this.changeTimeSlot.date= new Date();
// this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
// this.disableSlot = false;


//     }
//     else if(parseInt(hours) <= 15){
    
//       this.changeTimeSlot.date= new Date();
//       this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
//       this.changeTimeSlot.timeslot = "4PM-7PM";
//       this.disableSlot = true;
      

//     }
//     else {
//       this.changeTimeSlot.timeslot = "9AM-1PM";
//       var date = new Date();
//       this.changeTimeSlot.date = new Date(date.setDate(date.getDate() + 1));
//       this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
//       this.disableSlot = false;
//     }

//   }

  // enableTime(value){
  //   //console.log(value);
  //   let newDate = moment(value).format('DD-MM-YYYY');
  //   if (this.newChange == newDate  ) {
  //     // this.autoTimeSlot();  
  //   }
  //   else{
  //     this.disableSlot =  false;
  //   }
  // }

  showSlot(){
    // this.autoTimeSlot();
    this.hideTimeSlot= true;
  }

  autoTimeSlotforHour(){
    this.hours = moment().format("HH");
    this.changeTimeSlot.date= new Date();
  }

  dateChanges(event){
    let eventChanges = moment(event).format('DD-MM-YYYY');
  
  this.todaysDate= moment().format('DD-MM-YYYY');
  if(eventChanges != this.todaysDate){
    this.hours = "6";
  }
  else{
    this.hours = moment().format("HH");
    this.changeTimeSlot.date= new Date();
  }
  }


  availableTimeSlot(){
    if(this.hours <= 7){
          this.changeTimeSlot.timeslot = '8AM-11AM'
        }
        else if(this.hours <= 10){
          this.changeTimeSlot.timeslot = "11AM-2PM"; 
        }
        else if(this.hours <= 13){
          this.changeTimeSlot.timeslot = "2PM-5PM";
        } 
        else if(this.hours <= 16){
          this.changeTimeSlot.timeslot = "5PM-8PM";
        }

  }


  ngOnInit() {

    this.quantity.value = this.orderDetails.quantity;
    this.autoTimeSlotforHour();
    this.availableTimeSlot();
    //console.log(this.orderDetails);
  }

}
