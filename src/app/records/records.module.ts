import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //gives access to common directives
import { RecordsComponent } from './records.component';
import { RecordComponent } from './record/record.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MatDialogModule } from '@angular/material/dialog';

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
  ],
  exports: [
    RouterModule,
  ]
})
export class RecordsModule  {
  constructor() {
    console.log('records module loaded');

  }

}
