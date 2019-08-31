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
      emp_id: attendanceObj.empId,
      date: attendanceObj.date,
      arrival_time: attendanceObj.arrivalTime,
      exit_time: attendanceObj.exitTime
    };
    this.http.post(`${this.uri}/addAttendance`, obj)
        .subscribe(res => console.log(res));

  }

  getAttendance(){
    return this.http.get(`${this.uri}/getAttendance`);
  }

  updateAttendance(obj){
    return this.http.post(`${this.uri}/updateAttendance`, obj);
  }

  getEmployee(){
    return this.http.get(`${this.uri}/getEmployeeAll`);
  }

  addEmployee(form){
    console.log(form);
    
    this.http.post(`${this.uri}/addEmployee`, form)
        .subscribe(res => console.log(res));
  }

  updateEmployee(form){
    console.log(form);
    return this.http.post(`${this.uri}/updateEmployee`, form);
  }

  deleteEmployee(id){
    console.log(id);
    this.http.get(`${this.uri}/deleteEmployee/${id}`).subscribe(result => {
      console.log(result);
    });
  }

  addMRequests(obj){
    console.log(obj);
    this.http.post(`${this.uri}/addMRequest`, obj).subscribe(result => {
      console.log(result);
    });
  }

  updateMRequests(obj){
    console.log(obj);
    return this.http.post(`${this.uri}/updateMRequest`, obj);

  }

}
