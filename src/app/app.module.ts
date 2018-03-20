import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {LocationStrategy,HashLocationStrategy} from '@angular/common'; 
import { MaterialModule, MdSidenavModule, MdDialogModule, MdTooltipModule, MdInputModule, MdNativeDateModule,MdAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import 'hammerjs';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import { DistributorServiceService } from './distributor/distributor-service.service';
import { SmsServiceService } from './sms/sms-service.service';
import { LoggedInGuard } from './login/logged-in.guard';
import { OrderComponent } from './order/order.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DistributorComponent } from './distributor/distributor.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { CoverageComponent } from './coverage/coverage.component';
import { DistributorCreateDialogComponent } from './distributor-create-dialog/distributor-create-dialog.component';
import { SmsComponent } from './sms/sms.component';
import { SmsDialogComponent } from './sms-dialog/sms-dialog.component';
import { ProductListDialogComponent } from './product-list-dialog/product-list-dialog.component';
import { DistributorListDialogComponent } from './distributor-list-dialog/distributor-list-dialog.component';
import { OrderLandingComponent } from './order-landing/order-landing.component';
import { AddEditCustomerDailogComponent } from './add-edit-customer-dailog/add-edit-customer-dailog.component';
import { OrderDetailDailogComponent } from './order-detail-dailog/order-detail-dailog.component';
import { EditQuantityDailogComponent } from './edit-quantity-dailog/edit-quantity-dailog.component';
import { CustomerDetailDailogComponent } from './customer-detail-dailog/customer-detail-dailog.component';
import { EmptyCanDailogComponent } from './empty-can-dailog/empty-can-dailog.component';
import { EditOrderStatusComponent } from './edit-order-status/edit-order-status.component';
import { OnHoldOrderStatusComponent } from './on-hold-order-status/on-hold-order-status.component';
import { ReportsComponent } from './reports/reports.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { PreOrderCartDailogComponent } from './pre-order-cart-dailog/pre-order-cart-dailog.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductsComponent } from './products/products.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddSupplierDailogComponent } from './add-supplier-dailog/add-supplier-dailog.component';
import { SupplierOrderListComponent } from './supplier-order-list/supplier-order-list.component';
import { AddEditProductDailogComponent } from './add-edit-product-dailog/add-edit-product-dailog.component';
import { AddInvoiceDailogComponent } from './add-invoice-dailog/add-invoice-dailog.component';
import { AddStockHistoryComponent } from './add-stock-history/add-stock-history.component';
import { ProductHistoryDailogComponent } from './product-history-dailog/product-history-dailog.component';
import { CustomerOrderListComponent } from './customer-order-list/customer-order-list.component';
import { CustomerPlaceorderDailogComponent } from './customer-placeorder-dailog/customer-placeorder-dailog.component';
import { CustomerResendInvitationComponent } from './customer-resend-invitation/customer-resend-invitation.component';
import { CustomerMakeInactiveComponent } from './customer-make-inactive/customer-make-inactive.component';
import { CustomerSettingDailogComponent } from './customer-setting-dailog/customer-setting-dailog.component';
import { CustomerSetPaymentCycleComponent } from './customer-set-payment-cycle/customer-set-payment-cycle.component';
import { CustomerScheduleDaiolgComponent } from './customer-schedule-daiolg/customer-schedule-daiolg.component';
import { OrderLandingService } from './order-landing/order-landing.service';
import { CustomerService } from './customer/customer.service';
import { OrderCoverageDetailDailogComponent } from './order-coverage-detail-dailog/order-coverage-detail-dailog.component';
import { UtcDatePipe } from './pipes/utc-date.pipe';
import { ReportsService } from './reports/reports.service';
import { LoaderService } from './login/loader.service';
import { FollowUpService } from './follow-up/follow-up.service';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { FollowUpDetailsComponent } from './follow-up-details/follow-up-details.component';
import { AddStockDistributorComponent } from './add-stock-distributor/add-stock-distributor.component';
import { SelectProductsForassingComponent } from './select-products-forassing/select-products-forassing.component';
import {FeedbackService} from './feedback/feedback.service';
import { FeedbackReplyDialogComponent } from './feedback-reply-dialog/feedback-reply-dialog.component';
import {SupplierService} from './supplier/supplier.service';
import { DeletesupplierComponent } from './deletesupplier/deletesupplier.component';
import { CustomerScheduleEditDailogComponent } from './customer-schedule-edit-dailog/customer-schedule-edit-dailog.component';
import { DeleteScheduledOrderComponent } from './delete-scheduled-order/delete-scheduled-order.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';

