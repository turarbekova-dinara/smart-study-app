import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {

  lectureLink: string = '';
  safeLectureLink?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    const savedLink = localStorage.getItem('lectureLink');
    if(savedLink){
      this.lectureLink = savedLink;
      this.safeLectureLink =
        this.sanitizer.bypassSecurityTrustResourceUrl(savedLink);
    }
  }

  loadLecture(){
    if(this.lectureLink){
      localStorage.setItem('lectureLink', this.lectureLink);
      this.safeLectureLink =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.lectureLink);
    }
  }
}
