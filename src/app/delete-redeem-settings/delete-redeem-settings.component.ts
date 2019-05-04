import { Component, OnInit , Inject } from '@angular/core';
import { MD_DIALOG_DATA , MdDialogRef} from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-delete-redeem-settings',
  templateUrl: './delete-redeem-settings.component.html',
  styleUrls: ['./delete-redeem-settings.component.css']
})
export class DeleteRedeemSettingsComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public Detail: any ,private distributorService : DistributorServiceService, private authenticationService : AuthenticationService , public thisDialogRef: MdDialogRef<DeleteRedeemSettingsComponent>) { }

  delete(){
    let input = {"User":{loginid : this.authenticationService.loggedInUserId() , apptype: this.authenticationService.appType() , id: this.Detail.id , TransType:'delete'}};
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.deleteRedeemSettingResult(output),
    error => {      
    });
  }
  deleteRedeemSettingResult(result){
    if(result.result == 'success'){
    this.thisDialogRef.close('success');
    }
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }


  ngOnInit() {
  }

}
