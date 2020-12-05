import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private spinnerService: SpinnerService
  ) {
    spinnerService.isLoading.next(false);
   }


  ngOnInit(): void {
    this.createForm();
    if (this.authService.loggedIn()){
      this.router.navigate(['/records'])
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    if( !this.loginForm.invalid ){

    this.subs.add( this.authService.loginUser(this.loginForm.value)
    .subscribe(
     res => {
       this.router.navigate(['/records'])
       console.log(res)
       localStorage.setItem('token', res.token )

     },
     err => console.log(err)
     ));
    };



  };

}
