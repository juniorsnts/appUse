import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { DadosFormulariosProvider } from '../../providers/dados-formularios/dados-formularios';
import { HomePage } from '../home/home';

declare var google;

@IonicPage({
  name: 'localizacao-usuario'
})
@Component({
  selector: 'page-localizacao-usuario',
  templateUrl: 'localizacao-usuario.html',
})
export class LocalizacaoUsuarioPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  optionGeolocation: GeolocationOptions;
  currentPosition: Geoposition
  
  latitudeReal: any;
  longitudeReal: any;
  latitude: any;
  longitude: any;
  
  constructor(
    private toastCtrl: ToastController,
    private dadosFormulario: DadosFormulariosProvider,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    this.localizacaoUsuario();
  }  
  
  localizacaoUsuario(){
    this.optionGeolocation = {
      enableHighAccuracy: true
    }

    this.geolocation.getCurrentPosition(this.optionGeolocation)
    .then((position: Geoposition)=>{
      this.currentPosition = position;
      this.latitudeReal = position.coords.latitude;
      this.longitudeReal = position.coords.longitude;
      this.adicionaMapa(position.coords.latitude, position.coords.longitude);
      this.adicionaMarcador();
    }, (error: PositionError) =>{
      alert("error:" + error.message);
    });
  }
  
  adicionaMapa(lat, lng){
    const mapOption = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disabledZoomDoubleClick: true,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
  }
  
  adicionaMarcador(){
    let marcador = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true
    });

    let mensagem = "<p>Arraste para próximo de sua casa</p>"
    let janela = new google.maps.InfoWindow({
      content: mensagem
    });   
    janela.open(this.map, marcador);
    this.movimentoMarcador(marcador);
  }

  movimentoMarcador(marcador){
    google.maps.event.addListener(marcador, 'dragend', (respEvent)=>{
      this.geolocation.getCurrentPosition(this.optionGeolocation)
      .then((position: Geoposition)=>{
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.latitude = respEvent.latLng.lat();
        this.longitude = respEvent.latLng.lng();
      });
    });
  }

  salvarDados(){
    let alertConfirma = this.alertCtrl.create({
      title: 'Seus dados estão corretos?',
      message: 'Você poderá alterar esses dados posteriormente',
      buttons: [{
        text: 'confirmar',
        handler: ()=>{
          if(this.latitude == null && this.longitude == null){
            let data = JSON.stringify({
              email: this.navParams.get('email'),
              latitude: this.latitudeReal,
              longitude: this.longitudeReal
            });
            this.dadosFormulario.dadosLocalizacao(data).then(resp => {
              if(resp == "sucesso"){
                let toast = this.toastCtrl.create({
                  message: 'Dados Cadastrados',
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
                this.navCtrl.setRoot(HomePage, {email: this.navParams.get('email')});              
              } else {
                let alert = this.alertCtrl.create({
                  message: 'Algo inesperado ocorreu!!! Tente mais tarde',
                  buttons: [{text: 'ok'}]
                });
                alert.present();
              }              
            });
                        
          } else {   
            let data = JSON.stringify({
              email: this.navParams.get('email'),
              latitude: this.latitude,
              longitude: this.longitude
            });   
            this.dadosFormulario.dadosLocalizacao(data).then(resp => {
              if(resp == "sucesso"){
                let toast = this.toastCtrl.create({
                  message: 'Dados Cadastrados',
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present(); 
                this.navCtrl.setRoot(HomePage, {email: this.navParams.get('email')});
              } else {
                let alert = this.alertCtrl.create({
                  message: 'Algo inesperado ocorreu!!! Tente mais tarde',
                  buttons: [{text: 'ok'}]
                });
                alert.present();
              }    
            });     
          }          
        }
      },
    {
      text: 'cancelar'
    }]
    });
    alertConfirma.present();
  }
}
