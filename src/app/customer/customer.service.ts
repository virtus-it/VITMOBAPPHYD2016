import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';

@Injectable()
export class CustomerService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService) { }
  getCustomerById(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/user/user/' + input.userid + '/' + input.appType, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  tokenGenerate(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:5000/api/login', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  verifyTokenDetails(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:5000/api/posts', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  createCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createuser', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  updateCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/user', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getCustomerList(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json(
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/customers/' + input.userId + '/' + input.lastId + '/' + input.appType + '/' + input.userType + '/' + input.transtype, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



  // createAuthorizationHeader(headers: Headers) {
  //   if (environment.keycloak) {
  //     KeyCloakService.getToken();
  //     let Token = KeyCloakService.auth.details.token;
  //     headers.append('Authorization', 'Bearer ' + Token);
  //   }
  //   else {
  //     headers.append('Authorization', this.CurrentSession.data.token);
  //   }
  //   headers.append('Content-Type', 'application/json');
  // }
  //   let headers = new Headers();
  // this.createAuthorizationHeader(headers);



  searchCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/searchcustomer', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getDownloadedFile(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/download_customers', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  createSchedule(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createscheduler', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getFile(path: string): Observable<Blob> {
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });

    return this.http.get(this.apiUrl + '/modules/uploads/' + path, options)
      .map((response: Response) => <Blob>response.blob())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPrintFile(path: string): Observable<Blob> {
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });

    return this.http.get(this.apiUrl + path, options)
      .map((response: Response) => <Blob>response.blob())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  viewScheduleOrders(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/getschedules/' + input.userId + '/' + input.appType + '/' + input.userType + '/' + input.dealerid, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateScheduleOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/scheduler', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteScheduledOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeschedulestatus', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  ScheduleList(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getallschedules', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authenticationService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}




    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('X-apptype', 'true');
    // headers.append('Access-Control-Allow-Headers : X-apptype')