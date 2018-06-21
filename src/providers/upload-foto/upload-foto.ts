import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@Injectable()
export class UploadFotoProvider {

  constructor(
    private file: File,
    private transfer: FileTransfer,
    public http: HttpClient) {
    console.log('Hello UploadFotoProvider Provider');
  }
  
  uploadImage(nomeImagem, imagem){
    
  }

}
