import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//importacoes novas
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SecureStorageProvider } from '../providers/secure-storage/secure-storage';
import { AtualizarBdProvider } from '../providers/atualizar-bd/atualizar-bd';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    Geolocation,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticacaoProvider,
    SecureStorageProvider,
    AtualizarBdProvider
  ]
})
export class AppModule {}
