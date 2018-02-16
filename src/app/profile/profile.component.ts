import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { PasswordupdateComponent } from '../passwordupdate/passwordupdate.component';
import { ProfileupdateComponent } from '../profileupdate/profileupdate.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private customerService: CustomerService, public dialog: MdDialog,) {  }
  profileUpdate: any = {"firstname":"","lastname":"","emailid":"","address":"","city":"","state":"","pincode":"","mobileno":"" };
  updateStatus= false;


  updateProfile(){
    let input={"User":{"userid":this.authenticationService.loggedInUserId(),"user_type":"dealer","firstname":this.profileUpdate.firstname,"lastname":this.profileUpdate.lastname,"emailid":this.profileUpdate.emailid,
    "address":this.profileUpdate.address,"city":this.profileUpdate.city,"state":this.profileUpdate.state,"pincode":this.profileUpdate.pincode,"mobileno":this.profileUpdate.mobileno,"appType":this.authenticationService.appType()}};
    console.log(input);
  this.customerService.updateCustomer(input)
    .subscribe(
    output => this.profileUpdateResult(output),
    error => {
      console.log("error in updating profile");
    });
  }
  profileUpdateResult(result){
    console.log(result);
    if (result.result == 'success') {
      this.profileUpdate = result.data;
      this.updateStatus = true;
      // this.updateProfileDialog();
      this.getProfileDetails();
  }
}

getProfileDetails(){
  let input ={"userid":this.authenticationService.loggedInUserId(), "appType":this.authenticationService.appType()};
  console.log(input);
  this.customerService.getCustomerById(input)
  .subscribe(
    output => this.getProfileDetailsResult(output),
    error => {
      console.log("error in getting profile details");
    });
}
getProfileDetailsResult(result){
  console.log(result);
  this.profileUpdate.firstname =result.data.user.firstname;
  this.profileUpdate.lastname =result.data.user.lastname;
  this.profileUpdate.emailid =result.data.user.emailid;
  this.profileUpdate.address =result.data.user.address;
  this.profileUpdate.city =result.data.user.city;
  this.profileUpdate.state =result.data.user.state;
  this.profileUpdate.pincode =result.data.user.pincode;
  this.profileUpdate.mobileno =result.data.user.mobileno;
}

changePassword(){
  let dialogRef = this.dialog.open(PasswordupdateComponent, {
    width: '550px',
    data: ''
});
dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);
    if (result == 'success') {
    }
});
}

updateProfileDialog(){
  let dialogRef = this.dialog.open(ProfileupdateComponent, {
    width: '550px',
    data: ''
});
dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);
    if (result == 'success') {
    }
});
}



  ngOnInit() {
    
    this.getProfileDetails();
  }

}
