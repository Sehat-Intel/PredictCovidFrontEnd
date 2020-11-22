import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsService } from 'src/app/services/records.service';
import {Location} from '@angular/common';

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
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.isValidId(params.id)
    })
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

  backClicked() {
    this.location.back();
  }

}
