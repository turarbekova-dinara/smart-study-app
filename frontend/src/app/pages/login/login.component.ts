import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.post<any>('http://127.0.0.1:8000/api/login/', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }

  logout() {
    const token = localStorage.getItem('token');

    this.http.post('http://127.0.0.1:8000/api/logout/', {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}


