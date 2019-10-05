import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Attendance } from 'src/app/models/Attendance';
import { Subscription } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceObj;
  attendances: Attendance[] = [];
  isUpdate: boolean = false;
  formOpen: boolean = false;
  updateObj = {};
  totalRecords = 0;
  subs1: Subscription;
  subs2: Subscription;
  attendanceId;

  constructor(private employeeService: EmployeeService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    //get attendance
    this.subs1 = this.employeeService.getAttendance().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.attendances.push(result[i]);
        this.totalRecords++;
      }
    });

  }

  add(popupContent2) {
    this.isUpdate = false;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });
  }

  edit(e: Attendance, popupContent2) {
    this.attendanceId = e.id;
    this.updateObj = {
      id: e.id,
      date: e.date,
      arrivalTime: e.arrivalTime,
      exitTime: e.exitTime,
      empId: e.empId
    };
    this.isUpdate = true;

    this.modelService.open(popupContent2, { centered: true, scrollable: true });

  }

  addRow(obj){
    this.attendances.push(obj);
    this.modelService.dismissAll();
  }

  updateRow(obj){
    for(let i in this.attendances){
      if(this.attendances[i].id == obj.id){
        this.attendances[i] = obj;
      }
    }
    this.modelService.dismissAll();
    this.isUpdate = false;
  }

  close(){
    this.modelService.dismissAll();
  }

}
