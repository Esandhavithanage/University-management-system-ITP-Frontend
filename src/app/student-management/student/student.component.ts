import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/Student';
import * as $ from 'jquery';
declare var scroll: any;

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}


