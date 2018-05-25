import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEmergencyPage } from './list-emergency';

@NgModule({
  declarations: [
    ListEmergencyPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEmergencyPage),
  ],
})
export class ListEmergencyPageModule {}
