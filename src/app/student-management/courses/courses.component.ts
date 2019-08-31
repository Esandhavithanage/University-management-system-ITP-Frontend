import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { OtherService } from 'src/app/services/other.service';
import { Employee } from 'src/app/models/Employee';
import { Department } from 'src/app/models/Department';
import { Course } from 'src/app/models/Course';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  employees: Employee[] = [];
  departments: Department[] = [];
  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  updateObj = {};
  totalRecords = 0;
  tempObj;

  constructor(private studentService: StudentService,
    private employeeService: EmployeeService,
    private otherServices: OtherService
  ) { }

  ngOnInit() {
    // get employees
    this.subs1 = this.employeeService.getEmployee().subscribe(result => {
      for (let i in result) {
        this.employees.push(result[i]);
      }
    });

    // get depaerments
    this.subs2 = this.otherServices.getDepartments().subscribe(result => {
      for (let i in result) {
        this.departments.push(result[i]);
      }
    });

    // get courses
    this.subs3 = this.studentService.getCourses().subscribe(result => {
      for (let i in result) {
        this.courses.push(result[i]);
        this.totalRecords++;
      }
      console.log(this.courses);
    });

  }

  AddUpdateChange() {
    if (this.isUpdate) {
      this.isUpdate = false;
    }
    this.formOpen = ! this.formOpen;
  }

  addOrUpdate(addForm: NgForm) {
    this.tempObj = {
      id: addForm.value.id,
      name: addForm.value.name,
      year: addForm.value.year,
      gpa: addForm.value.gpa,
      empName: addForm.value.empName,
      dName: addForm.value.dName
    };
    console.log(this.tempObj);

    if (!this.isUpdate) {
      this.studentService.addCourses(this.tempObj);
      this.courses.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;

    } else if (this.isUpdate) {
      console.log(addForm.value);

      this.subs2 = this.studentService.updateCourse(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            id: '',
            name: '',
            year: '',
            gpa: '',
            emp: '',
            dName: ''
          };
          this.isUpdate = false;
          addForm.resetForm();

          for (let i in this.courses) {
            if (this.courses[i].id == this.tempObj.id) {
              this.courses[i] = this.tempObj;
            }
          }
        }
      });
    }

  }

  updateBtn(course: Course) {
    console.log(course);
    this.isUpdate = true;
    this.updateObj = {
      id: course.id,
      name: course.name,
      year: course.year,
      gpa: course.gpa,
      empName: course.empName,
      dName: course.dName
    };

    if(this.formOpen){
      this.formOpen = ! this.formOpen;
    }
    if(!this.formOpen){
      this.formOpen = ! this.formOpen;
    }
  }

  deleteBtn(course: Course) {
    this.studentService.deleteCourse(course.id);
    for (let i in this.courses) {
      if (this.courses[i].id == course.id) {
        this.courses.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }

  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
    //this.subs2.unsubscribe();
  }

}
