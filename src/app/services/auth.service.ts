import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  signupUser(user: Users){
    return this.http.post<any>(this.baseUrl+'/signup', user)
  }

  loginUser(user){
    return this.http.post<any>(this.baseUrl+'/login', user);
  }
}
