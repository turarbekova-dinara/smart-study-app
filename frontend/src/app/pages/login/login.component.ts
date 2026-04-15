import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    console.log("CLICKED");
    this.http.post('http://127.0.0.1:8000/api/login/', {
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {

      if (res.status === 'ok') {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/todo']);
      } else {
        alert('Wrong login');
      }

    });
  }

  register() {
    this.http.post('http://127.0.0.1:8000/api/register/', {
      username: this.username,
      password: this.password
    }).subscribe(() => {
      alert('Registered!');
    });
  }
}
