import { Component, OnInit , Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-process-payment-dialog',
  templateUrl: './process-payment-dialog.component.html',
  styleUrls: ['./process-payment-dialog.component.css']
})
export class ProcessPaymentDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<ProcessPaymentDialogComponent>, private authenticationService: AuthenticationService,  @Inject(MD_DIALOG_DATA) public Details: any, private distributorService: DistributorServiceService  ) { }


  processPaymentInput = {name:"" , type:"paytm", ackId:"" , paytmNumber:"" , amount: 0 }

  processPayment(){
    let input = {"User" : {"id": this.Details.id, loginid: this.authenticationService.loggedInUserId() , apptype:this.authenticationService.appType() , userid: this.Details.user_id , type : this.processPaymentInput.type , TransType:"updateprocess" ,  redeemmobileno : this.processPaymentInput.paytmNumber , acknowledgeid :  this.processPaymentInput.ackId , amount: this.processPaymentInput.amount }};
    console.log(input);
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.processPaymentResult(output),
    error => {      
    });
  }
  processPaymentResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }

  getDetails(){
    if(this.Details){
      this.processPaymentInput.paytmNumber = this.Details.typedetails;
      this.processPaymentInput.amount = this.Details.amount;
    }

  }

  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    this.getDetails();
  }

}
