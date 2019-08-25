import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Attendance } from 'src/app/models/Attendance';

@Component({
  selector: 'insert-attendance',
  templateUrl: './insert-attendance.component.html',
  styleUrls: ['./insert-attendance.component.css']
})
export class InsertAttendanceComponent implements OnInit {
  attendanceObj: Attendance;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  add(form: NgForm){
    this.attendanceObj = {
      id: form.value.empId,
      date: form.value.date,
      arrivalTime: form.value.aTime,
      exitTime: form.value.eTime
    };
    console.log(this.attendanceObj);
    this.employeeService.addAttendance(this.attendanceObj);
  }

}
