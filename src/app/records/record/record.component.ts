import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { RecordsService } from "../../services/records.service";
import { RecordsComponent } from '../records.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  record : any = null;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private recordsService: RecordsService,
    public dialogRef: MatDialogRef<RecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  isValidId(id){
    this.recordsService.getSelectedRecord(id).subscribe( res => {
      this.record = res;
      //console.log(res)
    }, err => {
      console.log(err)
    } )
  }

  saveMessage(message){
    console.log(message.value)
    this.recordsService.updateMessage(this.record._id, message.value).subscribe( res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
