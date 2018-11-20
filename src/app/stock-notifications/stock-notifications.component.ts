import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import * as _ from 'underscore';
import { AgmCoreModule, GoogleMapsAPIWrapper, LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MdDialog } from '@angular/material';
import { RaiseRequestDetailDailogComponent } from '../raise-request-detail-dailog/raise-request-detail-dailog.component';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import * as moment from 'moment';


declare var google: any;

interface marker {
  lat: any;
  lng: any;
  label?: string;
  icon?: string;
}


@Component({
  selector: 'app-stock-notifications',
  templateUrl: './stock-notifications.component.html',
  styleUrls: ['./stock-notifications.component.css']
})
export class StockNotificationsComponent implements OnInit {
  allUsersCtrl: FormControl;
  filteredUsers: Observable<any[]>;

  allDistributorsCtrl: FormControl;
  filteredDistributors: Observable<any[]>;

  allCategoriesCtrl: FormControl;
  filteredCategories: Observable<any>;

  lat: number = 17.385;
  lng: number = 78.4867;
  zoom: number = 12;

  constructor(private authenticationService: AuthenticationService, private reportsService: ReportsService, public gMaps: GoogleMapsAPIWrapper, public dialog: MdDialog, private distributorService: DistributorServiceService, private productService: ProductsService) {
    this.allUsersCtrl = new FormControl();
    this.filteredUsers = this.allUsersCtrl.valueChanges
      .startWith(null)
      .map(users => users ? this.findUsers(users) : this.allUsers.slice());

    this.allDistributorsCtrl = new FormControl();
    this.filteredDistributors = this.allDistributorsCtrl.valueChanges
      .startWith(null)
      .map(distributors => distributors ? this.findDistributors(distributors) : this.allDistributors.slice());

    this.allCategoriesCtrl = new FormControl();
    this.filteredCategories = this.allCategoriesCtrl.valueChanges
      .startWith(null)
      .map(category => category ? this.findCategory(category) : this.allCategories.slice());

  }


  allStockRequests: any = [];
  panelView: string = 'all';
  tabPanelView = 'all';
  pageView = 'grid';
  markers: any = [
    {
      lat: '',
      lng: ''
    }
  ];
  stockPointMarkers: any = [];
  stockFilter: any = { filterType: 'createdby', filterValue: '' };
  allUsers: any = [];
  allDistributors = [];
  allCategories = [];
  userid: any = '';
  userName: any = '';
  categoryName: any = '';
  categoryId: any = '';
  distributorName: any = '';
  distributorId: any = '';
  toDate: any = null;
  fromDate: any = null;






