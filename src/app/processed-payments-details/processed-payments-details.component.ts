import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-processed-payments-details',
  templateUrl: './processed-payments-details.component.html',
  styleUrls: ['./processed-payments-details.component.css']
})
export class ProcessedPaymentsDetailsComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<ProcessedPaymentsDetailsComponent>) { }

  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
