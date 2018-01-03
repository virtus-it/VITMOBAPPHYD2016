import { Component, OnInit , Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-deletesupplier',
  templateUrl: './deletesupplier.component.html',
  styleUrls: ['./deletesupplier.component.css']
})
export class DeletesupplierComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,public thisDialogRef: MdDialogRef<DeletesupplierComponent>, @Inject(MD_DIALOG_DATA)  public details: any, private loaderService: LoaderService, private supplierservice :SupplierService) { }

 

  deleteSupplier(){
    let input = {"root":{"userid":this.details.userid, "loginid":this.authenticationService.loggedInUserId(),"activate":"false","usertype":"supplier","apptype":this.authenticationService.appType()}};
    console.log(input);

     this.supplierservice.deleteSupplier(input)
     .subscribe(
     output => this.deleteSupplierresult(output),
     error => {
       console.log("error in deleting supplier");
     this.loaderService.display(false);
     });
  }
  deleteSupplierresult(result) {
    console.log(result);
    if (result.result == "success") {
    this.thisDialogRef.close('success');
    }
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  ngOnInit() {
    console.log(this.details);
  }

}
