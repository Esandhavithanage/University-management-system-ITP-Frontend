import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';
import { MoneyRequest } from 'src/app/models/MoneyRequestF';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  modelDate;
  empIdError: boolean = false;
  dateError: boolean = false;

  constructor(private financialService: FinancialService,
    private employeeService: EmployeeService,
    private config: NgbModalConfig,
    private modelService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // get requests
    this.subs1 = this.financialService.getMRequests().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.requests.push(result[i]);
        this.totalRecords++;
      }
    });

  }

  sendWindowOpen(popupElement) {
    this.modelService.open(popupElement, { centered: true, scrollable: true });
  }

  addOrUpdate(form: NgForm) {
    let date = this.modelDate;

    if (this.modelDate == null || this.modelDate == undefined) {

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

          }else if(result == ""){

          }else{

          }
        });
        this.totalRecords++;

        this.requests.push(this.requestObj);
        form.resetForm();

      } else if (this.isUpdate) {
        this.requestObj = {
          empId: form.value.empId,
          date: form.value.date,
          amount: form.value.amount,
          description: form.value.description,
          requestId: this.requestId
        };

        this.subs2 = this.employeeService.updateMRequests(this.requestObj).subscribe(result => {
          if (result) {
            console.log(result);

            this.isUpdate = false;
            form.resetForm();

            for (let i in this.requests) {
              if (this.requests[i].moneyRequestId == this.requestObj.requestId) {
                this.requests[i] = this.requestObj;
              }
            }
          }else if(result == ""){

          }else{
            
          }
        });
      }
    }

  }

  edit(e, popupElement) {
    this.requestId = e.moneyRequestId;
    this.updateObj = {
      id: e.moneyRequestId,
      date: e.date,
      description: e.description,
      amount: e.amount,
      empId: e.employeeId
    };

    this.modelService.open(popupElement, { centered: true, scrollable: true });

    this.isUpdate = true;
  }

  close() {
    this.modelService.dismissAll();
  }


}
