import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import{PreOrderCartDailogComponent}from '../pre-order-cart-dailog/pre-order-cart-dailog.component';

@Component({
 
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  addPreorder(){
    let dialogRefAddPreOrder = this.dialog.open(PreOrderCartDailogComponent, {
                      width: '700px',
                      data: ''
                  });
                  dialogRefAddPreOrder.afterClosed().subscribe(result => {
                      console.log(`Dialog closed: ${result}`);
      
      
                  });
  
  }
  ngOnInit() {
  }

}
