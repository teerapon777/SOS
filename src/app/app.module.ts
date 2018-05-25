import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserListPage } from '../pages/user-list/user-list';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { InsertEmergencyPage } from '../pages/insert-emergency/insert-emergency';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenServiceProvider } from '../providers/authen-service/authen-service';
import { HttpClientModule } from '@angular/common/http';
import { EmergencyServiceProvider } from '../providers/emergency-service/emergency-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserListPage,
    EditUserPage,
    InsertEmergencyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UserListPage,
    EditUserPage,
    InsertEmergencyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenServiceProvider,
    Geolocation,
    EmergencyServiceProvider
  ]
})
export class AppModule { }
