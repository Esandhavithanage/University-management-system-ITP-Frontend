import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoticeService } from 'src/app/services/notice.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  formType:boolean = false;
  noticeaa:any;
  constructor(private notice:NoticeService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        this.notice.editNotice(params['id']).subscribe(res => {
          console.log(res);
          this.noticeaa = res;
          this.formType=true;
      });
    });
    }else{
      console.log('dsfsdfsdfsd')
    }
  }

  add(form:NgForm){
    console.log(form.value);
     let title = form.value.title;
     let description = form.value.Description;
     this.notice.addNotice(title,description,'E001');
  }

  update(from:NgForm){
    console.log(from.value);
    let id = from.value.id;
    let title = from.value.title;
    let description = from.value.Description;

    this.notice.Updatenoticet(id,title,description);
  }

}
