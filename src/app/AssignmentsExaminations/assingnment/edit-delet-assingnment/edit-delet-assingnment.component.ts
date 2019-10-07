import { Component, OnInit } from '@angular/core';
import { AssingmentService } from 'src/app/services/assingment.service';
import assisment from 'src/app/models/assisment';

@Component({
  selector: 'edit-delet-assingnment',
  templateUrl: './edit-delet-assingnment.component.html',
  styleUrls: ['./edit-delet-assingnment.component.css']
})
export class EditDeletAssingnmentComponent implements OnInit {

  assisment:assisment[];

  constructor(private as:AssingmentService) { }

  ngOnInit() {
this.as.getassisment().subscribe((data:assisment[])=>{
this.assisment=data;
});
  }

  deleteAssisment(id){
console.log(id);
    this.as.deleteAssisment(id).subscribe(res => {
      console.log('Deleted');
    });
    location.reload();
  }

}
