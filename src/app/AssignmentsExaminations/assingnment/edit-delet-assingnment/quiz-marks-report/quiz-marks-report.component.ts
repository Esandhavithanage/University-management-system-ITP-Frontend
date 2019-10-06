import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-marks-report',
  templateUrl: './quiz-marks-report.component.html',
  styleUrls: ['./quiz-marks-report.component.css']
})
export class QuizMarksReportComponent implements OnInit {

  constructor(private assingment:AssingmentService,private route:ActivatedRoute,public router: Router) { }

  assismentNmae:any;
  SubjectNmae:any;
  courseId:any;
  resalt:any;
  AID:any;

  ngOnInit() {

    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.AID = params['id'];
    });
    }

    this.assingment.getAssismentDetails(this.AID).subscribe(res=>{
      console.log(res);
      this.assismentNmae = res[0].title;
      this.SubjectNmae = res[0].name;
      this.courseId=res[0].courseId;
    });
    this.assingment.getStudentmarks(this.AID).subscribe(res=>{
      this.resalt = res
    });5
  }

  downloadmarks(){
  const printContent = document.getElementById("displymarks");
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(printContent.innerHTML);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
  }


}
