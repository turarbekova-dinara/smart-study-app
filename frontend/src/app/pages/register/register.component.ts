import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterModule]
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  register(): void {
    this.http.post('http://127.0.0.1:8000/api/register/', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('REGISTER SUCCESS', res);
        alert('Registered!');
      },
      error: (err: any) => {
        console.error(err);
        alert('Register failed');
      }
    });
  }
}
