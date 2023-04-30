import { Component, OnInit, NgZone } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, Event, NavigationEnd } from '@angular/router';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  destinos: any;
  loading = false;
  constructor(private ngZone: NgZone, private router: Router, private http: HttpClient, private firestore: AngularFirestore) { }

  ngOnInit() {
    // this.exportJsonToFirestore('destinos');
    // this.exportJsonToFirestore('actividades');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      } else {
        this.loading = true; // Mostrar el loader
        setTimeout(() => {
          // Cargar datos aquí
          this.ngZone.run(() => {
            this.loading = false; // Ocultar el loader
          });
        }, 1000); // Retrasar la carga de los datos por 2 segundos (por ejemplo)
        
      }
    });
  }

  exportJsonToFirestore(name: string) {
    this.http.get(`../assets/${name}.json`).subscribe((data: any) => {
      const json = data;
      const collectionRef = this.firestore.collection(name);
      Object.keys(json).forEach((key) => {
        collectionRef.doc(key).set(json[key]);
      });
    });
  }

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  title = 'Route-Maker';
}