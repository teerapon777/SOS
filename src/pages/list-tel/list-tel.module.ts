import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTelPage } from './list-tel';

@NgModule({
  declarations: [
    ListTelPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTelPage),
  ],
})
export class ListTelPageModule {}
