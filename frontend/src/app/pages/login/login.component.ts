import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  username = '';
  password = '';

  isOpen = false;

  constructor(private http: HttpClient, private router: Router) {}

  openPopup() {
    this.isOpen = true;
  }

  closePopup() {
    this.isOpen = false;
  }

  login(): void {
    if (!this.username || !this.password) {
      alert('Please enter your username and password');
      return;
    }

    this.http.post<any>('http://127.0.0.1:8000/api/login/', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.isOpen = false;
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

