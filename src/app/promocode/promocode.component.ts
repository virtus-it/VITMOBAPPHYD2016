import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddPromocodeDialogComponent } from '../add-promocode-dialog/add-promocode-dialog.component';
import { RedeemSettingsDialogComponent } from '../redeem-settings-dialog/redeem-settings-dialog.component';
import { PromocodeServiceService } from '../promocode/promocode-service.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { ProcessPaymentDialogComponent } from '../process-payment-dialog/process-payment-dialog.component';
import { ProcessedPaymentsDetailsComponent } from '../processed-payments-details/processed-payments-details.component';



@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor( public dialog: MdDialog, private promocodeservice: PromocodeServiceService ,  private authenticationService: AuthenticationService, private followupService: FollowUpService,  private distributorService: DistributorServiceService) { }

  allPromoCodes:any = [];
tabPanelView:string="promoCode";
redeemDetails:any = [];
redeemSettingsDetails:any = [];

  addPromoCode(){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllPromoCodes();
    }

  });
  }

  editPromoCode(data){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllPromoCodes();

    }

  });

  }

  getAllPromoCodes(){
    let input = {"offer":{"transtype":"getall" , "apptype":this.authenticationService.appType()}};
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.getAllPromoCodesResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  getAllPromoCodesResult(result){
    if(result.result == 'success'){
      this.allPromoCodes = result.data;
      console.log(result.data);
    }
    else{
      this.allPromoCodes = [];
    }
  }


  deletePromoCode(data){
    let input = {"offer":{"transtype":"delete","id": data.offerid}};
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.deletePromoCodeResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  deletePromoCodeResult(result){
    if(result.result == 'success'){
      this.getAllPromoCodes();
    }
  }


//   showTabPanel(panelName) {
// this.tabPanelView=panelName;
// if(this.tabPanelView == 'redeemSetting'){
//   this.redeemSettingsDialog();
// }
// else if(this.tabPanelView == 'redeemDetails'){
//   this.getRedeemDetails();
// }
//   }

  redeemSettingsDialog(){
    let dialogRef = this.dialog.open(RedeemSettingsDialogComponent , {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getRedeemSettingsDetails();
      this.getRedeemDetails();
      this.getAllPromoCodes();
    }
  });
  }


  showTabPanel(panelName) {
    this.tabPanelView=panelName;
    if(this.tabPanelView == 'redeemSetting'){
      this.getRedeemSettingsDetails();
    }
    else if(this.tabPanelView == 'redeemDetails'){
      this.getRedeemDetails();
    }
      }


      getRedeemSettingsDetails(){
        let input = {"User": {"TransType":"getredeemsettings" , apptype: this.authenticationService.appType() , "loginid":  this.authenticationService.loggedInUserId() }};
        this.distributorService.getPoints(input)
        .subscribe(
        output => this.getRedeemSettingsDetailsResult(output),
        error => {      
        });
      }
      getRedeemSettingsDetailsResult(result){
        if(result.result == 'success'){
          this.redeemSettingsDetails = result.data;
        }
      }

      changeSettings(data){

        let dialogRef = this.dialog.open(RedeemSettingsDialogComponent , {
          width: '50%',
          data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'success'){
          this.getRedeemSettingsDetails();
        }
      });

      }





  getRedeemDetails(){
    let input = {"User":{"TransType":"getredeemdetails" , appType: this.authenticationService.appType()}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.getRedeemDetailsResult(output),
    error => {      
    });

  }
  getRedeemDetailsResult(result){
    if(result.result == 'success'){
      this.redeemDetails = result.data;
    }
  }

  processPaymentDialog(data){

    let dialogRef = this.dialog.open(ProcessPaymentDialogComponent , {
      width: '75%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getRedeemDetails();
    }
  });

  }

  viewProcessedDetails(data){
    let dialogRef = this.dialog.open(ProcessedPaymentsDetailsComponent , {
      width: '75%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
     
    }
  });

  }



  ngOnInit() {
    this.getAllPromoCodes();
  
  }

}
