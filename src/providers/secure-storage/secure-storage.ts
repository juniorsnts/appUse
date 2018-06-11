import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Injectable()
export class SecureStorageProvider {

  storage = null;
  dados;

  constructor(
    private secureStorage: SecureStorage,
    public http: HttpClient) {
    this.secureStorage.create('usuarioStorage')
    .then((storage: SecureStorageObject) => {
      this.storage = storage;
    });
  }

  storageCadastro(usuario, senha){
    this.dados = JSON.stringify({ //converte string para json
      user: usuario,
      senha: senha
    });

    this.storage.set('usuarioStorage', this.dados).then(data => {
      console.log("data: " + data);
    }, error => {
      console.log("erro: "+ error);
    });

  }

  storageRecuperar(){
    return new Promise((resolve, reject) => {
      if(this.storage != null){
        this.storage.get('usuarioStorage').then(dadosUsuario => {
          this.dados = JSON.parse(dadosUsuario);
          resolve(this.dados);
        }, erro => {
          resolve("storageVazio");
          console.log("erro: "+erro);
        });
      } else {
        resolve("storageNulo");        
      }
    });
  }

  storageDeletar(){
    return new Promise((resolve, reject) => {
      if(this.storage != null){
        this.storage.remove('usuarioStorage').then(data => {
          resolve("storageRemovido");
        }, erro => {
          resolve("erroRemover");
        });
      } else {
        resolve("storageNulo");
      }
    });    
  }

}
