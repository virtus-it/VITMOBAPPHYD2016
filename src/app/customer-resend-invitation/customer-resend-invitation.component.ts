import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-resend-invitation',
  templateUrl: './customer-resend-invitation.component.html',
  styleUrls: ['./customer-resend-invitation.component.css']
})
export class CustomerResendInvitationComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerResendInvitationComponent>) { }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
