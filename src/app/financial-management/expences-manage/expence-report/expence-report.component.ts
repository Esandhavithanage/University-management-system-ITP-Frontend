import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'expence-report',
  templateUrl: './expence-report.component.html',
  styleUrls: ['./expence-report.component.css']
})
export class ExpenceReportComponent implements OnInit {
  @Input('printObj') printObj;

  constructor(private modelService: NgbModal) { }

  ngOnInit() {
  }

  close(){
    // console.log("closed");
    this.modelService.dismissAll();
  }

}
