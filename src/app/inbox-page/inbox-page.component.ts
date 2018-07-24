import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../follow-up/follow-up.service';
import { AuthenticationService } from '../login/authentication.service';
import { LoaderService } from '../login/loader.service';


@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css']
})
export class InboxPageComponent implements OnInit {

  constructor( private followupService: FollowUpService, private authenticationService: AuthenticationService, private loaderService: LoaderService) { }
  AllMessages:any = [];
  noMessages = false;




  getAllMessages(){
    let input = {"root":{"loginid":this.authenticationService.loggedInUserId(),"fromdate":null,"todate": null,"transtype":"getallmessages" , "apptype" :this.authenticationService.appType()}};
    this.followupService.getAllMessages(input)
      .subscribe(
      output => this.getAllMessagesResult(output),
      error => {
        this.loaderService.display(false);
        //console.log("error in distrbutors");
      });
  }
  getAllMessagesResult(result){
    if(result.result == 'success'){
      this.AllMessages= result.data;
      console.log(this.AllMessages , 'result');
    }
    else{
      this.noMessages = true;
    }
  }


  ngOnInit() {
    this.getAllMessages();
  }

}
