import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';

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
  
  constructor(
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
      this.adicionaMapa(position.coords.latitude, position.coords.longitude);
      this.adicionaMarcador(position.coords.latitude, position.coords.longitude);
      //adiciona no banco a localizacao atual
      console.log("adicionando no banco a localizacao", position);
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
  
  adicionaMarcador(lat, lng){
    let marcador = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable: true
    });

    let mensagem = "<p>Arraste para sua casa</p>"
    let janela = new google.maps.InfoWindow({
      content: mensagem
    });   
    this.movimentoMarcador(marcador, janela);
  }

  movimentoMarcador(marcador, janela){
    google.maps.event.addListener(marcador, 'dragend', (respEvent)=>{
      this.geolocation.getCurrentPosition(this.optionGeolocation)
      .then((position: Geoposition)=>{
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        janela.open(this.map, marcador);
        //atualiza no banco caso o marcador seja movido
        console.log(respEvent.latLng.lat(), respEvent.latLng.lng());
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
          //passa para a proxima pagina
        }
      },
    {
      text: 'cancelar',
      handler: () =>{
        console.log('cancel is clicked');
      }
    }]
    });
    alertConfirma.present();
  }
}
