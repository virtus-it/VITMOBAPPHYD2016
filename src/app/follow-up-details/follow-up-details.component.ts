import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { FollowUpService } from '../follow-up/follow-up.service';
@Component({
  selector: 'app-follow-up-details',
  templateUrl: './follow-up-details.component.html',
  styleUrls: ['./follow-up-details.component.css']
})
export class FollowUpDetailsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<FollowUpDetailsComponent>, @Inject(MD_DIALOG_DATA) public details: any, public dialog: MdDialog, private loaderService: LoaderService, private followupService: FollowUpService) { }
  getfollowUpdetails() {
    let input = { "User": { "type": this.details.type, "id": this.details.id, "transtype": "getall" } }
    this.followupService.getFollowUp(input)
      .subscribe(
      output => this.getfollowUpdetailsResult(output),
      error => {
        console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  getfollowUpdetailsResult(result) {
    console.log(result);
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.details);
    this.getfollowUpdetails();
  }

}
