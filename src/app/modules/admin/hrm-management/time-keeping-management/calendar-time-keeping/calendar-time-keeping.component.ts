import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar-time-keeping',
  templateUrl: './calendar-time-keeping.component.html',
  styleUrls: ['./calendar-time-keeping.component.scss']
})
export class CalendarTimeKeepingComponent implements OnInit {
  events: any = []
  calendarOptions: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fillData(params.id);
    })
  }

  fillData(id?:number) {
    if(id==578){
      this.events = [
        { title: "", date: "2023-01-12", color: "red", display: "background", }
      ]
    }
    else{
      this.events = [
        { title: "", date: "2023-01-13", color: "red", display: "background", },
        { title: "", date: "2023-01-14", color: "#8fdf82", display: "background", },
        { title: "", date: "2023-01-15", color: "blue", display: "background", },
        { title: "", date: "2023-01-16", color: "orange", display: "background", },

        { title: "", date: "2023-01-17", color: "red", display: "background", }

      ]
    }
    this.initCalendar()
  }

  initCalendar() {
    this.calendarOptions = {
      themeSystem: 'standard',
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: this.events,
    }
  }

}
