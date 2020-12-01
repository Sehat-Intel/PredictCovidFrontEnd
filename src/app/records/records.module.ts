import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //gives access to common directives
import { RecordsComponent } from './records.component';
import { RecordComponent } from './record/record.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const recordRoutes : Routes= [
  {
        path: '' ,
        component: RecordsComponent,
        canActivate: [AuthGuard]
  }];

@NgModule({
  declarations: [
    RecordsComponent,
    RecordComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recordRoutes),
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    RouterModule
  ]
})
export class RecordsModule  {
}
