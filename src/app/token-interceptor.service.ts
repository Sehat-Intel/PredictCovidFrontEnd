import { Injectable } from '@angular/core';
import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { SpinnerService } from './services/spinner.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
      finalize(
        () => {
          this.spinnerService.isLoading.next(false);
        }
      )
    )
  }
}
