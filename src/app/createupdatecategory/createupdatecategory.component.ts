import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ProductsService } from '../products/products.service';
import { FormControl, Validators } from '@angular/forms';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-createupdatecategory',
  templateUrl: './createupdatecategory.component.html',
  styleUrls: ['./createupdatecategory.component.css']
})
export class CreateupdatecategoryComponent implements OnInit {
  allUsers = [];
  manufacturer: any;
  assignTo: boolean = false;
  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<CreateupdatecategoryComponent>, private productService: ProductsService, @Inject(MD_DIALOG_DATA) public details: any, private distributorService: DistributorServiceService) { }
  categoryInput = { cname: "", cdesc: "", categoryid: "", priority: 0 };
  // cnameFormControl = new FormControl('', [
  //   Validators.required]);
  //   cdescFormControl = new FormControl('', [
  //      Validators.required]);
  validateMessage: any = '';

  createCategory() {
    console.log(this.manufacturer)
    this.validateMessage = "";
    if (this.assignTo) {
      if (!this.manufacturer) {
        this.validateMessage = "Please select manufacturer";
        return;
      }
    }

    let input = { "product": { "cname": this.categoryInput.cname, "cdesc": this.categoryInput.cdesc, "priority": this.categoryInput.priority, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
    if (this.assignTo) {
      if (this.manufacturer) {
        input.product["manufacturerid"] = this.manufacturer;
      }
    }
    //console.log(input);
    if (this.categoryValidation()) {
      this.productService.createCategory(input)
        .subscribe(
          output => this.createCategoryResult(output),
          error => {
            //console.log("error in distrbutors");
          });
    }
  }
  createCategoryResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.thisDialogRef.close('success');
    }
  }


  updateCategory() {
    this.validateMessage = "";
    if (this.assignTo) {
      if (!this.manufacturer) {
        this.validateMessage = "Please select manufacturer";
        return;
      }
    }
    let input = { "product": { "cname": this.categoryInput.cname, "cdesc": this.categoryInput.cdesc, "categoryid": this.categoryInput.categoryid, "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "priority": this.categoryInput.priority } };

    //console.log(input);
    if (this.assignTo) {
      if (this.manufacturer) {
        input.product["manufacturerid"] = this.manufacturer;
      }
    }
    if (this.categoryValidation()) {
      this.productService.updateCategory(input)
        .subscribe(
          output => this.updateCategoryResult(output),
          error => {
            //console.log("error in distrbutors");
          });
    }
  }
  updateCategoryResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.thisDialogRef.close('success');
    }
  }

  createAndUpdateCategory() {
    if (this.details) {
      this.updateCategory();
    }
    else {
      this.createCategory();
    }
  }

  openDailog() {
    console.log(this.details);
    if (this.details) {
      //console.log(this.details);
      this.categoryInput.cname = this.details.category;
      this.categoryInput.cdesc = this.details.category_desc;
      this.categoryInput.categoryid = this.details.categoryid;
      if (this.details.priority === null) {
        this.categoryInput.priority = 0;
      }
      else {
        this.categoryInput.priority = this.details.priority;
      }
    }
  }


  categoryValidation() {
    var validate: string = '1';
    switch (validate) {
      case "1": {
        if (!this.categoryInput.cdesc) {
          this.validateMessage = 'Enter Description';
        }
      }
      case '2': {
        if (!this.categoryInput.cname) {
          this.validateMessage = 'Enter category name';
        }
      }

      case '3': {
        if (this.categoryInput.cdesc && this.categoryInput.cname) {
          this.validateMessage = '';
          return true;
        }
      }
    }
  }


  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  numberEvent(e: any) {
    // console.log(e);
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }
  }

  getAllUsers() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "getall", "apptype": this.authenticationService.appType(), "pagesize": 1000 } };

    this.distributorService.getAllDistributors(input)
      .subscribe(
        output => this.getDistributorsResult(output),
        error => {
          //console.log("error in distrbutors");
        });
  }

  getDistributorsResult(result) {
    //console.log(data);
    try {


      if (result.result == 'success' && result.data) {
        for (let i = 0; i < result.data.length; i++) {
          const element = result.data[i];
          if (element.usertype && element.usertype.toLowerCase() == "manufacturer") {
            this.allUsers.push(element);
          }
          if (this.details && this.details.manfacturerid && this.details.manfacturerid == element.userid) {
            this.manufacturer = this.details.manfacturerid;
            this.assignTo = true;
          }
        }
        console.log(this.allUsers)
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    //console.log(this.details);
    this.getAllUsers()
    this.openDailog();


  }

}
