import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'view-assingnment',
  templateUrl: './view-assingnment.component.html',
  styleUrls: ['./view-assingnment.component.css']
})
export class ViewAssingnmentComponent implements OnInit {
  subjects:any;
  subjects1:any;
  link:any;
  constructor(private as:AssingmentService) { }

  ngOnInit() {
    this.as.getsubjects().subscribe(res=>{
      console.log(res);
      this.subjects=res;
    });


  }

  getassisment(subject,type){
    console.log(subject +" "+type);
    
    if(type == 'Assignment'){
      this.link = "http://localhost:4200/uploadAssingnment";
      this.as.getAssisment_submission(subject).subscribe(res => {
        console.log(res);
        this.subjects1=res;
      });
    }else{
      this.link = "http://localhost:4200/LogintoQuize";
      this.as.getAssisment_quiz(subject).subscribe(res => {
        console.log(res);
        this.subjects1=res;
      });
    }
  }

}
