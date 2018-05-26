import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { emergency } from '../../models/emergency';
import { Subscription } from 'rxjs/Subscription';
import { AlertMessage } from '../../models/msg';
import { TabsPage } from '../tabs/tabs';
import { ShowHistoryPage } from '../show-history/show-history';
import { users } from '../../models/user';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  email: string;
  emerAll: emergency[];
  subscription: Subscription;
  alertMSG: AlertMessage;
  user: users[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authentServer: AuthenServiceProvider,
    private emergencytServer: EmergencyServiceProvider) {
    console.log(this.navParams.data);
  }
  ngOnInit() {
    //this.email = this.navParams.get('email_is');
    this.email = this.navParams.data;
  }
  getDatauser() {
    let email = this.navParams.data;
    this.subscription = this.authentServer.getDatauser(email).subscribe(
      (user: users[]) => this.user = user
    );
  }

  showHistory(id) {
    this.navCtrl.push(ShowHistoryPage, { id_is: id });
  }
  getDataAll() {
    this.subscription = this.emergencytServer.getDataAll().subscribe(
      (emer: emergency[]) => this.emerAll = emer
    );
  }
  ionViewWillEnter() {
    this.getDatauser();
    this.getDataAll();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  update(id: string) {
    let loader = this.loadingCtrl.create({
      content: "กำลังอัพเดทข้อมูล....."
    });
    loader.present();
    this.emergencytServer.update(id).subscribe(
      (alertMSG: AlertMessage) => {
        this.alertMSG = alertMSG;

        if (this.alertMSG.status == 'ok') {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          alert.present();
          this.navCtrl.setRoot(AboutPage);
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


}
