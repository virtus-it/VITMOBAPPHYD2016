import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/authentication.service';
import { FollowUpService } from '../follow-up/follow-up.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-quick-notification',
  templateUrl: './quick-notification.component.html',
  styleUrls: ['./quick-notification.component.css']
})
export class QuickNotificationComponent implements OnInit {
  templateCtrl: FormControl;
  filteredTemplates: Observable<any[]>;


  constructor(public thisDialogRef: MdDialogRef<QuickNotificationComponent>, private followupService: FollowUpService,  private authenticationService: AuthenticationService) {

    this.templateCtrl = new FormControl();
      this.filteredTemplates = this.templateCtrl.valueChanges
        .startWith(null)
        .map(temp => temp ? this.findTemplate(temp) : this.getAllTemplates.slice());
   }

   getAllTemplates:any = [];

   findTemplate(name:string){
    console.log(name);
    if(this.getAllTemplates && this.getAllTemplates.template_name){
    let finalTemplates = this.getAllTemplates.filter(temp =>
      temp.template_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    console.log(finalTemplates);
    if (finalTemplates && finalTemplates.length > 0) {
      let findTemplate: any = {};
      findTemplate = _.find(finalTemplates, function (k, l) {
        let tempDetails: any = k;
        return tempDetails.template_name == name;
      });
    }
    return finalTemplates;
  }
}

getTemplates(){
  let input = {"User":{"user_type":"dealer","transtype":"getnotification","loginid":this.authenticationService.loggedInUserId()}};
  console.log(input);
  this.followupService.followUpTemplate(input)
  .subscribe(
  output => this.getTemplatesResult(output),
  error => {
  });
}
getTemplatesResult(result){
  console.log(result);
  if(result.result == 'success'){
    this.getAllTemplates = result.data; 
    console.log(this.getAllTemplates);
  //  this.tempName = this.getAllTemplates.template_name ;
  }
}





  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }


  ngOnInit() {
    this.getTemplates();
  }

}
