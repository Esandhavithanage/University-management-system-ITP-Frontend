import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPrintModule} from 'ngx-print';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalSalaryComponent } from './financial-management/cal-salary/cal-salary.component';
import { IncomeManageComponent } from './financial-management/income-manage/income-manage.component';
import { ExpencesManageComponent } from './financial-management/expences-manage/expences-manage.component'
import { ARMoneyRequestsComponent } from './financial-management/a-r-money-requests/a-r-money-requests.component';
import { FinancialService } from './services/financial.service';
import { InsertAttendanceComponent } from './employee-management/insert-attendance/insert-attendance.component';
import { HttpClientModule } from '@angular/common/http';
import { SalaryReceiptComponent } from './financial-management/cal-salary/salary-receipt/salary-receipt.component';
import { EmployeeService } from './services/employee.service';
import { IncomeReportComponent } from './financial-management/income-manage/income-report/income-report.component';
import { ExpenceReportComponent } from './financial-management/expences-manage/expence-report/expence-report.component';
import { StudentComponent } from './student-management/student/student.component';
import { StudentService } from './services/student.service';
import { CoursesComponent } from './student-management/courses/courses.component';
import { OtherService } from './services/other.service';
import { StudentPaymentsComponent } from './student-management/student-payments/student-payments.component';
import { RegisterEmployeeComponent } from './employee-management/register-employee/register-employee.component';
import { MoneyRequestComponent } from './employee-management/money-request/money-request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CalSalaryComponent,
    IncomeManageComponent,
    ExpencesManageComponent,
    ARMoneyRequestsComponent,
    InsertAttendanceComponent,
    SalaryReceiptComponent,
    IncomeReportComponent,
    ExpenceReportComponent,
    StudentComponent,
    CoursesComponent,
    StudentPaymentsComponent,
    RegisterEmployeeComponent,
    MoneyRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    NgbModule,
    NgxPrintModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'financial-cal-salary', component: CalSalaryComponent },
      { path: 'financial-manage-income', component: IncomeManageComponent },
      { path: 'financial-manage-expences', component: ExpencesManageComponent },
      { path: 'financial-moneyRequests', component: ARMoneyRequestsComponent },
      { path: 'student-student', component: StudentComponent },
      { path: 'student-courses', component: CoursesComponent },
      { path: 'student-payments', component: StudentPaymentsComponent },
      { path: 'employee-attendance', component: InsertAttendanceComponent },
      { path: 'employee-register', component: RegisterEmployeeComponent },
      { path: 'employee-mRequests', component: MoneyRequestComponent }
    ])
  ],
  providers: [
    FinancialService,
    EmployeeService,
    StudentService,
    OtherService
  ],
  schemas: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
