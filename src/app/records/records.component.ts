import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Router } from "@angular/router";
import { SubSink } from "subsink";

import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { RecordComponent } from './record/record.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit, OnDestroy {
  records = [];
  private subs = new SubSink();

  constructor(private recordsService: RecordsService,
    private router: Router,
    public dialog: MatDialog
    ) { }


  ngOnInit(): void {
    //this.openDialog()
    this.subs.add( this.recordsService.getRecords()
    .subscribe(
      res => {
        this.records = res
    },
      err => {
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate(['/login'])
          }
          if(err.status == 500){
            this.router.navigate(['/login'])
          }
        }
      }
    ));
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }



  openDialog(){
    this.dialog.open(DialogComponent)
  }

  openRecordDialog(record){
    //console.log(record)
    this.dialog.open(RecordComponent, {
      data: { record: record }
    });
  }

}
