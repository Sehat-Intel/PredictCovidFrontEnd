import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }



getRecords(){
  return this.http.get<any>(this.baseUrl+'/records')
}

getSelectedRecord(id: string){
  return this.http.get<any>(`${this.baseUrl}+'/records/+${id}`);
}

}
