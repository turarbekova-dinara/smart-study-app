import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, RightPanelComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {}
