import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Attendance } from 'src/app/models/Attendance';
import { AttendanceComponent } from '../attendance.component';

export interface Date{
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'insert-attendance',
  templateUrl: './insert-attendance.component.html',
  styleUrls: ['./insert-attendance.component.css']
})
export class InsertAttendanceComponent implements OnInit {
  atime = {hour: 8, minute: 30};
  etime = {hour: 17, minute: 30};
  meridian = true;
  date: Date = {
    year: 0,
    month: 0,
    day: 0
  };

  tempObj;
  updateObj2 = {};
  empIdError: boolean = false;
  error: string = '';
  inserted: boolean = false;
  updated: boolean = false;

  dateError: boolean = false;

  @Input('updateObj') updateObj: Attendance;
  @Input('isUpdate') isUpdate;

  constructor(private employeeService: EmployeeService, private attendance: AttendanceComponent) { }

  ngOnInit() {

    if (this.isUpdate == true) {
      this.updateObj2 = this.updateObj;

      // set date
      let tempdate = this.updateObj.date;
      this.date = {
        year: parseInt(tempdate.substring(0, 4)),
        month: parseInt(tempdate.substring(5, 7)),
        day: parseInt(tempdate.substring(8, 10))
      };

      // set atime
      let tempATime = this.updateObj.arrivalTime;
      this.atime = {
        hour: parseInt(this.updateObj.arrivalTime.substring(0, 2)),
        minute: parseInt(this.updateObj.arrivalTime.substring(3, 5))
      };

      // set etime
      let tempETime = this.updateObj.exitTime;
      this.etime = {
        hour: parseInt(this.updateObj.exitTime.substring(0, 2)),
        minute: parseInt(this.updateObj.exitTime.substring(3, 5))
      };
    }else{
      // set current date
      let date = new Date();
      let today = date.toJSON().toString();
      this.date = {
        year: parseInt(today.substring(0, 4)),
        month: parseInt(today.substring(5, 7)),
        day: parseInt(today.substring(8, 10))
      };

    }
    console.log(this.updateObj);
  }

  addOrUpdate(form: NgForm) {

    this.empIdError = false;
    this.error = '';
    this.inserted = false;
    this.updated = false;
    this.dateError = false;

    if (this.date == undefined) {
      this.dateError = true;
    } else if (this.atime == null || this.etime == null) {
      this.error = "Time fields are required."
    } else {

      // set date correct format
      let date_m: string = null;
      let date_d: string = null;

      if(this.date.month < 10){
        date_m = '0' + this.date.month;
      }else{
        date_m = this.date.month.toString();
      }

      if(this.date.day < 10){
        date_d = '0' + this.date.day;
      }else{
        date_d = this.date.day.toString();
      }

      // set times correct format
      let atime_h: string = null;
      let atime_m: string = null;
      let etime_h: string = null;
      let etime_m: string = null;
      let atime;
      let etime;
      let date;

      if(this.atime.hour < 10){
        atime_h = '0' + this.atime.hour; 
      }else{
        atime_h = this.atime.hour.toString();
      }

      if(this.atime.minute < 10){
        atime_m = '0' + this.atime.minute;
      }else{
        atime_m = this.atime.minute.toString();
      }

      if(this.etime.hour < 10){
        etime_h = '0' + this.etime.hour;
      }else{
        etime_h = this.etime.hour.toString();
      }

      if(this.etime.minute < 10){
        etime_m = '0' + this.etime.minute;
      }else{
        etime_m = this.etime.minute.toString();
      }

      atime = atime_h + "." + atime_m;
      etime = etime_h + "." + etime_m;
      date = this.date.year + "-" + date_m + "-" + date_d;
      

      if (this.isUpdate != true) {
        this.tempObj = {
          empId: form.value.empId,
          date: date,
          arrivalTime: atime,
          exitTime: etime
        };

        this.employeeService.addAttendance(this.tempObj).subscribe(result => {
          if (result == "success") {
            this.inserted = true;
            form.resetForm();
            this.attendance.addRow(this.tempObj);

          } else if (result == "ER_NO_REFERENCED_ROW_2") {
            this.empIdError = true;
          } else {
            this.error = "Something went wrong!";
          }
        });

      } else if (this.isUpdate == true) {
        this.tempObj = {
          id: this.updateObj.id,
          empId: form.value.empId,
          date: date,
          arrivalTime: atime,
          exitTime: etime
        };

        console.log(this.tempObj);

        this.employeeService.updateAttendance(this.tempObj).subscribe(result => {
          if (result == "success") {
            this.updated = true;
            form.resetForm();
            this.attendance.updateRow(this.tempObj);

          } else if (result == "WARN_DATA_TRUNCATED") {
            this.error = "Salary Id or Timetable Id is invalid.";
          } else {
            this.error = "Something went wrong!";
          }
        });
      }
    }



  }


}