  getStockRequests() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "dealerid": this.authenticationService.superDelearId(), "pid": "0", "lastrecord": "0", "viewtype": "allnotification", "pagesize": "10", "apptype": this.authenticationService.appType() } }
    this.reportsService.stockRequests(input)
      .subscribe(
        output => this.getStockRequestsResult(output),
        error => {
          //console.log("error in feedbacklist");
        });
  }
  getStockRequestsResult(result) {
    if (result.result == 'success') {
      this.allStockRequests = result.data;
      if (this.tabPanelView == 'pending') {
        this.showPendingRequests();
      }
      else if (this.tabPanelView == 'confirmed') {
        this.showConfirmedRequests();
      }
      else if (this.tabPanelView == 'all') {
        this.getPointsOnMap();
      }
    }


  }

  showTabPanel(panelView) {
    if (panelView == 'all') {
      this.tabPanelView = 'all';
      this.getStockRequests();
    }
    else if (panelView == 'pending') {
      this.tabPanelView = 'pending';
      this.getStockRequests();
    }
    else if (panelView == 'confirmed') {
      this.tabPanelView = 'confirmed';
      this.getStockRequests();
    }


  }

  showPendingRequests() {
    let pendingRequestsArray = [];
    let pendingRequests = _.each(this.allStockRequests, function (i, j) {
      let details: any = i;
      if (details.status == 'reqconfirm' || details.status == 'stockrequested') {
        pendingRequestsArray.push(details);
      }
    });
    this.allStockRequests = pendingRequestsArray;
    this.getPointsOnMap();
  }

  showConfirmedRequests() {
    let confirmedRequestsArray = [];
    let confirmedRequests = _.each(this.allStockRequests, function (i, j) {
      let details: any = i;
      if (details.status == 'confirm') {
        confirmedRequestsArray.push(details);
      }
    });
    this.allStockRequests = confirmedRequestsArray;
    this.getPointsOnMap();
  }

  showPanelType(pageType) {
    if (pageType == 'grid') {
      this.pageView = 'grid';
    }
    else {
      this.pageView = 'map';
      this.getStockRequests();

    }

  }

  getPointsOnMap() {
    let stockPoints = [];
    let stockPointsOnMap = _.each(this.allStockRequests, function (i, j) {
      let markerArray = { lat: 0, lng: 0, icon: '', label: 'stockpoint', userid: '', name: '', mobileno: '' }
      let details: any = i;
      if (details.stockpoint_details) {
        if (details.stockpoint_details.latitude && details.stockpoint_details.longitude) {
          markerArray.lat = parseFloat(details.stockpoint_details.latitude);
          markerArray.lng = parseFloat(details.stockpoint_details.longitude);
          markerArray.userid = details.stockpoint_details.userid;
          markerArray.name = details.distributor.firstname + ' ' + details.distributor.lastname;
          markerArray.mobileno = details.distributor.mobileno;
        }
        stockPoints.push(markerArray);
      }
    });

    this.stockPointMarkers = stockPoints;

    console.log(stockPoints, 'stockPoints');


  }


  viewDetails(data) {
    let formattedData = { type: 'acceptRequestFromDealer', data: data }
    let dialogRefAddSupplier = this.dialog.open(RaiseRequestDetailDailogComponent, {
      width: '70%',
      data: formattedData
    });
    dialogRefAddSupplier.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getStockRequests();
      }
    });

  }


  getAllUsers() { //for filter
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": "dealer", "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "getall", "apptype": this.authenticationService.appType(), "pagesize": 100 } };
    this.distributorService.getAllDistributors(input)
      .subscribe(
        output => this.getAllUsersResult(output),
        error => {
        });
  }
  getAllUsersResult(result) {
    if (result.result == 'success') {
      this.allUsers = result.data;
    }
  }


  getAllDistributors() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "getalldistributors", "apptype": this.authenticationService.appType(), "pagesize": 1000 } };
    this.distributorService.getAllDistributors(input)
      .subscribe(
        output => this.getDistributorsResult(output),
        error => {
        });
  }
  getDistributorsResult(data) {
    if (data.result == 'success') {
      this.allDistributors = data.data;
    }
  }



  getAllCategories() {
    let input = { "userId": this.authenticationService.loggedInUserId(), "userType": "dealer", "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };
    //console.log(input);
    this.productService.getProductsCategory(input)
      .subscribe(
        output => this.getProductsCategoryResult(output),
        error => {
          //console.log("error in products category list");
        });
  }
  getProductsCategoryResult(result) {
    //console.log(result);
    if (result.result == "success") {
      this.allCategories = result.data;
    }
  }


  findUsers(name: string) {
    let finalUser = this.allUsers.filter(user =>
      user.firstname.toLowerCase().indexOf(name.toLowerCase()) === 0);
    if (finalUser && finalUser.length > 0) {
      let findUser: any = {};
      findUser = _.find(finalUser, function (k, l) {
        let userDetails: any = k;
        return userDetails.firstname == name;
      });
      if (findUser) {
        this.userid = findUser.userid;
        this.userName = findUser.firstname;
      }
    }
    return finalUser;
  }

  findDistributors(name: string) {
    let finalDistributor = this.allDistributors.filter(dist =>
      dist.firstname.toLowerCase().indexOf(name.toLowerCase()) === 0);
    if (finalDistributor && finalDistributor.length > 0) {
      let findDistributor: any = {};
      findDistributor = _.find(finalDistributor, function (k, l) {
        let distributorDetails: any = k;
        return distributorDetails.firstname == name;
      });
      if (findDistributor) {
        this.distributorId = findDistributor.userid;
        this.distributorName = findDistributor.firstname;
      }
    }
    return finalDistributor;

  }

  findCategory(name: string) {
    let finalCategory = this.allCategories.filter(cat =>
      cat.category.toLowerCase().indexOf(name.toLowerCase()) === 0);
    if (finalCategory && finalCategory.length > 0) {
      let findCategory: any = {};
      findCategory = _.find(finalCategory, function (k, l) {
        let categoryDetails: any = k;
        return categoryDetails.category == name;
      });
      if (findCategory) {
        this.categoryId = findCategory.categoryid;
        this.categoryName = findCategory.category;
      }
    }
    return finalCategory;

  }

  search() {
    let input = { filtertype: this.stockFilter.filterType, username : '', userid: '', transtype: '', categoryId: '', categoryName: '', distributorName: '', distibutorId: '', fromDate: this.fromDate, toDate: this.toDate };
    if (input.filtertype == 'createdby') {
      input.username = this.userName;
      input.userid = this.userid;
      input.transtype = 'searchCreatedBy';
      input.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
      input.toDate = moment(this.toDate).format('YYYY-MM-DD');
    }
    else if (input.filtertype == 'category') {
      input.categoryId = this.categoryId;
      input.categoryName = this.categoryName;
      input.transtype = 'searchCategory'; 
      input.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
      input.toDate = moment(this.toDate).format('YYYY-MM-DD');

    }
    else if (input.filtertype == 'distributor') {
      input.distributorName = this.distributorName;
      input.distibutorId = this.distributorId;
      input.transtype = 'searchDistributor';
      input.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
      input.toDate = moment(this.toDate).format('YYYY-MM-DD');
    }
    console.log(input, 'input');
    this.reportsService.stockRequests(input)
      .subscribe(
        output => this.searchResults(output),
        error => {
        });
  }
  searchResults(result){
    if(result && result.result == 'success'){
      this.allStockRequests = result.data;
    }
  }



  ngOnInit() {
    this.getStockRequests();
    this.getAllUsers();
    this.getAllDistributors();
    this.getAllCategories();
  }

}
