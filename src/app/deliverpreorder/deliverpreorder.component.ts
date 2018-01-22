import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-deliverpreorder',
  templateUrl: './deliverpreorder.component.html',
  styleUrls: ['./deliverpreorder.component.css']
})
export class DeliverpreorderComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<DeliverpreorderComponent>) { }




  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }



  ngOnInit() {
  }

}
