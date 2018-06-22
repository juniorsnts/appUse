import { BrMaskerModule } from 'brmasker-ionic-3';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//importacoes novas
import { File } from '@ionic-native/file';
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
import { LocalizacaoGeralProvider } from '../providers/localizacao-geral/localizacao-geral';
import { FormDPessoalPage } from '../pages/form-d-pessoal/form-d-pessoal';
import { FormDProfissionalPage } from '../pages/form-d-profissional/form-d-profissional';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormDPessoalPage,
    FormDProfissionalPage
  ],
  imports: [
    BrMaskerModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormDPessoalPage,
    FormDProfissionalPage
  ],
  providers: [
    AndroidPermissions,
    File,
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
    UploadFotoProvider,
    LocalizacaoGeralProvider
  ]
})
export class AppModule {}
