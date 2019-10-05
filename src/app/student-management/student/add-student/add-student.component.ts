import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { AllStudentComponent } from '../all-student/all-student.component';

@Component({
  selector: 'add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  updateObj2 = {};
  tempObj: Student;
  isUpdate: boolean = false;
  formOpen: boolean = false;

  isUpdated: boolean = false;
  isAdded:boolean = false;
  studentIdError: boolean = false;
  batchIdError: boolean = false;
  insertOrUpdateError:boolean = false;

  @Input('updateObj') updateObj: Student;
  @Input('isUpdate') isUpdate1;

  constructor(private studentService: StudentService, private allStudents: AllStudentComponent) { }

  ngOnInit() {
    this.isUpdate = this.isUpdate1;
    if(this.isUpdate1 == true){
      this.updateObj2 = this.updateObj;
    }
    console.log(this.updateObj);
  }

  addOrUpdate(addForm: NgForm) {
    this.isAdded = false;
    this.isUpdated = false;
    this.studentIdError = false;
    this.batchIdError = false;
    this.insertOrUpdateError = false;

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
      this.studentService.addStudent(this.tempObj).subscribe(result => {
        if(result == "success"){
          this.isAdded = true;
        }else if(result == "ER_DUP_ENTRY"){
          this.studentIdError = true;
        }else if(result == "ER_NO_REFERENCED_ROW_2"){
          this.batchIdError = true;
        }else{
          this.insertOrUpdateError = true;
        }
      });
      
    } else if (this.isUpdate) {
      console.log(addForm.value);

      this.studentService.updateStudent(this.tempObj).subscribe(result => {
        if (result == "success") {
          this.isUpdated = true;
          
          this.isUpdate = false;
          this.allStudents.updateRow(this.tempObj);
          
        }else if(result == "ER_NO_REFERENCED_ROW_2"){
          this.batchIdError = true;
        }else{
          this.insertOrUpdateError = true;
        }
      });
    }
  }

}
