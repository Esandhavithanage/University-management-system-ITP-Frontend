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

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }


}
