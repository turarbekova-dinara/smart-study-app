import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {

  API = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Token ${localStorage.getItem('token')}`
      })
    };
  }

  getTasks() {
    return this.http.get(this.API, this.headers());
  }

  addTask(title: string) {
    return this.http.post(this.API, { title }, this.headers());
  }

  deleteTask(id: number) {
    return this.http.delete(this.API + id + '/', this.headers());
  }
}