import { DeliverpreorderComponent } from './deliverpreorder/deliverpreorder.component';


import { ProductsService } from './products/products.service';
import { AddstockProductComponent } from './addstock-product/addstock-product.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentsService } from './payments/payments.service';
import { ProfileComponent } from './profile/profile.component';
import { PasswordupdateComponent } from './passwordupdate/passwordupdate.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { CategoryComponent } from './category/category.component';
import { CreateupdatecategoryComponent } from './createupdatecategory/createupdatecategory.component';
import { CategoryproductsComponent } from './categoryproducts/categoryproducts.component';
import { SetpricecustomerComponent } from './setpricecustomer/setpricecustomer.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { AddproductconfirmComponent } from './addproductconfirm/addproductconfirm.component';
import { AddProductDealerComponent } from './add-product-dealer/add-product-dealer.component';
import { DistributorOrderListComponent } from './distributor-order-list/distributor-order-list.component';
import { MapStockpointComponent } from './map-stockpoint/map-stockpoint.component';
import { ViewStockpointsComponent } from './view-stockpoints/view-stockpoints.component';
import { TimeChartComponent } from './time-chart/time-chart.component';




@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        OrderComponent,
        SideMenuComponent,
        DistributorComponent,
        MapDialogComponent,
        CoverageComponent,
        DistributorCreateDialogComponent,
        SmsComponent,
        SmsDialogComponent,
        ProductListDialogComponent,
        DistributorListDialogComponent,
        OrderLandingComponent,
        AddEditCustomerDailogComponent,
        OrderDetailDailogComponent,
        EditQuantityDailogComponent,
        CustomerDetailDailogComponent,
        EmptyCanDailogComponent,
        EditOrderStatusComponent,
        OnHoldOrderStatusComponent,
        ReportsComponent,
        PreOrderComponent,
        PreOrderCartDailogComponent,
        CustomerComponent,
        SupplierComponent,
        ProductsComponent,
        FeedbackComponent,
        AddSupplierDailogComponent,
        SupplierOrderListComponent,
        AddEditProductDailogComponent,
        AddInvoiceDailogComponent,
        AddStockHistoryComponent,
        ProductHistoryDailogComponent,
        CustomerOrderListComponent,
        CustomerPlaceorderDailogComponent,
        CustomerResendInvitationComponent,
        CustomerMakeInactiveComponent,
        CustomerSettingDailogComponent,
        CustomerSetPaymentCycleComponent,
        CustomerScheduleDaiolgComponent,
        OrderCoverageDetailDailogComponent,
        UtcDatePipe,
        FollowUpComponent,
        FollowUpDetailsComponent,
        AddStockDistributorComponent,
        SelectProductsForassingComponent,
        FeedbackReplyDialogComponent,
        DeletesupplierComponent,
        CustomerScheduleEditDailogComponent,
        DeleteScheduledOrderComponent,
        ScheduleComponent,
        ViewCustomerComponent,
        ViewSupplierComponent,
        AddstockProductComponent,
        DeliverpreorderComponent,
        InvoicedetailsComponent,
        PaymentsComponent,
        ProfileComponent,
        PasswordupdateComponent,
        ProductUpdateComponent,
        CategoryComponent,
        CreateupdatecategoryComponent,
        CategoryproductsComponent,
        SetpricecustomerComponent,
        InvoiceHistoryComponent,
        ProfileupdateComponent,
        AddproductconfirmComponent,
        AddProductDealerComponent,
        DistributorOrderListComponent,
        MapStockpointComponent,
        ViewStockpointsComponent,
        TimeChartComponent,
        
     
        

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdSidenavModule,
        MdDialogModule,
        MdTooltipModule,
        MdInputModule,
        NgxGaugeModule,
        MdNativeDateModule,
        AngularMultiSelectModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'order', component: OrderComponent, canActivate: [LoggedInGuard] },
            { path: 'orders', component: OrderLandingComponent, canActivate: [LoggedInGuard] },
            { path: 'distributor', component: DistributorComponent, canActivate: [LoggedInGuard] },
            { path: 'coverage', component: CoverageComponent, canActivate: [LoggedInGuard] },
            { path: 'notifications', component: SmsComponent, canActivate: [LoggedInGuard] },
            { path: 'reports', component: ReportsComponent, canActivate: [LoggedInGuard] },
            { path: 'payments', component: PaymentsComponent, canActivate: [LoggedInGuard] },
            { path: 'preorder', component: PreOrderComponent, canActivate: [LoggedInGuard] },
            { path: 'customer', component: CustomerComponent, canActivate: [LoggedInGuard] },
            { path: 'product', component: ProductsComponent, canActivate: [LoggedInGuard] },
            { path: 'supplier', component: SupplierComponent, canActivate: [LoggedInGuard] },
            { path: 'feedback', component: FeedbackComponent, canActivate: [LoggedInGuard] },
            { path: 'schedule', component: ScheduleComponent, canActivate: [LoggedInGuard] },
            {path: 'profile', component:ProfileComponent, canActivate: [LoggedInGuard]},
            {path: 'category', component: CategoryComponent, canActivate: [LoggedInGuard]},
            { path: '', redirectTo: 'orders', pathMatch: 'full', canActivate: [LoggedInGuard] },
            { path: '**', redirectTo: 'login' }
        ]),
        AgmCoreModule.forRoot({

            //apiKey: 'AIzaSyAj1ztDeH4uZVpVU-ITDx4LouRJ7TV_DbU' My api key
            //apiKey: 'AIzaSyA_ysbvje4RpkAlvBAxoyurGPWrcKTkIF0',

            // libraries: ["geometry"],
            libraries: ["drawing","places"],
            apiKey: 'AIzaSyDIybymyTZp7fg21yNL8iq2SjKSBYMwkko' 

        })
    ],
    providers: [
        AuthenticationService,
        GoogleMapsAPIWrapper,
        DistributorServiceService,
        OrderLandingService,
        LoggedInGuard,
        SmsServiceService,
        ReportsService,
        CustomerService,
        LoaderService,
        FollowUpService,
        FeedbackService,
        SupplierService,
        ProductsService,
        PaymentsService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: 'API_URL', useValue: 'http://104.211.247.42:2229' }  // 
    ],
    entryComponents: [
        MapDialogComponent, 
        DistributorCreateDialogComponent,
         SmsDialogComponent,
         ProductListDialogComponent,
         DistributorListDialogComponent,
         OrderDetailDailogComponent,
         AddEditCustomerDailogComponent,
         EditQuantityDailogComponent,
         CustomerDetailDailogComponent,
         EmptyCanDailogComponent,
         EditOrderStatusComponent,
         OnHoldOrderStatusComponent,
         PreOrderCartDailogComponent,
         AddSupplierDailogComponent,
         SupplierOrderListComponent,
         AddEditProductDailogComponent,
         AddInvoiceDailogComponent,
         AddStockHistoryComponent,
         ProductHistoryDailogComponent,
         CustomerOrderListComponent,
         CustomerPlaceorderDailogComponent,
         CustomerResendInvitationComponent,
         CustomerMakeInactiveComponent,
         CustomerSettingDailogComponent,
         CustomerSetPaymentCycleComponent,
         CustomerScheduleDaiolgComponent,
         OrderCoverageDetailDailogComponent,
         FollowUpComponent,
         FollowUpDetailsComponent,
         AddStockDistributorComponent,
         SelectProductsForassingComponent,
         FeedbackReplyDialogComponent,
         DeletesupplierComponent,
         DeleteScheduledOrderComponent,
         ScheduleComponent,
         CustomerScheduleEditDailogComponent,
         ViewCustomerComponent,
         ViewSupplierComponent,
         AddstockProductComponent,
         InvoicedetailsComponent,
         DeliverpreorderComponent,
         PaymentsComponent,
         PasswordupdateComponent,
         ProductUpdateComponent,
         CreateupdatecategoryComponent,
         CategoryproductsComponent,
         SetpricecustomerComponent,
         InvoiceHistoryComponent,
         ProfileupdateComponent,
         AddproductconfirmComponent,
         AddProductDealerComponent,
         DistributorOrderListComponent,
         MapStockpointComponent,
         ViewStockpointsComponent,
         TimeChartComponent,
    
      


        ],
    exports: [
        MaterialModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
