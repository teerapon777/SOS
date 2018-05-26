import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { emergency } from '../../models/emergency';
import { Subscription } from 'rxjs/Subscription';
import { AlertMessage } from '../../models/msg';
import { TabsPage } from '../tabs/tabs';
import { InsertTaskPage } from '../insert-task/insert-task';

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
  ids: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private emergencytServer: EmergencyServiceProvider) {
  }
  ngOnInit() {
    //this.email = this.navParams.get('email_is');
    this.ids = this.navParams.get('id_is');
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
  insert_history(id, ) {
    let id_user = this.navParams.get('id_is');
    this.navCtrl.push(InsertTaskPage, { id_emer: id, user: id_user });
  }

}
