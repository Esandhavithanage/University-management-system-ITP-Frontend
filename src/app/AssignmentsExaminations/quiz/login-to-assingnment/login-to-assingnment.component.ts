import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-to-assingnment',
  templateUrl: './login-to-assingnment.component.html',
  styleUrls: ['./login-to-assingnment.component.css']
})
export class LoginToAssingnmentComponent implements OnInit {

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

  QuizeLogin(password){
  
    console.log(password);
    if(password == ""){
      alert("please enter password");
    }else{
      this.qu.quizPasswordCheck(password,this.AID).subscribe(res => {
        if(res){
          this.router.navigate([`AttendantToQuiz/${this.AID}`]);
        }else{
          alert("check your paasword again");
        }
    });
  }
    }

}
