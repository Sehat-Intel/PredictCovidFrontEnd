import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Users } from "../models/users";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private subs = new SubSink();
  hide = true;

  signupForm: FormGroup;
  model: Users;
  title: string
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {spinnerService.isLoading.next(false); }


  ngOnInit(): void {
    this.createForm();
  }


  createForm(){
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get f() { return this.signupForm.controls }

  onSubmit(){
    if(!this.signupForm.invalid){
      this.model = this.signupForm.value;
      // console.log(this.model)
      this.subs.add(this.authService.signupUser(this.model)
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

