import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  tasks: any[] = [];
  task = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.todoService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    this.todoService.addTask(this.task).subscribe(() => {
      this.load();
      this.task = '';
    });
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.load();
    });
  }
}
