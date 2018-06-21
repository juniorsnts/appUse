import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalizacaoGeralProvider {

  serverURL = "http://useserver.duckdns.org:3005";

  constructor(public http: HttpClient) {
    console.log('Hello LocalizacaoGeralProvider Provider');
  }

  localizacaoGeral(){
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURL+'/localizacaoGeral', {headers: {"Content-Type": "application/json"}}).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

}
