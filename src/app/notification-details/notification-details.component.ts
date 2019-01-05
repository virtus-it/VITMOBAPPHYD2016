import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { QuickNotificationComponent } from '../quick-notification/quick-notification.component';
import { MdDialog , MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { SmsServiceService } from '../sms/sms-service.service';


@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  constructor(public dialog: MdDialog,private authenticationService: AuthenticationService,  public thisDialogRef: MdDialogRef<NotificationDetailsComponent> , private smsService: SmsServiceService,  @Inject(MD_DIALOG_DATA) public Details: any ) { }


  allNotifications : any = [];
  noNotificationsSent:boolean = false;


  sendQuickNotification(data){
    let formattedData = {data: data , "type":"notificationFromCustomers"}
    let dialogRefeditStatus = this.dialog.open(QuickNotificationComponent, {
        width: '60%',
        data: formattedData
    });
    dialogRefeditStatus.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);
        if (result =='success') {
          this.getAllNotifications();

        }

    });
}

getAllNotifications(){
  let input = {"User":{"user_type": this.authenticationService.userType() ,"TransType":"notification","loginid":this.authenticationService.loggedInUserId() , "userid" : this.Details.userid,  
  "lastid": 0,"apptype": this.authenticationService.appType() ,"mobileno": this.Details.mobileno ,
  "pagesize":100,"devicetype":"","moyaversioncode":""}};
  this.smsService.getSmsList(input)
  .subscribe(
  output => this.getAllNotificationsResult(output),
  error => {
  });
}
getAllNotificationsResult(result){
  if(result && result.result == 'success'){
    this.allNotifications = result.data;
    this.noNotificationsSent = false;
    console.log( this.allNotifications , ' this.allNotifications');

  }
  else{
    this.allNotifications = [];
    this.noNotificationsSent = true;
  }
}



  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    this.getAllNotifications();
  }

}
