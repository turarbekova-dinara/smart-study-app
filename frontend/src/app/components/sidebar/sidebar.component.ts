import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: 'sidebar.component.css',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showBgPicker=false;
  selectedBgUrl: string='';
  tempSelectedBgUrl: string='';
  backgrounds=[
    {name:'Mountains', url:'backgrounds/Mountains.jpg'},
    {name:'Ocean', url:'backgrounds/Ocean.jpg'},
    {name:'City', url:'backgrounds/City.jpg'},
    {name:'Forest', url:'backgrounds/Forest.jpg'}
  ]
  constructor(private router: Router) {}
  readonly DEFAULT_BG = 'backgrounds/default.png';
  ngOnInit() {
    const savedBg = localStorage.getItem('userBackground');

    this.selectedBgUrl = savedBg ? savedBg : this.DEFAULT_BG;

    this.applyStyles(this.selectedBgUrl);
  }

  togglePicker() {
    this.showBgPicker = !this.showBgPicker;
    this.tempSelectedBgUrl = this.selectedBgUrl;
  }

  selectTemp(url: string) {
    this.tempSelectedBgUrl = url;
  }

<<<<<<< Akniet
  applyBg() {
    this.selectedBgUrl = this.tempSelectedBgUrl;
    localStorage.setItem('userBackground', this.selectedBgUrl);
    this.applyStyles(this.selectedBgUrl);
    this.showBgPicker = false;
  }

  cancel() {
    this.showBgPicker = false;
  }

  resetBg() {
    this.selectedBgUrl = this.DEFAULT_BG;
    localStorage.removeItem('userBackground');
    this.applyStyles(this.selectedBgUrl);
    this.showBgPicker = false;
  }

  private applyStyles(url: string) {
    if (url) {
      document.body.style.backgroundImage = `url(${url})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = '';
    }
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
=======
  logout(): void {
    localStorage.removeItem('token');
>>>>>>> main
    this.router.navigate(['/login']);
  }

}

