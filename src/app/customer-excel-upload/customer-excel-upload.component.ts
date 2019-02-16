import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-customer-excel-upload',
  templateUrl: './customer-excel-upload.component.html',
  styleUrls: ['./customer-excel-upload.component.css']
})
export class CustomerExcelUploadComponent implements OnInit {
  validateMessage: string;
  showButton: boolean = false;

  constructor(public thisDialogRef: MdDialogRef<CustomerExcelUploadComponent>,
    private authenticationService: AuthenticationService,
    @Inject(MD_DIALOG_DATA) public Details: any) { }


  onFileSelected(event) {
    console.log(event);
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      const frmData = new FormData();
      frmData.append("fileName", file);
      frmData.append("userid", this.authenticationService.loggedInUserId());
      this.authenticationService.uploadExcel(frmData).subscribe(res => {
        console.log(res);
        this.validateMessage = JSON.stringify(res.data);
        this.showButton = false;

      }, err => {
        this.showButton = false;
        this.validateMessage = JSON.stringify(err);
        console.log(err);
      })
    }

  }
  openExcelDialog() {
    this.validateMessage = '';
    this.showButton = true;
  }
  ngOnInit() {
  }

  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
}
