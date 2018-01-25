import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-add-stock-history',
  templateUrl: './add-stock-history.component.html',
  styleUrls: ['./add-stock-history.component.css']
})
export class AddStockHistoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private productService: ProductsService, public thisDialogRef: MdDialogRef<AddStockHistoryComponent>,@Inject(MD_DIALOG_DATA) public Detail: any) { }
StockList=[];
noRecord=false;
  getStockHistroy() {
    let input = {
      "root": {
        "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "pid": this.Detail.productid, "areaid": "", "last_historyid": 100000, "pagesize": "1000",
        "fromdate": null, "todate": null, "apptype": this.authenticationService.appType()
      }
    };
    this.productService.getStockHistroy(input)
      .subscribe(
      output => this.getStockHistroyResult(output),
      error => {
        console.log("error in stock histroy");

      });
  }
  getStockHistroyResult(result) {
    console.log(result);
    if(result.result == 'success'){
      this.noRecord=false;
      this.StockList = result.data;
    }
    else{
      this.StockList=[];
      this.noRecord=true;
    }
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
   // console.log(this.Detail);
    this.getStockHistroy();
  }

}
