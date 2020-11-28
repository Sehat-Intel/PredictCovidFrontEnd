import { Injectable } from '@angular/core';
import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { SpinnerService } from './services/spinner.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    public spinnerService: SpinnerService
  ) { }
  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.isLoading.next(true);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq).pipe(
      catchError((err) => {
        console.log(err)
        let errorMessage = '';
        if(err instanceof HttpErrorResponse){

        } else{
          //client side error
        }
        errorMessage = `Error: ${err.error.message}\nMessage: ${err.message}\nStatus: ${err.status}`;
        window.alert(errorMessage);
        throw new Error(errorMessage);
      }),
      finalize(
        () => {
          this.spinnerService.isLoading.next(false);
        }
      )
    )
  }
}
