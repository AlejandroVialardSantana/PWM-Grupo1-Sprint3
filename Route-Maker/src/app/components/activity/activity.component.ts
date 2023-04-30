import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface Activity {
  nombre: string;
  descripcion: string;
  imagen_url: string;
  estrellas: number;
  precio: string;
  estrellasArray: boolean[];
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  
  @Input() activities: Activity[] = [];
  paginatedActivities: Activity[] = [];

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];

  constructor() { }

  ngOnInit(): void {
    this.activities.forEach(activity => {
      activity.estrellasArray = new Array(5).fill(false);
      for (let i = 0; i < activity.estrellas; i++) {
        activity.estrellasArray[i] = true;
      }
    });

    this.paginateActivities();
  }

  paginateActivities(event?: PageEvent) {
    const startIndex = event ? event.pageIndex * event.pageSize : 0;
    this.paginatedActivities = this.activities.slice(startIndex, startIndex + this.pageSize);
    return event;
  }
}
