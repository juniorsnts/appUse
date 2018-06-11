import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizacaoUsuarioPage } from './localizacao-usuario';

@NgModule({
  declarations: [
    LocalizacaoUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalizacaoUsuarioPage),
  ],
})
export class LocalizacaoUsuarioPageModule {}
