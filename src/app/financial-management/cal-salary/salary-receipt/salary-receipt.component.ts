import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'salary-receipt',
  templateUrl: './salary-receipt.component.html',
  styleUrls: ['./salary-receipt.component.css']
})
export class SalaryReceiptComponent implements OnInit {
  @Input('printObj') printObj;

  constructor(private modelService: NgbModal) {
  }

  ngOnInit() {
  }

  close(){
    // console.log("closed");
    this.modelService.dismissAll();
  }

}
