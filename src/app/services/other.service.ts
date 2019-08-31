import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherService {
  uri = 'http://localhost:4001/other';

  constructor(private http: HttpClient) { }

  getDepartments(){
    return this.http.get(`${this.uri}/getDepartments`);
  }
}
