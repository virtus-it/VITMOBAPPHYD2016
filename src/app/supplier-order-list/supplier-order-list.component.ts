import { Component, OnInit , Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-supplier-order-list',
  templateUrl: './supplier-order-list.component.html',
  styleUrls: ['./supplier-order-list.component.css']
})
export class SupplierOrderListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<SupplierOrderListComponent>, @Inject(MD_DIALOG_DATA) public Detail: any, private supplierservice :SupplierService, private loaderService: LoaderService) { }
  SupplierOrderList=[];


  supplierOrderList(){
    let input= {"order":{"userid":this.authenticationService.loggedInUserId(),"priority":"5","usertype":"dealer","status":"all","lastrecordtimestamp":"15","pagesize":"10","supplierid":this.Detail.userid,"customerid":0,"apptype": this.authenticationService.appType() }}
    this.supplierservice.supplierOrder(input)
    .subscribe(
    output => this.supplierOrderresult(output),
    error => {
      console.log("error in supplier order list");
      this.loaderService.display(false);
    });
  }
  supplierOrderresult(result) {
    console.log(result);
    if (result.result == "success") {
      this.SupplierOrderList =result.data;
     
    }
  }
  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    this.supplierOrderList();
    console.log(this.Detail);
    

  }

}
