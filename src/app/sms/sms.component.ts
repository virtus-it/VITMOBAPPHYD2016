import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { SmsServiceService } from '../sms/sms-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
@Component({

    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

    constructor(public dialog: MdDialog, private smsService: SmsServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService) { }
    smsListDetails = [];
    openSmsDialog() {
        let dialogRef = this.dialog.open(SmsDialogComponent, {
            width: '80%',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            this.getSmsList();

        });
    }
    getSmsList() {
        this.loaderService.display(true);
        let getInput = { "User": { "user_type": this.authenticationService.userType(), "TransType": "getsms", "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() } };
        this.smsService.getSmsList(getInput)
            .subscribe(
            output => this.getSmsListrResult(output),
            error => {
                console.log("error in distrbutors");
                this.loaderService.display(false);
            });
    }
    getSmsListrResult(result) {
        this.loaderService.display(false);
        console.log(result);
        this.smsListDetails = result.data;
    }
    ngOnInit() {
        this.getSmsList();
    }

}
