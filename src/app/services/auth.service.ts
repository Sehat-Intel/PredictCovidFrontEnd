import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';

import firebase  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,
    public afAuth: AngularFireAuth,
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

  //  Sign in with Google
   loginWithGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
    AuthLogin(provider) {
      return firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)},
        err => {
          console.log(err);
        }
          // console.log(result)
          // let user = {
          //   email: result.user.email,
          //   password: result.user.uid
          // };
          // this.loginUser(user).subscribe(
          //   res => {
          //     this.router.navigate(['/records'])
          //     console.log(res)
          //     localStorage.setItem('token', res.token )

          //   },
          //   err => console.log(err)
          //   );
      ).catch((error) => {
          console.log(error)
      })
    }



  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }
}
