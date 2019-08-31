import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  uri = 'http://localhost:4001/event';

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get(`${this.uri}/getEvents`);
  }

  addEvents(obj){
    console.log("service " + obj);
    this.http.post(`${this.uri}/addEvents`, obj).subscribe(result => {
      console.log(result);
    });
  }

  updateEvents(obj){
    return this.http.post(`${this.uri}/updateEvents`, obj);
  }

  deleteEvents(id){
    this.http.get(`${this.uri}/deleteEvents/${id}`).subscribe(result => {
      console.log(result);
    });
  }

  registerEvent(obj){
    console.log("service " + obj);
    return this.http.post(`${this.uri}/registerEvent`, obj);
  }

  getRStudents(){
    return this.http.get(`${this.uri}/getRStudents`);

  }

  deleteRStudent(eventId, studentId){
    console.log("called");
    this.http.get(`${this.uri}/deleteRStudents/${eventId}/${studentId}`).subscribe(result => {
      console.log(result);
    });
  }

}
