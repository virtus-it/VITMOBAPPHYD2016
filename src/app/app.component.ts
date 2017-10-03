import { Component } from '@angular/core';
import { AuthenticationService } from '../app/login/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(private authenticationService: AuthenticationService, public  _router : Router) { }
    title = 'app';
  location = this._router.url;
  isIn = false;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
    logOut() {
        
     this.authenticationService.logout();
  }
    
    
}
