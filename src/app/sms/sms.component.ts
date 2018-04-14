import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { SmsServiceService } from '../sms/sms-service.service';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import { LoaderService } from '../login/loader.service';
@Component({

    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

    constructor(public dialog: MdDialog, private smsService: SmsServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService) { }
    smsListDetails = [];
    smsClickMore = true;
    openSmsDialog() {
        let dialogRef = this.dialog.open(SmsDialogComponent, {
            width: '80%',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.getSmsList(true);

        });
    }
    getSmsList(firstcall) {
        this.loaderService.display(true);
        let getInput = { "User": { "user_type": this.authenticationService.userType(), "TransType": "getsms", "loginid": this.authenticationService.loggedInUserId(), "lastid": 0 ,  "apptype": this.authenticationService.appType() , "pagesize": 100 } };

        if (this.smsListDetails && this.smsListDetails.length && !firstcall) {
            let lastSms: any = _.last(this.smsListDetails);
            if (lastSms) {
                getInput.User.lastid = lastSms.id;
            }
            
        }
        else {
            this.smsListDetails = [];
            getInput.User.lastid = 0;
        }
        

        console.log(getInput);
        this.smsService.getSmsList(getInput)
            .subscribe(
            output => this.getSmsListrResult(output),
            error => {
                //console.log("error in distrbutors");
                this.loaderService.display(false);
            });
    }
    getSmsListrResult(result) {
        this.loaderService.display(false);
        console.log(result);
        // this.smsListDetails = result.data;
        if(result.result == 'success'){
            this.smsListDetails = _.union(this.smsListDetails, result.data);
        }
        else {
            this.smsClickMore = false;
        }
    }


    getsmsByPaging() {
       
            this.getSmsList(false);

    }
    ngOnInit() {
        this.getSmsList(true);
    }

}
