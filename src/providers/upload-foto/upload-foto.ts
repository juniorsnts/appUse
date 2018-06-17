import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';

@Injectable()
export class UploadFotoProvider {

  constructor(
    private fileTranfer: FileTransfer,
    public http: HttpClient) {
    console.log('Hello UploadFotoProvider Provider');
  }

}
