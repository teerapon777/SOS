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
import { ListEmergencyPage } from '../pages/list-emergency/list-emergency';
import { ShowHistoryPage } from '../pages/show-history/show-history';
import { TaskServiceProvider } from '../providers/task-service/task-service';
import { InsertTaskPage } from '../pages/insert-task/insert-task';
import { ListTaskPage } from '../pages/list-task/list-task';
import { TelServiceProvider } from '../providers/tel-service/tel-service';
import { ListTelPage } from '../pages/list-tel/list-tel';

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
    InsertEmergencyPage,
    ListEmergencyPage,
    ShowHistoryPage,
    InsertTaskPage,
    ListTaskPage,
    ListTelPage
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
    InsertEmergencyPage,
    ListEmergencyPage,
    ShowHistoryPage,
    InsertTaskPage,
    ListTaskPage,
    ListTelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenServiceProvider,
    Geolocation,
    EmergencyServiceProvider,
    TaskServiceProvider,
    TelServiceProvider
  ]
})
export class AppModule { }
