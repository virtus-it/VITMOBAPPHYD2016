import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';
import { LoaderService } from '../login/loader.service';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-add-stock-history',
  templateUrl: './add-stock-history.component.html',
  styleUrls: ['./add-stock-history.component.css']
})
export class AddStockHistoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private productService: ProductsService, public thisDialogRef: MdDialogRef<AddStockHistoryComponent>) { }
StockList=[];
  getStockHistroy() {
    let input = {
      "root": {
        "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "pid": "0", "areaid": "", "last_historyid": 100000, "pagesize": "100",
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
      this.StockList = result.data;
    }
  }
  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  ngOnInit() {
    this.getStockHistroy();
  }

}
