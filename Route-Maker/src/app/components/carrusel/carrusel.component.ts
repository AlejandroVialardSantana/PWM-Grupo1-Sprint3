import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  title = 'Destinos destacados';
  destinies: any[] = [
    {
      name: 'Paris',
      image: 'https://viajes.nationalgeographic.com.es/medio/2022/07/13/paris_37bc088a_1280x720.jpg',
      stars: 5,
    },
    {
      name: 'Londres',
      image: 'https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg?impolicy=fcrop&w=800&h=533&q=medium',
      stars: 4,
    },
    {
      name: 'Roma',
      image: 'https://images.ecestaticos.com/4vk9bkcWOITJwHWN_MhqkwDfxVA=/0x13:1494x854/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fdae%2F7b7%2F861%2Fdae7b7861c3285b03b9f6555878c8c53.jpg',
      stars: 3,
    },
    {
      name: 'Tokio',
      image: '',
      stars: 5,
    }
  ]
}
