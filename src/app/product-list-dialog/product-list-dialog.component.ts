import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { AddEditProductDailogComponent } from '../add-edit-product-dailog/add-edit-product-dailog.component';
import { LoaderService } from '../login/loader.service';
import { MdDialog } from '@angular/material';
@Component({
  selector: 'app-product-list-dialog',
  templateUrl: './product-list-dialog.component.html',
  styleUrls: ['./product-list-dialog.component.css']
})
export class ProductListDialogComponent implements OnInit {
  listOfProducts:any[];
  constructor(public thisDialogRef: MdDialogRef<ProductListDialogComponent>, public dialog: MdDialog, @Inject(MD_DIALOG_DATA) public distributorDetails: any,private distributorService: DistributorServiceService, private authenticationService: AuthenticationService,private loaderService: LoaderService) { }

  getProducts(distributorDetails){
  this.loaderService.display(true);
  let distributorId = '';
  if(distributorDetails.user_id){
   distributorId = distributorDetails.user_id;
  }
  else if(distributorDetails.userid){
  distributorId = distributorDetails.userid;
  }
  this.distributorService.getDistbutorsProducts(distributorId)
  .subscribe(
  output => this.getProductsResult(output),
  error => {
      console.log("Logged in falied");
      this.loaderService.display(false);
  });

}


getProductsResult(output) {
  this.loaderService.display(false);
  if(output.result == 'success'){
    this.listOfProducts = output.data;
  }
  }


  editProduct(data) {
    let dialogRefAddProduct = this.dialog.open(AddEditProductDailogComponent, {
  
      width: '700px',
      data: data
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result == 'success') {
        this.getProducts(this.distributorDetails);
        
      }
  
    });
  
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
}
  ngOnInit() {
    this.getProducts(this.distributorDetails);
  }

}
