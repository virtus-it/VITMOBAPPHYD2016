﻿import { Component,OnInit  } from '@angular/core';
import { AuthenticationService } from '../app/login/authentication.service';
import {Router} from '@angular/router';
import { LoaderService } from './login/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(public authenticationService: AuthenticationService, public  _router : Router,private loaderService: LoaderService) { }
    title = 'app';
  showLoader: boolean;
  location = this._router.url;
  isSuperDealer = this.authenticationService.getSupperDelear();
  
    logOut() {
        
     this.authenticationService.logout();
  }
  ngOnInit() {

    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
    console.log(this.authenticationService.dashBoardDetails);
  
}
    
    
}
