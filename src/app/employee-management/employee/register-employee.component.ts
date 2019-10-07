import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {
  subs1: Subscription;
  subs2: Subscription;
  employee: Employee[] = [];
  totalRecords = 0;
  updateObj = {};
  tempObj: Employee;
  isUpdate: boolean = false;
  formOpen: boolean = false;
  isDeleted: boolean = false;
  deleteObj;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private employeeService: EmployeeService,
    private config: NgbModalConfig,
    private modelService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    
    this.subs1 = this.employeeService.getEmployee().subscribe(result => {
      for (let i in result) {
        this.employee.push(result[i]);
        this.totalRecords += 1;
      }
      this.dtTrigger.next();
    });
  }

  register(popupContent2) {
    this.isUpdate = false;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });
  }

  

  updateBtn(e: Employee, popupContent2) {
    this.isUpdate = true;
    this.updateObj = {
      id: e.id,
      name: e.name,
      address: e.address,
      gender: e.gender,
      nic: e.nic,
      email: e.email,
      type: e.type,
      title: e.title,
      pwd: e.pwd,
      salId: e.salId,
      timeTableId: e.timeTableId,
    };

    this.isUpdate = true;
    this.modelService.open(popupContent2, { centered: true, scrollable: true });

  }

  deleteBtn(employee: Employee, deleteConfirm) {
    this.isDeleted = false;
    console.log(employee);

    this.deleteObj = employee;
    this.modelService.open(deleteConfirm);
  }

  // delete the record
  delete() {
    this.isDeleted = false;
    console.log(this.deleteObj.id);

    this.employeeService.deleteEmployee(this.deleteObj.id).subscribe(result => {
      console.log(result);

      if (result == "failed") {
        this.isDeleted = true;

      } else if (result == "success") {
        console.log(result);
        for (let i in this.employee) {
          if (this.employee[i].id == this.deleteObj.id) {
            this.employee.splice(parseInt(i), 1);
          }
        }
        this.isDeleted = false;
        this.totalRecords--;
        this.modelService.dismissAll();

      }
    });

  }

  // update row after add
  addRow(obj){
    console.log("add row called");

    this.employee.push(obj);

    this.modelService.dismissAll();

  }

  // update row after update
  updateRow(obj) {
    console.log("update row called");

    for (let i in this.employee) {
      if (this.employee[i].id == obj.id) {
        this.employee[i] = obj;
      }
    }
    this.isUpdate = false;
    this.modelService.dismissAll();
  }

  close() {
    this.modelService.dismissAll();
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
