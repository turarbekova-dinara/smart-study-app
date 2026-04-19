import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  tasks:any[]=[]
  newTask:string=""

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.loadTasks()
  }

  getHeaders(){
    const token = localStorage.getItem("token")

    return {
      headers:new HttpHeaders({
        Authorization:"Token "+token
      })
    }
  }

  loadTasks(){

    this.http.get(
      "http://127.0.0.1:8000/tasks/").subscribe((data:any)=>{
      this.tasks=data
    })
  }

  addTask(){

    if(!this.newTask) return

    this.http.post(
      "http://127.0.0.1:8000/tasks/",
      {
        title:this.newTask,
        completed:false
      }).subscribe(()=>{

      this.newTask=""
      this.loadTasks()

    })

  }

  toggleTask(task:any){

    this.http.put(
      `http://127.0.0.1:8000/tasks/${task.id}/`,
      {
        title:task.title,
        completed:!task.completed
      }).subscribe(()=>{

      this.loadTasks()
    })
  }

  deleteTask(id:number){
    this.http.delete(
      `http://127.0.0.1:8000/tasks/${id}/`
    ).subscribe(()=>{
      this.loadTasks()

    })

  }

}
