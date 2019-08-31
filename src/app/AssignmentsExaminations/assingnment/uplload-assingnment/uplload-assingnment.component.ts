import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'uplload-assingnment',
  templateUrl: './uplload-assingnment.component.html',
  styleUrls: ['./uplload-assingnment.component.css']
})
export class UplloadAssingnmentComponent implements OnInit {
 subjects:any;
  constructor(private as:AssingmentService) { }

  ngOnInit() {

  }

}
