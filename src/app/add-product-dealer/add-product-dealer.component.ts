import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-add-product-dealer',
  templateUrl: './add-product-dealer.component.html',
  styleUrls: ['./add-product-dealer.component.css']
})
export class AddProductDealerComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddProductDealerComponent>,private authenticationService: AuthenticationService,private productService: ProductsService,private loaderService: LoaderService, ) { }
productsList=[];



  dealerAddProduct(){
    let input={"userId":this.authenticationService.loggedInUserId(),"appType":this.authenticationService.appType()};
    console.log(input);
    this.productService.getProducts(input)
      .subscribe(
      output => this.dealerAddProductResult(output),
      error => {
        console.log("error in dealer products");
        this.loaderService.display(false);
      });
  }
  dealerAddProductResult(result){
    console.log(result);
    if (result.result = 'success') {
      this.productsList = result.data;
  }
  }


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');

  }


  ngOnInit() {
    this.dealerAddProduct();

  }

}
