import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { QuickNotificationComponent } from '../quick-notification/quick-notification.component';
import { MdDialog , MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  constructor(public dialog: MdDialog, public thisDialogRef: MdDialogRef<NotificationDetailsComponent> ,  @Inject(MD_DIALOG_DATA) public Details: any ) { }


  sendQuickNotification(data){
    let formattedData = {data: data , "type":"notificationFromCustomers"}
    let dialogRefeditStatus = this.dialog.open(QuickNotificationComponent, {
        width: '60%',
        data: formattedData
    });
    dialogRefeditStatus.afterClosed().subscribe(result => {
        ////console.log(`Dialog closed: ${result}`);
        if (result =='success') {

        }

    });
}


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
  }

}
