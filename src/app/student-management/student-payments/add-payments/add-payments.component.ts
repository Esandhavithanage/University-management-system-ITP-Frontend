import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Course } from 'src/app/models/Course';
import { Income } from 'src/app/models/Income';

export interface Date{
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit {
  tempObj;
  updateObj2 = {};
  modelDate: Date = {
    year: 0,
    month: 0,
    day: 0
  };
  dateError: boolean = false;
  courseIdError: boolean = false;
  error: boolean = false;
  message = "";

  @Input('updateObj') updateObj: Income;
  @Input('isUpdate') isUpdate;

  constructor(private studentServices: StudentService) { }

  ngOnInit() {

    if (this.isUpdate == true) {
      this.updateObj2 = this.updateObj;
      let year = parseInt(this.updateObj.date.substring(0, 4));
      let month = parseInt(this.updateObj.date.substring(5, 7));
      let day = parseInt(this.updateObj.date.substring(8, 10));
      this.modelDate = {
        year, month, day

      };
      console.log(this.updateObj2);

    }else{
      // set current date
      let date = new Date();
      let today = date.toJSON().toString();
      this.modelDate = {
        year: parseInt(today.substring(0, 4)),
        month: parseInt(today.substring(5, 7)),
        day: parseInt(today.substring(8, 10))
      };

    }

  }

  addOrUpdate(form: NgForm) {
    this.dateError = false;
    this.courseIdError = false;
    this.error = false;
    this.message = "";

    if (this.modelDate.year == null || this.modelDate.month == null || this.modelDate.day == null) {
      this.dateError = true;
    } else {
      // console.log(form.value);
      let tempDate = this.modelDate.year + "-" + this.modelDate.month + "-" + this.modelDate.day;

      if (!this.isUpdate) {
        this.tempObj = {
          amount: form.value.amount,
          courseId: form.value.courseId,
          date: tempDate,
        };

        this.studentServices.addPayments(this.tempObj).subscribe(result => {
          if (result == "success") {
            this.message = "Inserted";
            this.isUpdate = false;
            form.resetForm();
          } else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.courseIdError = true;
          }else{
            this.error = true;
          }
        });

      } else if (this.isUpdate) {

        this.tempObj = {
          amount: form.value.amount,
          courseId: form.value.courseId,
          date: tempDate,
          payId: this.updateObj.paymentId
        };

        console.log(this.tempObj);

        this.studentServices.updatePayments(this.tempObj).subscribe(result => {
          if (result == "success") {
            this.message = "Updated";
            this.isUpdate = false;
            form.resetForm();

          } else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.courseIdError = true;
          }else{
            this.error = true;
          }
        });

      }
    }

  }


}
