import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  // Список курсов с реальными ID видео из YouTube
  courses = [
    {
      title: 'Blockchain Technology',
      id: 'yubzJw0uiE4', // ID видео (берется из ссылки YouTube)
      category: 'Blockchain'
    },
    {
      title: 'Calculus II: Integrals',
      id: 'taEH6N2p4OM',
      category: 'Mathematics'
    },
    {
      title: 'Web Development',
      id: 'oUmVFHlwZsI',
      category: 'Angular'
    },
    {
      title: 'Computer Networking Course',
      id: 'qiQR5rTSshw',
      category: 'Computer Networking'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  // Создаем безопасную ссылку для iframe
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
