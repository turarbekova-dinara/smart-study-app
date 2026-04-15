import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TodoComponent } from './pages/todo/todo.component';
import { NotesComponent } from './pages/notes/notes';
import { CalendarComponent } from './pages/calendar/calendar';
import { MusicComponent } from './pages/music/music';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'todo', component: TodoComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'music', component: MusicComponent },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
