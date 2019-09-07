import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Income } from 'src/app/models/Income';
import { Subscription } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
//import * as $ from 'jquery';



@Component({
  selector: 'all-income',
  templateUrl: './all-income.component.html',
  styleUrls: ['./all-income.component.css']
})
export class AllIncomeComponent implements OnInit {
  Incomes: Income[] = [];
  totalAmount = 0;
  totalRecords = 0;
  printObj = {};
  subs1: Subscription;

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    

    // get incomes
    this.financialService.getAllIncome().subscribe(result => {
      console.log(result);

      for (let i in result) {
        this.Incomes.push(result[i]);
        this.totalRecords++;
        this.totalAmount += result[i].amount;
      }
    });

  }

  getReport(popupContent) {
    // console.log("called");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
    };

    this.modelService.open(popupContent, { centered: true });

  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
  }

}
