import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'view-assingnment',
  templateUrl: './view-assingnment.component.html',
  styleUrls: ['./view-assingnment.component.css']
})
export class ViewAssingnmentComponent implements OnInit {
  subjects:any;
  constructor(private as:AssingmentService) { }

  ngOnInit() {
    this.as.getAssisment('IT2016').subscribe(res => {
      console.log(res);
      this.subjects=res;
    });
  }

}
