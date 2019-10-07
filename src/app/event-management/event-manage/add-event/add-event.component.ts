import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  updateObj2 = {};
  tempObj = {};

  @Input('updateObj') updateObj1: Event;
  @Input('isUpdate') isUpdate;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    if (this.isUpdate == true) {
      this.updateObj2 = this.updateObj1;
    }

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

    } else if (this.isUpdate) {
      this.tempObj = {
        eventId: addForm.value.id,
        title: addForm.value.title,
        date: addForm.value.date,
        description: addForm.value.description,
        employeeId: addForm.value.empId,
      };

      console.log(addForm.value);

      this.eventService.updateEvents(this.tempObj).subscribe(result => {
        if (result == "success") {
          
          this.isUpdate = false;
          addForm.resetForm();

          
        }else{
          
        }
      });
    }

  }

}
