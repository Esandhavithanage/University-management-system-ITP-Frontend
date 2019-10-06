import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'uplload-assingnment',
  templateUrl: './uplload-assingnment.component.html',
  styleUrls: ['./uplload-assingnment.component.css']
})
export class UplloadAssingnmentComponent implements OnInit {

  uploadedFiles:File = null;
  fileName:String = "Choos a file";
  AID:any;
  ATital:any;
  upodedfiles 

  constructor(private as:AssingmentService,private route:ActivatedRoute,public router: Router) { }

  ngOnInit() {

    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        console.log(params['id']);
        this.AID = params['id'];
        this.as.getAssismentDetails(this.AID).subscribe(res=>{
          this.ATital = res[0].title
          this.as.getAssismentFiles(this.ATital,"IT001").subscribe(res =>{
            this.upodedfiles = res;
          });
        })
    });
    }


  }
  fileChange(element) {
    this.uploadedFiles =<File> element.target.files[0];
    this.fileName = element.target.files[0].name;
}

deleteAssisment(assisment,filename,){
console.log(assisment+" "+filename);
this.as.deleteuploadAssisment(assisment,filename,"IT001").subscribe(res =>{
  console.log(res);
  alert("File deleted sucssesfuly");
  window.location.reload();
});
}

upload(){
  this.as.uploadAssisment(this.uploadedFiles,this.ATital,"IT001").subscribe(event => { // assesment number , student number
    console.log(event);
    alert("File uploaded sucssesfuly");
    window.location.reload();
  });
}

}
