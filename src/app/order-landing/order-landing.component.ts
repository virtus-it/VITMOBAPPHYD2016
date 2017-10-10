import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { OrderDetailDailogComponent } from '../order-detail-dailog/order-detail-dailog.component';
import { AddEditCustomerDailogComponent } from '../add-edit-customer-dailog/add-edit-customer-dailog.component';
@Component({

  templateUrl: './order-landing.component.html',
  styleUrls: ['./order-landing.component.css']
})
export class OrderLandingComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
showEditCustomer(){
  let dialogRefEditCustomer = this.dialog.open(AddEditCustomerDailogComponent, {
    
                    width: '700px',
                    data: ''
                });
                dialogRefEditCustomer.afterClosed().subscribe(result => {
                    console.log(`Dialog closed: ${result}`);
    
    
                });

}
showOrderDetails(){
  let dialogRefShowOrder = this.dialog.open(OrderDetailDailogComponent, {
    
                    width: '90%',
                    data: ''
                });
                dialogRefShowOrder.afterClosed().subscribe(result => {
                    console.log(`Dialog closed: ${result}`);
    
    
                });
    
  }
  ngOnInit() {
  }

}
