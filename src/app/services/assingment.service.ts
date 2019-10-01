import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AssingmentService {

  uri = 'http://localhost:4001/Assessment';
  
  constructor(private http:HttpClient) { }

  addassisment(tital,startdate,deadline,subject,type){
    const obj = {
      tital:tital,
      startdate:startdate,
      deadline:deadline,
      subject:subject,
      type:type
    };
  return this.http.post(`${this.uri}/add`,obj);
}

 getassisment(subject,type){
  const obj = {
    subject:subject,
    type:type
  };
   return this.http.post(`${this.uri}`,obj);
 }

 editAssisment(id){
   return this.http.get(`${this.uri}/edit/${id}`);
 }

 UpdateAssisment(id,tital,startdate,deadline,subject,type){
  const obj = {
    id:id,
    tital:tital,
    startdate:startdate,
    deadline:deadline,
    subject:subject,
    type:type
  };
  return this.http.post(`${this.uri}/update/${id}`,obj).subscribe(res => console.log('Done'));
 }

 deleteAssisment(id) {
  return this.http.get(`${this.uri}/delete/${id}`);
}

getsubjects(){
  return this.http.get(`${this.uri}/subject`); 
}

getAssisment(subjectid){
  return this.http.get(`${this.uri}/getAssisment/${subjectid}`); 
}
uploadAssisment(uploadFile,Assessment,StudentID){
  let formData =new FormData();
  formData.append("myFile",uploadFile);
  formData.append("StudentID",StudentID);
  console.log(formData.get("myFile"));

  return this.http.post(`${this.uri}/uploadFile/${Assessment}`,formData); 
}

deleteuploadAssisment(){
  return this.http.get(`${this.uri}/deleteuploadFile`); 
}

downloadAssisment(assesmentName){
 /*var obj={filename:assesmentName};

  return this.http.get(`${this.uri}/download/${assesmentName}`, { responseType: "blob" }).toPromise().then(blob =>{
    saveAs(blob, "dump.gz"); 
  }).catch(err => console.error("download error = ", err));*/
}


}
