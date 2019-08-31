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
  subs1: Subscription;
  subs2: Subscription;
  students: Student[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Student;
  isUpdate: boolean = false;
  formOpen: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.subs1 = this.studentService.getStudent().subscribe(result => {
      for (let i in result) {
        this.students.push(result[i]);
        this.totalRecords += 1;
      }

    });



  }

  AddUpdateChange() {
    if (this.isUpdate) {
      this.isUpdate = false;
    }
    this.formOpen = !this.formOpen;
  }

  addOrUpdate(addForm: NgForm) {
    this.tempObj = {
      id: addForm.value.id,
      name: addForm.value.name,
      address: addForm.value.address,
      gender: addForm.value.gender,
      batchId: addForm.value.batchId,
      email: addForm.value.email,
      nic: addForm.value.nic,
      pwd: addForm.value.pwd
    };
    console.log(addForm.value);
    if (!this.isUpdate) {
      this.studentService.addStudent(this.tempObj);
      this.students.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;
    } else if (this.isUpdate) {
      console.log(addForm.value);

      this.subs2 = this.studentService.updateStudent(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            id: '',
            name: '',
            address: '',
            gender: '',
            batchId: '',
            email: '',
            nic: '',
            pwd: ''
          };
          this.isUpdate = false;
          addForm.resetForm();

          for (let i in this.students) {
            if (this.students[i].id == this.tempObj.id) {
              this.students[i] = this.tempObj;
            }
          }
        }
      });
    }
  }

  updateBtn(student: Student) {
    this.isUpdate = true;
    this.updateObj = {
      id: student.id,
      name: student.name,
      address: student.address,
      gender: student.gender,
      batchId: student.batchId,
      email: student.email,
      nic: student.nic,
      pwd: student.pwd
    };

    if(this.formOpen){
      this.formOpen = ! this.formOpen;
    }
    if(!this.formOpen){
      this.formOpen = ! this.formOpen;
    }

  }

  deleteBtn(student: Student) {
    this.studentService.deleteStudent(student.id);
    for (let i in this.students) {
      if (this.students[i].id == student.id) {
        this.students.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnDestroy() {
    // this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }




}


