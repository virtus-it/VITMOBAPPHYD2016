import { Component, OnInit, Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerOrderListComponent>,  @Inject(MD_DIALOG_DATA) public orderDetails: any) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.orderDetails);
  }

}
