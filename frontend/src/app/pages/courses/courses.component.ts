import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true, // Убедитесь, что это стоит, если вы используете последние версии Angular
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
// САМОЕ ВАЖНОЕ: проверьте наличие слова export
export class CoursesComponent {

}
