import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


getRecords(){
  return this.http.get<any>(this.baseUrl+'/records')
}

getSelectedRecord(id: string): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/records/${id}`);
}

updateMessage(id: string, message: string): Observable<any>{
  console.log(id, message)
  return this.http.post<any>(`${this.baseUrl}/records/${id}`, {message: message});
}

}
