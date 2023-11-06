import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private url : string = `${environment.apiUrl}/image/uploadImages`;

  constructor(private http : HttpClient) { }

  fileupload(data : FormData){
    return this.http.post(this.url, data)
  }
}
