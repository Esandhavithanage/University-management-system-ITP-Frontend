import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'app-quiz-marks-report',
  templateUrl: './quiz-marks-report.component.html',
  styleUrls: ['./quiz-marks-report.component.css']
})
export class QuizMarksReportComponent implements OnInit {

  constructor(private assingment:AssingmentService) { }

  assismentNmae:any;
  SubjectNmae:any;

  ngOnInit() {
    this.assingment.editAssisment('A1566917394197').subscribe(res=>{
      this.assismentNmae = res[0].title;
      this.SubjectNmae = res[0];
    })
    this.assingment.getStudentmarks('A1566917394197').subscribe(res=>{
      console.log(res);
    })
  }

}
