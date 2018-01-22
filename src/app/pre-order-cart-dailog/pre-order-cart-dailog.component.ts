import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {DeliverpreorderComponent} from '../deliverpreorder/deliverpreorder.component';


@Component({
  selector: 'app-pre-order-cart-dailog',
  templateUrl: './pre-order-cart-dailog.component.html',
  styleUrls: ['./pre-order-cart-dailog.component.css']
})
export class PreOrderCartDailogComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  deliverPreOrder() {
    let dialogRefEditCustomer = this.dialog.open(DeliverpreorderComponent, {

        width: '700px',
        data: ''
    });
    dialogRefEditCustomer.afterClosed().subscribe(result => {
        console.log(`Dialog closed: ${result}`);
        if(result == "success"){
        }

    });

}

  ngOnInit() {
  }

}
