import { HomeComponent } from './home/home.component';
import { CalSalaryComponent } from './financial-management/cal-salary/cal-salary.component';
import { IncomeManageComponent } from './financial-management/income-manage/income-manage.component';
import { ExpencesManageComponent } from './financial-management/expences-manage/expences-manage.component'
import { ARMoneyRequestsComponent } from './financial-management/a-r-money-requests/a-r-money-requests.component';
import { AttendanceComponent } from './employee-management/attendance/attendance.component';
import { CoursesComponent } from './student-management/courses/courses.component';
import { StudentPaymentsComponent } from './student-management/student-payments/student-payments.component';
import { RegisterEmployeeComponent } from './employee-management/register-employee/register-employee.component';
import { MoneyRequestComponent } from './employee-management/money-request/money-request.component';
import { EventComponent } from './event-management/event/event.component';
import { EventManageComponent } from './event-management/event-manage/event-manage.component';
import { ManageBookComponent } from './library-management/manage-book/manage-book.component';
import { BorrowBookComponent } from './library-management/borrow-book/borrow-book.component';
import { AddAssingnmentComponent } from './AssignmentsExaminations/assingnment/add-assingnment/add-assingnment.component';
import { EditDeletAssingnmentComponent } from './AssignmentsExaminations/assingnment/edit-delet-assingnment/edit-delet-assingnment.component';
import { UplloadAssingnmentComponent } from './AssignmentsExaminations/assingnment/uplload-assingnment/uplload-assingnment.component';
import { ViewAssingnmentComponent } from './AssignmentsExaminations/assingnment/view-assingnment/view-assingnment.component';
import { QuizMarksReportComponent } from './AssignmentsExaminations/assingnment/edit-delet-assingnment/quiz-marks-report/quiz-marks-report.component';
import { ManagemarksComponent } from './AssignmentsExaminations/marks/managemarks/managemarks.component';
import { AddQuizComponent } from './AssignmentsExaminations/quiz/add-quiz/add-quiz.component';
import { AttendantToQuizComponent } from './AssignmentsExaminations/quiz/attendant-to-quiz/attendant-to-quiz.component';
import { LoginToAssingnmentComponent } from './AssignmentsExaminations/quiz/login-to-assingnment/login-to-assingnment.component'
import { EditQuizComponent } from './AssignmentsExaminations/quiz/edit-quiz/edit-quiz.component';
import { ViewQuizComponent } from './AssignmentsExaminations/quiz/view-quiz/view-quiz.component';
import { NoticeComponent } from './Message/notice/notice.component';
import { ViewnoticeComponent } from './Message/viewnotice/viewnotice.component';
import { ResourceComponent } from './resource-management/resource-management.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student-management/student/student.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // financial routes
  { path: 'financial-cal-salary', component: CalSalaryComponent },
  { path: 'financial-manage-income', component: IncomeManageComponent },
  { path: 'financial-manage-expences', component: ExpencesManageComponent },
  { path: 'financial-moneyRequests', component: ARMoneyRequestsComponent },
  
  // student routes
  { path: 'student-student', component: StudentComponent },
  { path: 'student-courses', component: CoursesComponent },
  { path: 'student-payments', component: StudentPaymentsComponent },
  
  // employee student
  { path: 'employee-attendance', component: AttendanceComponent },
  { path: 'employee-register', component: RegisterEmployeeComponent },
  { path: 'employee-mRequests', component: MoneyRequestComponent },
  
  // event routes
  { path: 'event-view', component: EventComponent },
  { path: 'event-manage', component: EventManageComponent },
  
  // library routes
  { path: 'library-manageBook', component: ManageBookComponent },
  { path: 'library-borrowBook', component: BorrowBookComponent },

  // assingments and quiz routes
  { path: 'managemarks', component: ManagemarksComponent },
  { path: 'addAssingnment', component: AddAssingnmentComponent },
  { path: 'updateAssingnment', component: EditDeletAssingnmentComponent },
  { path: 'updateAssingnment/edit/:id', component: AddAssingnmentComponent },
  { path: 'viewAssingment', component: ViewAssingnmentComponent },
  { path: 'uploadAssingnment/:id', component: UplloadAssingnmentComponent },
  { path: 'AttendantToQuiz', component: AttendantToQuizComponent },
  { path: 'QuizMarksReport/:id', component: QuizMarksReportComponent},
  { path: 'AttendantToQuiz/:id', component: AttendantToQuizComponent },
  { path: 'LogintoQuize/:id' , component: LoginToAssingnmentComponent},
  { path: 'viewQuiz', component: ViewQuizComponent },
  { path: 'addQuiz/:id', component: AddQuizComponent },
  { path: 'viewQuiz/edit/:id', component: EditQuizComponent },
  
  // messaging and notice routes
  { path: 'manageNotice', component: NoticeComponent },
  { path: 'viewNotice', component: ViewnoticeComponent },
  { path: 'viewNotice/edit/:id', component: NoticeComponent },
  
  // resource routes
  { path: 'resource', component: ResourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
