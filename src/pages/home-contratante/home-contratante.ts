import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { LocalizacaoGeralProvider } from '../../providers/localizacao-geral/localizacao-geral';

declare var google;

@IonicPage({
  name: 'home-contratante'
})
@Component({
  selector: 'page-home-contratante',
  templateUrl: 'home-contratante.html',
})
export class HomeContratantePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  optionGeolocation: GeolocationOptions;
  currentPosition: Geoposition;
  marcadores: any;

  constructor(   
    private locations: LocalizacaoGeralProvider, 
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
      this.adicionaMarcador();
    }, (error: PositionError) =>{
      alert("error:" + error.message);
    });
  }

  adicionaMapa(lat, lng){
    const mapOption = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disabledZoomDoubleClick: true,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
  }

  adicionaMarcador(){
    this.locations.localizacaoGeral().then(resp => {
      this.marcadores = resp;
      for(let i=0; i<this.marcadores.length; i++){
        let marcador = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(this.marcadores[i].latitude, this.marcadores[i].longitude)
        });  

        let informacaoUsuario = //UTILIZAR SOMENTE HTML PURO, SEM IONIC
        '<strong>'+this.marcadores[i].emailfk+'</strong>';
        
        let infoWindow = new google.maps.InfoWindow({
          content: informacaoUsuario
        });
        google.maps.event.addListener(marcador, 'click', (event) => {
          console.log(this.marcadores[i].emailfk);
          infoWindow.open(this.map, marcador);
          //this.navCtrl.push('visualiza-usuario', {email: this.marcadores[i].emailfk});
        });
      }   
    });
  }
}
