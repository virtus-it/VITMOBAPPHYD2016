import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from '../login/authentication.service';

import {HttpRequest,HttpHandler,HttpEvent,  HttpInterceptor,HttpResponse,HttpErrorResponse} from "@angular/common/http";

// 

@Injectable()
export class authinterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req : HttpRequest<any> , next : HttpHandler) : Observable<HttpEvent<any>>{
        console.log('this is http interceptor');
        console.log(req);
        var token = this.authService.tokenSession;
        var auth_header = 'Bearer' +  token;
        const authRequest = req.clone({setHeaders : {Authorization : auth_header }});
        return next.handle(authRequest);



    }

    

   
    }