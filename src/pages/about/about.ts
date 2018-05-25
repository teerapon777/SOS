import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { emergency } from '../../models/emergency';
import { Subscription } from 'rxjs/Subscription';
import { AlertMessage } from '../../models/msg';
import { TabsPage } from '../tabs/tabs';
import { ShowHistoryPage } from '../show-history/show-history';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  emerAll: emergency[];
  subscription: Subscription;
  alertMSG: AlertMessage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private emergencytServer: EmergencyServiceProvider) {
  }
  showHistory() {
    this.navCtrl.push(ShowHistoryPage);
  }
  getDataAll() {
    this.subscription = this.emergencytServer.getDataAll().subscribe(
      (emer: emergency[]) => this.emerAll = emer
    );
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

  ionViewWillEnter() {
    this.getDataAll();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
