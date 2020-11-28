import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


import { ImageService } from 'src/app/services/image.service';
import { RecordsService } from "../../services/records.service";
import { RecordsComponent } from '../records.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  record : any = null;
  image : any = null;

  constructor(
    private router: Router,
    private recordsService: RecordsService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<RecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.imageService.getImage(this.data.record.image_id).subscribe(
      res => {
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${res.image}`);
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
