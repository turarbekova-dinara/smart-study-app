import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/api/login/', {
      username,
      password
    });
  }

  register(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/api/register/', {
      username,
      password
    });
  }

}
