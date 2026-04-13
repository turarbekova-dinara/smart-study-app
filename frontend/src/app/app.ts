import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

}
