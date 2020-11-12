import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  records = [];

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.getRecords()
    .subscribe(
      res => this.records = res,
      err => console.log(err)
    )
  }

}
