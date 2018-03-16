import { Component, OnInit,Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoaderService } from '../login/loader.service';
import { CustomerService } from '../customer/customer.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  selector: 'app-delete-scheduled-order',
  templateUrl: './delete-scheduled-order.component.html',
  styleUrls: ['./delete-scheduled-order.component.css']
})
export class DeleteScheduledOrderComponent implements OnInit {

  constructor(private customerservice: CustomerService,private authenticationService: AuthenticationService, private loaderService: LoaderService ,public thisDialogRef: MdDialogRef<DeleteScheduledOrderComponent> , @Inject(MD_DIALOG_DATA)  public Detail: any,) { }

  //Delete scheduled order
  
  deleteScheduleOrder(){
    let input={ "product": {"scheid": this.Detail.id , "loginid": this.authenticationService.loggedInUserId() , "activate": "false","usertype": "dealer" ,"apptype": this.authenticationService.appType()}};
    //console.log(input);
    this.customerservice.deleteScheduledOrder(input)
    .subscribe(
    output => this.deleteScheduleOrderresult(output),
    error => {
      //console.log("error in deleting supplier");
    this.loaderService.display(false);
    });
 }
  
 deleteScheduleOrderresult(result) {
   //console.log(result);
   if (result.result == "success") {
   this.thisDialogRef.close('success');
   
   }
 }

 onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    

  }

}
