import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CBook{
  insertId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  uri = 'http://localhost:4001/library';
  cBookObj: CBook[] = [];

  constructor(private http: HttpClient) {
    
  }

  getBooks(){
    return this.http.get(`${this.uri}/getBooks`);
  }

  addBook(obj){
    return this.http.post(`${this.uri}/addBook`, obj);

  }

  updateBooks(obj){
    return this.http.post(`${this.uri}/updateBook`, obj);
    
  }

  deleteBook(id){
    console.log(id);
    return this.http.get(`${this.uri}/deleteBook/${id}`);

  }

  getBorrowRecords(){
    console.log("called");

    return this.http.get(`${this.uri}/getBorrowRecrods`);

  }

  addBorrowRecord1(obj){
    console.log(obj);

    return this.http.post(`${this.uri}/addTocopybook`, obj);
      
  }

  addBorrowRecord2(obj){
    console.log(obj);

    return this.http.post(`${this.uri}/addToBorrow`, obj);
      
  }

  deleteBorrowRecord(id){
    console.log(id);

    return this.http.get(`${this.uri}/deleteBorrowRecord/${id}`);

  }

  getAuthers(){
    return this.http.get(`${this.uri}/getAuthers`);
  }

  addAuther(obj){
    return this.http.post(`${this.uri}/addAuther`, obj);

  }

  updateAuther(obj){
    return this.http.post(`${this.uri}/updateAuther`, obj);
    
  }

  deleteAuther(id){
    console.log(id);
    return this.http.get(`${this.uri}/deleteAuther/${id}`);

  }

  returnBookC(obj){
    console.log(obj);
    return this.http.post(`${this.uri}/returnBookC`, obj);
  }

  returnBookB(obj){
    console.log(obj);
    return this.http.post(`${this.uri}/returnBookB`, obj);
  }


}
