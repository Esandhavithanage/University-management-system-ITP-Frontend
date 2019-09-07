import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/Income';
import { Subscription } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialService } from 'src/app/services/financial.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'search-income',
  templateUrl: './search-income.component.html',
  styleUrls: ['./search-income.component.css']
})
export class SearchIncomeComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate1: NgbDate;
  toDate1: NgbDate

  fromDate2: string;
  toDate2: string;

  tableActive: boolean = false;
  filteredIncomes: Income[] = [];
  totalAmount = 0;
  totalRecords = 0;
  printObj = {};
  subs1: Subscription;

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal,
    calendar: NgbCalendar
    ) {
      config.backdrop = 'static';
      config.keyboard = false;

      this.fromDate1 = calendar.getToday();
      this.toDate1 = calendar.getNext(calendar.getToday(), 'd', 10);
     }

  ngOnInit() {
    
  }

  // configure date picker
  onDateSelection(date: NgbDate) {
    if (!this.fromDate1 && !this.toDate1) {
      this.fromDate1 = date;
    } else if (this.fromDate1 && !this.toDate1 && date.after(this.fromDate1)) {
      this.toDate1 = date;
    } else {
      this.toDate1 = null;
      this.fromDate1 = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate1 && !this.toDate1 && this.hoveredDate && date.after(this.fromDate1) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate1) && date.before(this.toDate1);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate1) || date.equals(this.toDate1) || this.isInside(date) || this.isHovered(date);
  }
  // end datepicker

  search(){
    this.filteredIncomes = [];
    this.totalAmount = 0;
    this.totalRecords = 0;

    this.fromDate2 = this.fromDate1.year.toString() + "-" + this.fromDate1.month.toString() + "-" + this.fromDate1.day.toString(); 
    this.toDate2 = this.toDate1.year.toString() + "-" + this.toDate1.month.toString() + "-" + this.toDate1.day.toString();

    console.log(this.fromDate2);
    console.log(this.toDate2);

    this.subs1 = this.financialService.searchIncomes(this.fromDate2, this.toDate2)
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
    // console.log("called");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
      fDate: this.fromDate2,
      tDate: this.toDate2
    };

    this.modelService.open(popupContent, { centered: true });

  }

  ngOnDestroy(){
    //this.subs1.unsubscribe();
  }

}
