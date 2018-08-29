import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import * as _ from 'underscore';



@Component({
  selector: 'app-reports-preview',
  templateUrl: './reports-preview.component.html',
  styleUrls: ['./reports-preview.component.css']
})
export class ReportsPreviewComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) public Details: any ,  public thisDialogRef: MdDialogRef<ReportsPreviewComponent>) { }


customersOrdersReports :any = [];




  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
  }

}
