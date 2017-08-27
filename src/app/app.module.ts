import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import{RouterModule} from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {MaterialModule,MdSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import {DistributorServiceService} from './distributor/distributor-service.service';
import { OrderComponent } from './order/order.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DistributorComponent } from './distributor/distributor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
   SideMenuComponent,
   DistributorComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdSidenavModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'order',component:OrderComponent},
      {path:'distributor',component:DistributorComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'**',redirectTo:'login',pathMatch:'full'}
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
    { provide: 'API_URL', useValue: 'http://54.213.42.95:2221' }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
