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
    let input = {};
    if(this.Detail.type == 'distributorspage'){
      input = {
        "root": {
          "userid": this.Detail.distributorId, "usertype": this.authenticationService.userType(), "category":this.Detail.data.category, "categoryid": this.Detail.data.data[0].categoryid  ,  "areaid": "", "last_historyid": 100000, "pagesize": "1000",
          "fromdate": null, "todate": null, "apptype": this.authenticationService.appType()
        }
      };
    }
    else{
    input = {
      "root": {
        "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(),"category":this.Detail.data[0].category, "categoryid": this.Detail.data[0].categoryid  , "areaid": "", "last_historyid": 100000, "pagesize": "1000",
        "fromdate": null, "todate": null, "apptype": this.authenticationService.appType()
      }
    };
  }
    console.log(input);
    this.productService.getStockHistroy(input)
      .subscribe(
      output => this.getStockHistroyResult(output),
      error => {
        //console.log("error in stock histroy");

      });
  }
  getStockHistroyResult(result) {
    //console.log(result);
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
   console.log(this.Detail);
    this.getStockHistroy();
  }

}
