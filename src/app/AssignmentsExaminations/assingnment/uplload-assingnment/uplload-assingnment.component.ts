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
  upodedfiles 

  constructor(private as:AssingmentService) { }

  ngOnInit() {
    this.as.getAssismentFiles("fvf123","IT001").subscribe(res =>{
      this.upodedfiles = res;
    });
  }
  fileChange(element) {
    this.uploadedFiles =<File> element.target.files[0];
    this.fileName = element.target.files[0].name;
}

deleteAssisment(assisment,filename,){
console.log(assisment+" "+filename);
this.as.deleteuploadAssisment(assisment,filename,"IT001").subscribe(res =>{
  console.log(res);
});
}

upload(){
  this.as.uploadAssisment(this.uploadedFiles,"fvf123","IT001").subscribe(event => { // assesment number , student number
    console.log(event);
  });
}

}
