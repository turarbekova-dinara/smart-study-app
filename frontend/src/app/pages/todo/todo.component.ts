import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./todo.component.html',
  styleUrls:['./todo.component.css']
})

export class TodoComponent implements OnInit{

  tasks:any[]=[];
  newTask="";

  constructor(private http:HttpClient){}

  getHeaders(){

    const token = localStorage.getItem("token");

    return {
      headers:new HttpHeaders({
        Authorization:`Token ${token}`
      })
    };

  }

  ngOnInit(){

    this.loadTasks();

  }

  loadTasks(){

    this.http.get<any[]>(
      "http://127.0.0.1:8000/api/tasks/",
      this.getHeaders()
    ).subscribe(res=>{
      this.tasks=res;
    });

  }

  addTask(){

    if(!this.newTask) return;

    this.http.post(
      "http://127.0.0.1:8000/api/tasks/add/",
      {title:this.newTask},
      this.getHeaders()
    ).subscribe(()=>{
      this.newTask="";
      this.loadTasks();
    });

  }

  toggle(task:any){

    this.http.put(
      `http://127.0.0.1:8000/api/tasks/update/${task.id}/`,
      {completed:!task.completed},
      this.getHeaders()
    ).subscribe(()=>{
      this.loadTasks();
    });

  }

  deleteTask(task:any){

    this.http.delete(
      `http://127.0.0.1:8000/api/tasks/delete/${task.id}/`,
      this.getHeaders()
    ).subscribe(()=>{
      this.loadTasks();
    });

  }

}
