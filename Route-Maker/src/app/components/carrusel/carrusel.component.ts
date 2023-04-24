import { Component, AfterViewInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swiper from 'swiper';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements AfterViewInit {
  @Input() title: string = '';

  destinies: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      navigation: {
        nextEl: '.slick_next',
        prevEl: '.slick_prev',
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

    this.firestore.collection('destinos').doc('canarias').valueChanges().subscribe((data: any) => {
      this.destinies = data;
    });
  }
}
