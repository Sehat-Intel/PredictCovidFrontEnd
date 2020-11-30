import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSignUp(): void {
    this.dialogRef.close();
    this.router.navigate(['/signup'])
  }

}
