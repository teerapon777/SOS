import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertMessage } from '../../models/msg';
import { EmergencyServiceProvider } from '../../providers/emergency-service/emergency-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-insert-emergency',
  templateUrl: 'insert-emergency.html',
})
export class InsertEmergencyPage {
  alertMSG: AlertMessage;
  user: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authServiceProvider: EmergencyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertEmergencyPage');
  }

  ngOnInit() {
    this.user = this.navParams.get('user_id');
  }
  save(input) {

    let name = input.name;
    let category = input.category;
    let detail = input.detail;
    let location = input.location;

    let loader = this.loadingCtrl.create({
      content: "กำลังบันทึกข้อมูล...."
    });

    loader.present();
    this.authServiceProvider.insert(name,
      category, detail, location).subscribe(
        (alertMSG: AlertMessage) => {
          this.alertMSG = alertMSG; //รับค่าขอ้มูล json จาก provider (Backend)
          if (this.alertMSG.status === 'ok') {
            let alert = this.alertCtrl.create({
              title: this.alertMSG.message,
              buttons: ['ตกลง']
            });
            //console.log('signup ok');
            alert.present();

            this.navCtrl.setRoot(HomePage);

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

}
