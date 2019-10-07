import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { Events } from 'src/app/models/Event';
import { RStudent } from 'src/app/models/RStudent';

@Component({
  selector: 'event-manage',
  templateUrl: './event-manage.component.html',
  styleUrls: ['./event-manage.component.css']
})
export class EventManageComponent implements OnInit {
  events: Events[] = [];
  rStudents: RStudent[] = [];
  subs1: Subscription;
  subs2: Subscription;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  updateObj = {};
  totalRecords = 0;
  tempObj;
  tableSwitchValue: boolean = false;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // get events
    this.subs1 = this.eventService.getEvents().subscribe(result => {
      for (let i in result) {
        this.events.push(result[i]);
        this.totalRecords++;
      }
      console.log(this.events);
    });

    // get registered students
    this.subs2 = this.eventService.getRStudents().subscribe(result => {
      for(let i in result){
        this.rStudents.push(result[i]);
      }
      
    });

  }



  AddUpdateChange() {
    if (this.isUpdate) {
      this.isUpdate = false;
    }
    this.formOpen = ! this.formOpen;
  }

  addOrUpdate(addForm: NgForm) {
    
    console.log(this.tempObj);

    if (!this.isUpdate) {
      this.tempObj = {
        id: addForm.value.id,
        title: addForm.value.title,
        date: addForm.value.date,
        description: addForm.value.description,
        employeeId: addForm.value.empId,
      };

      this.eventService.addEvents(this.tempObj);
      this.events.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;

    } else if (this.isUpdate) {
      this.tempObj = {
        eventId: addForm.value.id,
        title: addForm.value.title,
        date: addForm.value.date,
        description: addForm.value.description,
        employeeId: addForm.value.empId,
      };

      console.log(addForm.value);

      this.subs2 = this.eventService.updateEvents(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            id: '',
            title: '',
            date: '',
            description: '',
            employeeId: ''
          };
          this.isUpdate = false;
          addForm.resetForm();

          for (let i in this.events) {
            if (this.events[i].eventId == this.tempObj.eventId) {
              this.events[i] = this.tempObj;
            }
          }
        }
      });
    }

  }

  updateBtn(event) {
    //scorell

    console.log(event);
    this.isUpdate = true;
    this.updateObj = {
      id: event.eventId,
      title: event.title,
      date: event.date,
      description: event.description,
      employeeId: event.employeeId
    };

    if(this.formOpen){
      this.formOpen = ! this.formOpen;
    }
    if(!this.formOpen){
      this.formOpen = ! this.formOpen;
    }
  }

  deleteBtn1(event: Events) {
    console.log(event);
    this.eventService.deleteEvents(event.eventId);
    for (let i in this.events) {
      if (this.events[i].eventId == event.eventId) {
        this.events.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }

  }

  deleteBtn2(rStudent: RStudent){
    console.log(rStudent);

    this.eventService.deleteRStudent(rStudent.eventId, rStudent.studentId);

    for (let i in this.rStudents) {
      if (this.rStudents[i].eventId == rStudent.eventId) {
        this.rStudents.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
