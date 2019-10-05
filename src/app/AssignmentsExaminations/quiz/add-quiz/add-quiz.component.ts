import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private qu:QuizService) { }

  ngOnInit() {
  }
  add(from:NgForm){
    let question = from.value.question;
    let Option1 = from.value.Option1;
    let Option2 = from.value.Option2;
    let Option3 = from.value.Option3;
    let Option4 = from.value.Option4;
    let answer = from.value.answer;
    let assinmentId='A1566917394197';
    this.qu.addQuiz(question,Option1,Option2,Option3,Option4,answer,assinmentId);
  }
}
