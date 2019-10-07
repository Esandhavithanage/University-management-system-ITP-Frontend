import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expence } from 'src/app/models/Expence';
import { Subscription } from 'rxjs';

@Component({
  selector: 'expences-manage',
  templateUrl: './expences-manage.component.html',
  styleUrls: ['./expences-manage.component.css']
})
export class ExpencesManageComponent implements OnInit, OnDestroy {
  tableActive: boolean = false;
  filteredExpenses: Expence[] = [];
  dateFrom;
  dateTo;
  totalAmount = 0;
  totalRecords = 0;
  printObj;
  subs1: Subscription;

  constructor(
    private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }



  search(form){
    this.dateFrom = form.value.dateFrom;
    this.dateTo = form.value.dateTo;
    this.subs1 = this.financialService.searchExpences(this.dateFrom, this.dateTo).subscribe(expence => {
      for(let i in expence){
        console.log(expence);
        this.filteredExpenses.push(expence[i]);
      }

      for(let i of this.filteredExpenses){
        i.date = i.date.substring(0, 10);
        this.totalAmount += i.amount;
        this.totalRecords += 1;
      }

      this.tableActive = true;
    });
  }



  ngOnDestroy(){
    //this.subs1.unsubscribe();
  }

}
