import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';
import assisment from 'src/app/models/assisment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'edit-delet-assingnment',
  templateUrl: './edit-delet-assingnment.component.html',
  styleUrls: ['./edit-delet-assingnment.component.css']
})
export class EditDeletAssingnmentComponent implements OnInit {

  assisment:assisment[];
  subjects:any;
  isQuiz:boolean=false;

  constructor(private as:AssingmentService) { }

  ngOnInit() {
    this.as.getsubjects().subscribe(res=>{
      console.log(res);
      this.subjects=res;
    });
  }

  search(form: NgForm){
    let subject = form.value.subject;
    let type = form.value.type;

    if(type == "Quiz"){
      this.isQuiz = true;
    }
    else{
      this.isQuiz = false;
    }

    this.as.getassisment(subject,type).subscribe((data:assisment[])=>{
      this.assisment=data;
      });
      form.reset();
  }

  deleteAssisment(id){
console.log(id);
    this.as.deleteAssisment(id).subscribe(res => {
      console.log('Deleted');
    });
    location.reload();
  }

  downloadAssisment(name){
    console.log(name);
    this.as.downloadAssisment(name);
  }

}
