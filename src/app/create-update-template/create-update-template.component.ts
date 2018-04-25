import { Component, OnInit , Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-update-template',
  templateUrl: './create-update-template.component.html',
  styleUrls: ['./create-update-template.component.css']
})
export class CreateUpdateTemplateComponent implements OnInit {

  constructor( public thisDialogRef: MdDialogRef<CreateUpdateTemplateComponent>,  private authenticationService: AuthenticationService,private loaderService: LoaderService, private followupService: FollowUpService ,  @Inject(MD_DIALOG_DATA) public Details: any) { }

  AllTemplates:any = [];


  createTemplateInput = {template_desc:"" , messagetype:"",  orderstatus:"" , tempname:"" , temptype:"" , type:"" , id:""  }

  createTemplate(){
    let input= {"User":{"template_desc":this.createTemplateInput.template_desc,"transtype":"add","messagetype":this.createTemplateInput.messagetype,"orderstatus":this.createTemplateInput.orderstatus,"tempname":this.createTemplateInput.tempname,"temptype":this.createTemplateInput.temptype , "type":this.createTemplateInput.type , "apptype":this.authenticationService.appType() , "loginid":this.authenticationService.loggedInUserId()}};
    this.followupService.followUpTemplate(input)
      .subscribe(
      output => this.createTemplateResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  createTemplateResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }


  updateTemplate(){
    let input = {"User":{"template_desc":this.createTemplateInput.template_desc,"transtype":"update","messagetype":this.createTemplateInput.messagetype,"orderstatus":this.createTemplateInput.orderstatus,"tempname":this.createTemplateInput.tempname,"temptype":this.createTemplateInput.temptype ,"type":this.createTemplateInput.type ,  "id":this.Details.id}};
    this.followupService.followUpTemplate(input)
      .subscribe(
      output => this.UpdateTemplateResult(output),
      error => {
        //console.log("error in distrbutors");
        this.loaderService.display(false);
      });
  }
  UpdateTemplateResult(result){
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }


  createUpdateTemplate(){
    if(this.Details.id){
      this.updateTemplate();
    }
    else{
      this.createTemplate();
    }
  
  }


  getTemplateDetails(){
    let input={"User":{"apptype":this.authenticationService.appType() , "loginid":this.authenticationService.loggedInUserId(), "transtype":"getonetemp","id":this.Details.id } };
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.getTemplateResult(output),
    error => {
      //console.log("error in distrbutors");
      this.loaderService.display(false);
    });
  }
  getTemplateResult(result){
    if(result.result == 'success'){
      this.createTemplateInput.messagetype = result.data.message[0].messagetype;
      this.createTemplateInput.template_desc = result.data.message[0].template_desc; 
      this.createTemplateInput.orderstatus = result.data.message[0].orderstatus;
      this.createTemplateInput.tempname = result.data.message[0].template_name;
      this.createTemplateInput.temptype = result.data.message[0].template_type;
      this.createTemplateInput.type = result.data.message[0].type;

    }
  }


  onCloseModal(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    if(this.Details){
    this.getTemplateDetails();
    }
  }

}


// new create template
// {"User":{"apptype":"moya" , "loginid":289 , "temptype":"message/notification" , "orderstatus":"created/updated/delivered/out for delivery/...." , "tempname":"name" , "type":"customer/distributor" , "messagetype":"statisc/dynamic" ,"transtype":"add" ,  "template_desc":"message"}}






// get all templates
// {"User":{"apptype":"moya" , "loginid":289 , "transtype":"getalltemp" } }

// get one templates
// {"User":{"apptype":"moya" , "loginid":289 , "transtype":"getonetemp","id":"123" } }


// update:

// {"User":{"template_desc":"xyz","transtype":"update","messagetype":"xyz","orderstatus":"xyz","tempname":"xyz","temptype":"xyz" , "id":"123"}}

