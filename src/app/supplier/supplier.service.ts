import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../login/authentication.service';


@Injectable()
export class SupplierService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService) { }



  supplierList(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/supplierslist/' + input.userId + '/' + input.appType + '/' + input.usertype, options)
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

  createSupplier(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createuser', bodyString, options)
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

  updateSupplier(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/user', bodyString, options)
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

  supplierOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/ordersbyuserid', bodyString, options)
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

  deleteSupplier(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeuserstatus', bodyString, options)
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


  trackSupplier(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/tracking', bodyString, options)
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

