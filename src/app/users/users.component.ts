import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public dialog: MdDialog , private authenticationService: AuthenticationService , private distributorService: DistributorServiceService, ) { }

  allUsers:any = [];






addUser() {
  let dialogRefEditCustomer = this.dialog.open(AddEditUserComponent, {

      width: '700px',
      data: ''
  });
  dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result == "success"){
        this.getAllUsers();
      }

  });

}

editUser(data){

  let dialogRefEditCustomer = this.dialog.open(AddEditUserComponent, {

    width: '700px',
    data: data
});
dialogRefEditCustomer.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
    if(result == "success"){
      this.getAllUsers();
    }

});

}


getAllUsers(){
  let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0,"transtype":"getall",  "apptype": this.authenticationService.appType(), "pagesize": 500 } };
  this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.getDistributorsResult(output),
            error => {
                //console.log("error in distrbutors");
            });
}

getDistributorsResult(result) {
  //console.log(data);
  if (result.result == 'success') {
    this.allUsers = result.data;


}
}


activateUser(data){
  let input = {"User":{"TransType":"activate","userid":data.userid,"user_type": this.authenticationService.userType(),"devicetype":"","moyaversioncode":"","apptype":this.authenticationService.appType()}};
  this.distributorService.createDistributor(input).subscribe(
    output => this.activateUserResult(output),
    error => {
      //console.log("error in distrbutors");
    });
}
activateUserResult(result){
  if(result.result == 'success'){
    this.getAllUsers();
  }
}


deactivateUser(data){
  let input = {"User":{"TransType":"deactivate","userid":data.userid,"user_type": this.authenticationService.userType(),"devicetype":"","moyaversioncode":"","apptype":this.authenticationService.appType()}};
  this.distributorService.createDistributor(input).subscribe(
    output => this.deactivateUserResult(output),
    error => {
      //console.log("error in distrbutors");
    });
}
deactivateUserResult(result){
  if(result.result == 'success'){
    this.getAllUsers();
    
  }
}






  ngOnInit() {
    this.getAllUsers();

  }

}
