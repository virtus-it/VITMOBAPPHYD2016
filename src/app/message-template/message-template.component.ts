import { Component, OnInit , Inject} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css']
})
export class MessageTemplateComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<MessageTemplateComponent> ,  @Inject(MD_DIALOG_DATA) public Details: any) { }



  onCloseModal(){
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
    console.log(this.Details);
  }

}
