import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-update-template',
  templateUrl: './create-update-template.component.html',
  styleUrls: ['./create-update-template.component.css']
})
export class CreateUpdateTemplateComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<CreateUpdateTemplateComponent>) { }



  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
