import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-promocode-dialog',
  templateUrl: './add-promocode-dialog.component.html',
  styleUrls: ['./add-promocode-dialog.component.css']
})
export class AddPromocodeDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<AddPromocodeDialogComponent>) { }

  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
