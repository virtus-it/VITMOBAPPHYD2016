import { Component, OnInit, Inject} from '@angular/core';
import { MdDialog } from '@angular/material';
import {AddSupplierDailogComponent} from '../add-supplier-dailog/add-supplier-dailog.component';
import {SupplierOrderListComponent} from '../supplier-order-list/supplier-order-list.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { AuthenticationService } from '../login/authentication.service';
import {DeletesupplierComponent } from '../deletesupplier/deletesupplier.component'
import { LoaderService } from '../login/loader.service';
import { SupplierService} from './supplier.service';
import * as _ from 'underscore';
@Component({

  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public dialog: MdDialog, private loaderService: LoaderService, private supplierservice :SupplierService) { }
  showFilterDialog = false;
  supplierList = [];
  searchSupplierTerm= "" ;
  SupplierListCopy = [];


 
//ts file for dialog box for addinng a supplier

  addSupplier(){
    let dialogRefAddSupplier = this.dialog.open(AddSupplierDailogComponent, {
      width: '700px',
      data: ''

  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
      if(result == 'success'){
        this.getSupplierList();

      }
  });
  }
// ts file for dialog box for editing the same supplier details

  editSupplier(Details){
    let dialogRefAddSupplier = this.dialog.open(AddSupplierDailogComponent, {
      width: '700px',
      data: Details

  });
  dialogRefAddSupplier.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
      if(result == 'success'){
        this.getSupplierList();

      }
  });
  }

//opening dailog box for supplier order
supplierOrdersList(data){
  let formatteddata:any = {"type":"supplierOrder", "data":data };
    let dialogRefSupplierOrderList = this.dialog.open(SupplierOrderListComponent, {
      width: '70%',
      data: formatteddata
  });
  dialogRefSupplierOrderList.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      
  });
  }

 

//Get supplier list 
  getSupplierList(){
    let input = {  "userId":this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
    this.supplierservice.supplierList(input)
    .subscribe(
    output => this.getSupplierListResult(output),
    error => {
      //console.log("error in feedbacklist");
      this.loaderService.display(false);
    });
  }
  getSupplierListResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.supplierList =result.data;
      this.SupplierListCopy=result.data;
     
    }
  }


  //map for assigning area
  
  openMapDialog(data) {
    let dialogRef = this.dialog.open(MapDialogComponent, {
       width: '90%',
        data: data
    });
    dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
    });
}

//Delete supplier

deleteSupplier(data){
  let dialogRefdeleteSupplier=this.dialog.open(DeletesupplierComponent, {
    width: '700px',
    data: data

});
dialogRefdeleteSupplier.afterClosed().subscribe(result => {
    //console.log(`Dialog closed: ${result}`);
    if(result == 'success'){
      this.getSupplierList();

    }
});
}


//search supplier

searchSupplier() {
  let term = this.searchSupplierTerm;
  if (term) {
    this.supplierList = this.SupplierListCopy.filter(function (e) {
        return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0
     
    });
  }
  else {
    this.supplierList = this.SupplierListCopy;
  }
}

  filterToggle(){
    this.showFilterDialog = !this.showFilterDialog;
  }
  ngOnInit() {
    this.getSupplierList();
  }
}
