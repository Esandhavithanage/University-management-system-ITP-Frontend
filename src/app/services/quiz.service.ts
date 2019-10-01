import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  uri = 'http://localhost:4001/Quiz';
  constructor(private http:HttpClient) { }

  addQuiz(question,Option1,Option2,Option3,Option4,answer,assinmentId){
    const obj = {
      question:question,
      Option1:Option1,
      Option2:Option2,
      Option3:Option3,
      Option4:Option4,
      answer:answer,
      assinmentId:assinmentId
    };
    this.http.post(`${this.uri}/add`,obj).subscribe(res => console.log('Done'));
  }

  viewQuiz(id){
    return this.http.get(`${this.uri}/${id}`);
  }

  editQuiz(id){
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateQuiz(id,question,Option1,Option2,Option3,Option4,answer){
    const obj = {
      id:id,
      question:question,
      Option1:Option1,
      Option2:Option2,
      Option3:Option3,
      Option4:Option4,
      answer:answer
    };
    return this.http.post(`${this.uri}/update/${id}`,obj).subscribe(res => console.log('Done'));
   }

   deleteQuiz(id){
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  getquize(subject){
    
      return this.http.get(`${this.uri}/getQuize/${subject}`); 
    
  }



}
