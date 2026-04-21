import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { CoursesComponent } from './pages/courses/courses.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
