import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { emergency } from '../../models/emergency';
import { Subscription } from 'rxjs/Subscription';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';


@IonicPage()
@Component({
  selector: 'page-list-emergency',
  templateUrl: 'list-emergency.html',
})
export class ListEmergencyPage {

  emer: emergency[];
  subscription: Subscription;
  user: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public emergencytServer: EmergencyServiceProvider) {
  }
  ngOnInit() {
    this.user = this.navParams.get('user_id');
  }
  getDataEmer() {
    let id = this.navParams.get('user_id');
    this.subscription = this.emergencytServer.getDataEmer(id).subscribe(
      (emer: emergency[]) => this.emer = emer
    );
  }
  ionViewWillEnter() {
    this.getDataEmer();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEmergencyPage');
  }

}
