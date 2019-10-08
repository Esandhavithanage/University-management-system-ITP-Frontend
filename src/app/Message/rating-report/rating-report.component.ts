import { Component, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-rating-report',
  templateUrl: './rating-report.component.html',
  styleUrls: ['./rating-report.component.css']
})
export class RatingReportComponent implements OnInit {

 ratedetails:any;
 date = new Date();
  constructor(private notice:NoticeService) { }

  ngOnInit() {
    this.notice.getRatingreport().subscribe(res =>{
      this.ratedetails = res;
      console.log(res);
      
     // alert("Your Rating submited");
    });
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
