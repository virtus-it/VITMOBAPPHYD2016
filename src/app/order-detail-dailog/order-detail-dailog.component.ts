import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {CustomerDetailDailogComponent} from '../customer-detail-dailog/customer-detail-dailog.component';
import{ EmptyCanDailogComponent } from '../empty-can-dailog/empty-can-dailog.component';
@Component({
  selector: 'app-order-detail-dailog',
  templateUrl: './order-detail-dailog.component.html',
  styleUrls: ['./order-detail-dailog.component.css']
})
export class OrderDetailDailogComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  showCustomerDetails(){
    let dialogRefEditCustomer = this.dialog.open(CustomerDetailDailogComponent, {
                      width: '700px',
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
  ngOnInit() {
  }

}
