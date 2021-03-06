import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosUsuarioProvider } from '../../providers/dados-usuario/dados-usuario';

declare var google;

@IonicPage({
  name: 'visualiza-usuario'
})
@Component({
  selector: 'page-visualizarusuario',
  templateUrl: 'visualizarusuario.html',
})
export class VisualizarusuarioPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  dadosPessoais: any;
  dadosProfissionais: any;
  dadosLocalizacao: any;
  fotoperfil = "";
  complemento = "";

  profissao2 = "";
  valor2 = "";

  constructor(
    private getDados: DadosUsuarioProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      let data = JSON.stringify({
        email: this.navParams.get('email')
      });

      this.getDados.dadosUsuarioPessoal(data).then(resp =>{
        this.dadosPessoais = resp;      
        this.fotoperfil = this.dadosPessoais[0].fotoperfil;
        this.complemento = this.dadosPessoais[0].complemento;
      });
      

      this.getDados.dadosUsuarioProfissional(data).then(resp =>{
        this.dadosProfissionais = resp;
        this.profissao2 = this.dadosProfissionais[0].profissao2;
        this.valor2 = this.dadosProfissionais[0].valor2;
        console.log(this.dadosProfissionais);
      });

      this.getDados.dadosUsuarioLocalizacao(data).then(resp => {
        this.dadosLocalizacao = resp;
        console.log(this.dadosLocalizacao);
        console.log(this.dadosLocalizacao[0].latitude);
        console.log(this.dadosLocalizacao[0].longitude);
        this.adicionaMapa(this.dadosLocalizacao[0].latitude, this.dadosLocalizacao[0].longitude);
        this.adicionaMarcador();
      });
  }

  adicionaMapa(lat, lng){
    const mapOption = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disabledZoomDoubleClick: true,
      fullscreenControl: false,
      zoomControl: false,
      gestureHandling: 'none'
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
  }
  adicionaMarcador(){
      new google.maps.Marker({
      map: this.map,
      position: this.map.getCenter(),
      draggable: false
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarusuarioPage');
  }

}
