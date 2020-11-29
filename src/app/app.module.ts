import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { DialogComponent } from './records/dialog/dialog.component';
import { RecordsComponent } from './records/records.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { RecordComponent } from './records/record/record.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ErrorsComponent } from './shared/errors/errors.component';

import { ErrorHandler } from "@angular/core";
import { getErrorHandler, SentryErrorHandler  } from './shared/errors/SentryErrorHandler';






@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    RecordsComponent,
    RecordComponent,
    DialogComponent,
    SpinnerComponent,
    ErrorsComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    AuthGuard,
    {provide: ErrorHandler, useFactory: getErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
