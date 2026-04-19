import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  api = 'http://127.0.0.1:8000/api/notes/';

  constructor(private http: HttpClient) {}

  getNotes(){
    return this.http.get(this.api);
  }

  addNote(note:any){
    return this.http.post(this.api, note);
  }

  deleteNote(id:number){
    return this.http.delete(this.api + id + '/');
  }

}
