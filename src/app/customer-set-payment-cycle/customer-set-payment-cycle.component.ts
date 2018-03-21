import { Component, OnInit , Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-set-payment-cycle',
  templateUrl: './customer-set-payment-cycle.component.html',
  styleUrls: ['./customer-set-payment-cycle.component.css']
})
export class CustomerSetPaymentCycleComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerSetPaymentCycleComponent>, @Inject(MD_DIALOG_DATA) public Detail: any) { }



  checkAll: boolean = false;
  checkAllWeek: boolean = false;
  checkAllDay: boolean = false;
  selectAllWeekDays : boolean = false;
  selectAllDays: boolean = false;
  setPaymentFormControl = new FormControl('', [Validators.required]);

  setPaymentInput:any = { schedulefor: "weekdays" , CustomerName:"" , weekdays:""  , days:"" , timeslot: "7AM-8AM" , setCycle:"oneCustomer"}



  //check all weekdays
  onChangeCheckAll(isChecked: boolean) {


    if (isChecked) {
      
      this.checkAllWeek = true;
      this.setPaymentInput.weekdays="Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday";

    } else {
      this.checkAll = false;
      this.checkAllWeek = false;
      this.setPaymentInput.weekdays="";


    }
  }

  //check for particular weekday
  onChangeCheckWeek(week:string,  isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if(this.setPaymentInput.weekdays){
        this.setPaymentInput.weekdays= this.setPaymentInput.weekdays +','  + week;

      }
      else{
      this.setPaymentInput.weekdays= this.setPaymentInput.weekdays  + week;
      }
      
 
    } else {
      this.checkAll = false;
      this.selectAllWeekDays= false;

    let replaceValue = this.setPaymentInput.weekdays.replace(new RegExp(week+',', 'g'), '');
    replaceValue = this.setPaymentInput.weekdays.replace(new RegExp(week, 'g'), '');
    this.setPaymentInput.weekdays = replaceValue;
    }
  }

  // check for particular day
  onChangeCheckDay(day: any, isChecked: boolean) {


    if (isChecked) {
      this.checkAll = false;
      if(this.setPaymentInput.days){
        this.setPaymentInput.days= this.setPaymentInput.days + ',' + day;
      }
      else{
        this.setPaymentInput.days= this.setPaymentInput.days  + day;
        }
     
    } else {
      this.checkAll = false;
      this.selectAllDays= false;
      let replaceValue = this.setPaymentInput.days.replace(new RegExp(day+',', 'g'), '');
      replaceValue = this.setPaymentInput.days.replace(new RegExp(day, 'g'), '');
      this.setPaymentInput.days = replaceValue;
     
    }
    let toBeSort:string  = this.setPaymentInput.days; // making the in string datatype
    let sortedDays = toBeSort.split(",").sort().join(",");  //it should be string if we want to split it in typscript and soritng
   
    this.setPaymentInput.days = sortedDays;
  }


    //Check all days
    onChangeCheckAllDays(isChecked: boolean) {


      if (isChecked) {
        
        this.checkAllDay = true;
        this.setPaymentInput.days="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31";
  
      } else {
        this.checkAll = false;
        this.checkAllDay = false;
        this.setPaymentInput.days="";
  
  
      }
    }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
  }

}
