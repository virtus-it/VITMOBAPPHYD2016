import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { DistributorServiceService } from './distributor-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DistributorCreateDialogComponent } from '../distributor-create-dialog/distributor-create-dialog.component';
import { ProductListDialogComponent } from '../product-list-dialog/product-list-dialog.component';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { FollowUpDetailsComponent } from '../follow-up-details/follow-up-details.component';
import { SupplierOrderListComponent } from '../supplier-order-list/supplier-order-list.component';
import { ViewCustomerComponent } from '../view-customer/view-customer.component';
import { ViewSupplierComponent } from '../view-supplier/view-supplier.component';
import { AddproductconfirmComponent } from '../addproductconfirm/addproductconfirm.component';
import { MapStockpointComponent } from '../map-stockpoint/map-stockpoint.component';
import { ViewStockpointsComponent } from '../view-stockpoints/view-stockpoints.component';
import { DistributorsAvailabilityComponent } from '../distributors-availability/distributors-availability.component';
import { FormControl, Validators } from '@angular/forms';
import { AddstockProductComponent } from '../addstock-product/addstock-product.component';
import { Observable } from 'rxjs/Observable';
import { AddStockHistoryComponent } from '../add-stock-history/add-stock-history.component';
import { SalesTeamAssignComponent } from '../sales-team-assign/sales-team-assign.component';
import 'rxjs/add/operator/startWith';
import { ProductsService } from '../products/products.service';
import 'rxjs/add/operator/map';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { MdDialog } from '@angular/material';
import * as _ from 'underscore';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { LoaderService } from '../login/loader.service';
import { ReportsService } from '../reports/reports.service';

