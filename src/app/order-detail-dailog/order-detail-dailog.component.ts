import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {CustomerDetailDailogComponent} from '../customer-detail-dailog/customer-detail-dailog.component';
import{ EmptyCanDailogComponent } from '../empty-can-dailog/empty-can-dailog.component';
import{OnHoldOrderStatusComponent} from '../on-hold-order-status/on-hold-order-status.component'
import{EditOrderStatusComponent} from '../edit-order-status/edit-order-status.component'
@Component({
  selector: 'app-order-detail-dailog',
  templateUrl: './order-detail-dailog.component.html',
  styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  showCustomerDetails(){
    let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
                      width: '600px',
                      data: ''
                  });
                  dialogRefEditCustomer.afterClosed().subscribe(result => {
                      console.log(`Dialog closed: ${result}`);
      
      
                  });
  
  }
  editCan(){
    let dialogRefEditCan = this.dialog.open(EmptyCanDailogComponent, {
                      width: '700px',
                      data: ''
                  });
                  dialogRefEditCan.afterClosed().subscribe(result => {
                      console.log(`Dialog closed: ${result}`);
      
      
                  });
  
  }
  onHoldStatus(){
    let dialogRefonHoldStatus = this.dialog.open(OnHoldOrderStatusComponent, {
                      width: '700px',
                      data: ''
                  });
                  dialogRefonHoldStatus.afterClosed().subscribe(result => {
                      console.log(`Dialog closed: ${result}`);
      
      
                  });
  
  }
  editStatus(){
    let dialogRefeditStatus = this.dialog.open(EditOrderStatusComponent, {
                      width: '700px',
                      data: ''
                  });
                  dialogRefeditStatus.afterClosed().subscribe(result => {
                      console.log(`Dialog closed: ${result}`);
      
      
                  });
  
  }
  ngOnInit() {
  }

}
