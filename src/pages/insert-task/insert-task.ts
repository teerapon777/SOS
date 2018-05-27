import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { TaskServiceProvider } from '../../providers/task-service/task-service';
import { AlertMessage } from '../../models/msg';
import { ShowHistoryPage } from '../show-history/show-history';
import { ListTaskPage } from '../list-task/list-task';

/**
 * Generated class for the InsertTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-task',
  templateUrl: 'insert-task.html',
})
export class InsertTaskPage {
  id1: string;
  id2: string;
  alertMSG: AlertMessage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private TaskServiceProvider: TaskServiceProvider) {
  }

  ngOnInit() {
    //this.email = this.navParams.get('email_is');
    this.id1 = this.navParams.get('id_emer');
    this.id2 = this.navParams.get('user');
  }

  insert(data) {

    let emer_id = this.navParams.get('id_emer');
    let user_id = this.navParams.get('user');
    let detail = data.detail;

    let loader = this.loadingCtrl.create({
      content: "กำลังบันทึกข้อมูล...."
    });

    loader.present();
    this.TaskServiceProvider.insert(emer_id, user_id, detail).subscribe(
      (alertMSG: AlertMessage) => {
        this.alertMSG = alertMSG; //รับค่าขอ้มูล json จาก provider (Backend)
        if (this.alertMSG.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          //console.log('signup ok');
          alert.present();
          this.navCtrl.push(ListTaskPage);

        }
        if (this.alertMSG.status === 'no') {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          // console.log('signup not ok');
          alert.present();
        }
        else { //ถา้สถานะเท่ากบั 'error' ให้ทาํงานและแสดงขอ้ความในส่วนนÊี
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          // console.log('signup not ok');
          alert.present();
        }
      },
      (error) => {
        console.log(error);
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertTaskPage');
  }

}
