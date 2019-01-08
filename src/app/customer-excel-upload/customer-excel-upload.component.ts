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

  constructor(public thisDialogRef: MdDialogRef<CustomerExcelUploadComponent>,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private distributorService: DistributorServiceService,
    @Inject(MD_DIALOG_DATA) public Details: any) { }


  onFileSelected(event) {
    console.log(event);
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      const frmData = new FormData();
      frmData.append("fileName", file);
      this.authenticationService.uploadExcel(frmData).subscribe(res => {
        console.log(res);
        this.validateMessage = JSON.stringify(res.data);
      }, err => {
        console.log(err);
      })
    }

  }
  ngOnInit() {
  }

  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
}
