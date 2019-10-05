import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { StudentService } from 'src/app/services/student.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: Course[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Course;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  isDeleted: boolean = false;
  deleteObj: Course;

  constructor(private studentService: StudentService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.studentService.getCourses().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.courses.push(result[i]);
        this.totalRecords += 1;
      }

    });
  }

  updateBtn(course: Course, popupContent2) {
    this.isUpdate = true;
    this.updateObj = {
      id: course.id,
      name: course.name,
      year: course.year,
      gpa: course.gpa,
      empId: course.empId,
      empName: course.empName,
      dId: course.dId,
      dName: course.dName
    };

    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });

  }

  
  deleteBtn(course: Course, deleteConfirm) {
    this.isDeleted = false;
    console.log(course);

    this.deleteObj = course;
    this.modelService.open(deleteConfirm);
  }

    // delete the record
    delete() {
      this.isDeleted = false;
      console.log(this.deleteObj.id);
  
    this.studentService.deleteCourse(this.deleteObj.id).subscribe(result => {
        console.log(result);
  
        if (result == "failed") {
          this.isDeleted = true;
          
        } else if(result == "success") {
          console.log(result);
          for (let i in this.courses) {
            if (this.courses[i].id == this.deleteObj.id) {
              this.courses.splice(parseInt(i), 1);
            }
          }
          this.isDeleted = false;
          this.totalRecords--;
          this.modelService.dismissAll();
          
        }
      });
  
    }

    // update row after update
  updateRow(obj) {
    console.log("update row called");

    for (let i in this.courses) {
      if (this.courses[i].id == obj.id) {
        this.courses[i] = obj;
      }
    }
   
    this.modelService.dismissAll();
  }

  close() {
    this.modelService.dismissAll();
  }

}
