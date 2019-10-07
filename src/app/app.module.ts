import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxPrintModule} from 'ngx-print';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { CalSalaryComponent } from './financial-management/cal-salary/cal-salary.component';
import { IncomeManageComponent } from './financial-management/income-manage/income-manage.component';
import { ExpencesManageComponent } from './financial-management/expences-manage/expences-manage.component'
import { ARMoneyRequestsComponent } from './financial-management/a-r-money-requests/a-r-money-requests.component';
import { FinancialService } from './services/financial.service';
import { AttendanceComponent } from './employee-management/attendance/attendance.component';
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
import { RegisterEmployeeComponent } from './employee-management/employee/register-employee.component';
import { MoneyRequestComponent } from './employee-management/money-request/money-request.component';
import { ResourceComponent } from './resource-management/resource-management.component';
import { EventComponent } from './event-management/event/event.component';
import { EventManageComponent } from './event-management/event-manage/event-manage.component';
import { ManageBookComponent } from './library-management/manage-book/manage-book.component';
import { ManagemarksComponent } from './AssignmentsExaminations/marks/managemarks/managemarks.component';
import { BorrowBookComponent } from './library-management/borrow-book/borrow-book.component';
import { AddAssingnmentComponent } from './AssignmentsExaminations/assingnment/add-assingnment/add-assingnment.component';
import { EditDeletAssingnmentComponent } from './AssignmentsExaminations/assingnment/edit-delet-assingnment/edit-delet-assingnment.component';
import { ViewAssingnmentComponent } from './AssignmentsExaminations/assingnment/view-assingnment/view-assingnment.component';
import { UplloadAssingnmentComponent } from './AssignmentsExaminations/assingnment/uplload-assingnment/uplload-assingnment.component';
import { ViewQuizComponent } from './AssignmentsExaminations/quiz/view-quiz/view-quiz.component';
import { AddQuizComponent } from './AssignmentsExaminations/quiz/add-quiz/add-quiz.component';
import { EditQuizComponent } from './AssignmentsExaminations/quiz/edit-quiz/edit-quiz.component';
import { NoticeComponent } from './Message/notice/notice.component';
import { RegisterComponent } from './event-management/event/register/register.component';
import { ViewnoticeComponent } from './Message/viewnotice/viewnotice.component';
import { AllIncomeComponent } from './financial-management/income-manage/all-income/all-income.component';
import { SearchIncomeComponent } from './financial-management/income-manage/search-income/search-income.component';
import { EventService } from './services/event.service';
import { AssingmentService } from './services/assingment.service';
import { MarksService } from './services/marks.service';
import { LibraryService } from './services/library.service';
import { NoticeService } from './services/notice.service';
import { QuizService } from './services/quiz.service';
import { ResourcesService } from './services/resources.service';
import { AddExpenceComponent } from './financial-management/expences-manage/add-expence/add-expence.component';
import { AllExpenceComponent } from './financial-management/expences-manage/all-expence/all-expence.component';
import { SearchExpenceComponent } from './financial-management/expences-manage/search-expence/search-expence.component';
import { UpdateIncomeComponent } from './financial-management/income-manage/update-income/update-income.component';
import { AllStudentComponent } from './student-management/student/all-student/all-student.component';
import { AddStudentComponent } from './student-management/student/add-student/add-student.component';
import { AllCoursesComponent } from './student-management/courses/all-courses/all-courses.component';
import { AddCoursesComponent } from './student-management/courses/add-courses/add-courses.component';
import { AddPaymentsComponent } from './student-management/student-payments/add-payments/add-payments.component';
import { AllPaymentsComponent } from './student-management/student-payments/all-payments/all-payments.component';
import { RegisterEmpComponent } from './employee-management/employee/register-emp/register.component';
import { InsertAttendanceComponent } from './employee-management/attendance/insert-attendance/insert-attendance.component';
import { BookComponent } from './library-management/manage-book/book/book.component';
import { AuthorComponent } from './library-management/manage-book/author/author.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllEventsComponent } from './event-management/event-manage/all-events/all-events.component';
import { AddEventComponent } from './event-management/event-manage/add-event/add-event.component';
import { RegisteredStudentsComponent } from './event-management/event-manage/registered-students/registered-students.component';



@NgModule({
  declarations: [
    AppComponent,
    CalSalaryComponent,
    IncomeManageComponent,
    ExpencesManageComponent,
    ARMoneyRequestsComponent,
    AttendanceComponent,
    SalaryReceiptComponent,
    IncomeReportComponent,
    ExpenceReportComponent,
    StudentComponent,
    CoursesComponent,
    StudentPaymentsComponent,
    RegisterEmployeeComponent,
    MoneyRequestComponent,
    EventComponent,
    EventManageComponent,
    RegisterComponent,
    ManageBookComponent,
    BorrowBookComponent,
    ResourceComponent,
    AddAssingnmentComponent,
    EditDeletAssingnmentComponent,
    UplloadAssingnmentComponent,
    ViewAssingnmentComponent,
    ManagemarksComponent,
    AddQuizComponent,
    EditQuizComponent,
    ViewQuizComponent,
    NoticeComponent,
    ViewnoticeComponent,
    AllIncomeComponent,
    SearchIncomeComponent,
    AddExpenceComponent,
    AllExpenceComponent,
    SearchExpenceComponent,
    UpdateIncomeComponent,
    SearchIncomeComponent,
    AllStudentComponent,
    AddStudentComponent,
    AllCoursesComponent,
    AddCoursesComponent,
    AddPaymentsComponent,
    AllPaymentsComponent,
    RegisterComponent,
    RegisterEmpComponent,
    InsertAttendanceComponent,
    BookComponent,
    AuthorComponent,
    LoginComponent,
    DashboardComponent,
    AllEventsComponent,
    AddEventComponent,
    RegisteredStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    NgbModule,
    NgxPrintModule,
    FontAwesomeModule,
    DataTablesModule,
    RouterModule,
    SlimLoadingBarModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    FinancialService,
    EmployeeService,
    StudentService,
    OtherService,
    EventService,
    LibraryService,
    AssingmentService,
    MarksService,
    NoticeService,
    QuizService,
    ResourcesService,
    AllExpenceComponent,
    SearchExpenceComponent,
    SearchIncomeComponent,
    AllIncomeComponent,
    AllStudentComponent,
    AllCoursesComponent,
    RegisterEmployeeComponent,
    AttendanceComponent
  ],
  schemas: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
