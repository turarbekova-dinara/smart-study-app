import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (!this.newTask.trim()) return;

    this.taskService.addTask({
      title: this.newTask,
      completed: false
    }).subscribe((res: any) => {
      this.tasks.push(res);
      this.newTask = '';
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
