import { Component, OnInit , Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service'
// import {CalendarModule} from 'primeng/calendar';

// declare var $:any;


@Component({
  selector: 'app-distributors-availability',
  templateUrl: './distributors-availability.component.html',
  styleUrls: ['./distributors-availability.component.css']
})
export class DistributorsAvailabilityComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<DistributorsAvailabilityComponent> , @Inject(MD_DIALOG_DATA) public Details: any, private authenticationService: AuthenticationService , private distributorService: DistributorServiceService ) {
    
   }
   distributorAvailabilityInput = {"status":""}

   setAvailability(){
     let input = {"User":{"userid": this.Details.userid ,"apptype": this.authenticationService.appType() ,"transtype":"setstatus","isactive": this.distributorAvailabilityInput.status }};
     console.log(input);
     this.distributorService.useravailability(input)
     .subscribe(
      output => this.setAvailabilityResult(output),
      error => {
      });
   }
   setAvailabilityResult(result){
     if(result.result == 'success'){
      this.thisDialogRef.close('success');
     }
   }



   onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }



  ngOnInit() {
console.log(this.Details);


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
