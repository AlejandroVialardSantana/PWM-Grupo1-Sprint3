import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swiper from 'swiper';
import { Destino } from '../../models/interfaces/destinos';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  @Input() title: string = '';
  @Input() region: string = 'peninsula';
  destinies: Destino[] = [];;
  Array = Array;
  
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getDestinies().subscribe(destinos => {
      this.destinies = destinos.filter(destino => destino.region === this.region); // filtra los destinos según la región
  
      // Esperar a que se renderice el HTML antes de inicializar el carrusel
      setTimeout(() => {
        this.createSwiper(`#carrusel-${this.region}`); // llama a la función createSwiper con el identificador único del carrusel actual
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
