import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';
import { CreateUpdateTemplateComponent } from '../create-update-template/create-update-template.component';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor( public dialog: MdDialog ,private loaderService: LoaderService, private followupService: FollowUpService,  private authenticationService: AuthenticationService) { }

  AllTemplates:any = [];



  getAllTemplates(){
    let input = {"User":{"apptype":this.authenticationService.appType() , "loginid":this.authenticationService.loggedInUserId(), "transtype":"getalltemp" } };
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.GetAllTemplateResult(output),
    error => {
      //console.log("error in distrbutors");
      this.loaderService.display(false);
    });
  }
  GetAllTemplateResult(result){
    if(result.result == 'success'){
      this.AllTemplates = result.data.message;
    }
  }


  editTemplate(data){
    let dialogRef = this.dialog.open(CreateUpdateTemplateComponent, {
      width: '50%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
    this.getAllTemplates();
    }
  });


  }





  addMessages(){
    let dialogRef = this.dialog.open(CreateUpdateTemplateComponent, {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){
      this.getAllTemplates();
    }

  });

  }
  ngOnInit() {
    this.getAllTemplates();
  }

}
