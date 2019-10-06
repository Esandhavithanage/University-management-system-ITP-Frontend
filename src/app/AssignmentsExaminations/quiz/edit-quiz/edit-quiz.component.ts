import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  editquiz:any;
  angForm: FormGroup;
  subjects:any;
  constructor(private qu:QuizService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.qu.editQuiz(params['id']).subscribe(res => {
        console.log(res);
        this.editquiz = res;

    });
  });
  }

  update(from:NgForm){
    console.log(from.value);


    let id = from.value.id;
    let question = from.value.question;
    let Option1 = from.value.Option1;
    let Option2 = from.value.Option2;
    let Option3 = from.value.Option3;
    let Option4 = from.value.Option4;
    let answer = from.value.answer;
    if(question == "" || Option1 == "" || Option2 == "" || Option3 == "" || Option4 == "" || answer == ""){
      alert("Please fill all fileds");
    }else{
      this.qu.updateQuiz(id,question,Option1,Option2,Option3,Option4,answer);
      alert("Updated successful")
    }
  
  }

}
