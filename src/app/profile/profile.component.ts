import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { PasswordupdateComponent } from '../passwordupdate/passwordupdate.component';
import { ProfileupdateComponent } from '../profileupdate/profileupdate.component';
import { ProductsService } from '../products/products.service';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private customerService: CustomerService, public dialog: MdDialog, private productService: ProductsService) {  }
  profileUpdate: any = {"firstname":"","lastname":"","emailid":"","address":"","city":"","state":"","pincode":"","mobileno":"", "companyname":"", "referCode":"" };
  updateStatus= false;
  base64textString:any = "";
  imageUpdateError:boolean = false;
  imageUplaodSuccess:boolean = false;
  isSuperDealer:boolean = false;
  customerCare = true;
  salesTeamLogin : boolean = true;


  updateProfile(){
    let input={"User":{"userid":this.authenticationService.loggedInUserId(),"user_type":"dealer","firstname":this.profileUpdate.firstname,"lastname":this.profileUpdate.lastname,"emailid":this.profileUpdate.emailid, "companyname":this.profileUpdate.companyname, "referCode":this.profileUpdate.referCode,
    "address":this.profileUpdate.address,"city":this.profileUpdate.city,"state":this.profileUpdate.state,"pincode":this.profileUpdate.pincode,"mobileno":this.profileUpdate.mobileno,"appType":this.authenticationService.appType()}};
    //console.log(input);
  this.customerService.updateCustomer(input)
    .subscribe(
    output => this.profileUpdateResult(output),
    error => {
      //console.log("error in updating profile");
    });
  }
  profileUpdateResult(result){
    //console.log(result);
    if (result.result == 'success') {
      this.profileUpdate = result.data;
      this.updateStatus = true;
      // this.updateProfileDialog();
      this.getProfileDetails();
  }
}

getProfileDetails(){
  let input ={"userid":this.authenticationService.loggedInUserId(), "appType":this.authenticationService.appType()};
  //console.log(input);
  this.customerService.getCustomerById(input)
  .subscribe(
    output => this.getProfileDetailsResult(output),
    error => {
      //console.log("error in getting profile details");
    });
}
getProfileDetailsResult(result){
  //console.log(result);
  this.profileUpdate.firstname =result.data.user.firstname;
  this.profileUpdate.lastname =result.data.user.lastname;
  this.profileUpdate.emailid =result.data.user.emailid;
  this.profileUpdate.address =result.data.user.address;
  this.profileUpdate.city =result.data.user.city;
  this.profileUpdate.state =result.data.user.state;
  this.profileUpdate.pincode =result.data.user.pincode;
  this.profileUpdate.mobileno =result.data.user.mobileno;
  this.profileUpdate.companyname = result.data.user.companyname;
  this.profileUpdate.referCode = result.data.user.reference_code;
  this.profileUpdate.userid = result.data.user.userid;
}

changePassword(){
  let dialogRef = this.dialog.open(PasswordupdateComponent, {
    width: '400px',
    data: ''
});
dialogRef.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
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
    //console.log(`Dialog closed: ${result}`);
    if (result == 'success') {

    }
});
}

updateUser(){
  let input = {"User":{"userid": this.authenticationService.loggedInUserId() , "user_type": this.authenticationService.userType() ,"isimageupdate":true,"imageurl":'dealer_'+this.profileUpdate.userid ,"imagename":"dealer_"+this.profileUpdate.userid ,"apptype":this.authenticationService.appType()}} ;
  this.productService.updateUserOnImage(input)
  .subscribe(
  output => this.updateUserResult(output),
  error => {
    //console.log("error in distrbutors");
  });
}
updateUserResult(result){
  if(result.result == 'success'){
    this.getProfileDetails();
    // console.log('Image uploaded successfully');
   
  }

}




onFileSelected(event){

  var files = event.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);

}
}

_handleReaderLoaded(readerEvt) {
var binaryString = readerEvt.target.result;
       this.base64textString= btoa(binaryString);
       console.log('converted to base64');
      //  console.log(btoa(binaryString));
}

// //  /uploadimg   data.productid pname



uploadImage(){
 let input = {"image":{"base64string": this.base64textString , "filename": 'dealer_'+this.profileUpdate.userid }};
 this.productService.uploadImage(input)
.subscribe(
output => this.uploadImageResult(output),
error => {
  //console.log("error in distrbutors");
  this.imageUpdateError = true;
});
}
uploadImageResult(result){
 if(result.result == 'success'){
   console.log('image uploaded successfully');
   this.imageUplaodSuccess = true;
   this.imageUpdateError = false;
   this.updateUser();
 }
 else{
  this.imageUpdateError = true;
}
}

addVehicle(){
  let dialogRef = this.dialog.open(AddVehicleComponent , {
    width: '700px',
    data: ''
});
dialogRef.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
    if (result == 'success') {

    }
});

}



numberEvent(e:any){
  if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
    e.preventDefault();
  }
}




  ngOnInit() {
    
    this.getProfileDetails(); 
    this.customerCare = this.authenticationService.customerCareLoginFunction();
    this.salesTeamLogin = this.authenticationService.salesTeamLoginFunction();
    if(this.authenticationService.isSuperDelear){
      this.isSuperDealer = true;
    }
    else{
      this.isSuperDealer = false;
    }
    
  }

}
