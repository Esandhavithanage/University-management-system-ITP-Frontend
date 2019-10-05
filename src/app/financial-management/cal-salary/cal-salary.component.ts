import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salary } from 'src/app/models/Salary';
import { Subscription } from 'rxjs';

export interface Months {
  no: number,
  name: string
}

export interface SalaryObj{
  salary: number,
  basicSal: number,
  OTAmount: number,
  OTHours: number,
  EPF: number,
  ETF: number,
  empName: string,
  salId: number
}

@Component({
  selector: 'cal-salary',
  templateUrl: './cal-salary.component.html',
  styleUrls: ['./cal-salary.component.css']
})
export class CalSalaryComponent implements OnInit, OnDestroy {
  currentMonth;
  currentYear;
  selectedMonthField: boolean;
  months: Months[] = [];
  printObj = {};
  startDate;
  endDate;
  OTHours = 0;
  recieptActive: boolean = false;
  noEmp: boolean = false;

  salaryObj: SalaryObj = {
    salary: 0,
    basicSal: 0,
    OTAmount: 0,
    OTHours: 0,
    EPF: 0,
    ETF: 0,
    empName: '',
    salId: 0
    
  };

  subs1: Subscription;
  subs2: Subscription;

  constructor(private financialService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.months = [
      { no: 0, name: "January" }, { no: 1, name: "February" },
      { no: 2, name: "March" }, { no: 3, name: "April" },
      { no: 4, name: "May" }, { no: 5, name: "June" },
      { no: 6, name: "July" }, { no: 7, name: "August" },
      { no: 8, name: "September" }, { no: 8, name: "October" },
      { no: 10, name: "November" }, { no: 11, name: "December" }
    ];

    this.selectedMonthField = false;
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear().toString();

  }

  monthSelectWay(val) {
    if (val == 1) this.selectedMonthField = true;
    else this.selectedMonthField = false;
    //console.log(month.checked);
  }

  calSalary(form: NgForm, popupContent) { 
    this.recieptActive = false;
    this.noEmp = false;
    
    let id = form.value.empID;
    let monthS = parseInt(form.value.monthSelect) + 1;
    let monthC = form.value.month + 1;
    let month;
    console.log(monthC);
    console.log(form.value);

    if (!monthS) {
      month = monthC;
    } else {
      month = monthS;
    }

    if (month < 10) {
      month = "0" + month;
    }

    this.startDate = this.currentYear + "-" + month + "-01";
    this.endDate = this.currentYear + "-" + month + "-31";

    let calObj = {
      id: id,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.getOT(calObj);
    //this.getSalary(calObj);

    let month2 = this.getSelectedMonth(month-1);

    setTimeout(() => {
      console.log(this.salaryObj);

      this.printObj = {
        id: form.value.empID,
        empName: this.salaryObj.empName,
        month: month2,
        basicSal: this.salaryObj.basicSal,
        ETF: this.salaryObj.ETF,
        EPF: this.salaryObj.EPF,
        OTAmount: this.salaryObj.OTAmount,
        OTHours: this.salaryObj.OTHours,
        salary: this.salaryObj.salary
      };
      if(this.noEmp == false){
        this.recieptActive = true;
      }

      //this.open(popupContent);
    }, 100);

  }

  getSelectedMonth(month){
    for(let i=0; i < this.months.length; i++){
      if(this.months[i].no == month){
        return this.months[i].name;
      }
    }
  }

  private getOT(calObj) {
    let result = this.financialService.getOT(calObj);

    this.subs1 = result.subscribe(r => {
      console.log("ot - " + r);
      if(r == "noEmp"){
        this.noEmp = true;
      }
      this.OTHours = parseFloat(r.toLocaleString());
    },
      (err) => console.log(err),
      () => {
        if(this.noEmp == false){
          this.getSalary(calObj);
        }
        
      });
  }

  private getSalary(calObj) {
    // get salary
    this.subs2 = this.financialService.getSalary(calObj).subscribe(result => {
      console.log("salary - " + result);
      for (let i in result) {
        this.salaryObj = result[i];
      }

      this.salaryObj.salary = this.salaryObj.basicSal + this.salaryObj.OTAmount * this.OTHours - (this.salaryObj.EPF + this.salaryObj.ETF);
      this.salaryObj.OTHours = this.OTHours;

    });
  }

  private open(popupContent) {
    this.modelService.open(popupContent, { centered: true });
  }

  close() {
    this.modelService.dismissAll();
  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
    //this.subs2.unsubscribe();
  }

}
