import { Component, OnInit , Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SmsServiceService } from '../sms/sms-service.service';

@Component({
  selector: 'app-process-payment-dialog',
  templateUrl: './process-payment-dialog.component.html',
  styleUrls: ['./process-payment-dialog.component.css']
})
export class ProcessPaymentDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<ProcessPaymentDialogComponent>, private authenticationService: AuthenticationService,  @Inject(MD_DIALOG_DATA) public Details: any, private distributorService: DistributorServiceService  , private smsService: SmsServiceService) { }


  processPaymentInput = {name:"" , type:"paytm", ackId:"" , paytmNumber:"" , amount: 0 }
  smsObject = {name : '' , mobileno: '' , messageBody : ''};

  processPayment(){
    let input = {"User" : {"id": this.Details.id, loginid: this.authenticationService.loggedInUserId() , apptype:this.authenticationService.appType() , userid: this.Details.user_id , type : this.processPaymentInput.type , TransType:"updateprocess" ,  redeemmobileno : this.processPaymentInput.paytmNumber , acknowledgeid :  this.processPaymentInput.ackId , amount: this.processPaymentInput.amount }};
    this.smsObject.name = this.processPaymentInput.name;
    this.smsObject.mobileno = input.User.redeemmobileno;
    this.smsObject.messageBody = 'message text ' + input.User.acknowledgeid + ' message text';
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
      this.sendSmsOfAcknowledgement(this.smsObject);
    }
  }

  sendSmsOfAcknowledgement(data){
    console.log(data , 'smsmsmsmsmsms');
    let input = {"type":"","getAllMobileInput":{},"sendSmsInput":{"User":{"mobilenumber":[{"mobileno": data.mobileno,"gcm_regid":"","fullName":data.name}],"count":1,"name":"","smstype":"sms","user_type": this.authenticationService.userType() ,"transtype":"createsms","type":"","showcomment":false,"loginid": this.authenticationService.loggedInUserId() ,"apptype": this.authenticationService.appType() ,"body": data.messageBody ,"title":"","redirecturl":"","url":"","buttons":[""],"buttonactions":[],"option":[""],"sliderurl":[{"image":"","count":0}]}}}
    console.log(input, 'final ip');
    this.smsService.CreateSms(input)
      .subscribe(
        output => this.sendSmsOfAcknowledgementResult(output),
        error => {
        });
  }
  sendSmsOfAcknowledgementResult(result){
    if(result && result.result == 'success'){
      console.log('SMS sent successfully')
    }

  }


  getDetails(){
    if(this.Details){
      this.processPaymentInput.paytmNumber = this.Details.typedetails;
      this.processPaymentInput.amount = this.Details.amount;
      this.processPaymentInput.name = this.Details.fullname;
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
