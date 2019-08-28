import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';
import { MoneyRequest } from 'src/app/models/MoneyRequestF';
import { NgForm } from '@angular/forms';

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
  requestObj;
  updateObj = {};
  requestId;

  constructor(private financialService: FinancialService, private employeeService: EmployeeService) { }

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

  canselUpdate() {
    this.isUpdate = false;
  }

  addOrUpdate(form: NgForm) {

    if (!this.isUpdate) {
      this.requestObj = {
        employeeId: form.value.empId,
        date: form.value.date,
        description: form.value.description,
        amount: form.value.amount
      };
      //console.log(this.requestObj);
      this.employeeService.addMRequests(this.requestObj);
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
          this.updateObj = {
            id: '',
            date: '',
            amount: '',
            description: '',
            empId: ''
          };
          this.isUpdate = false;
          form.resetForm();

          for (let i in this.requests) {
            if (this.requests[i].moneyRequestId == this.requestObj.requestId) {
              this.requests[i] = this.requestObj;
            }
          }
        }
      });
    }

  }

  edit(e) {
    this.requestId = e.moneyRequestId;
    this.updateObj = {
      id: e.moneyRequestId,
      date: e.date,
      description: e.description,
      amount: e.amount,
      empId: e.employeeId
    };

    this.isUpdate = true;
  }

}
