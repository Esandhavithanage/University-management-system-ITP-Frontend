import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoticeService } from 'src/app/services/notice.service';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  lecs:any;
  rate:any;
  constructor(private notice:NoticeService) { }

  ngOnInit() {

    this.notice.getEmployee().subscribe(res =>{
      this.lecs = res;
      console.log(res);
      
     // alert("Your Rating submited");
    });
  }

  GETdata(i){
    this.rate = i;
    console.log(i);
  }

  submit(from:NgForm){
    let Comment = from.value.comment;
    let lec = from.value.lec;


    if(Comment == "" || lec == "" || this.rate==""){
      alert("Feelds can't empty");
    }else{

    this.notice.Addrating(Comment,this.rate,"IT001",lec).subscribe(res=>{
      console.log(res);
      alert("Your Rating submited");
    });
  }
  }

}
