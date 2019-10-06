import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  AID:any;
  constructor(private qu:QuizService,private route:ActivatedRoute,public router: Router) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.AID = params['id'];
    });
    }
  }
  add(from:NgForm){
    let question = from.value.question;
    let Option1 = from.value.Option1;
    let Option2 = from.value.Option2;
    let Option3 = from.value.Option3;
    let Option4 = from.value.Option4;
    let answer = from.value.answer;
    let assinmentId= this.AID;

    if(question == "" || Option1 == "" || Option2 == "" || Option3 == "" || Option4 == "" || answer == ""){
      alert("Please fill all fileds");
    }else{
      this.qu.addQuiz(question,Option1,Option2,Option3,Option4,answer,assinmentId);
      alert("data saved");
      window.location.reload();
    }
  }
}
