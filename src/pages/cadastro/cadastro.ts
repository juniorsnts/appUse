import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import SHA_256 from 'sha256';
import { FormDPessoalPage } from '../form-d-pessoal/form-d-pessoal';

@IonicPage({
  name: "cadastro"
})
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formCad: FormGroup;

  //dados recebidos dos inputs html
  // nomeUsuario="";
  email="";
  senha="";

  constructor(
    private toastCrtrl: ToastController,
    private alertCtrl: AlertController,
    private authProvider: AutenticacaoProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.formCad = this.formBuilder.group({
        // nomeUsuario: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required])]      
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  pageLogin(){
    this.navCtrl.setRoot('login');
  }

  cadastrar(){
    let senha_criptografada = SHA_256(this.senha);
      this.authProvider.autenticaCadastro(this.email, senha_criptografada).then((resp)=>{
        if(resp == 'sucessoCadastro'){
          let toast = this.toastCrtrl.create({
            message: 'CADASTRADO COM SUCESSO',
            duration: 2500,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot(FormDPessoalPage, {email: this.email});       
        } else if(resp == 'emailExiste'){
          let alert = this.alertCtrl.create({
            title: 'Email existente',
            message: 'Esse email já foi cadastrado'
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: 'Algo inesperado ocorreu',
            buttons: [{
              text: 'ok'            
            }]
          });
          alert.present();
        }
      });
  }

}
