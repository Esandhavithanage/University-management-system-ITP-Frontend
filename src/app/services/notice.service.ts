import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  uri = 'http://localhost:4001/Notice';
  constructor(private http:HttpClient) { }

  addNotice(title,description,employeeId){
    const obj = {
      title:title,
      description:description,
      employeeId:employeeId
    };
    console.log(obj.description);
    this.http.post(`${this.uri}/add`,obj).subscribe(res => console.log('Done'));
  }

  getNotice(){
    return this.http.get(`${this.uri}`);
  }

  editNotice(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  Updatenoticet(id,title,description){
    const obj = {
      title:title,
      description:description,
      id:id
    };
    return this.http.post(`${this.uri}/update`,obj).subscribe(res => console.log('Done'));
  }

  Deletenoticet(id){
   return this.http.get(`${this.uri}/delete/${id}`);
  }
}
