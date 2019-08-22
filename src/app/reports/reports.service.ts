import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class ReportsService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService) { }
  searchReports(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getReports', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  downloadReports(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/download_orderlist_browser', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getcustomerbydelearid', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  raiseInvoice(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/raiseinvoice', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  printInvoice(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/printinvoice', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  invoiceHistory(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/invoicehistory', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  stockRequests(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getstockrequests', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  changeAssociation(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeassociation', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
