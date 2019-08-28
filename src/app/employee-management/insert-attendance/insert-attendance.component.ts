import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Attendance } from 'src/app/models/Attendance';
import { Subscription } from 'rxjs';

@Component({
  selector: 'insert-attendance',
  templateUrl: './insert-attendance.component.html',
  styleUrls: ['./insert-attendance.component.css']
})
export class InsertAttendanceComponent implements OnInit {
  attendanceObj;
  attendances: Attendance[] = [];
  isUpdate: boolean = false;
  updateObj = {};
  totalRecords = 0;
  subs1: Subscription;
  subs2: Subscription;
  attendanceId;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    //get attendance
    this.subs1 = this.employeeService.getAttendance().subscribe(result => {
      for (let i in result) {
        this.attendances.push(result[i]);
        this.totalRecords++;
      }
    });

  }

  canselUpdate() {
    this.isUpdate = false;
  }

  addOrUpdate(form: NgForm) {

    if (!this.isUpdate) {
      this.attendanceObj = {
        empId: form.value.empId,
        date: form.value.date,
        arrivalTime: form.value.aTime,
        exitTime: form.value.eTime
      };
      console.log(this.attendanceObj);
      this.employeeService.addAttendance(this.attendanceObj);
      this.totalRecords++;

      this.attendances.push(this.attendanceObj);
      form.resetForm();

    } else if (this.isUpdate) {
      this.attendanceObj = {
        empId: form.value.empId,
        date: form.value.date,
        arrivalTime: form.value.aTime,
        exitTime: form.value.eTime,
        attendanceId: this.attendanceId
      };

      this.subs2 = this.employeeService.updateAttendance(this.attendanceObj).subscribe(result => {
        if (result) {
          console.log(result);
          this.updateObj = {
            id: '',
            date: '',
            arrivalTime: '',
            exitTime: '',
            empId: ''
          };
          this.isUpdate = false;
          form.resetForm();

          for (let i in this.attendances) {
            if (this.attendances[i].id == this.attendanceObj.attendanceId) {
              this.attendances[i] = this.attendanceObj;
            }
          }
        }
      });
    }

  }

  edit(e: Attendance) {
    this.attendanceId = e.id;
    this.updateObj = {
      id: e.id,
      date: e.date,
      arrivalTime: e.arrivalTime,
      exitTime: e.exitTime,
      empId: e.empId
    };

    this.isUpdate = true;
  }

}
