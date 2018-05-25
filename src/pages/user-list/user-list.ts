import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { users } from '../../models/user';
import { Subscription } from 'rxjs/Subscription';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';
import { AlertMessage } from '../../models/msg';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { EditUserPage } from '../edit-user/edit-user';

/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  userList: users[];
  subscription: Subscription;
  alertMSG: AlertMessage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authenServiceProvider: AuthenServiceProvider) {
  }

  private getData() {
    this.subscription = this.authenServiceProvider.getAllData().subscribe(
      (userList: users[]) => this.userList = userList
    );
  }
  edit(user: string) {
    this.navCtrl.push(EditUserPage, { user_id: user });
  }

  del(user: string) {
    let loader = this.loadingCtrl.create({
      content: "กำลังลบข้อมูล....."
    });
    loader.present();
    this.authenServiceProvider.del(user).subscribe(
      (alertMSG: AlertMessage) => {
        this.alertMSG = alertMSG;

        if (this.alertMSG.status == 'ok') {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          alert.present();
          this.navCtrl.setRoot(UserListPage);
        } else {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          alert.present();
        }
      }, (error) => {
        console.log(error);
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }
  ionViewWillEnter() {
    this.getData();
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
  }

}
