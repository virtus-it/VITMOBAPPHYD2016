import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-placeorder-dailog',
  templateUrl: './customer-placeorder-dailog.component.html',
  styleUrls: ['./customer-placeorder-dailog.component.css']
})
export class CustomerPlaceorderDailogComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerPlaceorderDailogComponent>) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }
  
  ngOnInit() {
  }
  
}
