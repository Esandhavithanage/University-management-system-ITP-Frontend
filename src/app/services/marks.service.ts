import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  uri = 'http://localhost:4001/marks';
  
  constructor(private http:HttpClient) { }

  addmarks(studentno,subjectno,type,marks){
    const obj = {
        studentno:studentno,
        subjectno:subjectno,
        type:type,
      
    };
    this.http.post(`${this.uri}/add`,obj).subscribe(res => console.log('Done'));
}
}
