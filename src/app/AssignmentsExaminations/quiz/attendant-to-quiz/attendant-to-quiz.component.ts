import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import quiz from 'src/app/models/quiz';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

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
   forms: FormGroup[] = [];
  constructor(private qu:QuizService,private fb: FormBuilder) { }

  ngOnInit() {
    this.qu.getquizquestion("A1566917394197").subscribe(res => {
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

  GETdata(sd,evt){


      this.myhash.set(sd,evt)
    


console.log(sd+" "+evt);
console.log(this.myhash);

}

  submitAll(){
    for(let i in this.forms){
      console.log(this.forms[i].value);
    }
  }

  add(form: NgForm){
    console.log("called");
    console.log(form.value);
  }
}
