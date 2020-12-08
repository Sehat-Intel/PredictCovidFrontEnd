import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { firebaseConfig } from '../environments/environment'


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { DialogComponent } from './records/dialog/dialog.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { ErrorHandler } from "@angular/core";
import { getErrorHandler } from './shared/errors/SentryErrorHandler';
import { RecordComponent } from './records/record/record.component';
import { ErrorsComponent } from './shared/errors/errors.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ErrorsComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  entryComponents: [DialogComponent, RecordComponent, ErrorsComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    AuthGuard,
    {provide: ErrorHandler, useFactory: getErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
