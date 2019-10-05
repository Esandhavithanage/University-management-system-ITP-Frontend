import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';
import { RegisterEmployeeComponent } from '../register-employee.component';

@Component({
  selector: 'register-emp',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterEmpComponent implements OnInit {
  tempObj;
  updateObj2 = {};
  empIdError: boolean = false;
  error: string = '';
  inserted: boolean = false;
  updated: boolean = false;

  @Input('updateObj') updateObj: Employee;
  @Input('isUpdate') isUpdate;

  constructor(private employeeService: EmployeeService, private employee: RegisterEmployeeComponent) { }

  ngOnInit() {
    if(this.isUpdate == true){
      this.updateObj2 = this.updateObj;
    }
    console.log(this.updateObj);
  }

  addOrUpdate(addForm: NgForm) {
    this.empIdError = false;
    this.error = '';
    this.inserted = false;
    this.updated = false;

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
    };
    console.log(addForm.value);
    if (this.isUpdate != true) {
      this.employeeService.addEmployee(this.tempObj).subscribe(result => {
        if(result == "success"){
          addForm.resetForm();
          this.inserted = true;
          this.employee.addRow(this.tempObj);
        }else if(result == "ER_DUP_ENTRY"){
          this.empIdError = true;
        }else if(result == "WARN_DATA_TRUNCATED"){
          this.error = "Salary Id or Timetable Id is invalid.";
        }else{
          this.error = "Something went wrong!";
        }
      });

    } else if (this.isUpdate == true) {
      console.log(addForm.value);

      this.employeeService.updateEmployee(this.tempObj).subscribe(result => {
        if (result == "success") {
          addForm.resetForm();
          this.updated = true;
          this.employee.updateRow(this.tempObj);
        }else if(result == "WARN_DATA_TRUNCATED"){
          this.error = "Salary Id or Timetable Id is invalid.";
        }else{
          this.error = "Something went wrong!";
        }
      });
    }
  }

}
