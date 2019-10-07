import { Component, OnInit } from '@angular/core';
import { Expence } from 'src/app/models/Expence';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FinancialService } from 'src/app/services/financial.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'all-expence',
  templateUrl: './all-expence.component.html',
  styleUrls: ['./all-expence.component.css']
})
export class AllExpenceComponent implements OnInit {
  totalAmount = 0;
  totalRecords = 0;
  printObj;
  expenses: Expence[] = [];
  updateObj: Expence;
  isUpdate: boolean = false;
  deleteObj;
  isDeleted: boolean = false;
  component: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    
    // get all expences
    this.financialService.getAllExpences().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.expenses.push(result[i]);
        this.calTotalAmount();
        this.totalRecords++;
      }
      this.dtTrigger.next();
    });

  }

  // calculate total amount
  calTotalAmount(){
    for(let i in this.expenses){
      this.totalAmount += this.expenses[i].amount;
    }
  }

  // print summary
  getReport(popupContent1){
    // console.log("report works");
    this.printObj = {
      totalAmount: this.totalAmount,
      totalRecords: this.totalRecords,
    };

    this.modelService.open(popupContent1, { centered: true });

  }

  // pop up update model
  updateBtn(expense: Expence, popupContent2){
    console.log(expense);

    this.updateObj = {
      amount: expense.amount,
      date: expense.date,
      employeeId: expense.employeeId,
      employeeName: expense.employeeName,
      expenseId: expense.expenseId,
      type: expense.type
    };

    this.component = 'all';
    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true });

  }

  // open delete confirm box
  deleteBtn(expense, deleteConfirm){
    this.isDeleted = true;
    console.log(expense);

    this.deleteObj = expense;
    this.modelService.open(deleteConfirm); 

  }

  // delete the record
  delete(){
    console.log(this.deleteObj.expenseId);

    this.financialService.deleteExpense(this.deleteObj.expenseId).subscribe(result => {
      console.log(result);

      if(result){
        for(let i in this.expenses){
          if(this.expenses[i].expenseId == this.deleteObj.expenseId){
            this.expenses.splice(parseInt(i), 1);
          }
        }
        this.calTotalAmount();
        this.totalRecords--;
        this.modelService.dismissAll();
        // this.isDeleted = true;
      }else{
        this.isDeleted = false;
      }
    });

  }

  // close all models
  close(){
    this.modelService.dismissAll();
  }

  // update row after update
  updateRow(obj){
    console.log("update row called");

    for(let i in this.expenses){
      if(this.expenses[i].expenseId == obj.expenseId){
        this.expenses[i] = obj;
      }
    }

    this.calTotalAmount();
    this.modelService.dismissAll();
  }

}
