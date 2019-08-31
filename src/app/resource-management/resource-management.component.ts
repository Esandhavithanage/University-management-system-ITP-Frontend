import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourcesService } from 'src/app/services/resources.service';
import { Subscription } from 'rxjs';
import { Resources } from 'src/app/models/resources';

@Component({
  selector: 'resource',
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.css']
})
export class ResourceComponent implements OnInit, OnDestroy {
  subs1: Subscription;
  subs2: Subscription;
  resources: Resources[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Resources;
  isUpdate: boolean = false;

  constructor(private ResourcesService: ResourcesService) { }

  ngOnInit() {
    this.subs1 = this.ResourcesService.getResource().subscribe(result => {
      for (let i in result) {
        this.resources.push(result[i]);
        this.totalRecords += 1;
      }
    });
  }

  canselUpdate(){
    if(this.isUpdate){
      this.isUpdate = false;
    }
  }

  addOrUpdate(addForm: NgForm) {
    this.tempObj = {
      id: addForm.value.id,
      type: addForm.value.type,
      qty: addForm.value.qty,
    };
     console.log(addForm.value);
    if(!this.isUpdate){
      this.ResourcesService.addResource(this.tempObj);
      this.resources.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;
    }else if(this.isUpdate){
      console.log(addForm.value);

      this.subs2 = this.ResourcesService.updateResource(this.tempObj).subscribe(result => {
        if(result){
          this.updateObj = {
            id: '',
            type: '',
            qty: '',
           
          };
          this.isUpdate = false;
          addForm.resetForm();

          for(let i in this.resources){
            if(this.resources[i].id == this.tempObj.id){
              this.resources[i] = this.tempObj;
            }
          }
        }
      });
    }
  }

  updateBtn(resources: Resources) {
    this.isUpdate = true;
    this.updateObj = {
      id: resources.id,
      type: resources.type,
      qty: resources.qty
     
    };

  }

  deleteBtn(resources: Resources) {
    this.ResourcesService.deleteResource(resources.id);
    for(let i in this.resources){
      if(this.resources[i].id == resources.id){
        this.resources.splice(parseInt(i), 1);
        this.totalRecords--;
      } 
    }
  }

  ngOnDestroy() {
    //this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
