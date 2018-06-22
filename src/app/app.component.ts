import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//imports pages
import { HomePage } from '../pages/home/home';
import { FormDPessoalPage } from '../pages/form-d-pessoal/form-d-pessoal';
import { FormDProfissionalPage } from '../pages/form-d-profissional/form-d-profissional';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FormDPessoalPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

