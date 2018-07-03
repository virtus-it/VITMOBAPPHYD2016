import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-addstock-product',
  templateUrl: './addstock-product.component.html',
  styleUrls: ['./addstock-product.component.css']
})
export class AddstockProductComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<AddstockProductComponent>, @Inject(MD_DIALOG_DATA) public Detail: any,  private authenticationService: AuthenticationService,private productsService:ProductsService) { }
StockInput = { invoiceDate:new Date(), stock:"", itemCost:this.Detail.pcost, returnemptycans:"0"};
validateMessage = '';

onCloseCancel() {
  this.thisDialogRef.close('Cancel');
}


addStockDetails(){
  let input = [{"product":{"category":this.Detail.data.data[0].category, "categoryid": this.Detail.data.data[0].categoryid , "brandname": this.Detail.data.data[0].brandname , "producttype": this.Detail.data.data[0].ptype ,   
  "stock":this.StockInput.stock, "returnemptycans":this.StockInput.returnemptycans,
  "loginid": this.Detail.distributorId ,"invoicenumber":Math.floor(1000 + Math.random() * 9000).toString(),"invoicedate":"","itemcost":this.StockInput.itemCost,"apptype":this.authenticationService.appType() , }}];
  if (this.StockInput.invoiceDate) {
    input[0].product.invoicedate= moment(this.StockInput.invoiceDate).format('YYYY-MM-DD');
  }
  //console.log(input);
  if(this.addstockValidation()){
  this.productsService.addStockDetails(input)
  .subscribe(
  output => this.addStockDetailsResult(output),
  error => {
    //console.log("error in distrbutors");
  });
}
}
addStockDetailsResult(result){

//console.log(result);
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
}



addstockValidation(){

  var validate : string = '1';
  switch(validate){
      case "1" : {
        if(!this.StockInput.stock){
          this.validateMessage = 'Enter stock';
        }
  }
      case '2' : {
        if(!this.StockInput.itemCost){
          this.validateMessage = 'Enter item cost';
        }   
  }
    case '3' : {
      if(this.StockInput.stock && this.StockInput.itemCost ){
        this.validateMessage = '';
        return true;
      }
    }
}




}
  ngOnInit() {
    console.log(this.Detail);
  }


}
