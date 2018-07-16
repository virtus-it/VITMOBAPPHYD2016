import { Component, OnInit , Inject} from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'app-delete-rule',
  templateUrl: './delete-rule.component.html',
  styleUrls: ['./delete-rule.component.css']
})
export class DeleteRuleComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService  , private followupService: FollowUpService, public thisDialogRef: MdDialogRef<DeleteRuleComponent>  ,  @Inject(MD_DIALOG_DATA)  public Details: any ) { }

  delete(){
    let input = {"offer":{"userid": this.authenticationService.loggedInUserId() , apptype : this.authenticationService.appType() ,   'id' : this.Details.id , 'transtype' :"deleterule" , 'loginid': this.authenticationService.loggedInUserId() }} ;
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.deleteResult(output),
    error => {      
    });
  }
  deleteResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
  }

}
