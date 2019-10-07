import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  uri = 'http://localhost:4001/resources';
  constructor(private http: HttpClient) { }

  addResource(form){
    console.log(form);
    const obj = {
      id: form.id,
      type: form.type,
      qty: form.qty,
    }; 
    this.http.post(`${this.uri}/addResource`, obj).subscribe(res => console.log(res));
}

getResource(){
  console.log("called");
  return this.http.get(`${this.uri}/getResources`);
}

updateResource(form){
  // console.log(form);
  return this.http.post(`${this.uri}/updateResource`, form);
}

deleteResource(id){
  console.log(id);
  this.http.get(`${this.uri}/deleteResource/${id}`).subscribe();
}


}

