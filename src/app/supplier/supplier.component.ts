import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import {AddSupplierDailogComponent} from '../add-supplier-dailog/add-supplier-dailog.component';
import {SupplierOrderListComponent} from '../supplier-order-list/supplier-order-list.component';
@Component({

  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  addSupplier(){
    let dialogRefAddSupplier = this.dialog.open(AddSupplierDailogComponent, {
      width: '700px',
      data: ''
  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
  });
  }
  supplierOrderList(){
    let dialogRefSupplierOrderList = this.dialog.open(SupplierOrderListComponent, {
      width: '95%',
      data: ''
  });
  dialogRefSupplierOrderList.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
  });
  }
  ngOnInit() {
  }

}
