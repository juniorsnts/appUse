import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dadosPessoais: any;
  dadosProfissionais: any;
  dadosLocalizacao: any;
  fotoperfil = "";

  constructor(
    private navParams: NavParams,
    private getDados: DadosUsuarioProvider,
    public navCtrl: NavController) {

      let data = JSON.stringify({
        email: this.navParams.get('email')
      });

      console.log("email: => "+this.navParams.get('email'));

      this.getDados.dadosUsuarioPessoal(data).then(resp =>{
        this.dadosPessoais = resp;
        this.fotoperfil = this.dadosPessoais.fotoperfil;
        console.log(this.dadosPessoais);
      });

      this.getDados.dadosUsuarioProfissional(data).then(resp =>{
        this.dadosProfissionais = resp;
        console.log(this.dadosProfissionais);
      });

      this.getDados.dadosUsuarioLocalizacao(data).then(resp => {
        this.dadosLocalizacao = resp;
        console.log(this.dadosLocalizacao);
      });

  }

}
