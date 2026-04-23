import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PomodoroService } from '../../services/pomodoro.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent {
  ps = inject(PomodoroService);

  workInput = 25;
  breakInput = 5;

  constructor() {
    this.ps.workMinutes$.subscribe(v => this.workInput = v);
    this.ps.breakMinutes$.subscribe(v => this.breakInput = v);
  }

  onWorkChange() { this.ps.setWork(this.workInput); }
  onBreakChange() { this.ps.setBreak(this.breakInput); }
}
