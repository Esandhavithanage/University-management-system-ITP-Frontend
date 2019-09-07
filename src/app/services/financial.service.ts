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

    this.http.post(`${this.uri}/add`, expence).subscribe(res => {
      console.log(res);
    });
  }

  // get expences for a time period
  searchExpences(dateFrom, dateTo) {
    return this.http.get(`${this.uri}/searchE/${dateFrom}/${dateTo}`);
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
