import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { NotesComponent } from './pages/notes/notes';
import { CalendarComponent } from './pages/calendar/calendar';
import { MusicComponent } from './pages/music/music';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'music', component: MusicComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
