import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
  name: 'dados-profissionais'
})
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

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
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
    let confirmar = this.alertCtrl.create({
      title: 'Seus dados estão corretos?',
      message: 'Você podera alterar esses dados depois',
      buttons: [{
        text: 'Confirmar',
        handler: ()=>{
          //dados pra enviar pro bd
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
