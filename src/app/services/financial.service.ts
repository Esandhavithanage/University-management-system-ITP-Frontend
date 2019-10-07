import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salary } from '../models/Salary';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  
  uri = 'http://localhost:4001/financial';

  finalSalObj: Salary;

  constructor(private http: HttpClient) { }

  getOT(calObj){
    let id = calObj.id;
    let startDate = calObj.startDate;
    let endDate = calObj.endDate;

    // get OT hours
    return this.http.get(`${this.uri}/getOT/${id}/${startDate}/${endDate}`);

  }

  getSalary(calObj) {
    let id = calObj.id;
    return this.http.get(`${this.uri}/getSalary/${id}`);
   
  }
       

  // get incomes for a time period
  searchIncomes(dateFrom, dateTo) {
    return this.http.get(`${this.uri}/searchIncome/${dateFrom}/${dateTo}`);
  }

  // get all incomes
  getAllIncome(){
    return this.http.get(`${this.uri}/getAllIncome`);
  }

  // delete income
  deleteIncome(paymentId) {
   console.log(paymentId);
   return this.http.get(`${this.uri}/deleteIncome/${paymentId}`);

  }

  // get all expenses
  getAllExpences(){
    return this.http.get(`${this.uri}/getAllExpences`);
  }

  // add expences to db
  addExpence(obj) {
    const expence = {
      id: obj.id,
      date: obj.date,
      type: obj.type,
      amount: obj.amount,
      description: obj.description
    }
    console.log(obj);

    return this.http.post(`${this.uri}/addExpense`, expence);
  
  }

  // get expenses for a time period
  searchExpences(dateFrom, dateTo) {
    return this.http.get(`${this.uri}/searchExpenses/${dateFrom}/${dateTo}`);
  }

  // update expense
  updateExpense(obj){
    console.log("service" + obj);
    return this.http.post(`${this.uri}/updateExpense`, obj);

  }

  // delete expense
  deleteExpense(id){
    console.log(id);
    return this.http.get(`${this.uri}/deleteExpense/${id}`);

  }


  // get money requests
  getMRequests() {
    return this.http.get(`${this.uri}/getMRequests`);
  }

  acceptOrRejectMRequest(id: number, command: string) {
    const obj = { reqId: id };

    if (command == "accept") {
      this.http.post(`${this.uri}/acceptMRequest`, obj).subscribe(result => {
        console.log(result);
      });
    } else if (command == "reject") {
      this.http.post(`${this.uri}/rejectMRequest`, obj).subscribe(result => {
        console.log(result);
      });
    }


  }


}
