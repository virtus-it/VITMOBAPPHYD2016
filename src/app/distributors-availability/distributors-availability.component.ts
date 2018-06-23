import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
// declare var $:any;


@Component({
  selector: 'app-distributors-availability',
  templateUrl: './distributors-availability.component.html',
  styleUrls: ['./distributors-availability.component.css']
})
export class DistributorsAvailabilityComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<DistributorsAvailabilityComponent> ) {
    
   }




  OncloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {



    // $('#mdp-demo').multiDatesPicker({
    //   dateFormat: "y-m-d",
    //   defaultDate:"85-2-19"
    // });



    // $('.date').datepicker({
    //   multidate: true,
    //   format: 'dd-mm-yyyy'
    // });


  }


}
