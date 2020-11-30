import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';


import { ImageService } from 'src/app/services/image.service';
import { RecordsComponent } from '../records.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  record : any = null;
  image : any = null;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<RecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.imageService.getImage(this.data.record.image_id).subscribe(
      res => {
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${res}`);
      }
        ,
      err => {
        console.log(err)
      }
    )
  }


  OnNoClick(): void {
    this.dialogRef.close();
  }

}
