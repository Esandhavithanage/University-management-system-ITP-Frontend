import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Expence } from 'src/app/models/Expence';

@Component({
  selector: 'search-expence',
  templateUrl: './search-expence.component.html',
  styleUrls: ['./search-expence.component.css']
})
export class SearchExpenceComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = true;
  hoveredDate: NgbDate;

  fromDate1: NgbDate;
  toDate1: NgbDate

  fromDate2: string;
  toDate2: string;

  tableActive: boolean = false;
  filteredExpences: Expence[] = [];
  totalAmount = 0;
  totalRecords = 0;
  printObj = {};
  updateObj: Expence;
  subs1: Subscription;
  deleteObj;
  isDeleted: boolean = false;
  isUpdate: boolean = false;
  component: string;

  constructor(
    private financialService: FinancialService,
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

  search() {
    this.filteredExpences = [];
    this.totalAmount = 0;
    this.totalRecords = 0;

    this.fromDate2 = this.fromDate1.year.toString() + "-" + this.fromDate1.month.toString() + "-" + this.fromDate1.day.toString();
    this.toDate2 = this.toDate1.year.toString() + "-" + this.toDate1.month.toString() + "-" + this.toDate1.day.toString();

    console.log(this.fromDate2);
    console.log(this.toDate2);

    this.subs1 = this.financialService.searchExpences(this.fromDate2, this.toDate2)
      .subscribe(income => {

        for (let i in income) {
          this.filteredExpences.push(income[i]);
        }

        for (let i of this.filteredExpences) {
          i.date = i.date.substring(0, 10);
          this.calTotalAmount();
          this.totalRecords += 1;
        }

        this.tableActive = true;
        //console.log(this.filteredIncomes);
      });
  }

  // calculate total amount
  calTotalAmount(){
    for(let i in this.filteredExpences){
      this.totalAmount += this.filteredExpences[i].amount;
    }
  }

  getReport(popupContent) {
    // console.log("called");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
      fDate: this.fromDate2,
      tDate: this.toDate2
    };

    this.modelService.open(popupContent, { centered: true });

  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
  }

  // pop up update model
  updateBtn(expense: Expence, popupContent2) {
    console.log(expense);

    this.updateObj = {
      amount: expense.amount,
      date: expense.date,
      employeeId: expense.employeeId,
      employeeName: expense.employeeName,
      expenseId: expense.expenseId,
      type: expense.type
    };

    this.component = 'search';
    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true });

  }

  // open delete confirm box
  deleteBtn(expense, deleteConfirm) {
    this.isDeleted = true;
    console.log(expense);

    this.deleteObj = expense;
    this.modelService.open(deleteConfirm);

  }

  // delete the record
  delete() {
    console.log(this.deleteObj.expenseId);

    this.financialService.deleteExpense(this.deleteObj.expenseId).subscribe(result => {
      console.log(result);

      if (result) {
        for (let i in this.filteredExpences) {
          if (this.filteredExpences[i].expenseId == this.deleteObj.expenseId) {
            this.filteredExpences.splice(parseInt(i), 1);
          }
        }
        this.totalRecords--;
        this.calTotalAmount();
        this.modelService.dismissAll();
        // this.isDeleted = true;
      } else {
        this.isDeleted = false;
      }
    });

  }

  // close all models
  close() {
    this.modelService.dismissAll();
  }

  // update row after update
  updateRow(obj) {
    console.log("update row called");

    for (let i in this.filteredExpences) {
      if (this.filteredExpences[i].expenseId == obj.expenseId) {
        this.filteredExpences[i] = obj;
      }
    }

    this.calTotalAmount();
    this.modelService.dismissAll();
  }

}
