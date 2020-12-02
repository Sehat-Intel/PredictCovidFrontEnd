import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }



  getImage(id: string): Observable<any>{
    return this.http.get(this.baseUrl+`/image/${id}`);
  }

}
