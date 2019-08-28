import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { Income } from 'src/app/models/Income';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit, OnDestroy {
  subs1: Subscription;
  subs2: Subscription;
  payments: Income[] = [];
  courses: Course[] = [];
  isUpdate: boolean = false;
  totalRecords = 0;
  updateObj = {};
  tempObj;
  payId;

  constructor(private studentServices: StudentService) { }

  ngOnInit() {
    // get payments
    this.subs1 = this.studentServices.getPayments().subscribe(result => {
      // console.log(result);
      for (let i in result) {
        this.payments.push(result[i]);
      }

      for (let i of this.payments) {
        i.date = i.date.substring(0, 10);
        this.totalRecords += 1;
      }
    });

    // get courses
    this.subs2 = this.studentServices.getCourses().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.courses.push(result[i]);
      }
    });


  }

  canselUpdate() {
    this.isUpdate = false;
  }

  addOrUpdate(form: NgForm) {
    // console.log(form.value);
    let courseId;

    for (let i in this.courses) {
      if (this.courses[i].name == form.value.course) {
        courseId = this.courses[i].id;
      }
    }

    if (!this.isUpdate) {
      this.tempObj = {
        amount: form.value.amount,
        courseId: courseId,
        date: form.value.date,
        title: form.value.title
      };

      this.studentServices.addPayments(this.tempObj);
      this.payments.push(this.tempObj);
      form.resetForm();
      this.totalRecords++;

    } else if (this.isUpdate) {
      this.tempObj = {
        amount: form.value.amount,
        courseId: courseId,
        date: form.value.date,
        title: form.value.title,
        payId: this.payId
      };

      console.log(form.value);

      this.subs2 = this.studentServices.updatePayments(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            payId: '',
            courseId: '',
            date: '',
            amount: '',
            title: ''
          };
          this.isUpdate = false;
          form.resetForm();

          for (let i in this.payments) {
            if (this.payments[i].paymentId == this.tempObj.id) {
              this.payments[i] = this.tempObj;
            }
          }
        }
      });

    }
  }

  updateBtn(payment) {
    this.isUpdate = true;
    this.payId = payment.payId;
    console.log(this.payId);
    this.updateObj = {
      payId: payment.payId,
      courseId: payment.courseId,
      date: payment.date,
      amount: payment.amount,
      title: payment.title,
    };
  }

  ngOnDestroy() {

  }

}
