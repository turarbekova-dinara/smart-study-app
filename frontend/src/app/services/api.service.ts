import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token
      })
    };
  }

  getTasks() {
    return this.http.get(this.baseUrl, this.getHeaders());
  }

  addTask(task: any) {
    return this.http.post(this.baseUrl, {
      title: task
    }, this.getHeaders());
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + id + '/', this.getHeaders());
  }
}
