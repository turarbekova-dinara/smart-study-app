import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})

export class CalendarComponent implements OnInit {
  constructor(private http: HttpClient) {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit(){
    this.loadEvents()
  }

  loadEvents(){
    this.http.get<any[]>('http://127.0.0.1:8000/events/')
      .subscribe(data => {
        const events = data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.date
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: events
        };
      });
  }

  handleDateClick(info:any){
    const title = prompt("Event name")
    if(title){
      const event={
        title:title,
        date:info.dateStr
      }
      this.http.post('http://127.0.0.1:8000/events/',event)
        .subscribe(()=>{
          this.loadEvents()
        })
    }
  }

  handleEventClick(info:any){
    const confirmDelete = confirm("Delete event?")
    if(confirmDelete){
      const id = info.event.id
      this.http.delete(`http://127.0.0.1:8000/events/${id}/`)
        .subscribe(()=>{
          info.event.remove()
        })
    }
  }
}
