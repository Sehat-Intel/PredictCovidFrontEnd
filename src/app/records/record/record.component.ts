import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

import { ImageService } from 'src/app/services/image.service';
import { RecordsService } from 'src/app/services/records.service';
import { RecordsComponent } from '../records.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  image : any = null;

  constructor(
    private imageService: ImageService,
    private recordsService: RecordsService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<RecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _snackBar: MatSnackBar,
  ) {}


  message = new FormControl(`${this.data.record.message}`);

  ngOnInit(): void {
    this.subs.add( this.imageService.getImage(this.data.record.image_id).subscribe(
      res => {
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${res}`);
      }
        ,
      err => {
        console.log(err)
      }
    ));
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  };


  OnNoClick(): void {
    this.dialogRef.close();
  };

  onSave(){
    this.subs.add(this.recordsService.updateMessage(this.data.record._id, this.message.value).subscribe(
      res => {
        this.openSnackBar(res);
      },
      err => {
        console.log(err);
      }
    ));
  };

  openSnackBar(message) {
    this._snackBar.open(message, 'close', {
      duration: 5000
    });
  };


}
