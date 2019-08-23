import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPrintModule} from 'ngx-print';

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
    ExpenceReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    NgbModule,
    NgxPrintModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'financial-cal-salary', component: CalSalaryComponent },
      { path: 'financial-manage-income', component: IncomeManageComponent },
      { path: 'financial-manage-expences', component: ExpencesManageComponent },
      { path: 'financial-moneyRequests', component: ARMoneyRequestsComponent },
      { path: 'attendance', component: InsertAttendanceComponent }
    ])
  ],
  providers: [
    FinancialService,
    EmployeeService
  ],
  schemas: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
