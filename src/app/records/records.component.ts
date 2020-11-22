import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  records = [];

  constructor(private recordsService: RecordsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.recordsService.getRecords()
    .subscribe(
      res => this.records = res,
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
    )
  }

  view(id){
    this.router.navigate(['/record'],{
      queryParams: { id : id }
    });
  }

}
