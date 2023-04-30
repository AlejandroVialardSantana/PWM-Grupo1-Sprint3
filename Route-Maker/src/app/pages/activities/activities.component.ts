import { Component } from '@angular/core';
import { Activity } from 'src/app/components/activity/activity.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {

  handleSearch(searchText: string): void {
    alert(searchText);
  }

  actividades: Activity[] = [{
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  }, 
  {
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  }, 
  {
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  }, 
  {
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  },
  {
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  },
  {
    nombre: "Visita a la Sagrada Familia, Barcelona XDDD",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  },
  {
    nombre: "Visita a la Sagrada Familia, Barcelona",
    descripcion: "Descubre la majestuosidad de la Basílica de la Sagrada Familia en esta visita inolvidable.",
    imagen_url: "https://media.timeout.com/images/105737732/image.jpg",
    estrellas: 4,
    precio: "35€",
    estrellasArray: [true, true, true, true, false]
  }];

}