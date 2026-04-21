import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidebarComponent, RightPanelComponent, CommonModule],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
