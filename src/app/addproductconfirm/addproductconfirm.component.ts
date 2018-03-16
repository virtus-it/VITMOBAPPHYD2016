import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import { AuthenticationService } from '../login/authentication.service';
import { AddProductDealerComponent } from '../add-product-dealer/add-product-dealer.component';
import { MdDialog } from '@angular/material';
import { AddEditProductDailogComponent } from'../add-edit-product-dailog/add-edit-product-dailog.component';



@Component({
  selector: 'app-addproductconfirm',
  templateUrl: './addproductconfirm.component.html',
  styleUrls: ['./addproductconfirm.component.css']
})
export class AddproductconfirmComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddproductconfirmComponent>, private authenticationService: AuthenticationService, private productService: ProductsService, private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog) { }





  dealerAddProductDialog(data) {
    let dialogRefSupplierOrderList = this.dialog.open(AddProductDealerComponent, {
        width: '700px',
        data: data
    });
    dialogRefSupplierOrderList.afterClosed().subscribe(result => {
        //console.log(`Dialog closed: ${result}`);
        if(result == "success"){
          this.thisDialogRef.close("success");
        }

    });
}





  DistributorAddProductDialog(data){
    let dialogRefSupplierOrderList = this.dialog.open(AddEditProductDailogComponent, {
      width: '700px',
      data: data
  });
  dialogRefSupplierOrderList.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if(result =="success"){
        this.thisDialogRef.close("success");
      }

  });

  }




  onCloseCancel(){
    this.thisDialogRef.close('Cancel');

  }

  ngOnInit() {
    //console.log(this.Details);
  }

}
