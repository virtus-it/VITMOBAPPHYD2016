import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-processed-payments-details',
  templateUrl: './processed-payments-details.component.html',
  styleUrls: ['./processed-payments-details.component.css']
})
export class ProcessedPaymentsDetailsComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<ProcessedPaymentsDetailsComponent>, private authenticationService: AuthenticationService,  private distributorService: DistributorServiceService,  @Inject(MD_DIALOG_DATA) public Details: any,) { }

  processedDetails:any = [];


  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }


  getAllProcessedPaymentsDetails(){
    let input = {"User" : {loginid: this.authenticationService.loggedInUserId() , apptype:this.authenticationService.appType() , userid: this.Details.user_id , TransType:"completeprocess"}};
    console.log(input);
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getAllProcessedPaymentsDetailsResult(output),
    error => {      
    });
  }
  getAllProcessedPaymentsDetailsResult(result){
    if(result.result == 'success'){
      this.processedDetails = result.data;
    }
  }

  ngOnInit() {
    console.log(this.Details);
    this.getAllProcessedPaymentsDetails();
  }

}
