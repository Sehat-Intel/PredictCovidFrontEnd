import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,
    private router: Router) { }

  signupUser(user: Users): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/signup', user)
  }

  loginUser(user): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/login', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
    //double negate so it will return a boolean
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
