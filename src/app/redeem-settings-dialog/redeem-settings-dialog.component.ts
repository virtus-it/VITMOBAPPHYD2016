import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-redeem-settings-dialog',
  templateUrl: './redeem-settings-dialog.component.html',
  styleUrls: ['./redeem-settings-dialog.component.css']
})
export class RedeemSettingsDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<RedeemSettingsDialogComponent>) { }

  redeemPointsInput = {"type":"" , "points":"" , "amount":"" };


  submitSettings(){

  }

  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }


  ngOnInit() {
  }

}
