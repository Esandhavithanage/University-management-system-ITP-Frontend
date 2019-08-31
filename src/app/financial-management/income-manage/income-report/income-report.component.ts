import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.css']
})
export class IncomeReportComponent implements OnInit {
  @Input('printObj') printObj;
  
  constructor(private modelService: NgbModal) { }

  ngOnInit() {
  }

  close(){
    // console.log("closed");
    this.modelService.dismissAll();
  }

}
