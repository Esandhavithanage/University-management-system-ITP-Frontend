import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.css']
})
export class RatingViewComponent implements OnInit {

  constructor(private notice:NoticeService,private router:Router) { }
  lecs:any;
  tabaldate:any;
  ngOnInit() {

    this.notice.getEmployee().subscribe(res =>{
      this.lecs = res;
      console.log(res);
      
     // alert("Your Rating submited");
    });
  }

  submit(from:NgForm){
    let to = from.value.to;
    let lec = from.value.lec;
    let fromdate = from.value.fromdate;
    console.log(to+" "+lec+" "+fromdate);
    this.notice.getFeedBack(to,fromdate,lec).subscribe(res=>{
      console.log(res);
      this.tabaldate = res;
    //  window.location.reload();
    });
  }

  genarateReport(){
    this.router.navigate(['/RatingReportComponent']);
  }

}
