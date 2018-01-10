import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-customer-make-inactive',
  templateUrl: './customer-make-inactive.component.html',
  styleUrls: ['./customer-make-inactive.component.css']
})
export class CustomerMakeInactiveComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerMakeInactiveComponent>) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
