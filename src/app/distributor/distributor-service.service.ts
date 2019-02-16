import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class DistributorServiceService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authService: AuthenticationService, private httpClient: HttpClient) { }

  getAllDistributors(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getdistributorbydealerid', bodyString, options)
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


  // this is httpclient type call to check interceptor


  // getAllDistributors(input){
  //     let bodyString = JSON.stringify(input); // Stringify payload
  //     let headers = new Headers({ 'Content-Type': 'application/json' });
  //     // headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
  //     return this.httpClient.post(this.apiUrl + '/getdistributorbydealerid', bodyString );
  // }


  createPolygonDistributors(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('apptype', 'moya');// ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createpolygon', bodyString, options)
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
  updatePolygonDistributors(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/updatepolygon', bodyString, options)
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
  getpolygonByDistributor(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getpolygon', bodyString, options)
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
  getAllArea(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/getareasbypincode/' + input.userId + '/-1/' + input.appType + '', options)
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
  createDistributor(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createuser', bodyString, options)
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
  updateDistributor(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + '/user', bodyString, options)
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
  getDistbutorsProducts(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/products/' + input.userId + '/' + input.appType, options)
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
    return this.http.get(this.apiUrl + '/getorderbyid/' + input.appType + '/' + input.orderid + '/' + input.userId + '', options)
      .map(res => {
        let response = res.json();
        this.authService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authService.logout();
        }
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  forwardOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/forwardorder', bodyString, options)
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
  assingOrder(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/assignorder', bodyString, options)
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
  getAllSuppliers(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/supplierslist/' + input.loginid + '/' + input.appType + '/' + input.usertype, options)
      .map(res => {
        let response = res.json();
        this.authService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authService.logout();
        }
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  setStockdistributor(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/massignproduct', bodyString, options)
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
  getProductsList(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/getproductsbycustomerid/' + input.userid + '/' + input.delearId + '/' + input.apptype, options)
      .map(res => {
        let response = res.json();
        this.authService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authService.logout();
        }
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getFilteredPolygon(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/searchpolygon', bodyString, options)
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

  StockPoint(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/stockpoint', bodyString, options)
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

  getPoints(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/points', bodyString, options)
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


  useravailability(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/useravailability', bodyString, options)
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

  associateDistributorToSales(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeassociation', bodyString, options)
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

  raiseRequestProducts(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getproductsbydistributerid', bodyString, options)
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


  raiseReqByDistributor(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/mreqstockbydistributor', bodyString, options)
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


  confirmRequestByDistributor(input){ 
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changestockstatusbydistributor', bodyString, options)
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
  
  confirmStockRequestByDealer(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/mupdatestock', bodyString, options)
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



  getProductsForRaiseRequest(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/products/' + input.userid + '/' + input.apptype + '', options)
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

  associateCustomerToDistributor(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeassociation', bodyString, options)
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
