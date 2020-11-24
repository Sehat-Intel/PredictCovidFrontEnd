import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.loggedIn()){
      this.router.navigate(['/records'])
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    if( !this.loginForm.invalid ){
   this.authService.loginUser(this.loginForm.value)
   .subscribe(
    res => {
      this.router.navigate(['/records'])
      console.log(res)
      localStorage.setItem('token', res.token )

    },
    err => console.log(err)
    )}
  };

}
