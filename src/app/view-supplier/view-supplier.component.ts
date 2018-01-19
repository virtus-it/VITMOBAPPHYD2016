import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';
import { SupplierService} from '../supplier/supplier.service';
import { MdDialog } from '@angular/material';
import {DeletesupplierComponent } from '../deletesupplier/deletesupplier.component';
import {AddSupplierDailogComponent} from '../add-supplier-dailog/add-supplier-dailog.component';
import {SupplierOrderListComponent} from '../supplier-order-list/supplier-order-list.component';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent implements OnInit {

  constructor(public dialog: MdDialog,public thisDialogRef: MdDialogRef<ViewSupplierComponent>,private authenticationService: AuthenticationService, @Inject(MD_DIALOG_DATA) public Detail: any, private supplierservice :SupplierService, private loaderService: LoaderService,) { }


  supplierList: any =[];


  //Getting suppliers list
  SupplierList(){
    let input={"userId":this.Detail.userid,"appType":this.authenticationService.appType()};
    this.supplierservice.supplierList(input)
    .subscribe(
    output => this.getSupplierListResult(output),
    error => {
      console.log("error in supplier list");
      this.loaderService.display(false);
    });
  }
  getSupplierListResult(result) {
    console.log(result);
    if (result.result == "success") {
      this.supplierList =result.data;
    }
  }


  //Orders of supplier
  supplierOrdersList(data){
    let formatteddata: any = { "type": "supplierOrder", "data": data };
    let dialogRefSupplierOrderList = this.dialog.open(SupplierOrderListComponent, {
      width: '95%',
      data: formatteddata
  });
  dialogRefSupplierOrderList.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      
  });

  }


  //Edit supplier details
  editSupplier(data){
    let dialogRefAddSupplier = this.dialog.open(AddSupplierDailogComponent, {
      width: '700px',
      data: data

  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result =='success'){
        this.SupplierList();
      }

  });
}


  //Delete supplier details
  deleteSupplier(data){
    let dialogRefdeleteSupplier=this.dialog.open(DeletesupplierComponent, {
      width: '700px',
      data: data
  
  });
  dialogRefdeleteSupplier.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result =='success'){
        this.SupplierList();
      }

  
      });
    }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
    this.SupplierList();
  }

}
