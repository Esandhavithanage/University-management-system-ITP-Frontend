import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { Student } from '../models/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employees: Employee[] = [];
  students: Student[] = [];
  stu: Student = null;
  emp: Employee = null;
  loginError: boolean = false;

  constructor(private studentService: StudentService,
    private employeeService: EmployeeService,
    private router: Router) {

  }

  ngOnInit() {
    // get students
    this.studentService.getStudent().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.students.push(result[i]);
      }
    });

    // get employees
    this.employeeService.getEmployee().subscribe(result => {
      console.log(result);
      for (let i in result) {
        this.employees.push(result[i]);
      }
    });

  }

  login(form: NgForm) {
    console.log(form.value);
    let id = form.value.id;
    let password = form.value.password;

    let employee: boolean = false;
    let student: boolean = false;

    // check if a student
    for (let i in this.students) {
      if (this.students[i].id == id && this.students[i].pwd == password) {
        student = true;
        this.stu = this.students[i];
      }
    }

    // check if a employee
    for (let i in this.employees) {
      if (this.employees[i].id == id && this.employees[i].pwd == password) {
        employee = true;
        this.emp = this.employees[i];
      }
    }

    if (id == "admin" && password == "admin") {

      console.log("logged in admin");
      localStorage.setItem('currentUser', 'employee');
       
      this.router.navigate(['dashboard']);

    } else if (student == true) {

      console.log("logged in student");
      localStorage.setItem('currentUser', 'student');

      this.router.navigate(['dashboard']);

    } else if (employee == true) {
      let type: string = this.emp.type;
      console.log(type);

      console.log("logged in academic employee");
      localStorage.setItem('currentUser', 'employee');
      
      this.router.navigate(['dashboard']);

    } else {
      this.loginError = true;
      console.log("login failed");

    }


  }



}
