import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MaterialModule, MdSidenavModule, MdDialogModule, MdTooltipModule, MdInputModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import { DistributorServiceService } from './distributor/distributor-service.service';
import { LoggedInGuard } from './login/logged-in.guard';
import { OrderComponent } from './order/order.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DistributorComponent } from './distributor/distributor.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { CoverageComponent } from './coverage/coverage.component';
import { DistributorCreateDialogComponent } from './distributor-create-dialog/distributor-create-dialog.component';
import { SmsComponent } from './sms/sms.component';
import { SmsDialogComponent } from './sms-dialog/sms-dialog.component';

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
        SmsDialogComponent

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
        MdNativeDateModule,
        AngularMultiSelectModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'order', component: OrderComponent, canActivate: [LoggedInGuard] },
            { path: 'distributor', component: DistributorComponent, canActivate: [LoggedInGuard] },
            { path: 'coverage', component: CoverageComponent, canActivate: [LoggedInGuard] },
            { path: 'sms', component: SmsComponent, canActivate: [LoggedInGuard] },
            { path: '', redirectTo: 'distributor', pathMatch: 'full', canActivate: [LoggedInGuard] },
            { path: '**', redirectTo: 'login' }
        ]),
        AgmCoreModule.forRoot({

            //apiKey: 'AIzaSyAj1ztDeH4uZVpVU-ITDx4LouRJ7TV_DbU'
            //apiKey: 'AIzaSyA_ysbvje4RpkAlvBAxoyurGPWrcKTkIF0',

            // libraries: ["geometry"],
            libraries: ["drawing"],
            apiKey: 'AIzaSyAj1ztDeH4uZVpVU-ITDx4LouRJ7TV_DbU'

        })
    ],
    providers: [
        AuthenticationService,
        GoogleMapsAPIWrapper,
        DistributorServiceService,
        LoggedInGuard,
        { provide: 'API_URL', useValue: 'http://54.213.42.95:2221' }  // 
    ],
    entryComponents: [MapDialogComponent, DistributorCreateDialogComponent, SmsDialogComponent],
    exports: [
        MaterialModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
