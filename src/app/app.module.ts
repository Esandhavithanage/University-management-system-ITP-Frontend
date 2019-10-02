import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageServiceModule} from 'angular-webstorage-service'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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
import { RegisterEmployeeComponent } from './employee-management/register-employee/register-employee.component';
import { MoneyRequestComponent } from './employee-management/money-request/money-request.component';
import { EventComponent } from './event-management/event/event.component';
import { EventManageComponent } from './event-management/event-manage/event-manage.component';
import { EventService } from './services/event.service';
import { RegisterComponent } from './event-management/event/register/register.component';
import { ManageBookComponent } from './library-management/manage-book/manage-book.component';
import { LibraryService } from './services/library.service';
import { BorrowBookComponent } from './library-management/borrow-book/borrow-book.component';
import { AddAssingnmentComponent } from './AssignmentsExaminations/assingnment/add-assingnment/add-assingnment.component';
import { EditDeletAssingnmentComponent } from './AssignmentsExaminations/assingnment/edit-delet-assingnment/edit-delet-assingnment.component';
import { UplloadAssingnmentComponent } from './AssignmentsExaminations/assingnment/uplload-assingnment/uplload-assingnment.component';
import { ViewAssingnmentComponent } from './AssignmentsExaminations/assingnment/view-assingnment/view-assingnment.component';
import { ManagemarksComponent } from './AssignmentsExaminations/marks/managemarks/managemarks.component';
import { AddQuizComponent } from './AssignmentsExaminations/quiz/add-quiz/add-quiz.component';
import { EditQuizComponent } from './AssignmentsExaminations/quiz/edit-quiz/edit-quiz.component';
import { ViewQuizComponent } from './AssignmentsExaminations/quiz/view-quiz/view-quiz.component';
import { AssingmentService } from './services/assingment.service';
import { MarksService } from './services/marks.service';
import { NoticeService } from './services/notice.service';
import { QuizService } from './services/quiz.service';
import { NoticeComponent } from './Message/notice/notice.component';
import { ViewnoticeComponent } from './Message/viewnotice/viewnotice.component';
import { ResourceComponent } from './resource-management/resource-management.component';
import { ResourcesService } from './services/resources.service';
import { AttendantToQuizComponent } from './AssignmentsExaminations/quiz/attendant-to-quiz/attendant-to-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    AttendantToQuizComponent,

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
    RouterModule,
    StorageServiceModule
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
    ResourcesService
  ],
  schemas: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
