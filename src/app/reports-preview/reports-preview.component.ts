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


showPreview(){
  if(this.Details.type == 'customerOrderReports'){


  }
  else if(this.Details.type == 'distributorOrderReports'){

  }
  else if(this.Details.type == ''){
    
  }
}



  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    this.showPreview();
  }

}
