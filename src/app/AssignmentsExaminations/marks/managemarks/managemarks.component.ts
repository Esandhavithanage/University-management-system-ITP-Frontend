import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder,  Validators} from '@angular/forms';

import {MarksService}from'../../../services/marks.service'


@Component({
  selector: 'managemarks',
  templateUrl: './managemarks.component.html',
  styleUrls: ['./managemarks.component.css']
})
export class ManagemarksComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb:FormBuilder,private markssrvise:MarksService) 
  {
    this.createForm();
   }

   createForm(){
     this.angForm = this.fb.group({
       studentNo:['',Validators.required],
       subjectNo: ['',Validators.required],
       markstype:['',Validators.required],
       marks:['',Validators.required]
     });
   }

  ngOnInit() {

  }

  addmarks(studentNo, subjectNo,markstype,marks){
     console.log(studentNo+" "+subjectNo+" "+markstype+" "+marks +"fdf");
     this.markssrvise.addmarks(studentNo,subjectNo,markstype,marks);
  }
}
