import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ProductsService } from '../products/products.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createupdatecategory',
  templateUrl: './createupdatecategory.component.html',
  styleUrls: ['./createupdatecategory.component.css']
})
export class CreateupdatecategoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<CreateupdatecategoryComponent>,  private productService: ProductsService, @Inject(MD_DIALOG_DATA) public details: any) { }
  categoryInput = {cname:"", cdesc:"", categoryid: "" , priority: 0 };
  // cnameFormControl = new FormControl('', [
  //   Validators.required]);
  //   cdescFormControl = new FormControl('', [
  //      Validators.required]);
  validateMessage:any = '';

  createCategory(){
    let input = {"product":{"cname":this.categoryInput.cname,"cdesc":this.categoryInput.cdesc, "priority": this.categoryInput.priority , "loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}};
    //console.log(input);
    if(this.categoryValidation()){
    this.productService.createCategory(input)
    .subscribe(
    output => this.createCategoryResult(output),
    error => {
        //console.log("error in distrbutors");
    });
  }
  }
  createCategoryResult(result){
    //console.log(result);
    if (result.result == "success") {
      this.thisDialogRef.close('success');
  }
}


updateCategory(){ 
let input ={"product":{"cname":this.categoryInput.cname,"cdesc":this.categoryInput.cdesc,"categoryid":this.categoryInput.categoryid,"loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType() , "priority": this.categoryInput.priority }};

//console.log(input);
if(this.categoryValidation()){
    this.productService.updateCategory(input)
    .subscribe(
    output => this.updateCategoryResult(output),
    error => {
        //console.log("error in distrbutors");
    });
  }
}
updateCategoryResult(result){
  //console.log(result);
    if (result.result == "success") {
      this.thisDialogRef.close('success');
}
}

createAndUpdateCategory(){
  if(this.details){
    this.updateCategory();
  }
  else{
    this.createCategory();
  }
}

openDailog() {
  if (this.details) {
    //console.log(this.details);
    this.categoryInput.cname = this.details.category;
    this.categoryInput.cdesc = this.details.category_desc;
    this.categoryInput.categoryid = this.details.categoryid;
    if(this.details.priority === null){
      this.categoryInput.priority = 0;
    }
    else{
    this.categoryInput.priority = this.details.priority;
  }
}
}


categoryValidation(){
  var validate : string = '1';
  switch(validate){
      case "1" : {
        if(!this.categoryInput.cdesc){
          this.validateMessage = 'Enter Description';
        }
  }
      case '2' : {
        if(!this.categoryInput.cname){
          this.validateMessage = 'Enter category name';
        }   
  }
      
    case '3' : {
      if(this.categoryInput.cdesc && this.categoryInput.cname ){
        this.validateMessage = '';
        return true;
      }
    }
}
}


onCloseCancel(){
  this.thisDialogRef.close('Cancel');
}

  ngOnInit() {
    //console.log(this.details);
    this.openDailog();
  
  }

}
