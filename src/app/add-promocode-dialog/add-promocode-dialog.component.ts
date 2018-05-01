import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FollowUpService } from '../follow-up/follow-up.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  selector: 'app-add-promocode-dialog',
  templateUrl: './add-promocode-dialog.component.html',
  styleUrls: ['./add-promocode-dialog.component.css']
})
export class AddPromocodeDialogComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<AddPromocodeDialogComponent> , private loaderService: LoaderService, private followupService: FollowUpService,private authenticationService: AuthenticationService,) { }


  // promoCodeInput:any = {discountinpercent:"",   description:"",  offertype:"", startdate:"",enddate:"", criteria:"", promotype:"", category:"", promocode:"", }



  // createPromoCode(){
  // let input = {"offer":{"discountinpercent":this.promoCodeInput.discountinpercent,"description":this.promoCodeInput.description,"apptype":this.authenticationService.appType(), "offertype":this.promoCodeInput.offertype,"startdate":this.promoCodeInput.startdate,"enddate":this.promoCodeInput.enddate,"criteria":this.promoCodeInput.criteria,"promotype":this.promoCodeInput.promotype,"category":this.promoCodeInput.category,"promocode":this.promoCodeInput.promocode,"transtype":"create"}};
  // console.log(input);
  // this.followupService.createpromocode(input)
  // .subscribe(
  // output => this.createPromoCodeResult(output),
  // error => {
  //   //console.log("error in customer");
  //   this.loaderService.display(false);
  // });
// }
// createPromoCodeResult(result){
//   if (result.result == 'success'){
//     this.thisDialogRef.close('Cancel');
//   }
// }
//   onCloseModal(){
//     this.thisDialogRef.close('Cancel');
//   }

  ngOnInit() {
  }

}
