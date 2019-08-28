import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  uri = 'http://localhost:4001/student';

  constructor(private http: HttpClient) { }

  addStudent(form){
    console.log(form);
    const obj = {
      id: form.id,
      name: form.name,
      address: form.address,
      gender: form.gender,
      batchId: form.batchId,
      email: form.email,
      nic: form.nic,
      pwd: form.pwd
    };
    this.http.post(`${this.uri}/addStudent`, obj)
        .subscribe(res => console.log(res));
  }

  getStudent(){
    return this.http.get(`${this.uri}/getStudent`);
  }

  updateStudent(form){
    // console.log(form);
    return this.http.post(`${this.uri}/updateStudent`, form);
  }

  deleteStudent(id){
    console.log(id);
    this.http.get(`${this.uri}/deleteStudent/${id}`).subscribe();
  }

  getCourses(){
    return this.http.get(`${this.uri}/getCourses`);
  }

  addCourses(tempObj){
    // console.log(tempObj);
    this.http.post(`${this.uri}/addCourses`, tempObj).subscribe(result => {
      console.log(result);
    });
  }

  updateCourse(tempObj){
    // console.log(tempObj);
    return this.http.post(`${this.uri}/updateCourses`, tempObj);
  }

  deleteCourse(id){
    this.http.get(`${this.uri}/deleteteCourse/${id}`).subscribe(result => {
      console.log(result);
    });
  }

  getPayments(){
    return this.http.get(`${this.uri}/getPayments`);
  }

  addPayments(obj){
    this.http.post(`${this.uri}/addPayments`, obj).subscribe(result => {
      console.log(result);
    });
  }

  updatePayments(obj){
    return this.http.post(`${this.uri}/updatePayments`, obj);
  }

}
