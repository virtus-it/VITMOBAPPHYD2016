import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { OrderLandingService } from '../order-landing/order-landing.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { SupplierService } from '../supplier/supplier.service';
import { LoaderService } from '../login/loader.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-unknown-orders',
  templateUrl: './unknown-orders.component.html',
  styleUrls: ['./unknown-orders.component.css']
})
export class UnknownOrdersComponent implements OnInit {
  completeOrders: any;
  emailFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required]);

  globalFilterInput = { "order": { "pagesize": "30", "searchtype": "orderid", "userid": this.authenticationService.loggedInUserId(), "searchtext": "", "apptype": this.authenticationService.appType(), "last_orderid": "0", "loginid": this.authenticationService.loggedInUserId(), transtype: 'getorderssearch' } };

  messageInput = { "order": { "orderstatus": "Message", "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "orderid": "", "ispublic": "0", "customerid": "", "reason": "" } };

  customerInput: any = {
    User: {
      userid: '',
      dealerid: '',
      lastname: '',
      mobileno: '',
      loginid: this.authenticationService.loggedInUserId(),
      firstname: '',
      address: '',
      apptype: this.authenticationService.appType(),
      pwd: 'ce69ea9209'
    }
  };

  orderbyallMessages = [];

  page1 = true;
  page2 = false;
  messageError: any;
  constructor(private authenticationService: AuthenticationService, private distributorService: DistributorServiceService, private orderLandingService: OrderLandingService, private supplierservice: SupplierService, private loaderService: LoaderService, private router: Router, private productService: ProductsService, public thisDialogRef: MdDialogRef<UnknownOrdersComponent>,
    public dialog: MdDialog) { }

  closeChat() {
    this.messageInput.order.customerid = "";
    this.messageInput.order.orderid = "";
    this.messageInput.order.reason = "";
    this.page1 = !this.page1;
    this.orderbyallMessages = [];
  }
  openMessage(order) {
    this.messageInput.order.customerid = order.orderfrom;
    this.messageInput.order.orderid = order.orderid;
    this.page1 = !this.page1;
    this.orderbyallMessages = order.messages;
  }
  showInsert(order) {
    this.page2 = true;
    this.page1 = false;
    this.customerInput.User.userid = order.orderfrom;
    this.customerInput.User.firstname = '';
    this.customerInput.User.address = order.delivery_address;
    this.customerInput.User.mobileno = order.mobileno_alt;
    this.customerInput.User.dealerid = order.orderto;

  }
  insertUser() {
    if (!this.customerInput.User.userid) {
      return false;
    }
    if (!this.customerInput.User.dealerid) {
      return false;
    }
    if (!this.customerInput.User.firstname) {
      return false;
    }
    if (!this.customerInput.User.address) {
      return false;
    }
    if (!this.customerInput.User.mobileno) {
      return false;
    }
    var input = {
      "obj": this.customerInput.User,
      "query": "insert into tbl_userinfo (user_id,firstname,user_type,apptype,isappdownloaded,is_active,mobileno,address,pwd,epwd,superdealerid,createdby,createddate,user_modifieddate) select " + this.customerInput.User.userid + ",'" + this.customerInput.User.firstname + "','customer','moya','true','1','" + this.customerInput.User.mobileno + "','" + this.customerInput.User.address + "','ce69ea9209','ce69ea9209'," + this.customerInput.User.dealerid + "," + this.customerInput.User.dealerid + ",(select now()),(select now());"
    };
    this.orderLandingService.userInsertQuery(input).subscribe(res => {
      if (res && res.result == "success") {
        console.log(res.data);
        this.messageError = "record inserted successfully";
        alert('record inserted successfully');
      } else {
        if (res && res.data && res.data.detail)
          this.messageError = JSON.stringify(res.data.detail);
        else
          this.messageError = JSON.stringify(res);
      }
    }, error => {
      console.log(error);
    })

  }

  sendMessage() {
    if (!this.messageInput.order.reason) {
      return false;
    }
    console.log(this.messageInput);
    this.orderLandingService.sendMessage(this.messageInput)
      .subscribe(output => {
        console.log(output)
        if (output && output.result == "success") {
          alert("Message send");
          this.orderbyallMessages.push({
            "id": 0,
            "message": this.messageInput.order.reason,
            "userid": this.messageInput.order.customerid,
            "createddate": "now",
            "ispublic": 0
          })
        }

      }, error => {
        console.log("error in order details" + error);
      });
  }
  numberEvent(e: any) {
    // console.log(e);
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }
  }
  search() {
    if (!this.globalFilterInput.order.searchtext) {
      return false;
    }
    console.log(this.globalFilterInput);
    this.orderLandingService.getOrdersByfilter(this.globalFilterInput).subscribe(output => {
      if (output && output.data) {
        this.completeOrders = output.data;
        console.log(this.completeOrders);
      }
    },
      error => {
        console.log(error)
      }
    );
  }

  onCloseModal() {
    this.thisDialogRef.close('cancel');
  }
  showLog(order) {
    console.log(order);
  }
  ngOnInit() {
    console.log("CALL API");
    let input = { order: { userid: this.authenticationService.loggedInUserId(), priority: 289, pagesize: 30, last_orderid: null, apptype: this.authenticationService.appType(), createdthru: 'website', transtype: 'getorders' } };
    this.orderLandingService.getOrderList(input).subscribe(output => {
      if (output && output.data) {
        this.completeOrders = output.data;
        console.log(this.completeOrders);
      }
    },
      error => {
        console.log(error)
      }
    );
  }

}
