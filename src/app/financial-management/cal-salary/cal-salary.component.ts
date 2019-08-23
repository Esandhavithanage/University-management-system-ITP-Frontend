import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cal-salary',
  templateUrl: './cal-salary.component.html',
  styleUrls: ['./cal-salary.component.css']
})
export class CalSalaryComponent implements OnInit {
  currentMonth;
  selectedMonthField: boolean;
  months: any[] = [
    { no: 0, name: "January" }, { no: 1, name: "February" },
    { no: 2, name: "March" }, { no: 3, name: "April" },
    { no: 4, name: "May" }, { no: 5, name: "June" },
    { no: 6, name: "July" }, { no: 7, name: "August" },
    { no: 8, name: "September" }, { no: 8, name: "October" },
    { no: 10, name: "November" }, { no: 11, name: "December" } ];
  printObj = {};
     
  constructor(private csService: FinancialService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit() {
    this.selectedMonthField = false;
    this.currentMonth = new Date().getMonth();
  }

  monthSelectWay(val){
    if(val == 1) this.selectedMonthField = true;
    else this.selectedMonthField = false;
    //console.log(month.checked);
  }

  calSalary(form: NgForm, popupContent){

    let calObj = {
      id: form.value.empID,
      name: form.value.empName,
      month: form.value.month
    };

    let result = this.csService.calSalary(calObj);

    this.printObj = {
      id: form.value.empID,
      name: form.value.empName,
      basicSal: result.basicSal,
      ETF: result.ETF,
      salary: result.salary,
      EPF: result.EPF,
      OTAmount: result.OTAmount
    };

    this.open(popupContent);
     
  }

  private open(popupContent){
    this.modelService.open(popupContent, { centered: true });
  }

  close(){
    this.modelService.dismissAll();
  }

}
