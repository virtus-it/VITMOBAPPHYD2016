import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { MdDialog } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { ProductsService } from '../products/products.service';
import * as _ from 'underscore';
@Component({

  templateUrl: './add-edit-product-dailog.component.html',
  styleUrls: ['./add-edit-product-dailog.component.css']
})
export class AddEditProductDailogComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public thisDialogRef: MdDialogRef<AddEditProductDailogComponent>, @Inject(MD_DIALOG_DATA) public Details: any, public dialog: MdDialog,private loaderService: LoaderService) { }


  ngOnInit() {
    console.log(this.Details);
  }

}
