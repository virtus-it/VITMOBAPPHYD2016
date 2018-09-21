import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {





  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService) { }
  getProducts(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/products/' + input.userId + '/' + input.appType + '/' + this.authenticationService.userType(), options)
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
  getProductsCategory(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/productcategory/' + input.userId + '/' + input.userType + '/' + input.appType, options)
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
  getProductsByCategory(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getproductsbycategory', bodyString, options)
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
  createProduct(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createproduct', bodyString, options)
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
  updateProduct(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/product', bodyString, options)
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
  addStockDetails(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/maddstock', bodyString, options)
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
  getStockHistroy(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getsaleshistoryfilters', bodyString, options)
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
  setProductStatus(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/setproductstatus', bodyString, options)
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
  createCategory(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createcategory', bodyString, options)
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
  updateCategory(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/updatecategory', bodyString, options)
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

  setPrice(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/setcustomer_wise_productprice', bodyString, options)
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

  assignDealerProducts(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/massignproduct', bodyString, options)
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

  uploadImage(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/uploadimg', bodyString, options)
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

  updateUserOnImage(input) {
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
}
