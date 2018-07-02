import { Component, OnInit , Inject } from '@angular/core';
import { FollowUpService } from '../follow-up/follow-up.service';
import { MD_DIALOG_DATA , MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-promocode',
  templateUrl: './delete-promocode.component.html',
  styleUrls: ['./delete-promocode.component.css']
})
export class DeletePromocodeComponent implements OnInit {

  constructor(private followupService: FollowUpService,  @Inject(MD_DIALOG_DATA) public Detail: any ,public thisDialogRef: MdDialogRef<DeletePromocodeComponent>) { }

  delete(){
    let input = {"offer":{"transtype":"delete","id": this.Detail.offerid}};
    console.log(input);
    this.followupService.createpromocode(input)
    .subscribe(
    output => this.deletePromoCodeResult(output),
    error => {
      //console.log("error in customer");
    });
  }
  deletePromoCodeResult(result){
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
