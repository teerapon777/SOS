import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertTaskPage } from './insert-task';

@NgModule({
  declarations: [
    InsertTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertTaskPage),
  ],
})
export class InsertTaskPageModule {}
