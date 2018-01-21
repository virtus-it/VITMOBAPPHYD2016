import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-setting-dailog',
  templateUrl: './customer-setting-dailog.component.html',
  styleUrls: ['./customer-setting-dailog.component.css']
})
export class CustomerSettingDailogComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerSettingDailogComponent>) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
  }

}
