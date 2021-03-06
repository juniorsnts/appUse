import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DadosUsuarioProvider {

  serverURL = "http://useserver.duckdns.org:3005";

  constructor(public http: HttpClient) {
    
  }

  dadosUsuarioPessoal(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL+'/visualizarDadosPessoais', data, {headers: {"Content-Type": "application/json"}})
      .subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }
  dadosUsuarioProfissional(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL+'/visualizarDadosProfissionais', data, {headers: {"Content-Type": "application/json"}})
      .subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }
  dadosUsuarioLocalizacao(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL+'/visualizarLocalizacao', data, {headers: {"Content-Type": "application/json"}})
      .subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

}
