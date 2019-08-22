import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { PaymentsService } from '../payments/payments.service';
import { LoaderService } from '../login/loader.service';
@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css']
})
export class PaymentsHistoryComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<PaymentsHistoryComponent>, private paymentservice: PaymentsService,@Inject(MD_DIALOG_DATA) public Detail: any ,private loaderService: LoaderService,  private authenticationService: AuthenticationService,) { }

  paymentHistory=[];
  noRecord=false;

  paymentsHistory(){
    let input:any ={"root":{"transtype":"paymentshistory","userid":this.Detail.userid,"loginid" : this.authenticationService.loggedInUserId(),"apptype" : this.authenticationService.appType(),"lastid":"0","pagesize":"50"}}
    console.log(input);
    this.paymentservice.paymentHistory(input)
    .subscribe(
      output => this.paymentsHistoryResult(output),
      error => {
        //console.log("error in distrbutors");
      });
  }

  paymentsHistoryResult(result){
  //console.log(result);
  if (result.result == "success") {
    this.paymentHistory =result.data;
    this.loaderService.display(false);
    this.noRecord=false;
  }
 else{
   this.paymentHistory =[];
   this.loaderService.display(false);
   this.noRecord = true;
   //console.log("No schedule orders");
 }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.Detail);
    this.paymentsHistory();
  }

}
