import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';
import { LoaderService } from '../login/loader.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-edit-quantity-dailog',
  templateUrl: './edit-quantity-dailog.component.html',
  styleUrls: ['./edit-quantity-dailog.component.css']
})
export class EditQuantityDailogComponent implements OnInit {
  quantity = { value: null };
  changeSlot = false;
  //Change time slot input
  changeTimeSlot: any = { "timeslot": "", date: null }
  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  disableSlot = false;
  todaysDate: any = "";
  newChange: any = '';
  hideTimeSlot = false;
  hours: any = "";
  expressAmount: any = "";

  editOrderInput = { emptyCans: 0 };
  showProductsList: boolean = false;
  productList = [];
  duplicate: boolean = false;
  createPreOrderInput: any = { "timeslot": "", date: null, productDetails: {}, };
  emptyCansKeyUp: boolean = false;
  emptyCanMessage: string = '';
  amount: any = 0;
  changedProductDetails = { 'servicecharges': 0, 'productcost': 0, expressdelivery: false, expressdeliverycharges: 0, 'productid': '', totalAmount: 0, productname: '', producttype: '' };
  expressCheck: boolean = false;
  expressDeliveryAmount = 0;
  totalAmountBeforeProducts = 0;
  emptyCansError: boolean = false;
  amountAfterProductsView = 0;
  emptyCansStatus: boolean = false;
  emptyCansMessaage: string = '';





  constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, private orderLandingService: OrderLandingService, public thisDialogRef: MdDialogRef<EditQuantityDailogComponent>, @Inject(MD_DIALOG_DATA) public orderDetails: any, public dialog: MdDialog, private loaderService: LoaderService) { }

  updateQuantity() {

    let date = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
    let datetime = date + " " + this.changeTimeSlot.timeslot;
    // this.loaderService.display(true);
    // if(this.orderDetails.productdetails.servicecharge === null){
    //   this.orderDetails.productdetails.servicecharge = 0;
    // }

    if (this.quantity.value < this.editOrderInput.emptyCans) {
      this.emptyCansError = true;
      this.emptyCansStatus = true;
      this.emptyCanMessage = 'Empty cans must be less than quantity';
    }
    else {
      this.emptyCansError = false;
    }

    let input = { "order": { "amt": 0, "total_amt": 0, "orderid": '', "loginid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "delivery_address": '', "quantity": 0, "excepted_time": '', "productid": '', "product_name": '', "product_type": '', "product_cost": 0, "expressdelivery": false, "servicecharges": 0, "slotdate": '', "delivery_locality": '', "delivery_buildingname": '', "emptycans": 0, "advance_amt": 0, expressdeliverycharges: 0 } }

    if (this.showProductsList == false && this.orderDetails.expressdelivery && this.orderDetails.expressdelivery == "true") {
      this.expressAmount = this.orderDetails.expressdeliverycharges;
    }
    else {
      this.expressAmount = 0;
    }

    if (this.orderDetails.expressdelivery === null) {
      this.expressCheck = false;
    }

    if (this.showProductsList == true) {
      this.expressAmount = this.amount;
    }
    // if(this.orderDetails.slotdate){
    //   this.orderDetails.slotdate = moment(this.orderDetails.slotdate).format('')
    // }
    if (this.showProductsList == false) {
      input = { "order": { "amt": this.orderDetails.bill_amount, "total_amt": this.orderDetails.bill_amount, "orderid": this.orderDetails.order_id, "loginid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "delivery_address": this.orderDetails.orderby_address, "quantity": this.quantity.value, "excepted_time": datetime, "productid": this.orderDetails.prod_id, "product_name": this.orderDetails.brandname, "product_type": this.orderDetails.prod_type, "product_cost": this.orderDetails.prod_cost, "expressdelivery": this.expressCheck, "servicecharges": ((this.orderDetails.servicecharges / this.orderDetails.quantity) * this.quantity.value), "slotdate": datetime, "delivery_locality": this.orderDetails.locality, "delivery_buildingname": this.orderDetails.buildingname, emptycans: this.editOrderInput.emptyCans, "advance_amt": (this.editOrderInput.emptyCans * 150), expressdeliverycharges: this.expressAmount } }
    }
    else {
      // no cans input
      input = { "order": { "amt": this.changedProductDetails.totalAmount, "total_amt": this.changedProductDetails.totalAmount, "orderid": this.orderDetails.order_id, "loginid": this.authenticationService.loggedInUserId(), "dealerid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType(), "delivery_address": this.orderDetails.orderby_address, "quantity": this.createPreOrderInput.productDetails.quantity, "excepted_time": datetime, "productid": this.changedProductDetails.productid, "product_name": this.changedProductDetails.productname, "product_type": this.changedProductDetails.producttype, "product_cost": this.changedProductDetails.productcost, "expressdelivery": this.changedProductDetails.expressdelivery, "servicecharges": this.changedProductDetails.servicecharges, "slotdate": this.changeTimeSlot.timeslot, "delivery_locality": this.orderDetails.locality, "delivery_buildingname": this.orderDetails.buildingname, "emptycans": this.createPreOrderInput.productDetails.emptycans, "advance_amt": (this.createPreOrderInput.productDetails.emptycans * 150), expressdeliverycharges: this.expressAmount } }
    }

    if (this.createPreOrderInput.productDetails.emptycans == 0) { // cust orders with empty cans so we dont charge him with anything

      delete input.order.emptycans;
      delete input.order.advance_amt;
    }


    AuthenticationService.showLog("Edit order input");
    AuthenticationService.showLog(JSON.stringify(input));
    console.log(input, 'cans input');
    if (this.emptyCansError == false) {
      this.orderLandingService.updateQuantity(input)
        .subscribe(
          output => this.updateQuantityResult(output),
          error => {
            //console.log("error in distrbutors");
            // this.loaderService.display(false);
          });

    }
  }
  updateQuantityResult(result) {
    AuthenticationService.showLog("Edit order output");
    AuthenticationService.showLog(result);
    // this.loaderService.display(false);
    if (result.result == 'success') {
      this.onCloseModal('success')

    }
  }
  onCloseModal(message) {
    this.thisDialogRef.close(message);
  }


  //   autoTimeSlot(){

  //     let hours = moment().format("HH");
  //     if(parseInt(hours) <= 8){
  // this.changeTimeSlot.timeslot = "9AM-1PM";
  // this.changeTimeSlot.date= new Date();
  // this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
  // this.disableSlot = false;


  //     }
  //     else if(parseInt(hours) <= 15){

  //       this.changeTimeSlot.date= new Date();
  //       this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
  //       this.changeTimeSlot.timeslot = "4PM-7PM";
  //       this.disableSlot = true;


  //     }
  //     else {
  //       this.changeTimeSlot.timeslot = "9AM-1PM";
  //       var date = new Date();
  //       this.changeTimeSlot.date = new Date(date.setDate(date.getDate() + 1));
  //       this.newChange = moment(this.changeTimeSlot.date).format('DD-MM-YYYY');
  //       this.disableSlot = false;
  //     }

  //   }

  // enableTime(value){
  //   //console.log(value);
  //   let newDate = moment(value).format('DD-MM-YYYY');
  //   if (this.newChange == newDate  ) {
  //     // this.autoTimeSlot();  
  //   }
  //   else{
  //     this.disableSlot =  false;
  //   }
  // }



  showSlot() {
    // this.autoTimeSlot();
    this.hideTimeSlot = true;
  }

  autoTimeSlotforHour() {
    this.hours = moment().format("HH");
    this.changeTimeSlot.date = new Date();
  }

  dateChanges(event) {
    let eventChanges = moment(event).format('DD-MM-YYYY');

    this.todaysDate = moment().format('DD-MM-YYYY');
    if (eventChanges != this.todaysDate) {
      this.hours = "6";
    }
    else {
      this.hours = moment().format("HH");
      this.changeTimeSlot.date = new Date();
    }
  }


  availableTimeSlot() {
    if (this.hours < 7) {
      this.changeTimeSlot.timeslot = '8AM-11AM'
    }
    else if (this.hours < 10) {
      this.changeTimeSlot.timeslot = "11AM-2PM";
    }
    else if (this.hours < 13) {
      this.changeTimeSlot.timeslot = "2PM-5PM";
    }
    else if (this.hours < 16) {
      this.changeTimeSlot.timeslot = "5PM-8PM";
    }

  }

  showProducts() {
    if (this.showProductsList) {
      this.showProductsList = false;
    }
    else {
      this.showProductsList = true;
      this.totalPriceAfterProductsView();
    }
    if (this.duplicate == false) {
      this.getProductsList();
    }
  }



  getProductsList() {
    this.loaderService.display(true);
    let input = { apptype: this.authenticationService.appType(), userid: this.orderDetails.order_by, delearId: this.orderDetails.orderto };
    if (this.orderDetails.orderto === null) {
      input.delearId = this.authenticationService.loggedInUserId();
    }
    this.distributorService.getProductsList(input)
      .subscribe(
        output => this.getProductsListResult(output),
        error => {
          //console.log("error in distrbutors");
          this.loaderService.display(false);
        });

  }
  getProductsListResult(result) {
    this.loaderService.display(false);
    //console.log("distributor products list", result);
    if (result.result == 'success') {
      this.duplicate = true;
      this.loaderService.display(false);
      let productListCopy = [];
      _.each(result.data.products, function (i, j) {
        let details: any = i;
        let customerProduct = _.find(result.data.customerproducts, function (e: any) { return e.productid == details.productid; });
        if (customerProduct) {
          productListCopy.push(customerProduct);
        }
        else {
          productListCopy.push(details);
        }
      });
      for (let details of productListCopy) {

        //console.log(result.data);

        let findproduct = _.find(this.productList, function (k, l) {
          let productDetails: any = k;
          return ((productDetails.brandName == details.brandname) && (productDetails.category == details.category));


        });

        if (findproduct) {
          details.quantity = "";
          details.expressdelivery = false;
          findproduct.data.push(details);
        }
        else {
          let value = { brandName: details.brandname, category: details.category, data: [] };
          details.quantity = "";
          details.expressdelivery = false;
          value.data.push(details);
          this.productList.push(value);
        }
      }
    }

  }

  // minOrderChanged(event){
  //   _.each(this.productList , function(i,j){
  //     let details: any = i;
  //     _.each(details.data , function(k , l){
  //       let detailData : any = k;
  //       detailData.quantity = '';
  //       detailData.emptycans = '';
  //     });
  //   });

  //   if(this.createPreOrderInput.productDetails.default_qty){
  //     this.createPreOrderInput.productDetails.quantity = this.createPreOrderInput.productDetails.default_qty;
  //   }
  //   else{
  //     this.createPreOrderInput.productDetails.quantity = this.createPreOrderInput.productDetails.minorderqty;
  //   }
  //   this.createPreOrderInput.productDetails.emptycans = 0;
  // }


  minOrderChanged(event, data) {
    //console.log(event);
    _.each(this.productList, function (i, j) {
      let details: any = i;
      _.each(i.data, function (k, l) {
        let detailData: any = k;
        detailData.quantity = "";
        detailData.emptycans = "";
        // detailData.expressdeliverycharges = "";
      })
    })

    if (this.createPreOrderInput.productDetails && this.createPreOrderInput.productDetails.default_qty) {
      this.createPreOrderInput.productDetails.quantity = this.createPreOrderInput.productDetails.default_qty;

    }

    if (!this.createPreOrderInput.productDetails.default_qty) {
      if (this.createPreOrderInput.productDetails.minorderqty == 0) {
        this.createPreOrderInput.productDetails.minorderqty = 1;
      }
      this.createPreOrderInput.productDetails.quantity = this.createPreOrderInput.productDetails.minorderqty;
      this.createPreOrderInput.productDetails.emptycans = this.editOrderInput.emptyCans;
    }
    this.changeQuantity(data);
    this.totalPriceAfterProductsView();

  }


  changeQuantity(data) {
    this.quantity.value = this.createPreOrderInput.productDetails.quantity;
    this.editOrderInput.emptyCans = this.createPreOrderInput.productDetails.emptycans;
    console.log(data, 'prod details');
    this.changedProductDetails.servicecharges = (data.servicecharge * this.createPreOrderInput.productDetails.quantity);
    this.changedProductDetails.productcost = data.pcost;
    this.changedProductDetails.productid = data.productid;
    this.changedProductDetails.totalAmount = (this.changedProductDetails.servicecharges + (this.changedProductDetails.productcost * this.createPreOrderInput.productDetails.quantity) + this.amount);
    this.changedProductDetails.productname = data.pname;
    this.changedProductDetails.producttype = data.ptype;
    if (this.expressCheck == true) {
      this.changedProductDetails.expressdelivery = true;
      this.changedProductDetails.expressdeliverycharges = this.amount;
    }
    else {
      this.changedProductDetails.expressdelivery = false;
      this.changedProductDetails.expressdeliverycharges = 0;
    }
    this.totalPricesBeforeProductsView();

    console.log(this.changedProductDetails, 'change quantity function');

  }

  decreaseQuantity(data) {

    if (data.quantity > 0) {
      data.quantity = data.quantity - 1;
    }
    this.changeQuantity(data);
    this.totalPriceAfterProductsView();


  }

  increaseQuantity(data) {
    if (data.quantity == '') {
      data.quantity = 0;
    }
    data.quantity = data.quantity + 1;
    this.changeQuantity(data);
    this.totalPriceAfterProductsView();
  }

  increaseEmptyCans(data) {
    if (data.emptycans == '') {
      data.emptycans = 0;
    }
    if (this.emptyCansKeyUp == false) {
      data.emptycans = data.emptycans + 1;
      this.emptyCansChange(data);
    }
    this.changeQuantity(data);
    this.totalPriceAfterProductsView();

  }

  deacreaseEmptyCans(data) {
    if (data.emptycans > 0) {
      data.emptycans = data.emptycans - 1;
      this.emptyCansChange(data);
    }
    this.changeQuantity(data);
    this.totalPriceAfterProductsView();
  }

  emptyCansChange(data) {
    console.log(data);
    let cases: string = "1";
    switch (cases) {
      case '1': {
        if (this.createPreOrderInput.productDetails.quantity >= data.emptycans) {
          this.emptyCanMessage = "";
          this.emptyCansKeyUp = false;
        }

      }
      case '2': {
        if (this.createPreOrderInput.productDetails.quantity < data.emptycans) {
          this.emptyCanMessage = "Empty cans must be less than quantity";
          this.emptyCansKeyUp = true;
        }
      }
      case '3': {
        if (this.createPreOrderInput.productDetails.quantity > data.emptycans) {
          this.emptyCanMessage = "";
          this.emptyCansKeyUp = false;
        }
      }
      default: {
        if (this.createPreOrderInput.productDetails.quantity >= data.emptycans) {
          this.emptyCanMessage = "";
          this.emptyCansKeyUp = false;
        }

      }
    }

    this.changeQuantity(data);
    this.totalPricesBeforeProductsView();
    this.totalPriceAfterProductsView();

  }

  expressDeliveryCharge(details, isChecked: boolean) {

    if (isChecked == true) {
      this.amount = details.expressdeliverycharges;
      this.expressCheck = true;
    }
    else {
      this.amount = 0;
      this.expressCheck = false;
    }

    this.totalPriceAfterProductsView();

  }
  // customTrackBy(index: number, obj: any): any {
  //   return index;
  // }

  changeQuantityEvent(event) {
    if (event) {
      this.totalAmountBeforeProducts = ((parseInt(event) * parseInt(this.orderDetails.prod_cost)) + ((this.orderDetails.servicecharges / this.orderDetails.quantity) * event) + this.expressDeliveryAmount + (this.editOrderInput.emptyCans * 150));
    }
  }

  onEmptyCansChange(event) {
    if (event) {

      this.totalAmountBeforeProducts = ((parseInt(this.quantity.value) * parseInt(this.orderDetails.prod_cost)) + ((this.orderDetails.servicecharges / this.orderDetails.quantity) * this.quantity.value) + this.expressDeliveryAmount) + (event * 150);
    }
  }

  totalPricesBeforeProductsView() {
    if (this.orderDetails.expressdelivery && this.orderDetails.expressdelivery == "true") {
      this.expressDeliveryAmount = this.orderDetails.expressdeliverycharges;
    }
    this.totalAmountBeforeProducts = ((parseInt(this.orderDetails.quantity) * parseInt(this.orderDetails.prod_cost)) + parseInt(this.orderDetails.servicecharges) + this.expressDeliveryAmount + (this.editOrderInput.emptyCans * 150));
  }

  onChangeQuantity(event) {
    if (event) {
      this.quantity.value = event;
      this.totalPriceAfterProductsView();
    }
  }

  totalPriceAfterProductsView() {
    this.amountAfterProductsView = (this.changedProductDetails.totalAmount + (this.createPreOrderInput.productDetails.emptycans * 150) + this.amount);
  }

  numberEvent(e: any) {
    // console.log(e);
    if (isNaN(e.key) || e.key == '') {
      e.preventDefault();
    }
  }

  ngOnInit() {
    this.quantity.value = this.orderDetails.quantity;
    this.editOrderInput.emptyCans = this.orderDetails.empty_cans;
    this.totalPricesBeforeProductsView();
    this.autoTimeSlotforHour();
    this.availableTimeSlot();
    console.log(this.orderDetails);
  }

}
