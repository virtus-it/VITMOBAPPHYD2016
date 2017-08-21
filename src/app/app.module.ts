import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import{RouterModule} from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'order',component:OrderComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'**',redirectTo:'login',pathMatch:'full'}
    ]),
    AgmCoreModule.forRoot({
    //apiKey: 'AIzaSyAj1ztDeH4uZVpVU-ITDx4LouRJ7TV_DbU'
   apiKey: 'AIzaSyA_ysbvje4RpkAlvBAxoyurGPWrcKTkIF0',
    })
  ],
  providers: [
      AuthenticationService,
      GoogleMapsAPIWrapper,
    { provide: 'API_URL', useValue: 'http://54.213.42.95:2221' }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
