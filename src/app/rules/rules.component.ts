import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddEditRuleComponent } from '../add-edit-rule/add-edit-rule.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(public dialog: MdDialog, ) { }

  addRule(){
    let dialogRef = this.dialog.open(AddEditRuleComponent , {
      width: '75%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
     
    }
  });
  }

  

  ngOnInit() {
  }

}
