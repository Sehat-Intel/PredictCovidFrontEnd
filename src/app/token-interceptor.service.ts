import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeader : {
        Authorization : 'Bearer xx.yy.xx'
      }
    })
    return next.handle(tokenizedReq)
  }
}
