import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingOptions, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { task } from '../../models/task';
import { TaskServiceProvider } from '../../providers/task-service/task-service';

/**
 * Generated class for the ListTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-task',
  templateUrl: 'list-task.html',
})
export class ListTaskPage {

  task: task[];
  subscription: Subscription;
  user: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public taskServer: TaskServiceProvider) {
  }

  getDataEmer() {
    this.subscription = this.taskServer.getDataAll().subscribe(
      (task: task[]) => this.task = task
    );
  }
  ionViewWillEnter() {
    this.getDataEmer();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListTaskPage');
  }

}
