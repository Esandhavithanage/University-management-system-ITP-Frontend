import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import quiz from 'src/app/models/quiz';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
  quizes:quiz[];
  subjects:any;
  quize:any;
  constructor(private qu:QuizService,private as:AssingmentService) { }

  ngOnInit() {
      this.as.getsubjects().subscribe(res=>{
        console.log(res);
        this.subjects=res;
      });
      
  }

  deletequiz(id){
    console.log(id);
       this.qu.deleteQuiz(id).subscribe(res => {
        console.log('Deleted');
      });
      location.reload();
  }

  selectedsubject(subject){
    console.log(subject);

    this.qu.getquize(subject).subscribe(res =>{
      console.log(res);
      this.quize=res;
      window.location.reload;
    });
  }

  getQuize(id){
    console.log(id);
      this.qu.viewQuiz(id).subscribe((data:quiz[])=>{
      this.quizes=data;
      window.location.reload;
      });
  }

}
