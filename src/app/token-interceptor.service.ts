import { Injectable } from '@angular/core';
import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { SpinnerService } from './services/spinner.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RecordComponent } from './records/record/record.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsComponent } from './shared/errors/errors.component';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    public spinnerService: SpinnerService,
    public dialog: MatDialog
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
          if(err.status == 401){
            errorMessage = `Error: ${err.error.message}\nMessage: ${err.statusText}\nStatus: ${err.status}`;
            this.openDialog(errorMessage);
          }
        } else{

        }
        errorMessage = `Error: ${err.error.message}
        Message: ${err.statusText}
        Status: ${err.status}`;
        //window.alert(errorMessage);
        throw new Error(errorMessage);
      }),
      finalize(
        () => {
          this.spinnerService.isLoading.next(false);
        }
      )
    )
  }

  openDialog(error): void {
    const dialogRef = this.dialog.open(ErrorsComponent, {
      data: {data: error}
    });
  }
}
