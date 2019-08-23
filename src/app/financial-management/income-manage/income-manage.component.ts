import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { NgForm } from '@angular/forms';
import { Income } from 'src/app/models/Income';
import { map } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'income-manage',
  templateUrl: './income-manage.component.html',
  styleUrls: ['./income-manage.component.css']
})
export class IncomeManageComponent implements OnInit {

  tableActive: boolean = false;
  filteredIncomes: Income[] = [];
  totalAmount = 0;
  totalRecords = 0;
  printObj = {};
  fromDate;
  toDate;

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
  }

  search(form: NgForm){
    //console.log(form.value);
    this.fromDate = form.value.dateFrom;
    this.toDate = form.value.dateTo;

    this.financialService.searchIncomes(this.fromDate, this.toDate)
    .subscribe(income => {
      
      for(let i in income){
        this.filteredIncomes.push(income[i]);
      }

      for(let i of this.filteredIncomes){
        i.date = i.date.substring(0, 10);
        this.totalAmount += i.amount;
        this.totalRecords += 1;
      }

      this.tableActive = true;
      //console.log(this.filteredIncomes);
    });
  }

  getReport(popupContent){
    // console.log("report works");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
      fDate: this.fromDate,
      tDate: this.toDate
    };

    this.modelService.open(popupContent, { centered: true });

  }


}