@Component({

    templateUrl: './distributor.component.html',
    styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

    CategoryCtrl: FormControl;
    filteredcategories: Observable<any[]>;

    productsCtrl: FormControl;
    filteredProducts: Observable<any[]>;

    salesTeamCtrl: FormControl;
    filteredsalesteam: Observable<any[]>;



    ordersList = [];
    distributors: any = [];
    distributorsCopy: any = [];
    searchDistributorTerm = "";
    searchDistributorNumber = "";
    categoryList: any = [];
    filterType: any = "";
    loginId: any = 0;
    tabPanelView = '';

    productList = [];

    producttype: '';
    pname: '';
    category: '';

    filterTypeModel = { categoryname: "", typeofphone: "", address: "", isAreaDefined: "", productId: '', isstockpointDefined: '', mobileno: '', firstname: '' };
    filterInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "search", "apptype": this.authenticationService.appType(), "pagesize": 100, "searchtype": "", "searchtext": "", "devicetype": "", "moyaversioncode": "", "category": '', "producttype": '', 'productname': "" } };


    distributorClickMore = true;
    LastfilterRecords = false;
    isActive: any = "";
    showFilterDailog = false;
    distributorsCount: any = 0;
    allSalesTeam: any = [];
    salesTeamId: any = '';
    // LastfilterRecords = false;

    distributorInput = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "getalldistributors", "apptype": this.authenticationService.appType(), "pagesize": 1000 } };


    // let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "apptype": this.authenticationService.appType(), "pagesize": 1000 } }



    constructor(private distributorService: DistributorServiceService, private authenticationService: AuthenticationService, public dialog: MdDialog, private loaderService: LoaderService, private productService: ProductsService, private reportservice: ReportsService, ) {

        this.CategoryCtrl = new FormControl();
        this.filteredcategories = this.CategoryCtrl.valueChanges
            .startWith(null)
            .map(cat => cat ? this.findCategories(cat) : this.categoryList.slice());

        this.productsCtrl = new FormControl();
        this.filteredProducts = this.productsCtrl.valueChanges
            .startWith(null)
            .map(prod => prod ? this.findProducts(prod) : this.productList.slice());

        this.salesTeamCtrl = new FormControl();
        this.filteredsalesteam = this.salesTeamCtrl.valueChanges
            .startWith(null)
            .map(salesteam => salesteam ? this.findSalesTeam(salesteam) : this.allSalesTeam.slice());


    }

    findCategories(name: string) {
        let finalCategories: any = [];
        finalCategories = this.categoryList.filter(cat =>
            cat.category.toLowerCase().indexOf(name.toLowerCase()) === 0);

        if (finalCategories && finalCategories.length > 0) {
            let findCategory: any = {};

            findCategory = _.find(finalCategories, function (k, l) {
                let catDetails: any = k;
                return catDetails.category == name;
            });

            if (findCategory) {
                // this.filterInput.categoryid = findCategory.categoryid;
                this.filterTypeModel.categoryname = findCategory.category;
            }
        }
        else {
            if (name.length >= 3 && !this.LastfilterRecords) {
                this.getProductByCategory();
            }
        }
        return finalCategories;
    }

    showTabPanel(panelName) {
        if (panelName == 'bystock') {
            this.tabPanelView = 'bystock';
        }
    }



    findProducts(name: string) {
        let finalProducts: any = [];
        finalProducts = this.productList.filter(prod =>
            prod.fullname.toLowerCase().indexOf(name.toLowerCase()) === 0);

        if (finalProducts && finalProducts.length > 0) {
            let findProduct: any = {};

            findProduct = _.find(finalProducts, function (k, l) {
                let prodDetails: any = k;
                return prodDetails.fullname == name;
            });

            if (findProduct) {
                //    this.filterTypeModel.productId = findProduct.productid;
                this.pname = findProduct.pname;
                this.category = findProduct.category;
                this.producttype = findProduct.ptype;
            }
        }
        else {
            if (name.length >= 3 && !this.LastfilterRecords) {
                this.getProductByCategory();
            }
        }
        return finalProducts;
    }


    getProducts() {
        let input = { "product": { userid: this.authenticationService.loggedInUserId(), apptype: this.authenticationService.appType(), "transtype": "getallproducts", loginid: this.authenticationService.loggedInUserId(), usertype: this.authenticationService.userType() } };
        this.productService.createProduct(input)
            .subscribe(
                output => this.getProductsResult(output),
                error => {
                });

    }
    getProductsResult(result) {
        console.log(result);

        if (result.result == 'success') {
            let fullName = "";
            _.each(result.data, function (i, j) {
                let details: any = i;
                fullName = details.pname + ' ' + details.category + ' ' + details.ptype;
                details.fullname = fullName;
            });
            this.productList = result.data;
        }
    }



    getProductByCategory() {
        let input = { "userId": this.authenticationService.loggedInUserId(), "userType": "dealer", "loginid": this.authenticationService.loggedInUserId(), "appType": this.authenticationService.appType() };

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
            this.categoryList = result.data;
        }
        else {
            this.LastfilterRecords = true;
        }
    }



    getDistributors(firstCall) {
        this.loaderService.display(true);
        if (this.distributors && this.distributors.length && !firstCall) {
            let lastdistributor: any = _.last(this.distributors);
            if (lastdistributor) {
                this.distributorInput.root.lastuserid = lastdistributor.userid;
            }

        }
        else {
            this.distributors = [];
            this.distributorInput.root.lastuserid = null;
        }
        let input = this.distributorInput;
        //console.log(input);
        this.distributorService.getAllDistributors(input)
            .subscribe(
                output => this.getDistributorsResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    getDistributorsResult(data) {
        //console.log(data);
        this.loaderService.display(false);
        if (data.result == 'success') {

            this.distributorClickMore = true;
            let finalDistributor = _.union(this.distributors, data.data);
            this.distributorsCount = finalDistributor.length;
            console.log(this.distributorsCount);
            this.distributors = finalDistributor;
            this.distributorsCopy = finalDistributor;

        }
        else {
            this.distributorClickMore = false;

        }
    }
    openMapDialog(data) {
        let dialogRef = this.dialog.open(MapDialogComponent, {
            width: '95%',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }
    openCreateDialog() {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if (result == 'success') {
                this.getDistributors(true);
                this.loaderService.display(false);
            }
            else {
                this.loaderService.display(false);
            }
        });
    }
    openUpdateDialog(details) {
        let dialogRef = this.dialog.open(DistributorCreateDialogComponent, {
            width: '700px',
            data: details
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
            if (result == 'success') {
                this.getDistributors(true);
            }
        });
    }
    showFollowUp(details) {
        //console.log(details);
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "distributor", "mobileno": details.mobileno };
        let dialogRefFollow = this.dialog.open(FollowUpComponent, {

            width: '50%',
            data: data
        });
        dialogRefFollow.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    showFollowUpDetails(details) {
        let data = { id: details.userid, firstname: details.firstname, lastName: details.lastname, type: "distributor", "mobileno": details.mobileno };
        let dialogRefFollowDetails = this.dialog.open(FollowUpDetailsComponent, {

            width: '80%',
            data: data
        });
        dialogRefFollowDetails.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);


        });

    }
    ViewProduct(distributor) {
        //console.log(distributor);
        if (distributor) {
            let formattedData = { 'type': 'productListFromDistributors', data: distributor }
            let dialogRef = this.dialog.open(ProductListDialogComponent, {

                width: '95%',
                data: formattedData
            });
            dialogRef.afterClosed().subscribe(result => {
                //console.log(`Dialog closed: ${result}`);
                if (result == 'success') {
                    this.getDistributors(true);
                }


            });


        }
    }

    reset() {
        this.tabPanelView = '';
        this.filterType = "";
        this.searchDistributorTerm = "";
        this.searchDistributorNumber = "";
        this.getDistributors(true);
    }

    distributorsAvailability(data) {
        let dialogRef = this.dialog.open(DistributorsAvailabilityComponent, {
            width: '45%',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getDistributors(true);
            }


        });
    }

    //Search distributor with name

    searchDistributorByName() {
        let term = this.searchDistributorTerm;
        if (term) {
            this.distributors = this.distributorsCopy.filter(function (e) {
                return e.firstname.toLowerCase().indexOf(term.toLowerCase()) >= 0

            });
        }
        else {
            this.distributors = this.distributorsCopy;
        }
    }

    //Search distributor with number
    searchDistributorbyNumber() {
        let term = this.searchDistributorNumber;
        if (term) {
            this.distributors = this.distributorsCopy.filter(function (e) {
                return e.mobileno.indexOf(term) >= 0
            });
        }
        else {
            this.distributors = this.distributorsCopy;
        }
    }

    //View Orders
    viewOrders(data) {
        let formatteddata: any = { "type": "distributorOrder", "data": data };
        let dialogRefSupplierOrderList = this.dialog.open(SupplierOrderListComponent, {
            width: '80%',
            data: formatteddata
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.loaderService.display(false);
        });
    }

    //view Suppliers
    viewSuppliers(data) {
        let dialogRefSupplierOrderList = this.dialog.open(ViewSupplierComponent, {
            width: '65%',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.loaderService.display(false);


        });
    }

    //view Customers
    viewCustomers(data) {
        let dialogRefSupplierOrderList = this.dialog.open(ViewCustomerComponent, {
            width: '95%',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.loaderService.display(false);


        });
    }
    filterDailogToggle() {
        this.showFilterDailog = !this.showFilterDailog;
    }
    addProductsConfirmDialog(data) {
        let dialogRefSupplierOrderList = this.dialog.open(AddproductconfirmComponent, {
            width: '700px',
            data: data
        });
        dialogRefSupplierOrderList.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            this.loaderService.display(false);


        })


    }

    // deactivateDistributor(dist){
    //     let input={"User":{"TransType":"deactivate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":""}};
    //     //console.log(input);
    //     this.distributorService.createDistributor(input)
    //     .subscribe(
    //     output => this.deactivateDistributorResult(output),
    //     error => {
    //         //console.log("error in distrbutors");
    //         this.loaderService.display(false);
    //     });
    // }
    // deactivateDistributorResult(result){
    //     //console.log(result);
    //     if(result.result == 'success'){
    //         this.getDistributors(true);

    //     }

    // }

    // activateDistributor(dist){
    //     let input={"User":{"TransType":"activate","userid":dist.userid,"user_type":"dealer","devicetype":"","moyaversioncode":""}};
    //     //console.log(input);
    //     this.distributorService.createDistributor(input)
    //     .subscribe(
    //         output => this.activateDistributorResult(output),
    //         error => {
    //             //console.log("error in distrbutors");
    //             this.loaderService.display(false);
    //         });

    // }

    // activateDistributorResult(result){
    //     //console.log(result);
    //     if(result.result =='success'){
    //         this.getDistributors(true);

    //     }
    // }



    stockPoint(data) {
        let dialogRefCoverageDailog = this.dialog.open(MapStockpointComponent, {
            width: '95%',
            data: data
        });
        dialogRefCoverageDailog.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
            }
        });
    }

    viewStockPoints(data) {
        let dialogRefCoverageDailog = this.dialog.open(ViewStockpointsComponent, {
            width: '95%',
            data: data
        });
        dialogRefCoverageDailog.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
            }
        });

    }


    activateDeactivateDist(dist) {
        let input = {};
        if (dist.isactive == '0') {
            input = { "User": { "TransType": "activate", "userid": dist.userid, "user_type": "dealer", "devicetype": "", "moyaversioncode": "", "apptype": this.authenticationService.appType() } };
        }
        else {
            input = { "User": { "TransType": "deactivate", "userid": dist.userid, "user_type": "dealer", "devicetype": "", "moyaversioncode": "", "apptype": this.authenticationService.appType() } };
        }
        console.log(input);
        this.distributorService.createDistributor(input)
            .subscribe(
                output => this.activateDeactivateDistributorResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    activateDeactivateDistributorResult(result) {
        console.log(result);
        if (result.result == 'success') {
            this.getDistributors(true);
        }
    }

    clearSearch() {
        this.showFilterDailog = false;
        this.filterType = "";
        this.searchDistributorTerm = "";
        this.searchDistributorNumber = "";
        this.getDistributors(true);
    }

    viewPoints(data) {

        let dialogRefEditCustomer = this.dialog.open(EditPointsComponent, {
            width: '700px',
            data: data
        });
        dialogRefEditCustomer.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == "success") {
            }
        });
    }

    searchFilter() {
        if (this.filterType == 'category') {
            this.filterInput.root.searchtype = 'category';
            this.filterInput.root.searchtext = this.filterTypeModel.categoryname;
        }
        else if (this.filterType == 'mobileno') {
            this.filterInput.root.searchtype = 'mobileno';
            this.filterInput.root.searchtext = this.filterTypeModel.mobileno;
        }
        else if (this.filterType == 'name') {
            this.filterInput.root.searchtype = 'firstname';
            this.filterInput.root.searchtext = this.filterTypeModel.firstname;
        }
        else if (this.filterType == 'phonetype') {
            this.filterInput.root.searchtype = 'phonetype';
            this.filterInput.root.searchtext = this.filterTypeModel.typeofphone;
        }
        else if (this.filterType == 'address') {
            this.filterInput.root.searchtype = 'address';
            this.filterInput.root.searchtext = this.filterTypeModel.address;
        }
        else if (this.filterType == 'areadefined') {
            this.filterInput.root.searchtype = 'areadefined';
            this.filterInput.root.searchtext = this.filterTypeModel.isAreaDefined;

        }
        else if (this.filterType == 'products') {
            this.filterInput.root.searchtype = 'products';
            this.filterInput.root.productname = this.pname;
            this.filterInput.root.producttype = this.producttype;
            this.filterInput.root.category = this.category;
            // this.filterInput.root.productSearch = this.filterProductObject;
        }
        else if (this.filterType == 'stockpoints') {
            this.filterInput.root.searchtype = 'stockpoints';
            this.filterInput.root.searchtext = this.filterTypeModel.isstockpointDefined;
        }
        else if(this.filterType == 'salesteamassociation'){
            this.filterInput.root.searchtype = 'assign';
            this.filterInput.root.searchtext = this.salesTeamId;
        }
        let input = this.filterInput;
        this.distributorService.getAllDistributors(input)
            .subscribe(
                output => this.searchFilterResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    searchFilterResult(result) {
        if (result.result == 'success') {
            this.distributors = [];
            this.distributors = result.data;
        }
        else {
            this.distributors = [];
            this.distributorClickMore = false;
        }
    }


    addstockDialog(data) {
        let formattedData = { data: data, "type": "distributorsStock" }
        let dialogRefAddInvoice = this.dialog.open(AddstockProductComponent, {

            width: '600px',
            data: formattedData
        });
        dialogRefAddInvoice.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getDistributors(true);

            }

        });
    }

    stockHistory(data) {
        let formattedData = { data: data, "type": "distributorsStockHistory" }
        let dialogRefStrockHitory = this.dialog.open(AddStockHistoryComponent, {

            width: '60%',
            data: formattedData
        });
        dialogRefStrockHitory.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getDistributors(true);
            }
        });

    }


    distributorstockStatus(data) {
        let formattedData = { data: data, "type": "distributorstockStatus" }
        let dialogRefAddProduct = this.dialog.open(ProductUpdateComponent, {

            width: '45%',
            data: formattedData
        });
        dialogRefAddProduct.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getDistributors(true);
            }

        });

    }

    activeDistributors() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "activedistributors", "apptype": this.authenticationService.appType(), "pagesize": 100 } };
        this.distributorService.getAllDistributors(input)
            .subscribe(
                output => this.activeDistributorsResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    activeDistributorsResult(result) {
        if (result.result == 'success') {
            this.distributors = result.data;
        }
        else {
            this.distributors = [];
        }
    }


    inactiveDistributors() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "usertype": this.authenticationService.userType(), "loginid": this.authenticationService.loggedInUserId(), "lastuserid": 0, "transtype": "inactivedistributors", "apptype": this.authenticationService.appType(), "pagesize": 100 } };
        this.distributorService.getAllDistributors(input)
            .subscribe(
                output => this.inactiveDistributorsResult(output),
                error => {
                    //console.log("error in distrbutors");
                    this.loaderService.display(false);
                });
    }
    inactiveDistributorsResult(result) {
        if (result.result == 'success') {
            this.distributors = result.data;
        }
        else {
            this.distributors = [];
        }
    }


    assignToSalesTeam(data) {
        let dialogRefAddProduct = this.dialog.open(SalesTeamAssignComponent, {
            width: '40%',
            data: data
        });
        dialogRefAddProduct.afterClosed().subscribe(result => {
            //console.log(`Dialog closed: ${result}`);
            if (result == 'success') {
                this.getDistributors(true);
            }
        });

    }

    salesTeamUsers() {
        let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "transtype": "getsalesteam" } };
        this.reportservice.changeAssociation(input)
            .subscribe(
                output => this.salesTeamUsersResult(output),
                error => {
                });
    }
    salesTeamUsersResult(result) {
        if (result.result == 'success') {
            this.allSalesTeam = result.data;
        }
    }



    findSalesTeam(name: string) {
        let finalSalesTeam: any = [];
        finalSalesTeam = this.allSalesTeam.filter(salesteam =>
            salesteam.fullname.toLowerCase().indexOf(name.toLowerCase()) === 0);

        if (finalSalesTeam && finalSalesTeam.length > 0) {
            let findSalesTeam: any = {};

            findSalesTeam = _.find(finalSalesTeam, function (k, l) {
                let salesteam: any = k;
                return salesteam.fullname == name;
            });

            if (findSalesTeam) {
                this.salesTeamId = findSalesTeam.userid;
                //  this.filterTypeModel.categoryname = findCategory.category;
            }
        }
        else {
            if (name.length >= 3 && !this.LastfilterRecords) {
                this.salesTeamUsers();
            }
        }
        return finalSalesTeam;
    }


    ngOnInit() {
        this.getDistributors(true);
        this.getProductByCategory();
        this.getProducts();
        this.salesTeamUsers();
        this.loginId = this.authenticationService.loggedInUserId();
        // if(window.navigator.geolocation){
        //     window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        //     };







    }

}
