import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }



  getImage(id: string){
    return this.http.get<Image>(this.baseUrl+`/image/${id}`);
  }

}
