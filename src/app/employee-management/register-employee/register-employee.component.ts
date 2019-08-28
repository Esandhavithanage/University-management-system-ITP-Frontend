import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.subs1 = this.employeeService.getEmployee().subscribe(result => {
      for (let i in result) {
        this.employee.push(result[i]);
        this.totalRecords += 1;
      }
    });
  }

  canselUpdate() {
    if (this.isUpdate) {
      this.isUpdate = false;
    }
  }

  addOrUpdate(addForm: NgForm) {
    this.tempObj = {
      id: addForm.value.id,
      name: addForm.value.name,
      address: addForm.value.address,
      gender: addForm.value.gender,
      nic: addForm.value.nic,
      email: addForm.value.email,
      type: addForm.value.type,
      title: addForm.value.title,
      pwd: addForm.value.pwd,
      salId: addForm.value.salId,
      timeTableId: addForm.value.timeTableId,
      employeecol: addForm.value.employeecol
    };
    console.log(addForm.value);
    if (!this.isUpdate) {
      this.employeeService.addEmployee(this.tempObj);
      this.employee.push(this.tempObj);
      addForm.resetForm();
      this.totalRecords++;
    } else if (this.isUpdate) {
      console.log(addForm.value);

      this.subs2 = this.employeeService.updateEmployee(this.tempObj).subscribe(result => {
        if (result) {
          this.updateObj = {
            id: '',
            name: '',
            address: '',
            gender: '',
            nic: '',
            email: '',
            type: '',
            title: '',
            pwd: '',
            salId: '',
            timeTableId: '',
            employeecol: ''
          };
          this.isUpdate = false;
          addForm.resetForm();

          for (let i in this.employee) {
            if (this.employee[i].id == this.tempObj.id) {
              this.employee[i] = this.tempObj;
            }
          }
        }
      });
    }
  }

  updateBtn(e: Employee) {
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
      employeecol: e.employeecol
    };

  }

  deleteBtn(e: Employee) {
    this.employeeService.deleteEmployee(e.id);
    for (let i in this.employee) {
      if (this.employee[i].id == e.id) {
        this.employee.splice(parseInt(i), 1);
        this.totalRecords--;
      }
    }
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    // this.subs2.unsubscribe();
  }

}
