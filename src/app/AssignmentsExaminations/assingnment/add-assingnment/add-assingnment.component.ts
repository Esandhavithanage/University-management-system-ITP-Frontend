import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'util';
import { AssingmentService } from 'src/app/services/assingment.service';

@Component({
  selector: 'add-assingnment',
  templateUrl: './add-assingnment.component.html',
  styleUrls: ['./add-assingnment.component.css']
})
export class AddAssingnmentComponent implements OnInit {
  angForm: FormGroup;
  editassisment:any={};
  subjects:any;
  formType:boolean = false;
  constructor(private fb:FormBuilder,private assisment:AssingmentService,private route:ActivatedRoute,private router: Router) {
    this.createForm();
   }

  createForm(){
  
  }
  add(from:NgForm){
    console.log(from.value);
    let tital = from.value.title;
    let startdate = from.value.startdate;
    let deadline = from.value.deadline;
    let subject = from.value.subject;
    let type = from.value.type;

    this.assisment.addassisment(tital,startdate,deadline,subject,type);
  }

  update(from:NgForm){
    console.log(from.value);
    let id = from.value.id;
    let tital = from.value.title;
    let startdate = from.value.startdate;
    let deadline = from.value.deadline;
    let subject = from.value.subject;
    let type = from.value.type;

    this.assisment.UpdateAssisment(id,tital,startdate,deadline,subject,type);
  }
  ngOnInit() {

    this.assisment.getsubjects().subscribe(res=>{
      console.log(res);
      this.subjects=res;
    });

    if(this.route.snapshot.params['id']){
      this.route.params.subscribe(params => {
        this.assisment.editAssisment(params['id']).subscribe(res => {
          console.log(res);
          this.editassisment = res;
          this.formType=true;
      });
    });
    }else{
      console.log('dsfsdfsdfsd');
    }
  }

}
