import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<InvoiceHistoryComponent>, @Inject(MD_DIALOG_DATA) public details: any, public dialog: MdDialog, private loaderService: LoaderService,private reportservice: ReportsService) { }

  getInvoiceHistory(){
let input = {"User":{"loginid":this.authenticationService.loggedInUserId(),"transtype":"getall"}};
this.reportservice.invoiceHistory(input)
.subscribe(
output => this.getInvoiceHistoryResult(output),
error => {
  console.log("error in distrbutors");
  this.loaderService.display(false);
});
  }
  getInvoiceHistoryResult(result){


  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
  //  this.getInvoiceHistory();
  }

}
