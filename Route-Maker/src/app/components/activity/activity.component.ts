import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FirestoreService } from '../../services/firestore/firestore.service';

import { Actividad } from 'src/app/models/interfaces/actividades';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnChanges {
  
  @Input() activities: Actividad[] = [];
  paginatedActivities: Actividad[] = [];

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];


  ngOnInit(): void {
    this.processActivities();
    this.paginateActivities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activities'] && changes['activities'].currentValue !== changes['activities'].previousValue) {
      this.processActivities();
      this.paginateActivities();
    }
  }

  processActivities(): void {
    this.activities.forEach(activity => {
      activity.stars_array = new Array(5).fill(false);
      for (let i = 0; i < activity.stars; i++) {
        activity.stars_array[i] = true;
      }
    });
  }

  paginateActivities(event?: PageEvent): void {
    const startIndex = event ? event.pageIndex * event.pageSize : 0;
    this.paginatedActivities = this.activities.slice(startIndex, startIndex + this.pageSize);
  }
}