import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserListPage } from '../user-list/user-list';
import { TabsPage } from '../tabs/tabs';
import { InsertEmergencyPage } from '../insert-emergency/insert-emergency';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';
import { users } from '../../models/user';
import { Subscription } from 'rxjs/Subscription';
import { ListEmergencyPage } from '../list-emergency/list-emergency';
import { ListTaskPage } from '../list-task/list-task';
import { ListTelPage } from '../list-tel/list-tel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  user: users[];

  subscription: Subscription;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public AuthentServer: AuthenServiceProvider) {
    console.log(this.navParams.data);
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

  ngOnInit() {
    //this.email = this.navParams.get('email_is');
    this.email = this.navParams.data;
  }
  show_tel() {
    this.navCtrl.push(ListTelPage);
  }
  insert() {
    this.navCtrl.push(InsertEmergencyPage);
  }
  showdata() {
    this.navCtrl.push(ListEmergencyPage);
  }
  showhistory() {
    this.navCtrl.push(ListTaskPage);
  }

}
