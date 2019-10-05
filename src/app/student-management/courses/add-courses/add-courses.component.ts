import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/Course';
import { StudentService } from 'src/app/services/student.service';
import { AllCoursesComponent } from '../all-courses/all-courses.component';
import { OtherService } from 'src/app/services/other.service';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  departments: Department[] = [];
  updateObj2 = {};
  tempObj;
  isUpdate: boolean = false;
  formOpen: boolean = false;

  isUpdated: boolean = false;
  isAdded:boolean = false;
  courseIdError: boolean = false;
  empIdError: boolean = false;
  insertOrUpdateError:boolean = false;

  @Input('updateObj') updateObj: Course;
  @Input('isUpdate') isUpdate1;

  constructor(private studentService: StudentService, private allCourse: AllCoursesComponent,
    private otherServices: OtherService) { }

  ngOnInit() {
    // get depaerments
    this.otherServices.getDepartments().subscribe(result => {
      for (let i in result) {
        this.departments.push(result[i]);
      }
    });

    this.isUpdate = this.isUpdate1;
    if(this.isUpdate1 == true){
      this.updateObj2 = this.updateObj;
    }
    console.log(this.updateObj);
  }

  addOrUpdate(addForm: NgForm) {
    this.isAdded = false;
    this.isUpdated = false;
    this.courseIdError = false;
    this.empIdError = false;
    this.insertOrUpdateError = false;

    this.tempObj = {
      id: addForm.value.id,
      name: addForm.value.name,
      year: addForm.value.year,
      gpa: addForm.value.gpa,
      empId: addForm.value.empId,
      dName: addForm.value.dName
    };
    console.log(addForm.value);
    if (!this.isUpdate) {
      this.studentService.addCourses(this.tempObj).subscribe(result => {
        if(result == "success"){
          this.isAdded = true;
        }else if(result == "ER_DUP_ENTRY"){
          this.courseIdError = true;
        }else if(result == "ER_NO_REFERENCED_ROW_2"){
          this.empIdError = true;
        }else{
          this.insertOrUpdateError = true;
        }
      });
      
    } else if (this.isUpdate) {
      console.log(addForm.value);

      this.studentService.updateCourse(this.tempObj).subscribe(result => {
        if (result == "success") {
          this.isUpdated = true;
          
          this.isUpdate = false;
          this.allCourse.updateRow(this.tempObj);
          
        }else if(result == "ER_NO_REFERENCED_ROW_2"){
          this.empIdError = true;
        }else{
          this.insertOrUpdateError = true;
        }
      });
    }
  }

}
