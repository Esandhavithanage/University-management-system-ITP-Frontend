import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent implements OnInit {
  students: Student[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Student;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  isDeleted: boolean = false;
  deleteObj: Student;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private studentService: StudentService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.studentService.getStudent().subscribe(result => {
      for (let i in result) {
        this.students.push(result[i]);
        this.totalRecords += 1;
      }
      this.dtTrigger.next();

    });
  }

  updateBtn(student: Student, popupContent2) {
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

    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });

  }

  
  deleteBtn(student: Student, deleteConfirm) {
    this.isDeleted = false;
    console.log(student);

    this.deleteObj = student;
    this.modelService.open(deleteConfirm);
  }

    // delete the record
    delete() {
      this.isDeleted = false;
      console.log(this.deleteObj.id);
  
    this.studentService.deleteStudent(this.deleteObj.id).subscribe(result => {
        console.log(result);
  
        if (result == "failed") {
          this.isDeleted = true;
          
        } else if(result == "success") {
          console.log(result);
          for (let i in this.students) {
            if (this.students[i].id == this.deleteObj.id) {
              this.students.splice(parseInt(i), 1);
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

    for (let i in this.students) {
      if (this.students[i].id == obj.id) {
        this.students[i] = obj;
      }
    }
   
    this.modelService.dismissAll();
  }

  close() {
    this.modelService.dismissAll();
  }

}
