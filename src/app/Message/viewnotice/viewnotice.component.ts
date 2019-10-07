import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';
import notice from 'src/app/models/notice';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'viewnotice',
  templateUrl: './viewnotice.component.html',
  styleUrls: ['./viewnotice.component.css']
})
export class ViewnoticeComponent implements OnInit {
   notices:notice[];
   noticeaa:any;
   formType:boolean = false;
  constructor(private notice:NoticeService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.notice.getNotice().subscribe((data:notice[])=>{
      console.log(data);
      this.notices=data;
      });

  }

  deletenotice(id){
       this.notice.Deletenoticet(id).subscribe(res => {
        console.log('Deleted');
      });
      location.reload();
  }

}
