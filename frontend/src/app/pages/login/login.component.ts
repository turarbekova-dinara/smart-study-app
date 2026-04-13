import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    localStorage.setItem('user', this.username);
    this.router.navigate(['/todo']);
  }
}
