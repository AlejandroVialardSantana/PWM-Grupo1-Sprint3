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

  checkBoxFilters:string[] = [];
  durationFilter:number = 8;
  maxCostFilter:number = 50;
  searchBarText:string = '';

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getActivities().subscribe((activitiesData: Actividad[]) => {
      this.allActivities = activitiesData;
      this.filteredActivities = activitiesData;
    });
    
  }

  //Para poder comparar las categorías sin problema, por ej "Cultura" y "cultura" son iguales
  normalizeString(input: string): string {
    return input
      .toLowerCase()
      .normalize('NFD') // Esto descompone los acentos de las letras
      .replace(/[\u0300-\u036f]/g, '') // Esto elimina los acentos
      .replace(/\s/g, ''); // Esto elimina los espacios
  }

  onFilterChange(event: any) {
    // Restablecemos filteredActivities a allActivities antes de aplicar los filtros
    this.filteredActivities = [...this.allActivities];
  
    //Si el evento es un cambio en el texto de búsqueda
    if(event.type == 'search'){
      // Actualizamos el valor del filtro de texto de búsqueda
      this.searchBarText = event.value;
    }
    // Si el evento que recibimos es de un checkbox
    else if(event.type == 'activityType' || event.type == 'specificNeed'){
      // Si el checkbox está activo
      if(event.isActive){
        // Añadimos el filtro a la lista de filtros
        this.checkBoxFilters.push(this.normalizeString(event.value));
      }
      // Si el checkbox está desactivado
      else{
        // Eliminamos el filtro de la lista de filtros
        this.checkBoxFilters.splice(this.checkBoxFilters.indexOf(this.normalizeString(event.value)),1);
      }
    }
    // Si el evento que recibimos es de un slider
    else{
      // Si el evento es de duración
      if(event.type == 'duration'){
        // Actualizamos el valor del filtro de duración
        this.durationFilter = event.value;
      }
      // Si el evento es de coste máximo
      else{
        // Actualizamos el valor del filtro de coste máximo
        this.maxCostFilter = event.value;
      }
    }
    
    // Ahora aplicamos todos los filtros
    this.filteredActivities = this.filteredActivities.filter((activity: Actividad) => {

      if (!this.normalizeString(activity.name).includes(this.normalizeString(this.searchBarText))) {
        return false;
      }

      // Si el coste de la actividad es mayor que el coste máximo del filtro, la actividad no pasa el filtro
      if (activity.price > this.maxCostFilter) {
        return false;
      }
      // Si la duración de la actividad es mayor que la duración del filtro, la actividad no pasa el filtro
      if (activity.duration > this.durationFilter) {
        return false;
      }

      // Si checkbox filters esta vacio, no hay filtros de categorias por ende no hay que filtrar
      if(this.checkBoxFilters.length == 0){
        return true;
      }

      // Recorremos las categorías de cada actividad y vemos si estan en los filtros

      var numberOfFilterShouldPass = this.checkBoxFilters.length;


      //Comprobamos si la actividad tiene categorias o necesidades especificas, puede venir el error del firebase y que no tenga nada
      //Ahora comprobamos si la actividad tiene las categorias o necesidades especificas que se han seleccionado en los filtros
      if(activity.category){
        for (let i = 0; i < this.checkBoxFilters.length; i++) {
          for (let j = 0; j < activity.category.length; j++) {
            if(this.checkBoxFilters[i] == this.normalizeString(activity.category[j])){
              numberOfFilterShouldPass--;
            }
          }
        }
      }

      if(activity.specificNeeds){
        for (let i = 0; i < this.checkBoxFilters.length; i++) {
          for (let j = 0; j < activity.specificNeeds.length; j++) {
            if(this.checkBoxFilters[i] == this.normalizeString(activity.specificNeeds[j])){
              numberOfFilterShouldPass--;
            }
          }
        }
      }

      if(numberOfFilterShouldPass == 0){
        return true;
      }else{
        return false;
      }
    });
  }
}  