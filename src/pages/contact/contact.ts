import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserListPage } from '../user-list/user-list';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
  UserList() {
    this.navCtrl.push(UserListPage);
  }

}
