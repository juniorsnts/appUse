import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AutenticacaoProvider {

  serverURL = "http://useserver.duckdns.org:3005";

  constructor(public http: HttpClient) {
    console.log('Hello AutenticacaoProvider Provider');
  }  

  autenticaLogin(email, senha){

    let data = JSON.stringify({
      email: email,
      senha: senha
    });

    return new Promise((resolve, reject)=>{
      this.http.post(this.serverURL+'/loginUsuario', data, {headers: {'Content-Type': 'application/json'}})
      .subscribe(res =>{
        resolve(res);
      }, (erro) =>{
        resolve('erroLogin');
      });
    });
  }

  autenticaCadastro(email, senha){
    let data = JSON.stringify({
      email: email,
      senha: senha
    });

    return new Promise((resolve, reject)=>{
      this.http.post(this.serverURL+'/cadastroUsuario', data, {headers: {'Content-Type': 'application/json'}})
      .subscribe(res =>{
        resolve(res);
      }, (err)=>{
        resolve('erroCadastro');
      });
    });
  }

}
