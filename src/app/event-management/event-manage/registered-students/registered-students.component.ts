import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { RStudent } from 'src/app/models/RStudent';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'registered-students',
  templateUrl: './registered-students.component.html',
  styleUrls: ['./registered-students.component.css']
})
export class RegisteredStudentsComponent implements OnInit {
  rStudents: RStudent[] = [];
  totalRecords = 0;
  tempObj;
  deleteRecordEId: string;
  deleteRecordSId: string;
  isDeleted: boolean = false;

  constructor(private eventService: EventService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // get registered students
    this.eventService.getRStudents().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.rStudents.push(result[i]);
      }

    });
  }

  deleteBtn(student, popupElement) {
    this.isDeleted = false;
    this.deleteRecordSId = student.studentId;
    this.deleteRecordEId = student.eventId;
    this.modelService.open(popupElement);
  }


  delete() {
    this.eventService.deleteRStudent(this.deleteRecordEId, this.deleteRecordSId).subscribe(result => {
      if(result == "success"){
        for (let i in this.rStudents) {
          if (this.rStudents[i].eventId == this.deleteRecordEId && this.rStudents[i].studentId == this.deleteRecordSId) {
            this.rStudents.splice(parseInt(i), 1);
            this.totalRecords--;
          }
        }
        this.modelService.dismissAll();
      }else{
        this.isDeleted = true;
      }
    });
  }
}
