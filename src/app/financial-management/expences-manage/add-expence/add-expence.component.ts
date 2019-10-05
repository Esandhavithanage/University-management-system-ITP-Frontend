import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FinancialService } from 'src/app/services/financial.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Expence } from 'src/app/models/Expence';
import { AllExpenceComponent } from '../all-expence/all-expence.component';
import { SearchExpenceComponent } from '../search-expence/search-expence.component';
//import { NgbdDatepickerPopup } from './datepicker-popup';

@Component({
  selector: 'add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.css']
  
})
export class AddExpenceComponent implements OnInit {
  date = null;
  empIdErr: boolean = false;
  isInserted: boolean = false;
  isUpdated: boolean = false;
  insertOrUpdateError: boolean = false;
  dateNotFilled: boolean = false;

  @Input('updateObj') updateObj1: Expence;
  @Input('isUpdate') isUpdate1;
  @Input('component') component: string;
  updateObj2 = {};
  isUpdate2: boolean = false;

  constructor(private financialService: FinancialService, private allExpense: AllExpenceComponent,
    private searchExpense: SearchExpenceComponent) { }

  ngOnInit() {
    if(this.isUpdate1 != null && this.isUpdate1 != undefined){
      this.isUpdate2 = this.isUpdate1;
    }
    
    console.log(this.updateObj1);

    if(this.updateObj1 != null){

      this.updateObj2 = {
        employeeId: this.updateObj1.employeeId,
        date: this.date,
        type: this.updateObj1.type,
        amount: this.updateObj1.amount
      };
    }
  }

  addOrUpdateExpence(form: NgForm){
    this.empIdErr = false;
    this.isInserted = false;
    this.isUpdated = false;
    this.insertOrUpdateError = false;
    this.dateNotFilled = false;

    if(this.isUpdate2){
      // update

      if(this.date != null){
        let obj = {
          empId: form.value.id,
          expenseId: this.updateObj1.expenseId,
          employeeName: this.updateObj1.employeeName,
          date: this.date.year.toString() + "-" + this.date.month.toString() + "-" + this.date.day.toString(),
          type: form.value.type,
          amount: form.value.amount
        };
  
        console.log(obj);
  
        this.financialService.updateExpense(obj).subscribe(result => {
          console.log(result);
  
          if(result.toString() == "ER_NO_REFERENCED_ROW_2"){
            this.empIdErr = true;
          }else if(result == null){
            this.insertOrUpdateError = true;
          }else{
            this.isUpdated = true;

            if(this.component == 'all'){
              this.allExpense.updateRow(obj);
            }else if(this.component == 'search'){
              this.searchExpense.updateRow(obj);
            }
            
          }
  
        });

      }else{
        this.dateNotFilled = true;
      }
      
    
    }else{
      // insert
      console.log(this.date);

      if(this.date != null){
        let obj = {
          id: form.value.id,
          date: this.date.year.toString() + "-" + this.date.month.toString() + "-" + this.date.day.toString(),
          type: form.value.type,
          amount: form.value.amount,
        }; 
  
        console.log(obj);
    
        this.financialService.addExpence(obj).subscribe(result => {
          console.log(result);
    
          if(result.toString() == "ER_NO_REFERENCED_ROW_2"){
            this.empIdErr = true;
          }else if(result == null){
            this.insertOrUpdateError = true;
          }else{
            this.isInserted = true;
            this.dateNotFilled = false;
          }
    
        });
      
      }else{
        this.dateNotFilled = true;
      }
      
    }
   
  }

}
