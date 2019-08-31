import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import quiz from 'src/app/models/quiz';

@Component({
  selector: 'view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
  quizes:quiz[];
  constructor(private qu:QuizService ) { }

  ngOnInit() {
    this.qu.viewQuiz('A1566917394197').subscribe((data:quiz[])=>{
      this.quizes=data;
      });
  }

  deletequiz(id){
    console.log(id);
       this.qu.deleteQuiz(id).subscribe(res => {
        console.log('Deleted');
      });
      location.reload();
  }

}
