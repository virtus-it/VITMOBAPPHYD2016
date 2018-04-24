import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';
import { CreateUpdateTemplateComponent } from '../create-update-template/create-update-template.component';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor( public dialog: MdDialog , private followupService: FollowUpService,  private authenticationService: AuthenticationService) { }

  AllTemplates:any = [];



  getAllTemplates(){
    let input = {"User":{"user_type":"dealer","transtype":"getnotification","loginid":this.authenticationService.loggedInUserId()}};
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.getTemplatesResult(output),
    error => {
    });
  }
  getTemplatesResult(output){
    if(output.result == 'success'){
      this.AllTemplates = output.data;

    }

  }




  addMessages(){
    let dialogRef = this.dialog.open(CreateUpdateTemplateComponent, {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {

  });

  }
  ngOnInit() {
    this.getAllTemplates();
  }

}
