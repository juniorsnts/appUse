import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DadosFormulariosProvider } from '../../providers/dados-formularios/dados-formularios';

@IonicPage({
  name: 'dados-pessoais'
})
@Component({
  selector: 'page-form-d-pessoal',
  templateUrl: 'form-d-pessoal.html',
})
export class FormDPessoalPage {

  //dados recebidos do html(inputs) e enviar para bd
  nome = "";
  endereco = "";
  complemento = "";
  cidade = "";
  estado = "";
  bairro = "";
  telefone = "";
  cpf = "";
  base64Image = "";
  
  formPessoal: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private dadosFormulario: DadosFormulariosProvider,
    private camera: Camera,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
      this.formPessoal = this.formBuilder.group({
        nome: ['', Validators.compose([Validators.required])],
        endereco: ['', Validators.compose([Validators.required])],
        complemento: [''],
        cidade: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
        bairro: ['', Validators.compose([Validators.required])],
        telefone: ['', Validators.compose([Validators.required])],
        cpf: ['', Validators.compose([Validators.required])]
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDPessoalPage');
  }

  addPhoto(type){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    } 
    if(type == 'picture'){
      options.sourceType = this.camera.PictureSourceType.CAMERA;
    }
    if(type == 'gallery'){
      options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,'+imageData;      
    }, (err) => {
      console.log('imagem nao carregada');
    });     
  }

  salvarDados(){
    let data = JSON.stringify({
      email: this.navParams.get('email'),
      nome: this.nome,
      endereco: this.endereco,
      complemento: this.complemento,
      cidade: this.cidade,
      estado: this.estado,
      bairro: this.bairro,
      telefone: this.telefone,
      cpf: this.cpf,
      fotoPerfl: this.base64Image
    });
    let confirmar = this.alertCtrl.create({
      title: 'Seus dados estão corretos?',
      message: 'Você podera alterar esses dados depois',
      buttons: [{
        text: 'Confirmar',
        handler: ()=>{
          this.dadosFormulario.dadosPessoais(data).then(res => {
            if(res == "existeCpf"){
               let alert = this.alertCtrl.create({
                 message: 'O CPF digitado já existe em outro usuário',
                 buttons: [{text: 'ok'}]
               });
               alert.present();
            } else if (res == "sucesso"){
              let toast = this.toastCtrl.create({
                message: 'Dados Cadastrados',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.setRoot('dados-profissionais', {email: this.navParams.get('email')});
            } else {
              let alert = this.alertCtrl.create({
                message: 'Algo inesperado ocorreu!!! Tente mais tarde',
                buttons: [{text: 'ok'}]
              });
              alert.present();
            }    
          });
        }
      },
    {
      text: 'Cancelar',
      handler: ()=>{
        console.log('cancelar clicked');
      }
    }]
    });
    confirmar.present();
  }

}
