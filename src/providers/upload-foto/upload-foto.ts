import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
@Injectable()
 
export class UploadFotoProvider {

  
  constructor(
    private transfer: FileTransfer,
    public http: HttpClient) {
      console.log('Hello UploadFotoProvider Provider');
    }

    
    
    uploadImage(nomeImagem, imagem){
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'fotoPerfil',
      httpMethod: 'POST',
      headers: {"Content-Type": "multipart/form-data"}
    }  

    fileTransfer.upload(imagem, 'http://useserver.duckdns.org:3005/uploads', options).then(resp =>{
      console.log(resp);
    }, (err) => {
      console.log(err);      
    }); 
    
  }

}
