import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//importacoes novas
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { HttpClientModule } from '@angular/common/http';
import { SecureStorageProvider } from '../providers/secure-storage/secure-storage';
import { AtualizarBdProvider } from '../providers/atualizar-bd/atualizar-bd';
import { DadosFormulariosProvider } from '../providers/dados-formularios/dados-formularios';
import { DadosUsuarioProvider } from '../providers/dados-usuario/dados-usuario';
import { UploadFotoProvider } from '../providers/upload-foto/upload-foto';
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
    FileTransfer,
    Geolocation,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticacaoProvider,
    SecureStorageProvider,
    AtualizarBdProvider,
    DadosFormulariosProvider,
    DadosUsuarioProvider,
    UploadFotoProvider
  ]
})
export class AppModule {}
