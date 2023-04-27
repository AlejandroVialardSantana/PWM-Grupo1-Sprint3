import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swiper from 'swiper';
import { Destino } from '../../models/interfaces/destinos';
import { Actividad } from '../../models/interfaces/actividades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() region: string = ''; 
  @Input() filterByRegion: boolean = true;
  @Input() showActivities: boolean = false;
  destinies: Destino[] = [];
  activities: Actividad[] = [];
  lista: any[] = [];
  Array = Array;
  private subscription: Subscription = new Subscription();

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    if (this.showActivities) {
      this.subscription = this.firestoreService.getActivities().subscribe(actividades => {
        this.activities = actividades;
        setTimeout(() => {
          this.createSwiper(`#${this.id}`);
        }, 0);  
      });
    }
    else {
      this.subscription = this.firestoreService.getDestinies().subscribe(destinos => {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
