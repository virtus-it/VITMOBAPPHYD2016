import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-customer-set-payment-cycle',
  templateUrl: './customer-set-payment-cycle.component.html',
  styleUrls: ['./customer-set-payment-cycle.component.css']
})
export class CustomerSetPaymentCycleComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerSetPaymentCycleComponent>, @Inject(MD_DIALOG_DATA) public Detail: any ,  private customerService: CustomerService, private authenticationService: AuthenticationService,) { }



  checkAll: boolean = false;
  checkAllWeek: boolean = false;
  checkAllDay: boolean = false;
  selectAllWeekDays: boolean = false;
  selectAllDays: boolean = false;
  setPaymentFormControl = new FormControl('', [Validators.required]);

  setPaymentInput: any = { schedulefor: "weekdays", CustomerName: "", weekdays: "", days: "", timeslot: "7AM-8AM", setCycle: "oneCustomer" }

  weekday : any = '';


  setPaymentCycle() {
    let input = { User: { username: this.Detail.firstname , userid: this.Detail.userid , paymentDateType: this.setPaymentInput.schedulefor, paymentDay: '', timeslot: this.setPaymentInput.timeslot, paymentCycle: this.setPaymentInput.setCycle  , transtype : 'setpaymentcycle' , apptype : this.authenticationService.appType() , loginid : this.authenticationService.loggedInUserId() }} 
    if(input.User.paymentDateType == 'weekdays'){
      input.User.paymentDay = this.setPaymentInput.weekdays;
    }
    else if(input.User.paymentDateType == 'days'){
      input.User.paymentDay = this.setPaymentInput.days;
    }
    console.log(input, 'ipipip');
    this.customerService.createCustomer(input)
    .subscribe(
      output => this.setPaymentCycleResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }
  setPaymentCycleResult(result){
    if(result && result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }




  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
  }

}
