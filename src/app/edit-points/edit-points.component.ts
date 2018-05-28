import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-points',
  templateUrl: './edit-points.component.html',
  styleUrls: ['./edit-points.component.css']
})
export class EditPointsComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<EditPointsComponent>) { }

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
  }

}
