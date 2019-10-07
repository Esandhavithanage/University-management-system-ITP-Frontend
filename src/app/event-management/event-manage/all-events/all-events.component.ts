import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/Event';
import { EventService } from 'src/app/services/event.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events: Events[] = [];
  isUpdate: boolean = false;
  formOpen: boolean = false;
  updateObj = {};
  totalRecords = 0;
  tempObj;
  deleteEventId: string = null;
  isDeleted: boolean = false;

  constructor(private eventService: EventService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // get events
    this.eventService.getEvents().subscribe(result => {
      for (let i in result) {
        this.events.push(result[i]);
        this.totalRecords++;
      }
      console.log(this.events);
    });
  }

  updateBtn(event, popupElement) {
    this.isUpdate = true;

    console.log(event);
    this.isUpdate = true;
    this.updateObj = {
      id: event.eventId,
      title: event.title,
      date: event.date,
      description: event.description,
      employeeId: event.employeeId
    };

    this.modelService.open(popupElement, { centered: true, scrollable: true });

  }

  deleteBtn1(event: Events, popupElement) {
    console.log(event);
    this.isDeleted = false;

    this.deleteEventId = event.eventId;

    this.modelService.open(popupElement);

    

  }

  delete(){
    this.eventService.deleteEvents(this.deleteEventId).subscribe(result => {
      if(result == "success"){
        for (let i in this.events) {
          if (this.events[i].eventId == this.deleteEventId) {
            this.events.splice(parseInt(i), 1);
            this.totalRecords--;
          }
        }
        this.modelService.dismissAll();
      }else{
        this.isDeleted = true;
      }
    });
    
  }

  updateRow(obj){
    console.log("update raw called");
    for(let i in this.events){
      if(this.events[i].eventId == obj.eventId){
        this.events[i] = obj;
      }
    }
    this.modelService.dismissAll();
    this.isUpdate = false;
  }

  close(){
    this.modelService.dismissAll();
  }

}
