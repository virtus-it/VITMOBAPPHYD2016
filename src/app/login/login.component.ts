import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginDetails: any = {};

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit() {
    }
    login() {

        this.authenticationService.login(this.loginDetails.username, this.loginDetails.password)
            .subscribe(
            output => this.loginResult(output),
            error => {
                console.log("Logged in falied");
            });
    }
    loginResult(data) {
        if (data.data.user) {
            console.log("Logged in and should navigate to diifrent page");
            localStorage.setItem('currentUser', JSON.stringify(data.data.user));
            this.authenticationService.CurrentSession = JSON.parse(localStorage.getItem('currentUser'));
            this.router.navigate(['/distributor']);
            
        }
    }
}
