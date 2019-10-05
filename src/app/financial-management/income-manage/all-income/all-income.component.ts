import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Income } from 'src/app/models/Income';
import { Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'all-income',
  templateUrl: './all-income.component.html',
  styleUrls: ['./all-income.component.css']
})
export class AllIncomeComponent implements OnInit, OnDestroy {
  Incomes: Income[] = [];
  totalAmount = 0;
  totalRecords = 0;
  printObj = {};
  subs1: Subscription;
  updateObj;
  component;
  isUpdate;
  isDeleted: boolean = false;
  deleteObj: Income;
  empData: Object;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal, private http: HttpClient
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // configure data table
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    // get incomes
    this.financialService.getAllIncome().subscribe(result => {
      console.log(result);

      for (let i in result) {
        this.Incomes.push(result[i]);
        this.totalRecords++;
      }
      this.dtTrigger.next();

      this.calTotalAmount();
    });

  }

  // calculate total amount
  calTotalAmount() {
    for (let i in this.Incomes) {
      this.totalAmount += this.Incomes[i].amount;
    }
  }

  getReport(popupContent) {
    // console.log("called");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
    };

    this.modelService.open(popupContent, { centered: true });

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

    this.component = 'all';
    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true });

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

      } else if (result == "success") {
        console.log(result);
        for (let i in this.Incomes) {
          if (this.Incomes[i].paymentId == this.deleteObj.paymentId) {
            this.Incomes.splice(parseInt(i), 1);
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
    console.log("update row called");

    for (let i in this.Incomes) {
      if (this.Incomes[i].paymentId == obj.paymentId) {
        this.Incomes[i] = obj;
      }
    }

    this.calTotalAmount();
    this.modelService.dismissAll();
  }

  close() {
    this.modelService.dismissAll();
  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
