import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swiper from 'swiper';
import { Destino } from '../../models/interfaces/destinos';
import { Actividad } from '../../models/interfaces/actividades';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() region: string = '';
  @Input() category: string = '';
  @Input() filterByRegion: boolean = false;
  @Input() filterByCategory: boolean = false;
  @Input() showActivities: boolean = false;
  destinies: Destino[] = [];
  activities: Actividad[] = [];
  Array = Array;
  private subscription: Subscription = new Subscription();

  constructor(private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    if (this.showActivities) {
      this.subscription = this.firestoreService.getActivities().subscribe(actividades => {
        let filteredActivities = actividades.filter(actividad => actividad.category && actividad.category.includes(this.category));

        if (filteredActivities.length > 6) {
          // Si hay más de 6 actividades que cumplen con el filtro de categoría, elegimos 6 al azar
          const shuffledActivities = filteredActivities.sort(() => 0.5 - Math.random());
          this.activities = shuffledActivities.slice(0, 6);
        } else {
          // Si hay 6 o menos actividades que cumplen con el filtro de categoría, simplemente las usamos todas
          this.activities = filteredActivities;
        }
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

  navigateToActivity(activity: Actividad): void {
    this.router.navigate(['/activityDescription'], { queryParams: { location: activity.city, name: activity.name } });
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
      },
    });
  }
}
