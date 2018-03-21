import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { CustomerService } from '../customer/customer.service';
@Component({
  selector: 'app-customer-make-inactive',
  templateUrl: './customer-make-inactive.component.html',
  styleUrls: ['./customer-make-inactive.component.css']
})
export class CustomerMakeInactiveComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<CustomerMakeInactiveComponent>,  @Inject(MD_DIALOG_DATA) public customerDetails: any, private customerService: CustomerService) { }
  refresh:any = "";

activateDeactivateCustomer(customer){
    let input={};
    if(customer.isactive == '0'){
    input={"User":{"TransType":"activate","userid":customer.userid,"user_type":"customer","devicetype":"","moyaversioncode":""}};
    }
    else{
  input={"User":{"TransType":"deactivate","userid":customer.userid,"user_type":"customer","devicetype":"","moyaversioncode":""}};
    }
    console.log(input);
    this.customerService.createCustomer(input)
    .subscribe(
    output => this.activateDeactivateCustomerResult(output),
    error => {
    });
}
activateDeactivateCustomerResult(result){
      if(result.result =='success'){  
        this.refresh = 'success';
        this.thisDialogRef.close(this.refresh);
      }
  }



  onCloseCancel(){
    this.thisDialogRef.close(this.refresh);
  }

  ngOnInit() {
    console.log(this.customerDetails);
  }

}



 