import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salary } from 'src/app/models/Salary';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cal-salary',
  templateUrl: './cal-salary.component.html',
  styleUrls: ['./cal-salary.component.css']
})
export class CalSalaryComponent implements OnInit, OnDestroy {
  currentMonth;
  currentYear;
  selectedMonthField: boolean;
  months: any[] = [
    { no: 0, name: "January" }, { no: 1, name: "February" },
    { no: 2, name: "March" }, { no: 3, name: "April" },
    { no: 4, name: "May" }, { no: 5, name: "June" },
    { no: 6, name: "July" }, { no: 7, name: "August" },
    { no: 8, name: "September" }, { no: 8, name: "October" },
    { no: 10, name: "November" }, { no: 11, name: "December" } ];
  printObj = {};
  startDate;
  endDate;
  OTHours = 0;

  salaryObj: Salary = {
    salary: 0,
    basicSal: 0,
    OTAmount: 0,
    OTHours: 0,
    EPF: 0,
    ETF: 0
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
    this.selectedMonthField = false;
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear().toString();
    
  }

  monthSelectWay(val){
    if(val == 1) this.selectedMonthField = true;
    else this.selectedMonthField = false;
    //console.log(month.checked);
  }

  calSalary(form: NgForm, popupContent){
    let id = form.value.empID;
    let monthS = parseInt(form.value.monthSelect) + 1;
    let monthC = form.value.month + 1;
    let month;
    

    if(!monthS){
      month = monthC;
    }else{
      month = monthS;
    }

    if(month < 10){
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

    setTimeout(() => {
      console.log(this.salaryObj);

      this.printObj = {
      id: form.value.empID,
      name: form.value.empName,
      month: this.months[form.value.month].name,
      basicSal: this.salaryObj.basicSal,
      ETF: this.salaryObj.ETF,
      EPF: this.salaryObj.EPF,
      OTAmount: this.salaryObj.OTAmount,
      OTHours: this.salaryObj.OTHours,
      salary: this.salaryObj.salary
    };

    this.open(popupContent);
    }, 100);
     
  }

  private getOT(calObj){
    let result = this.financialService.getOT(calObj);
    this.subs1 = result.subscribe(r => {
      this.OTHours = parseFloat(r.toLocaleString());
    },
    (err) => console.log(err),
    () => {
      this.getSalary(calObj);
    });
  }

  private getSalary(calObj){
    // get salary
    this.subs2 = this.financialService.getSalary(calObj).subscribe(result => {
      for (let i in result) {
        this.salaryObj = result[i];
      }

      this.salaryObj.salary = this.salaryObj.basicSal + this.salaryObj.OTAmount * this.OTHours - (this.salaryObj.EPF + this.salaryObj.ETF);
      this.salaryObj.OTHours = this.OTHours;

    });
  }

  private open(popupContent){
    this.modelService.open(popupContent, { centered: true });
  }

  close(){
    this.modelService.dismissAll();
  }

  ngOnDestroy(){
    //this.subs1.unsubscribe();
    //this.subs2.unsubscribe();
  }

}
