import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public dialog: MdDialog , private authenticationService: AuthenticationService , private distributorService: DistributorServiceService, ) { }

  allUsers:any = [];
  UserClickMore = true;
  filterType = {"type":"usertype"};
  filterInput = {'userType':"" , "mobileno":"" , "address":"" };
  showFilterDailog = false;






addUser() {
  let dialogRefEditCustomer = this.dialog.open(AddEditUserComponent, {

      width: '80%',
      data: ''
  });
  dialogRefEditCustomer.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result == "success"){
        this.getAllUsers(true);
      }

  });

}

editUser(data){

  let dialogRefEditCustomer = this.dialog.open(AddEditUserComponent, {

    width: '80%',
    data: data
});
dialogRefEditCustomer.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
    if(result == "success"){
      this.getAllUsers(true);
    }

});

}

search(){
  let input = {"root":{"userid":this.authenticationService.loggedInUserId(),"usertype":this.authenticationService.userType(),"loginid":this.authenticationService.loggedInUserId(),"lastuserid":0,
  "transtype":"usersearch","apptype":this.authenticationService.appType(),"pagesize":500,
  "searchtype":this.filterType.type ,"searchtext": ''  ,"devicetype":"",
  "moyaversioncode":""}};
  if(this.filterType.type =='usertype'){
    input.root.searchtext  = this.filterInput.userType;
  }
  else if(this.filterType.type =='mobile'){
    input.root.searchtext  = this.filterInput.mobileno;
  }
  else if(this.filterType.type == 'address'){
    input.root.searchtext  = this.filterInput.address;
  }
  console.log(input);
  this.distributorService.getAllDistributors(input)
            .subscribe(
            output => this.searchResult(output),
            error => {
                //console.log("error in distrbutors");
            });
}
searchResult(result){
  if(result.result == 'success'){
    this.allUsers = result.data;
  }
}

clearFilter(){
  this.filterInput = {'userType':"" , "mobileno":"" , "address":"" };
  this.showFilterDailog = false;
  this.getAllUsers(true);
}


getAllUsers(firstcall){
  let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0,"transtype":"getall",  "apptype": this.authenticationService.appType(), "pagesize": 100 } };

  if (this.allUsers && this.allUsers.length && !firstcall) {
    let lastUSer: any = _.last(this.allUsers);
    if (lastUSer) {
        input.root.lastuserid = lastUSer.userid;
    }

}
else {
    this.allUsers = [];
    input.root.lastuserid = 0;
}
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
    this.allUsers =_.union(this.allUsers , result.data);
}
else{
  this.UserClickMore = false;
}
}

getUsersByPaging(){
  this.getAllUsers(false);
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
    this.getAllUsers(true);
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
    this.getAllUsers(true);
    
  }
}

filterDailogToggle(){
  this.showFilterDailog = !this.showFilterDailog;
}


  ngOnInit() {
    this.getAllUsers(true);

  }

}
