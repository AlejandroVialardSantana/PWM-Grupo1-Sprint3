import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/interfaces/actividades';
import { FirestoreService } from '../../services/firestore/firestore.service';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit{

  allActivities: Actividad[] = [];
  filteredActivities: Actividad[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getActivities().subscribe((activitiesData: Actividad[]) => {
      this.allActivities = activitiesData;
      this.filteredActivities = activitiesData;
    });
    
  }

  handleSearch(searchText: string): void {
    alert(searchText);
  }

  

}