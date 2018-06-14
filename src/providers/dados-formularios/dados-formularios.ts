import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DadosFormulariosProvider {

  serverURL = "http://localhost:3000";

  constructor(public http: HttpClient) {
    console.log('Hello DadosFormulariosProvider Provider');
  }

  dadosPessoais(data){
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL+'/dadosPessoais', data, {headers: {"Content-Type":"application/json"}})
      .subscribe(res =>{
        resolve(res);
      }, err => {
      resolve("erro: "+err);
      });
    });
  }

  dadosProfissionais(data){
    return new Promise((resolve, reject) =>{
      this.http.post(this.serverURL+'/dadosProfissionais', data, {headers: {"Content-Type": "application/json"}})
      .subscribe(res => {
        resolve(res);
      }, err =>{
        resolve("erro: "+err);
      });
    });
  }

  dadosProfissao(){
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURL+'/buscaProfissoes').subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

}
