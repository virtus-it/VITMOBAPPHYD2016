import { Component, OnInit, Inject } from '@angular/core';
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
  selectAllWeekDays: boolean = false;
  selectAllDays: boolean = false;
  setPaymentFormControl = new FormControl('', [Validators.required]);

  setPaymentInput: any = { schedulefor: "weekdays", CustomerName: "", weekdays: "", days: "", timeslot: "7AM-8AM", setCycle: "oneCustomer" }

  weekday : any = '';


  setPaymentCycle() {
    let input = { username: this.Detail.firstname , userid: this.Detail.userid , paymentDateType: this.setPaymentInput.schedulefor, paymentDay: '', timeslot: this.setPaymentInput.timeslot, paymentCycle: this.setPaymentInput.setCycle }
    if(input.paymentDateType == 'weekdays'){
      input.paymentDay = this.setPaymentInput.weekdays;
    }
    else if(input.paymentDateType == 'days'){
      input.paymentDay = this.setPaymentInput.days;
    }
    console.log(input, 'ipipip');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
  }

}
