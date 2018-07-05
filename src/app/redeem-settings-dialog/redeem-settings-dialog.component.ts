import { Component, OnInit , Inject} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-redeem-settings-dialog',
  templateUrl: './redeem-settings-dialog.component.html',
  styleUrls: ['./redeem-settings-dialog.component.css']
})
export class RedeemSettingsDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<RedeemSettingsDialogComponent> ,   private authenticationService: AuthenticationService,  private distributorService: DistributorServiceService, @Inject(MD_DIALOG_DATA) public Details: any ) { }

  redeemPointsInput = {"type":"" , "points":"" , "amount":"" };
  redeemDetails:any = [];
  validateMessage:string = '';


  submitSettings(){
    let input  ={"User":{"TransType":"redeemsettings","type": this.redeemPointsInput.type ,"amount": this.redeemPointsInput.amount , "points": this.redeemPointsInput.points ,"loginid": this.authenticationService.loggedInUserId() }};
    if(this.redeemValidate()){
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.submitSettingsResult(output),
    error => {      
    });
  }
}
  submitSettingsResult(result){
    if(result.result == 'success'){
      console.log('settings saved');
      this.thisDialogRef.close('success');
      this.getAllRedeemSettingsDetails();
    }
  }

  getAllRedeemSettingsDetails(){
    let input = {"User": {"TransType":"getredeemsettings" , apptype: this.authenticationService.appType() , "loginid":  this.authenticationService.loggedInUserId() }};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getRedeemSettingsDetailsResult(output),
    error => {      
    });
  }
  getRedeemSettingsDetailsResult(result){
    if(result.result == 'success'){
      this.redeemDetails = result.data;
    }
  }


  updateSettingsDetails(){
    let input ={"User": { "TransType":"updateredeemsettings","type": this.redeemPointsInput.type  ,"amount":this.redeemPointsInput.amount ,"points": this.redeemPointsInput.points ,"loginid": this.authenticationService.loggedInUserId() ,"id": this.Details.id}};
    if(this.redeemValidate()){
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.updateSettingsDetailsResult(output),
    error => {      
    });

    } 
   }
  updateSettingsDetailsResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }

  submitOrUpdateSettings(){
    if(this.Details){
      this.updateSettingsDetails();
      
    }
    else{
      this.submitSettings();
    }
  }

  getRedeemSettingsDetails(){
    this.redeemPointsInput.amount = this.Details.amount;
    this.redeemPointsInput.type = this.Details.type;
    this.redeemPointsInput.points = this.Details.points;
  }

  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }



  redeemValidate(){
    var validate : string = '1';
    switch(validate){
        case "1" : {
          if(!this.redeemPointsInput.amount){
            this.validateMessage = 'Enter amount';
          }
    }
        case '2' : {
          if(!this.redeemPointsInput.type){
            this.validateMessage = 'Enter type';
          }   
    }
        case '3' : {
          if(!this.redeemPointsInput.points){
            this.validateMessage = "Enter points";
        }  
    }
      case '4' : {
        if(this.redeemPointsInput.amount && this.redeemPointsInput.type && this.redeemPointsInput.points ){
          this.validateMessage = '';
          return true;
        }
      }
}
}





  ngOnInit() {
    this.getRedeemSettingsDetails();
    console.log(this.Details);
    this.getAllRedeemSettingsDetails();
  }

}
