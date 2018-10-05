import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
  loggedIn = false;
  isSuperDelear = true;
  salesLogin = true;
  // manufacturerLogin = true;
  customerCareLogin = true;
  salesTeamLogin:any = true;
  distributorLogin  = true;
  CurrentSession: any = {};
  dashBoardDetails: any = {};
  polygons: any = {};
  stockpoints: any = {};
  distributors: any = [];
  suppliers = [];
  hideData: boolean = false;
  sales: any = {};
  manufacturer: any = {};
  tokenSession:any = {};
  logoutOnExpiry:any = true;
  refreshToken = {};

  constructor(
    private router: Router,
    private http: Http,
    @Inject('API_URL') private apiUrl: string
  ) {
    this.loggedIn = !!localStorage.getItem('currentUser');
    this.CurrentSession = JSON.parse(localStorage.getItem('currentUser'));
    this.isSuperDelear = this.getSupperDelear();
    this.dashBoardDetails = JSON.parse(
      localStorage.getItem('dashboardDetails')
    );
    this.polygons = JSON.parse(localStorage.getItem('polygons'));
    this.stockpoints = JSON.parse(localStorage.getItem('stockpoints'));
    this.distributors = JSON.parse(localStorage.getItem('distributors'));
    this.suppliers = JSON.parse(localStorage.getItem('suppliers'));
    this.tokenSession = localStorage.getItem('token');
    //  this.sales = JSON.parse(localStorage.getItem('currentUser')).USERTYPE;
    //  this.manufacturer = JSON.parse(localStorage.getItem('currentUser')).USERTYPE;
    this.salesLogin = this.newSalesFunction();
    this.customerCareLogin = this.customerCareLoginFunction()
    this.salesTeamLogin = this.salesTeamLoginFunction();
    this.distributorLogin = this.distributorLoginFunction();
  }
  login(username: string, password: string) {
    let bodyString = JSON.stringify({userName: username,userPwd: password,apptype: 'moya'}); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON 
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/weblogin', bodyString, options)
      .map((res: Response) => {
        this.loggedIn = true;
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  newSalesFunction = function() {
    try {
      if (
        this.CurrentSession.issuperdealer == 'false' &&
        (this.CurrentSession.USERTYPE == 'manufacturer' ||
          this.CurrentSession.USERTYPE == 'sales')
      ) {
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      return false;
    }
  };

  customerCareLoginFunction = function() {
    try {
      if(this.CurrentSession.issuperdealer == 'false' && (this.CurrentSession.USERTYPE == 'customercare')){
      return true;
    }
    else{
      return false;
    }
    }
    catch(ex){
      return false;
    }
  }

  salesTeamLoginFunction = function() {
    try {
      if(this.CurrentSession.issuperdealer == 'false' && (this.CurrentSession.USERTYPE == 'salesteam')){
      return true;
    }
    else{
      return false;
    }
    }
    catch(ex){
      return false;
    }
  }

  distributorLoginFunction = function(){
    try{
      if(this.CurrentSession.issuperdealer == 'false' && (this.CurrentSession.USERTYPE == 'dealer')) {
        return true;
      }
      else{
        return false;
      }
    }
    catch(ex){
      return false;
    }
  }

  getDashboardDetails(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.apiUrl + '/dashboard', bodyString, options)
      .map(res => {
        let response = res.json();
        this.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  static showLog(value) {
    console.log(value);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.CurrentSession = {};
    this.router.navigate(['/login']);
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  loggedInUserId = function() {
    try {
      if (this.CurrentSession.userid) {
        return JSON.parse(this.CurrentSession.userid);
      } else {
        return 0;
      }
    } catch (ex) {
      return 0;
    }
  };
  superDelearId = function() {
    try {
      if (this.CurrentSession.superdealerid) {
        return JSON.parse(this.CurrentSession.superdealerid);
      } else {
        return 0;
      }
    } catch (ex) {
      return 0;
    }
  };

  superDealerLoginId = function(){
    try {
      if (this.CurrentSession.userid && this.CurrentSession.issuperdealer == 'true') {
        return JSON.parse(this.CurrentSession.userid);
      } else {
        return 0;
      }
    } catch (ex) {
      return 0;
    }
  };


  numberEvent(e:any){
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }
  }

  //     salesFunction = function () {
  //         try {
  //             if(this.currentUser){
  //                return JSON.parse(this.currentUser).USERTYPE;
  //             }
  //             else{
  //                 return 0;
  //             }

  //         }
  //     catch(ex){
  //         return 0;
  //     }
  // };

  // manufacturerFunction = function () {
  //     try {
  //         if(this.currentUser){
  //            return JSON.parse(this.currentUser).USERTYPE;
  //         }
  //         else{
  //             return 0;
  //         }

  //     }
  // catch(ex){
  //     return 0;
  // }
  // };

  appType = function() {
    try {
      if (this.CurrentSession.apptype) {
        return this.CurrentSession.apptype.toString();
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };
  dealerNo = function() {
    try {
      if (this.CurrentSession.mobileno) {
        return this.CurrentSession.mobileno.toString();
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };
  userFullName = function() {
    try {
      if (this.CurrentSession.first_name) {
        let fullName =
          this.CurrentSession.first_name + this.CurrentSession.last_name;
        return fullName.toString();
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };
  userType = function() {
    try {
      if (this.CurrentSession.USERTYPE) {
        return this.CurrentSession.USERTYPE.toString();
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };
  getSupperDelear = function() {
    try {
      if (this.CurrentSession.issuperdealer == 'true') {
        return true;
      } else {
        return false;
      }
    } catch (ex) {
      return false;
    }
  };

  getPolygons = function() {
    try {
      if (this.polygons) {
        return this.polygons;
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };

  getStockpoints = function() {
    try {
      if (this.stockpoints) {
        return this.stockpoints;
      } else {
        return '';
      }
    } catch (ex) {
      return '';
    }
  };

  getDistributors = function() {
    try {
      if (this.distributors) {
        return this.distributors;
      } else {
        return '';
      }
    } catch (ex) {
      return false;
    }
  };

  getSuppliers = function() {
    try {
      if (this.suppliers) {
        return this.suppliers;
      } else {
        return '';
      }
    } catch (ex) {
      return false;
    }
  };

  sendRefreshedToken(data){
    var data = data.headers.get('Authorization');
      if(data){
      localStorage.removeItem('token');
      localStorage.setItem('token' , data);
      this.tokenSession = localStorage.getItem('token');
      }
  }


  // appendHeaders(){
  //   let headers = new Headers({});
  //   headers.append('Authorization', 'Bearer ' + this.tokenSession);
  //   return headers;
  // }
}

// {
//                 // login successful if there's a jwt token in the response
//                 let resData = response.json();
//                 if (resData && resData.data.user) {
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     localStorage.setItem('currentUser', JSON.stringify(resData.data.user));
//                 }
//             }
