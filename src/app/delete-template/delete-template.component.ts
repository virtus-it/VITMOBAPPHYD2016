import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { FollowUpService } from '../follow-up/follow-up.service';
import { LoaderService } from '../login/loader.service';
import { AuthenticationService } from '../login/authentication.service';
import { ProductsService } from '../products/products.service';


@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.css']
})
export class DeleteTemplateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<DeleteTemplateComponent> ,  @Inject(MD_DIALOG_DATA)  public Detail: any , private followupService: FollowUpService, private authenticationService: AuthenticationService , private loaderService: LoaderService ,  private productService: ProductsService ) { }


  deleteTemplate(){
    let input = {"User":{"transtype":"delete","id":this.Detail.id}};
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.deleteTemplateResult(output),
    error => {
      //console.log("error in distrbutors");
      this.loaderService.display(false);
    });
  }
  deleteTemplateResult(result){
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }

  deleteProduct(){
    let input = {"product": {"transtype":"delete","pid": this.Detail.productid ,  userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType() , "isactive": 0 } };
    console.log(input);
    this.productService.createProduct(input)
    .subscribe(
    output => this.deleteProductResult(output),
    error => {
      //console.log("error in distrbutors");
    });
  }
  deleteProductResult(result){
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }


  delete(){
    if(this.Detail.productid){
      this.deleteProduct();
    }
    else if(this.Detail.type == 'deleteNotificationTemplate'){
      this.deleteNotificationTemplate();
    }
    else{
      this.deleteTemplate();

    }
  }

  deleteNotificationTemplate(){
    let input = {"User":{"transtype":"delete" , "id":this.Detail.data.id}};
    console.log(input);
    this.followupService.followUpTemplate(input)
    .subscribe(
    output => this.deleteNotificationTemplateResult(output),
    error => {
      //console.log("error in distrbutors");
      this.loaderService.display(false);
    });
  }
  deleteNotificationTemplateResult(result){
if(result.result == 'success'){
  this.thisDialogRef.close('success');
}
  }


  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Detail);
  }

}
