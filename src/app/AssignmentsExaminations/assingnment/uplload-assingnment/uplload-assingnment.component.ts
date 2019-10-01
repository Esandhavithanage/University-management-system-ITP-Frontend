import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'uplload-assingnment',
  templateUrl: './uplload-assingnment.component.html',
  styleUrls: ['./uplload-assingnment.component.css']
})
export class UplloadAssingnmentComponent implements OnInit {

  uploadedFiles:File = null;
  fileName:String = "Choos a file";

  constructor(private as:AssingmentService) { }

  ngOnInit() {

  }
  fileChange(element) {
    this.uploadedFiles =<File> element.target.files[0];
    this.fileName = element.target.files[0].name;
}
upload(){
/*
  this.as.deleteuploadAssisment().subscribe(event => {
    console.log(event);
  })
  */

  this.as.uploadAssisment(this.uploadedFiles,"fvf123","IT001").subscribe(event => { // assesment number , student number
    console.log(event);
  });
}

}
