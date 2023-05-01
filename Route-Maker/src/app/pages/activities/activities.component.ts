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

  // Método para manejar el evento de cambio de filtro
  onFilterChange(event: any) {
    switch (event.type) {
      case 'duration':
        console.log(`Se trata de duration y su duración es ${event.value} horas`);
        break;
      case 'maxCost':
        console.log(`Se trata de maxCost y su costo máximo es ${event.value}€`);
        break;
      case 'activityType':
        console.log(`Se trata de un activityType, es: ${event.value}, y está ${event.isActive ? 'activo' : 'inactivo'}`);
        break;
      case 'specificNeed':
        console.log(`Se trata de un specificNeed, es: ${event.value}, y está ${event.isActive ? 'activo' : 'inactivo'}`);
        break;
      default:
        console.log('Tipo de filtro desconocido');
        break;
    }
  }  
  
}