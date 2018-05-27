import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { task } from '../../models/task';
import { Subscription } from 'rxjs/Subscription';
import { TaskServiceProvider } from '../../providers/task-service/task-service';
import { TelServiceProvider } from '../../providers/tel-service/tel-service';
import { tel } from '../../models/tel';

/**
 * Generated class for the ListTelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-tel',
  templateUrl: 'list-tel.html',
})
export class ListTelPage {

  tel: tel[];
  items: any;

  subscription: Subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public telServer: TelServiceProvider) {
    this.initializeItems();
  }
  initializeItems() {
    this.items = this.tel;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.Department_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getDatatel() {
    this.subscription = this.telServer.getDataAll().subscribe(
      (tel: tel[]) => this.tel = tel
    );
  }
  ionViewWillEnter() {
    this.getDatatel();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListTelPage');
  }

}
