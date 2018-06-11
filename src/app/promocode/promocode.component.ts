import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddPromocodeDialogComponent } from '../add-promocode-dialog/add-promocode-dialog.component';
import { RedeemSettingsDialogComponent } from '../redeem-settings-dialog/redeem-settings-dialog.component';
import { PromocodeServiceService } from '../promocode/promocode-service.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';




@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor( public dialog: MdDialog, private promocodeservice: PromocodeServiceService ,  private authenticationService: AuthenticationService, private followupService: FollowUpService,) { }

  allPromoCodes:any = [];
tabPanelView:string="promoCode";

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
  //function to show panel
  showTabPanel(panelName) {
this.tabPanelView=panelName;
if(this.tabPanelView == 'redeemSetting'){
  this.redeemSettingsDialog();
}
  }

  redeemSettingsDialog(){
    let dialogRef = this.dialog.open(RedeemSettingsDialogComponent , {
      width: '50%',
      data: ''
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
