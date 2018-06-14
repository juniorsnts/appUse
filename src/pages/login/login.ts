import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import SHA_256 from 'sha256';
import { HomePage } from '../home/home';
import { AtualizarBdProvider } from '../../providers/atualizar-bd/atualizar-bd';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;

  //dados recebidos dos inputs do html
  email = "";
  senha = "";

  constructor(
    private atualizabdProvider: AtualizarBdProvider,
    private toastCrtrl: ToastController,
    private authProvider: AutenticacaoProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pageRecuperarSenha(){
    let recupera = this.alertCtrl.create({
      title: 'Recuperar senha',
      message: 'Digite o email da conta',      
      inputs: [{
        name: 'email',
        placeholder: 'Email'
      }],
      buttons: [{
        text: 'enviar',
        handler: recuperar => {
          this.atualizabdProvider.esqueciSenha(recuperar.email).then(resp => {
            console.log(resp);
            if(resp == "semCadastro"){
              let toast = this.toastCrtrl.create({
                message: "Este email não esta cadastrado",
                duration: 2000,
                position: "middle"
              });
              toast.present();
            } else if(resp == "emailFalha"){
              let toast = this.toastCrtrl.create({
                message: "Falha ao enviar email, tente mais tarde",
                duration: 2000,
                position: "middle"
              });
              toast.present();
            } else if(resp == "emailEnviado"){
              let toast = this.toastCrtrl.create({
                message: "Email com a nova senha enviado com sucesso para: "+recuperar.email,
                duration: 2000,
                position: "middle"
              });
              toast.present();              
            }
          });
        }
      },
    {
      text: 'cancelar',
      handler: data => {
        console.log('cancelado');
      }
    }]
    });
    recupera.present();
  }
  pageCadastro(){
    this.navCtrl.setRoot('cadastro');
  }

  loginUser(){
    let senha_criptografada = SHA_256(this.senha);
    this.authProvider.autenticaLogin(this.email, senha_criptografada).then((resp)=>{
      if(resp == 'sucessoLogin'){
        let toast = this.toastCrtrl.create({
          message: 'BEM VINDO',
          duration: 2500,
          position: 'bottom'
        });        
        toast.present();  
        this.navCtrl.setRoot(HomePage);
      } else if(resp == 'erroLogin'){
        let alert = this.alertCtrl.create({
          title: 'Dados inválidos',
          message: 'Email ou senha inválidos',
          buttons: [{
            text: 'ok'            
          }]
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
