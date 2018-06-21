import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DadosFormulariosProvider } from '../../providers/dados-formularios/dados-formularios';

@IonicPage()
@Component({
  selector: 'page-form-d-profissional',
  templateUrl: 'form-d-profissional.html',
})
export class FormDProfissionalPage {

  //dados do html
  profissao1 = "";
  valor1 = "";
  profissao2 = "";
  valor2 = "";

  formProf: FormGroup;
  profissoesDados: any;

  constructor(
    private toastCtrl: ToastController,
    private dadosFormulario: DadosFormulariosProvider,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.dadosFormulario.dadosProfissao().then(res => {
        this.profissoesDados = res;
      });  
      

    console.log(this.navParams.get('email'));
    this.formProf = this.formBuilder.group({
      profissao1: ['', Validators.required],
      valor1: ['', Validators.required],
      profissao2: ['', Validators.required],
      valor2: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDProfissionalPage');
  }

  salvarDados(){    
    let data = JSON.stringify({
      email: this.navParams.get('email'),
      profissao1: this.profissao1,
      valor1: this.valor1,
      profissao2: this.profissao2,
      valor2: this.valor2
    });
    let confirmar = this.alertCtrl.create({
      title: 'Seus dados estão corretos?',
      message: 'Você podera alterar esses dados depois',
      buttons: [{
        text: 'Confirmar',
        handler: ()=>{
          this.dadosFormulario.dadosProfissionais(data).then(resp => {
            if(resp == "sucesso"){
              let toast = this.toastCtrl.create({
                message: 'Dados Cadastrados',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();  
              this.navCtrl.setRoot('localizacao-usuario', {email: this.navParams.get('email')});            
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
      text: 'Cancelar'
    }]
    });
    confirmar.present();
  }   
}
