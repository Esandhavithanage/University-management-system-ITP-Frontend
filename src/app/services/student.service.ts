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
    return this.http.post(`${this.uri}/addStudent`, obj);
    
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
    return this.http.get(`${this.uri}/deleteStudent/${id}`);
  }

  getCourses(){
    return this.http.get(`${this.uri}/getCourses`);
  }

  addCourses(tempObj){
    // console.log(tempObj);
    return this.http.post(`${this.uri}/addCourses`, tempObj);

  }

  updateCourse(tempObj){
    // console.log(tempObj);
    return this.http.post(`${this.uri}/updateCourses`, tempObj);
  }

  deleteCourse(id){
    return this.http.get(`${this.uri}/deleteteCourse/${id}`);

  }

  getPayments(){
    return this.http.get(`${this.uri}/getPayments`);
  }

  addPayments(obj){
    return this.http.post(`${this.uri}/addPayments`, obj);

  }

  updatePayments(obj){
    return this.http.post(`${this.uri}/updatePayments`, obj);
  }

}
