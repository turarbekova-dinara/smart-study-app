import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({providedIn:'root'})
export class TodoService{

  api = "http://127.0.0.1:8000/api/"

  constructor(private http:HttpClient){}

  getTasks(){
    return this.http.get<any[]>(this.api+"tasks/")
  }

  addTask(task:any){
    return this.http.post(this.api+"tasks/add/",task)
  }

  updateTask(task:any){
    return this.http.put(this.api+"tasks/update/"+task.id+"/",task)
  }

  deleteTask(id:number){
    return this.http.delete(this.api+"tasks/delete/"+id+"/")
  }

}
