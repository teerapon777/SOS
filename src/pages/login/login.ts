import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertMessage } from '../../models/msg';
import { TabsPage } from '../tabs/tabs';
import { users } from '../../models/user';
import { AuthenServiceProvider } from '../../providers/authen-service/authen-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login_type = "login";
  login_form: any;
  register_form: any;
  password_max_length = 3;
  user = {} as users;
  alertMSG: AlertMessage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authServiceProvider: AuthenServiceProvider) {

    this.login_form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(this.password_max_length), Validators.required]],
    });
    this.register_form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(this.password_max_length), Validators.required]],
      title_name: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      number_phone: ['', [Validators.required]],

    });
  }
  login(user: users) {

    let email = user.email;
    let password = user.password;

    let loader = this.loadingCtrl.create({
      content: "กำลังเข้าสู่ระบบ"
    });

    loader.present();
    this.authServiceProvider.login(email, password).subscribe(
      (alertMSG: AlertMessage) => {
        this.alertMSG = alertMSG; //รับค่าขอ้มูล json จาก provider (Backend)
        if (this.alertMSG.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.alertMSG.message,
            buttons: ['ตกลง']
          });
          alert.present();
          this.navCtrl.setRoot(HomePage, { email_is: email });
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

  save(formSignup) {

    let email = formSignup.email;
    let password = formSignup.password;
    let titleName = formSignup.titleName;
    let fname = formSignup.fname;
    let lname = formSignup.lname;
    let phone = formSignup.phone;

    let loader = this.loadingCtrl.create({
      content: "กำลังบันทึกข้อมูล...."
    });

    loader.present();
    this.authServiceProvider.signup(email,
      password, titleName, fname, lname, phone).subscribe(
        (alertMSG: AlertMessage) => {
          this.alertMSG = alertMSG; //รับค่าขอ้มูล json จาก provider (Backend)
          if (this.alertMSG.status === 'ok') {
            let alert = this.alertCtrl.create({
              title: this.alertMSG.message,
              buttons: ['ตกลง']
            });
            //console.log('signup ok');
            alert.present();

            this.navCtrl.setRoot(LoginPage);

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
    console.log('ionViewDidLoad LoginPage');
  }

}
