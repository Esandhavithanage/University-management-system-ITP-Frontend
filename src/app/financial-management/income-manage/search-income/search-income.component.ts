import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/Income';
import { Subscription, Subject } from 'rxjs';
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
  isCollapsed: boolean = true;
  updateObj;
  component;
  isUpdate: boolean = true;
  isDeleted: boolean = false;
  deleteObj: Income;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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

  // calculate total amount
  calTotalAmount(){
    for(let i in this.filteredIncomes){
      this.totalAmount += this.filteredIncomes[i].amount;
    }
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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.subs1 = this.financialService.searchIncomes(this.fromDate2, this.toDate2)
    .subscribe(income => {
      
      for(let i in income){
        this.filteredIncomes.push(income[i]);
      }
      
      this.dtTrigger.next();

      for(let i of this.filteredIncomes){
        i.date = i.date.substring(0, 10);
        this.totalRecords += 1;
      }
      

      this.calTotalAmount();
      this.tableActive = true;
      //console.log(this.filteredIncomes);
    });
  }

    // pop up update model
    updateBtn(income: Income, popupContent2) {
      //console.log(income);
  
      this.updateObj = {
        amount: income.amount,
        date: income.date,
        paymentId: income.paymentId,
        courseId: income.courseId,
      };
  
      this.component = 'search';
      this.isUpdate = true;
      this.modelService.open(popupContent2, { centered: true });
  
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

    // open delete confirm box
    deleteBtn(expense, deleteConfirm) {
      this.isDeleted = false;
      console.log(expense);
  
      this.deleteObj = expense;
      this.modelService.open(deleteConfirm);
  
    }
  
    // delete the record
    delete() {
      this.isDeleted = false;
      console.log(this.deleteObj.paymentId);
  
    this.financialService.deleteIncome(this.deleteObj.paymentId).subscribe(result => {
        console.log(result);
  
        if (result == "error") {
          this.isDeleted = true;
          
        } else if(result == "success") {
          console.log(result);
          for (let i in this.filteredIncomes) {
            if (this.filteredIncomes[i].paymentId == this.deleteObj.paymentId) {
              this.filteredIncomes.splice(parseInt(i), 1);
            }
          }
          this.isDeleted = false;
          this.totalRecords--;
          this.calTotalAmount();
          this.modelService.dismissAll();
          
        }
      });
  
    }

    
  // update row after update
  updateRow(obj) {
    console.log(obj);

    for (let i in this.filteredIncomes) {
      if (this.filteredIncomes[i].paymentId == obj.paymentId) {
        this.filteredIncomes[i] = obj;
      }
    }

    this.calTotalAmount();
    this.modelService.dismissAll();
  }

  close(){
    this.modelService.dismissAll();
  }

  ngOnDestroy(){
    //this.subs1.unsubscribe();
  }

}
