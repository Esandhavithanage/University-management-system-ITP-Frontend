import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssingmentService {

  uri = 'http://localhost:4001/Assessment';
  
  constructor(private http:HttpClient) { }

  addassisment(tital,startdate,deadline,subject,type){
    const obj = {
      tital:tital,
      startdate:startdate,
      deadline:deadline,
      subject:subject,
      type:type
    };
    this.http.post(`${this.uri}/add`,obj).subscribe(res => console.log('Done'));
}

 getassisment(){
   return this.http.get(`${this.uri}`);
 }

 editAssisment(id){
   return this.http.get(`${this.uri}/edit/${id}`);
 }

 UpdateAssisment(id,tital,startdate,deadline,subject,type){
  const obj = {
    id:id,
    tital:tital,
    startdate:startdate,
    deadline:deadline,
    subject:subject,
    type:type
  };
  return this.http.post(`${this.uri}/update/${id}`,obj).subscribe(res => console.log('Done'));
 }

 deleteAssisment(id) {
  return this.http.get(`${this.uri}/delete/${id}`);
}

getsubjects(){
  return this.http.get(`${this.uri}/subject`); 
}

getAssisment(subjectid){
  return this.http.get(`${this.uri}/getAssisment/${subjectid}`); 
}

}
