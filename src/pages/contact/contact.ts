import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { UserListPage } from '../user-list/user-list';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';
import { LoadedModule } from 'ionic-angular/util/module-loader';
import { users } from '../../models/user';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  email: string;
  user: users[];
  subscription: Subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public AuthentServer: AuthenServiceProvider) {
    console.log(this.navParams.data);
  }
  UserList() {
    this.navCtrl.push(UserListPage);
  }
  getDatauser() {
    let email = this.navParams.data;
    this.subscription = this.AuthentServer.getDatauser(email).subscribe(
      (user: users[]) => this.user = user
    );
  }
  ionViewWillEnter() {
    this.getDatauser();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  ngOnInit() {
    //this.email = this.navParams.get('email_is');
    this.email = this.navParams.data;
  }

}
