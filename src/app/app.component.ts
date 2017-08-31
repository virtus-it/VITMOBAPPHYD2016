import { Component } from '@angular/core';
import { AuthenticationService } from '../app/login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authenticationService: AuthenticationService) { }
    title = 'app';
  
   
    logOut() {
        
     this.authenticationService.logout();
  }
    
    
}
