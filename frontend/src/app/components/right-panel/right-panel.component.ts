import { Component } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [],
  templateUrl: './right-panel.component.html'
})
export class RightPanelComponent {

  time = 0;

  start() {
    setInterval(() => {
      this.time++;
    }, 1000);
  }

  toggle() {
    document.body.classList.toggle('dark');
  }
}
