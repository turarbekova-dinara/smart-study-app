import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, SidebarComponent, RightPanelComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  constructor(private router: Router) {
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  isLoginPage(): boolean{
    return this.router.url === '/login' || this.router.url === '/';
  }
}
