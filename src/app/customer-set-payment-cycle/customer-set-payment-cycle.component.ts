import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-set-payment-cycle',
  templateUrl: './customer-set-payment-cycle.component.html',
  styleUrls: ['./customer-set-payment-cycle.component.css']
})
export class CustomerSetPaymentCycleComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerSetPaymentCycleComponent>) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
