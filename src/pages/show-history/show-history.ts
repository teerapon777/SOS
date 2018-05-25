import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { emergency } from '../../models/emergency';
import { Subscription } from 'rxjs/Subscription';
import { AlertMessage } from '../../models/msg';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ShowHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-history',
  templateUrl: 'show-history.html',
})
export class ShowHistoryPage {

  emerAll: emergency[];
  subscription: Subscription;
  alertMSG: AlertMessage;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private emergencytServer: EmergencyServiceProvider) {
  }
  getDataAll() {
    this.subscription = this.emergencytServer.getDataAll_history().subscribe(
      (emer: emergency[]) => this.emerAll = emer
    );
  }
  ionViewWillEnter() {
    this.getDataAll();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowHistoryPage');
  }

}
