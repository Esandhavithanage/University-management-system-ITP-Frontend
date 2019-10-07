import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription, Subject } from 'rxjs';
import { MoneyRequest } from 'src/app/models/MoneyRequestF';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

export interface Date{
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'money-request',
  templateUrl: './money-request.component.html',
  styleUrls: ['./money-request.component.css']
})
export class MoneyRequestComponent implements OnInit {
  subs1: Subscription;
  subs2: Subscription;
  requests: MoneyRequest[] = [];
  totalRecords = 0;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  requestObj;
  updateObj = {};
  requestId;
  modelDate: Date = {
    year: 0,
    month: 0,
    day: 0
  };
  empIdError: boolean = false;
  dateError: boolean = false;
  inserted: boolean = false;
  updated: boolean = false;
  error: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private financialService: FinancialService,
    private employeeService: EmployeeService,
    private config: NgbModalConfig,
    private modelService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    // get requests
    this.subs1 = this.financialService.getMRequests().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.requests.push(result[i]);
        this.totalRecords++;
      }
      this.dtTrigger.next();
    });

    // set date
    let date = new Date();
    let today = date.toJSON().toString();
    this.modelDate = {
      year: parseInt(today.substring(0, 4)),
      month: parseInt(today.substring(5, 7)),
      day: parseInt(today.substring(8, 10))
    };
    console.log(today);

  }

  sendWindowOpen(popupElement) {
    this.inserted = false;
    this.updated = false;
    this.error = false;
    this.empIdError = false;
    this.dateError = false;
    this.updateObj = {};
    this.modelService.open(popupElement, { centered: true, scrollable: true });
  }

  addOrUpdate(form: NgForm) {
    this.inserted = false;
    this.updated = false;
    this.error = false;
    this.empIdError = false;
    this.dateError = false;

    let date = this.modelDate.year + "-" + this.modelDate.month + "-" + this.modelDate.day;

    if (this.modelDate == null || this.modelDate == undefined) {
      console.log("date invalid");
      this.dateError = true;

    } else {

      if (!this.isUpdate) {
        this.requestObj = {
          employeeId: form.value.empId,
          date: date,
          description: form.value.description,
          amount: form.value.amount
        };
        //console.log(this.requestObj);
        this.employeeService.addMRequests(this.requestObj).subscribe(result => {
          if(result == "success"){
            this.inserted = true;
            this.isUpdate = false;
            this.requests.push(this.requestObj);
            form.resetForm();
            this.modelService.dismissAll();
          }else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.empIdError = true;
          }else{  
            this.error = true;
          }
        });
        this.totalRecords++;

      } else if (this.isUpdate) {
        this.requestObj = {
          empId: form.value.empId,
          date: date,
          amount: form.value.amount,
          description: form.value.description,
          requestId: this.requestId
        };

        this.subs2 = this.employeeService.updateMRequests(this.requestObj).subscribe(result => {
          if (result == "success") {
            console.log(result);
            this.updated = true;
            this.updateObj = {};
            this.isUpdate = false;
            form.resetForm();
            this.modelService.dismissAll();

            for (let i in this.requests) {
              if (this.requests[i].moneyRequestId == this.requestObj.requestId) {
                this.requests[i] = this.requestObj;
              }
            }
          }else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.empIdError = true;
          }else{
            this.error = true;
          }
        });
      }
    }

  }

  edit(e, popupElement) {
    this.inserted = false;
    this.updated = false;
    this.error = false;
    this.empIdError = false;
    this.dateError = false;

    this.modelDate = {
      year: parseInt(e.date.substring(0, 4)),
      month: parseInt(e.date.substring(5, 7)),
      day: parseInt(e.date.substring(8, 10))
    };

    this.requestId = e.moneyRequestId;
    this.updateObj = {
      id: e.moneyRequestId,
      description: e.description,
      amount: e.amount,
      empId: e.employeeId
    };
    this.isUpdate = true;
    this.modelService.open(popupElement, { centered: true, scrollable: true });
    
  }

  close() {
    this.modelService.dismissAll();
    this.isUpdate = false;
    this.updateObj = {};
  }


}
