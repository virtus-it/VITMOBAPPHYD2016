import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css']
})
export class ProfileupdateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<ProfileupdateComponent> ) { }


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
