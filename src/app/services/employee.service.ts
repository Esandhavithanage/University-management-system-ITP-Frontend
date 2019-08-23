import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from 'src/app/models/Attendance';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://localhost:4001/employee';
  

  constructor(private http: HttpClient) {
     
   }

  

  addAttendance(attendanceObj: Attendance){
    const obj = {
      emp_id: attendanceObj.id,
      date: attendanceObj.date,
      arrival_time: attendanceObj.arrivalTime,
      exit_time: attendanceObj.exitTime
    };
    this.http.post(`${this.uri}/addAttendance`, obj)
        .subscribe(res => console.log(res)).unsubscribe();

  }



}
