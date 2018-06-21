import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeContratantePage } from './home-contratante';

@NgModule({
  declarations: [
    HomeContratantePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeContratantePage),
  ],
})
export class HomeContratantePageModule {}
