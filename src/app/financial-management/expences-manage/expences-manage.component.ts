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

  addExpence(form: NgForm){
    let obj = {
      id: form.value.id,
      date: form.value.date,
      type: form.value.type,
      amount: form.value.amount,
    }; 

    let result = this.financialService.addExpence(obj);
    //console.log(result);
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

  getReport(popupContent){
    // console.log("report works");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };

    this.modelService.open(popupContent, { centered: true });

  }

  ngOnDestroy(){
    //this.subs1.unsubscribe();
  }

}
