import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Events } from 'src/app/models/Event';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  subs1: Subscription;
  events: Events[] = [];
  currentEvent: Events;
  
  ngOnDestroy(){
    
  }

  constructor(private eventServices: EventService,
    private config: NgbModalConfig,
    private modelService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
     }
  

  ngOnInit() {
    // get events
    this.eventServices.getEvents().subscribe(result => {
      for(let i in result){
        this.events.push(result[i]);
      }
    });
  }

  register(event, popupContent){

    this.currentEvent = event;
    console.log(this.currentEvent);

    this.open(popupContent);

  }

  private open(popupContent){
    this.modelService.open(popupContent, { centered: true });
  }

  close(){
    this.modelService.dismissAll();
  }

}
