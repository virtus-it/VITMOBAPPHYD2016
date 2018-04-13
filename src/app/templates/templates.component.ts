import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';
import { CreateUpdateTemplateComponent } from '../create-update-template/create-update-template.component';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor( public dialog: MdDialog) { }



  addMessages(){
    let dialogRef = this.dialog.open(CreateUpdateTemplateComponent, {
      width: '90%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {

  });

  }
  ngOnInit() {
  }

}
