import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swiper from 'swiper';
import { Destino } from '../../models/interfaces/destinos';
import { Actividad } from '../../models/interfaces/actividades'

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() region: string = ''; 
  @Input() filterByRegion: boolean = true;
  destinies: Destino[] = [];
  activities: Actividad[] = [];
  Array = Array;
  
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getDestinies().subscribe(destinos => {
      if (this.filterByRegion) {
        this.destinies = destinos.filter(destino => destino.region === this.region); // filtra los destinos según la región
      } else {
        this.destinies = destinos; // muestra todos los destinos
      }

      // Esperar a que se renderice el HTML antes de inicializar el carrusel
      setTimeout(() => {
        this.createSwiper(`#${this.id}`);
      }, 0);      
    });
  }  

  createSwiper(selector: string): void {
    const swiper = new Swiper(selector, {
      slidesPerView: 3,
      navigation: {
        nextEl: '.slick_next',
        prevEl: '.slick_prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        960: {
          slidesPerView: 3
        },
        601: {
          slidesPerView: 2
        },
        0: {
          slidesPerView: 1
        }
      }
    });
  }
}
