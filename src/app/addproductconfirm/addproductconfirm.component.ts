import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import { AuthenticationService } from '../login/authentication.service';
import { AddProductDealerComponent } from '../add-product-dealer/add-product-dealer.component';
import { MdDialog } from '@angular/material';
import { AddEditProductDailogComponent } from'../add-edit-product-dailog/add-edit-product-dailog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';



@Component({
  selector: 'app-addproductconfirm',
  templateUrl: './addproductconfirm.component.html',
  styleUrls: ['./addproductconfirm.component.css']
})
export class AddproductconfirmComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddproductconfirmComponent>, private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, private productService: ProductsService, private loaderService: LoaderService,  @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog) { }

  distributorId = "";
  listOfProducts : any = [];



  dealerAddProductDialog(data , distProducts) {
    let formattedData = {data:data , distProducts : distProducts}
    let dialogRefSupplierOrderList = this.dialog.open(AddProductDealerComponent, {
        width: '500px',
        data: formattedData
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

  getProducts(distributorDetails){
    this.loaderService.display(true);
    console.log(distributorDetails);
    if(distributorDetails.user_id){
      this.distributorId = distributorDetails.user_id;
     }
     else if(distributorDetails.userid){
     this.distributorId = distributorDetails.userid;
     }
  let input = {userId: this.distributorId, appType: this.authenticationService.appType() };
    console.log(input);
    this.distributorService.getDistbutorsProducts(input)
    .subscribe(
    output => this.getProductsResult(output),
    error => {
        //console.log("Logged in falied");
        this.loaderService.display(false);
    });
  
  }
  
  getProductsResult(output) {
    this.loaderService.display(false);
    if(output.result == 'success'){
      this.listOfProducts = output.data;
    }
    }






  onCloseCancel(){
    this.thisDialogRef.close('Cancel');

  }

  ngOnInit() {
    this.getProducts(this.Details);
    console.log(this.Details);
  }

}
