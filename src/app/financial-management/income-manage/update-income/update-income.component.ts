import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Income } from 'src/app/models/Income';
import { AllIncomeComponent } from '../all-income/all-income.component';
import { SearchIncomeComponent } from '../search-income/search-income.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {

  date = {
    year: 0,
    month: 0,
    day: 0
  };
  courseIdErr: boolean = false;
  isUpdated: boolean = false;
  insertOrUpdateError: boolean = false;
  dateNotFilled: boolean = false;

  @Input('updateObj') updateObj: Income;
  @Input('isUpdate') isUpdate1;
  @Input('component') component: string;
  updateObj2 = {};
  isUpdate2: boolean = false;

  constructor(private studentService: StudentService, private allIncome: AllIncomeComponent,
    private searchIncome: SearchIncomeComponent) { }

  ngOnInit() {
    if(this.isUpdate1 != null && this.isUpdate1 != undefined){
      this.isUpdate2 = this.isUpdate1;
    }
    
    console.log(this.updateObj);

    if(this.isUpdate1 != null){
     
      this.date = {
        year: parseInt(this.updateObj.date.substring(0, 4)),
        month: parseInt(this.updateObj.date.substring(5, 7)),
        day: parseInt(this.updateObj.date.substring(8, 10))
      }

      this.updateObj2 = {
        paymentId: this.updateObj.paymentId,
        date: this.date,
        courseId: this.updateObj.courseId,
        amount: this.updateObj.amount
      };
    }
  }

  updateIncome(form: NgForm){
    this.courseIdErr = false;
    this.isUpdated = false;
    this.insertOrUpdateError = false;
    this.dateNotFilled = false;

      if(this.date != null){
        let obj = {
          paymentId: this.updateObj.paymentId,
          courseId: form.value.courseId,
          date: this.date.year.toString() + "-" + this.date.month.toString() + "-" + this.date.day.toString(),
          amount: form.value.amount
        };
  
        console.log(obj);
  
        this.studentService.updatePayments(obj).subscribe(result => {
          console.log(result);
  
          if(result.toString() == "ER_NO_REFERENCED_ROW_2"){
            this.courseIdErr = true;
          }else if(result == null && result == undefined){
            this.insertOrUpdateError = true;
            this.insertOrUpdateError = true;
          }else{
            this.isUpdated = true;
            this.insertOrUpdateError = false;

            if(this.component == 'all'){
             this.allIncome.updateRow(obj);
            }else if(this.component == 'search'){
             this.searchIncome.updateRow(obj);
            }
            
          }
  
        });

      }else{
        this.dateNotFilled = true;
      }
      
   
  }

}
