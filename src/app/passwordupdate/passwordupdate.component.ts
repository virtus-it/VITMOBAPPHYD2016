import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-passwordupdate',
  templateUrl: './passwordupdate.component.html',
  styleUrls: ['./passwordupdate.component.css']
})
export class PasswordupdateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<PasswordupdateComponent>, private customerService: CustomerService, private authenticationService: AuthenticationService) { }

  checkPassword: any = { "oldpassword": "", "newpassword": "", "confirmpassword": "" };
  wrongPassword = false;
  passwordUpdated = false;
  shortPassword = false;
  longPassword = false;


  updatePassword() {
    let input = { "User": { "userid": this.authenticationService.loggedInUserId(), "user_type": "dealer", "oldpwd": this.checkPassword.oldpassword, "pwd": this.checkPassword.newpassword, "apptype": this.authenticationService.appType() } };
    //console.log(input);
    this.customerService.updateCustomer(input)
      .subscribe(
        output => this.updatePasswordResult(output),
        error => {
          //console.log("error in updating profile");
        });
  }
  updatePasswordResult(result) {
    //console.log(result);
    if (result.result == 'success') {
      this.passwordUpdated = true;
      // this.thisDialogRef.close('success');

    }
  }

  validatePassword() {
    if (this.checkPassword.newpassword && this.checkPassword.newpassword.length < 4) {
      this.shortPassword = true;
    }
    else if (this.checkPassword.confirmpassword && this.checkPassword.confirmpassword.length < 4) {
      this.shortPassword = true;
    }
    else if (this.checkPassword.newpassword && this.checkPassword.newpassword.length > 15) {
      this.longPassword = true;
    }
    else if (this.checkPassword.confirmpassword && this.checkPassword.confirmpassword.length > 15) {
      this.longPassword = true;
    }
    else if (this.checkPassword.newpassword != this.checkPassword.confirmpassword) {
      this.wrongPassword = true;
    }
    else if ((this.checkPassword.newpassword == this.checkPassword.confirmpassword) && this.checkPassword.newpassword.length > 4 && this.checkPassword.confirmpassword.length > 4) {
      this.shortPassword = false;
      this.wrongPassword = false;
      this.longPassword = false;
      this.updatePassword();
    }

  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
