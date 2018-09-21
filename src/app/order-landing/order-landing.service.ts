import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../login/loader.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../login/authentication.service';

import * as io from 'socket.io-client';

@Injectable()
export class OrderLandingService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private loaderService: LoaderService, @Inject('App_URL') private appUrl: string, private authService: AuthenticationService) {

    this.socket = io.connect(this.appUrl);
    this.websitesocket = io.connect(this.apiUrl);
  }
  socket;
  websitesocket;
  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('orderSocket', (message) => {
        observer.next(message);
      });
    });
  }
  public getMessagesfromWebsite = () => {
    return Observable.create((observer) => {
      this.websitesocket.on('orderSocket', (message) => {
        observer.next(message);
      });
    });
  }
  getOrderList(input) {

    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/orderlistbystatus', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  updateQuantity(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/updateorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getOrderById(input) {

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/getorderbyid/' + input.root.apptype + '/' + input.root.orderid + '/' + input.root.userid, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // getUserDetails(input) {

  //   let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get(this.apiUrl + '/user/user/' + input.customerID + '/' + input.appType , options)
  //     .map((res: Response) => {        res.json()        console.log(  res.json()  , 'response');       if(res.json().data == 'token expired'){         this.authService.logout();       }     })
  //     .do(data => console.log('All: '))
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  getProductsByCustomerID(input) {

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/user/user/' + input.customerID + '/' + input.appType, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getProductsByDealrID(input) {

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/products/' + input.dealerID + '/' + input.appType + '/' + input.usertype, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  UpdateProductsQuantity(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/mupdateavaliablecansforcustomer', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getOrderByPaymentCycle(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getordersofpaymentcycle', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  updateOnHold(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/cancelorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  editOrderStatus(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/deliveredorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  sendMessage(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createmessageonorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getOrdersByfilter(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getorderlistbystatusfilters', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  updateOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/updateorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createPreOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/mcreateorder', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  AcceptOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeorderstatus', bodyString, options)
    .map(res => {
      let response = res.json();
      this.authService.sendRefreshedToken(res);
      if(response.data == 'token malformed'){
        this.authService.logout();
      }
      return res.json();
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
