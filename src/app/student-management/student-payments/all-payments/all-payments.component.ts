import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Income } from 'src/app/models/Income';
import { Course } from 'src/app/models/Course';
import { StudentService } from 'src/app/services/student.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {
  payments: Income[] = [];
  courses: Course[] = [];
  isUpdate: boolean = false;
  formOpen: boolean = false;
  totalRecords = 0;
  totalPayments = 0;
  updateObj = {};

  constructor(private studentServices: StudentService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // get payments
    this.studentServices.getPayments().subscribe(result => {
      // console.log(result);
      for (let i in result) {
        this.payments.push(result[i]);
      }

      for (let i of this.payments) {
        i.date = i.date.substring(0, 10);
        this.totalRecords += 1;
      }

      this.getTotalPayments();
    });

   


  }

  getTotalPayments(){
    this.totalPayments = 0;
    for(let i in this.payments){
      this.totalPayments += this.payments[i].amount; 
    }
  }

  updateBtn(payment, popupContent2) {
    this.isUpdate = true;

    this.updateObj = {
      paymentId: payment.payId,
      courseId: payment.courseId,
      date: payment.date,
      amount: payment.amount,
    };

    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });


  }

  // update row after update
  updateRow(obj) {
    console.log("update row called");

    for (let i in this.payments) {
      if (this.payments[i].paymentId == obj.id) {
        this.payments[i] = obj;
      }
    }

    this.getTotalPayments();

    this.modelService.dismissAll();
  }

  close() {
    this.modelService.dismissAll();
  }

  ngOnDestroy() {

  }
}
