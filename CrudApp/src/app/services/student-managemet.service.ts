import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config.ts/config';

@Injectable({
  providedIn: 'root'
})
export class StudentManagemetService {

  constructor(private http:HttpClient) { }

  // post data
  postData(data:any){
    return this.http.post(`${baseUrl}/student`, data);
  }

  //get data 
  getData(){
    return this.http.get(`${baseUrl}/student`);
  }

  //delete record
  deleteStudentData(id:any){
    return this.http.delete(`${baseUrl}/student/`+id);
  }

  

  // update reord
  updateRecord(data:any, id:any){
    return this.http.put(`${baseUrl}/student/`+id, data);
  }

}
