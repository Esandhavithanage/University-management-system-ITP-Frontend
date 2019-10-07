import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Events } from 'src/app/models/Event';
import { AllEventsComponent } from '../all-events/all-events.component';

export interface IDate {
  year: number,
  month: number,
  day: number
}

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  updateObj2 = {};
  tempObj = {};
  date: IDate = {
    year: 0,
    month: 0,
    day: 0
  };
  dateError: boolean = false;
  eventIdError: boolean = false;
  empIdError: boolean = false;
  error: string = '';
  inserted: boolean = false;

  @Input('updateObj') updateObj1: Events;
  @Input('isUpdate') isUpdate;

  constructor(private eventService: EventService, private modelService: NgbModal,
    private allEvent: AllEventsComponent) { }

  ngOnInit() {
    if (this.isUpdate == true) {
      this.updateObj2 = this.updateObj1;

      // set date
      let tempdate = this.updateObj1.date;
      this.date = {
        year: parseInt(tempdate.substring(0, 4)),
        month: parseInt(tempdate.substring(5, 7)),
        day: parseInt(tempdate.substring(8, 10))
      };

    } else {
      // set today
      // set current date
      let date = new Date();
      let today = date.toJSON().toString();
      this.date = {
        year: parseInt(today.substring(0, 4)),
        month: parseInt(today.substring(5, 7)),
        day: parseInt(today.substring(8, 10))
      };

    }

  }

  addOrUpdate(addForm: NgForm) {
    this.inserted = false;
    this.dateError = false;
    this.empIdError = false;
    this.error = '';

    if (this.date == undefined || this.date == null || this.date.year == 0) {
      this.dateError = true;

    } else {

      // set date correct format
      let date_m: string = null;
      let date_d: string = null;

      if(this.date.month < 10){
        date_m = '0' + this.date.month;
      }else{
        date_m = this.date.month.toString();
      }

      if(this.date.day < 10){
        date_d = '0' + this.date.day;
      }else{
        date_d = this.date.day.toString();
      }

      let date = this.date.year + "-" + date_m + "-" + date_d;

      if (!this.isUpdate) {
        this.tempObj = {
          id: addForm.value.id,
          title: addForm.value.title,
          date: date,
          description: addForm.value.description,
          employeeId: addForm.value.empId,
        };

        console.log(this.tempObj);

        this.eventService.addEvents(this.tempObj).subscribe(result => {
          if(result == "success"){
            this.inserted = true;
          }else if(result == "ER_DUP_ENTRY"){
            this.eventIdError = true;
          }else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.empIdError = true;
          }else{
            this.error = "Something went wrong!";
          }

        });

      } else if (this.isUpdate) {
        this.tempObj = {
          eventId: addForm.value.id,
          title: addForm.value.title,
          date: date,
          description: addForm.value.description,
          employeeId: addForm.value.empId,
        };

        console.log(addForm.value);

        this.eventService.updateEvents(this.tempObj).subscribe(result => {
          if(result == "success"){
            this.inserted = true;
            this.allEvent.updateRow(this.tempObj);
          }else if(result == "ER_NO_REFERENCED_ROW_2"){
            this.empIdError = true;
          }else{
            this.error = "Something went wrong!";
          }
        });
      }
    }




  }

}
