import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app-before-adding-material/src/app/services/auth.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
  }
  title = 'Sehat Intel';
}
