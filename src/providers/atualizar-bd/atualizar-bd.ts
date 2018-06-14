import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AtualizarBdProvider {

  serverURL = "http://localhost:3000";

  constructor(public http: HttpClient) {
    console.log('Hello AtualizarBdProvider Provider');
  }

  esqueciSenha(email){
    let data = JSON.stringify({
      email: email
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL+'/esqueciSenha', data, {headers: {"Content-Type": "application/json"}})
      .subscribe(res =>{
        resolve(res);
      }, err => {
        resolve("erroEsqueciSenha");
      });
    });
  }

}
