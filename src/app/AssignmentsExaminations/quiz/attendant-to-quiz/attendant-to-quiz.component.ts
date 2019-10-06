import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import quiz from 'src/app/models/quiz';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface IHash {
  [details: string] : string;
} 
@Component({
  selector: 'app-attendant-to-quiz',
  templateUrl: './attendant-to-quiz.component.html',
  styleUrls: ['./attendant-to-quiz.component.css']
})

export class AttendantToQuizComponent implements OnInit {
   myhash = new Map();
   quizlist:any= null;
   AID:any;
   forms: FormGroup[] = [];
  constructor(private qu:QuizService,private fb: FormBuilder,private route:ActivatedRoute,public router: Router) { }

  ngOnInit() {

    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.AID = params['id'];
    });
    }
    this.qu.getquizquestion(this.AID).subscribe(res => {
      console.log(res);
      this.quizlist = res;
      console.log(this.quizlist);

      let length = this.quizlist.length;

      for(let i in this.quizlist){
        let tempForm = this.fb.group({
          quizId: this.quizlist[i].quizId,
          question: this.quizlist[i].question,
          option1: this.quizlist[i].option1,
          option2: this.quizlist[i].option2,
          option3: this.quizlist[i].option3,
          option4: this.quizlist[i].option4
        });


    
        this.forms.push(tempForm);
    }

    });
  }

  GETdata(sd,evt)
  {
      this.myhash.set(sd,evt)
      console.log(sd+" "+evt);
      console.log(this.myhash);
}

  submitAll(){
    console.log(this.myhash);
    this.qu.participateToQuiz('A1566917394197','IT001',this.myhash).subscribe(res => {
      console.log(res);
    });
  }
}
