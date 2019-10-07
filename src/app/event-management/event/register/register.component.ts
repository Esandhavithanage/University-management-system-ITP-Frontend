import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Events } from 'src/app/models/Event';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input('currentEvent') currentEvent: Events; 

  constructor(private modelService: NgbModal, private eventService: EventService) { }

  ngOnInit() {
    console.log("event " + this.currentEvent.eventId);
  }

  close(){
    // console.log("closed");
    this.modelService.dismissAll();
  }

  register(form: NgForm){
    console.log(form.value);

    let obj = {
      eventId: this.currentEvent.eventId,
      studentId: form.value.studentId,
      date: form.value.date
    };

    console.log(obj);

    let result = this.eventService.registerEvent(obj).subscribe();

    if(result){
      //form.reset();
      this.modelService.dismissAll();
    }

    
  }

}
